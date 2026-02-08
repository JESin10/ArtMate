/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from "react";
import Carousel from "../modules/Carousel";
import { loadImg, BannerZip } from "../assets/images";
import RecommendSlider from "../component/RecommendSlider";
import SearchBar from "../modules/SearchBar";
// import { useQuery } from "react-query";
import {
  MainPage,
  SeoulArtMuseum_ArtWork_OpenData,
} from "../api/Gallery_OpenApi";
import tw from "tailwind-styled-components";
import { useAuth } from "./context/AuthContext";
import { collection, doc, setDoc } from "firebase/firestore";
import { updateProfile } from "@firebase/auth";
import { db, rtd } from "../Firebase";
import { v4 as uidv } from "uuid";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ArtworkModal from "../component/ArtworkModal";
import MenuFooter from "../component/MenuFooter";
import { SeoulArtMuseum_ArtWorkData } from "../api/RTDatabase";
import { ArtworkInfo, LatestArtworkInfo, UserInfo } from "../assets/interface";
import { set } from "firebase/database";

export default function Home() {
  // const [baseArray, setBaseArray] = useState<LatestArtworkInfo[]>([]);
  const [latestArray, setLatestArray] = useState<ArtworkInfo[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkInfo | null>(
    null,
  );
  const [basicArr, setBasicArr] = useState<ArtworkInfo[]>([]);
  const { currentUser } = useAuth();

  // const [getToken, setGetToken] = useState();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const LoginUserUid = useRef(uidv()).current;

  // use a safe fallback for collection paths until user is available
  const uidForPath = currentUser?.uid || "guest";
  const LoginedUserInfoRef = collection(db, `userInfo/${uidForPath}/UserInfo`);
  const LoginedUserInfo = useCollectionData(LoginedUserInfoRef)[0];

  const listRef = collection(db, `userInfo/${uidForPath}/ArtworkInfo`);
  const MyArtworkInfo = useCollectionData(listRef)[0];

  useEffect(() => {
    (async () => {
      try {
        await UserSaving();
        const arr = await basicData();
        await fetchData(arr as ArtworkInfo[]);

        if (
          LoginedUserInfo &&
          currentUser?.email !== LoginedUserInfo[0]?.Email
        ) {
          setUserInfo({
            userId: LoginUserUid,
            uid: currentUser?.uid || "",
            name: currentUser?.displayName || "",
            profileURL: currentUser?.photoURL || "",
            email: currentUser?.email,
          });
        }
      } catch (e) {
        console.error("useEffect init error", e);
      }
    })();
    // only re-run when auth or user data changes
  }, [currentUser, LoginedUserInfo]);

  const basicData = async () => {
    try {
      const result = await SeoulArtMuseum_ArtWork_OpenData(1, 50);

      // JSON 형태일 때 (axios로 파싱된 객체)
      const jsonItems =
        result?.response?.body?.items?.item ||
        result?.body?.items?.item ||
        result?.items?.item ||
        result?.items ||
        null;

      if (jsonItems) {
        const arr = Array.isArray(jsonItems) ? jsonItems : [jsonItems];
        setBasicArr(arr as any);
        return arr;
      }

      // 문자열(XML)로 오는 경우
      if (typeof result === "string" && result.trim().startsWith("<")) {
        const parser = new DOMParser();
        const xml = parser.parseFromString(result, "text/xml");
        const itemNodes = xml.getElementsByTagName("item");
        const arr = Array.from(itemNodes).map((node) => {
          const getText = (tag: string) =>
            node.getElementsByTagName(tag)[0]?.textContent || "";
          return {
            dp_ex_no: getText("seq"),
            dp_name: getText("title"),
            dp_main_img: getText("thumbnail"),
            dp_art_part: getText("realmName") || getText("serviceName"),
            dp_artist: "",
            dp_start: getText("startDate"),
            dp_end: getText("endDate"),
            dp_place: getText("place"),
          } as any;
        });
        setBasicArr(arr as any);
        return arr;
      }
    } catch (err) {
      console.error("basicData error", err);
      setBasicArr([]);
      return [];
    }
  };

  const parseYMD = (s: any): Date | null => {
    if (!s) return null;
    let str = typeof s === "number" ? s.toString() : s;
    str = str.trim();
    if (/^\d{8}$/.test(str)) {
      return new Date(
        `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}`,
      );
    }
    const d = new Date(str);
    return isNaN(d.getTime()) ? null : d;
  };

  const fetchData = async (sourceArr?: ArtworkInfo[]) => {
    const source = sourceArr && sourceArr.length ? sourceArr : basicArr;
    if (!source || source.length === 0) {
      setLatestArray([]);
      return [];
    }
    const currentDate = new Date();

    // Filter future exhibitions and sort by closest end date first
    const filteredAndSorted = source
      .map((artwork: any) => {
        const endDate = parseYMD(artwork.dp_end);
        return { artwork, endDate };
      })
      .filter((x) => x.endDate && x.endDate > currentDate)
      .sort((a, b) => a.endDate!.getTime() - b.endDate!.getTime())
      .map((x) => x.artwork)
      .splice(0, 12);

    setLatestArray(filteredAndSorted as ArtworkInfo[]);
    return latestArray;
  };

  // console.log("lateset", latestArray);
  // console.log("basic", basicArr);

  const UserSaving = async () => {
    try {
      if (currentUser && userInfo) {
        if (currentUser.displayName !== userInfo.name) {
          await updateProfile(currentUser, { displayName: userInfo.name });
        }
        const docRef = await setDoc(
          doc(db, `userInfo/${currentUser?.uid}/UserInfo`, currentUser?.email),
          {
            Uid: currentUser?.uid,
            userId: LoginUserUid,
            Email: currentUser.email,
            NickName: currentUser.displayName || "",
            ProfileURL: currentUser.photoURL,
            FollowerCnt: 0,
            FollowingCnt: 0,
            ReviewList: [],
            LikePostList: [],
            SavePostList: [],
          },
        );
        console.log("Save userInfo Successfully!");
        return docRef;
      }
    } catch (err) {
      console.error(err);
    }
  };

  //Modal
  const openModal = (artwork: ArtworkInfo) => {
    setSelectedArtwork(artwork);
  };

  const closeModal = () => {
    setSelectedArtwork(null);
  };

  const dateFunc = (date: any) => {
    if (!date && date !== 0) return "";
    let s = typeof date === "number" ? date.toString() : String(date);
    // remove non-digit characters
    s = s.replace(/\D/g, "").trim();
    if (s.length >= 8) {
      const y = s.slice(0, 4);
      const m = s.slice(4, 6);
      const d = s.slice(6, 8);
      return `${y}년 ${m}월 ${d}일`;
    }
    // fallback: return original string
    return String(date);
  };

  return (
    <div className="h-fit">
      <SearchBar />
      <>
        <div className="my-3">
          {/* {BannerZip.map((banner) => ( */}
          <img src={BannerZip[0]} />
          {/* ))} */}
        </div>
        {/* 취향저격 전시 */}
        <div className="w-11/12 mx-auto">
          {currentUser && LoginedUserInfo ? (
            <>
              {LoginedUserInfo[0]?.NickName ? (
                <h1 className="w-fit text-lg px-4 my-2 flex">
                  <p className="mr-2 font-extrabold">
                    {LoginedUserInfo[0].NickName}
                  </p>
                  님께 추천하는 전시 모음
                </h1>
              ) : (
                <h1 className="w-fit text-lg px-4 my-2 flex">
                  <p className="mr-2 font-extrabold">
                    {currentUser?.email.split("@", 1)[0]}
                  </p>
                  님께 추천하는 전시 모음
                </h1>
              )}
            </>
          ) : (
            <h1 className="w-fit font-extrabold text-2xl px-4 my-4">
              지금 떠오르는 전시는?
            </h1>
          )}

          <Carousel>
            {basicArr &&
              basicArr.slice(0, 5).map((list) => (
                <div
                  key={list.dp_ex_no}
                  className="h-[500px] object-cover px-2 rounded-xl bg-transparent"
                >
                  <div className="w-full h-full rounded-xl border-primary-YellowGreen bg-primary-YellowGreen border-4">
                    <img
                      className="rounded-t-lg h-[72%] w-full object-cover shadow-md object-center cursor-pointer"
                      src={list.dp_main_img}
                      alt={`list-${list.dp_ex_no}`}
                      onClick={() => openModal(list)}
                    />
                    <div className="w-full h-[28%] rounded-b-lg pb-1 bg-primary-YellowGreen border-primary-YellowGreen border-t-4 flex flex-col">
                      <div className="h-fit flex flex-wrap">
                        {list.dp_art_part === "" ? (
                          <>
                            <Tag>#최신전시</Tag>
                            <Tag>#NEW</Tag>
                          </>
                        ) : (
                          <>
                            {list.dp_art_part.split(",").map((tag) => (
                              <Tag key={tag}>#{tag}</Tag>
                            ))}
                          </>
                        )}
                      </div>
                      <div
                        onClick={() => openModal(list)}
                        className="w-fit p-2 text-xl font-extrabold text-white my-auto block items-center cursor-pointer text-ellipsis overflow-hidden"
                      >
                        {list.dp_name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </Carousel>
        </div>
        {/* 최신 전시 */}
        <RecommendSlider />
        {/* 종료예정 전시 */}
        <div className="h-[370px] flex flex-col my-4">
          <div className="w-11/12 mx-auto overflow-hidden ">
            <h1 className="w-full font-extrabold text-2xl px-4 my-2">
              종료예정 전시 모음
            </h1>
            <div className="overflow-scroll w-full">
              {latestArray.length > 0 &&
                latestArray.map((list: ArtworkInfo, index: number) => (
                  <div key={index} className="w-11/12 mx-auto">
                    <div
                      onClick={() => openModal(list)}
                      className="flex py-2 hover:cursor-pointer"
                    >
                      <div className="w-[130px] h-[90px] bg-white">
                        <img
                          className="w-full h-full mr-2 object-cover "
                          src={list.dp_main_img}
                        />
                      </div>
                      <div className="flex flex-col mx-2 justify-start w-40">
                        {/* <p className="text-primary-Gray text-xs">
                          {list.dp_art_part?.split(",", 1)} 작품을 만나볼 시간
                        </p> */}
                        <p className="text-primary-Gray text-xs">
                          {list.dp_place}
                          <span>에서 만나보세요!</span>
                        </p>
                        <p className="text-black font-bold text-base my-4 hover:text-primary-YellowGreen overflow-hidden line-clamp-1 flex-wrap">
                          {list.dp_name}
                        </p>

                        <p className="text-primary-Gray text-xs text-end">
                          {dateFunc(list.dp_end)} <span>까지</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* 현재 전시중인 작가 */}
        <div className="h-[190px] bg-[#D9D9D9] my-4">
          <div className="w-11/12 mx-auto">
            <h1 className="w-fit font-extrabold text-2xl px-4 py-2">
              현재 전시중인 작가
            </h1>
            <div className="w-full flex overflow-x-scroll mx-auto my-4 px-2">
              {basicArr &&
                basicArr.map((list: any) => (
                  <div key={list.dp_ex_no}>
                    {list.dp_artist === "" ? null : (
                      <div className="w-fit flex flex-col justify-center text-center mr-4">
                        <div className="w-[72px] h-[72px] rounded-full bg-white border-black border-2 shadow-md">
                          <img
                            className="w-[70px] h-[70px]"
                            src={loadImg.Menu_User}
                          />
                        </div>
                        <ArtistName>{list.dp_artist?.split(",", 1)}</ArtistName>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
          <div className="overflow-inherit">
            {selectedArtwork && (
              <ArtworkModal
                isOpen={true}
                closeModal={closeModal}
                artworkInfo={selectedArtwork}
                currentUser={currentUser}
                CloudInfo={MyArtworkInfo}
              />
            )}
          </div>
        </div>
      </>

      <MenuFooter />
    </div>
  );
}

const Tag = tw.p`
  text-xs text-primary-YellowGreen font-semibold
  border-primary-YellowGreen border-2 bg-white rounded-[14px]
  w-fit h-fit py-1 px-2 m-1
`;

const ArtistName = tw.p`
  text-sm w-[50px] h-[20px] mx-auto my-2 text-center
  overflow-hidden
`;

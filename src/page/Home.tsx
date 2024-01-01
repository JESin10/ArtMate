/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Carousel from "../modules/Carousel";
import { loadImg, BannerZip } from "../assets/images";
import RecommendSlider from "../component/RecommendSlider";
import SearchBar from "../modules/SearchBar";
// import { useQuery } from "react-query";
import { MainPage } from "../api/Gallery_OpenApi";
import tw from "tailwind-styled-components";
import { ArtworkInfo } from "./Artwork";
import { useAuth } from "./context/AuthContext";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { v4 as uidv } from "uuid";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ArtworkModal from "../component/ArtworkModal";
import MenuFooter from "../component/MenuFooter";

export interface UserInfo {
  userId: string;
  uid: string;
  name: string;
  profileURL: string;
  email: string;
  access_token?: string;
}

export interface LatestArtworkInfo {
  DP_END: Date;
  DP_MAIN_IMG: string;
  DP_NAME: string;
  DP_START: Date;
  DP_ARTIST: string;
  DP_EX_NO: number;
  DP_ART_PART: string;
}

export default function Home() {
  const [baseArray, setBaseArray] = useState<LatestArtworkInfo[]>([]);
  const [latestArray, setLatestArray] = useState<ArtworkInfo[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkInfo | null>(
    null
  );
  const { currentUser } = useAuth();
  // const [getToken, setGetToken] = useState();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const LoginUserUid = uidv();
  const listRef = collection(db, `userInfo/${currentUser?.uid}/ArtworkInfo`);
  const MyArtworkInfo = useCollectionData(listRef)[0];

  // console.log(MyArtworkInfo);
  // console.log(selectedArtwork);

  const fetchData = async () => {
    const response = await MainPage(1, 10);
    setBaseArray(response.ListExhibitionOfSeoulMOAInfo.row);
    setLatestArray([...response.ListExhibitionOfSeoulMOAInfo.row].reverse());
    return response;
  };

  const UserSaving = async () => {
    try {
      if (currentUser && userInfo) {
        const docRef = await setDoc(
          doc(db, `userInfo/${currentUser?.uid}/UserInfo`, currentUser?.email),
          {
            Uid: currentUser?.uid,
            userId: LoginUserUid,
            Email: userInfo.email,
            NickName: userInfo.name,
            ProfileURL: userInfo.profileURL,
            FollowerCnt: 0,
            FollowingCnt: 0,
            ReviewList: [],
            LikePostList: [],
            SavePostList: [],
          }
        );
        console.log("Save userInfo Successfully!");
        return docRef;
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    if (currentUser) {
      setUserInfo({
        userId: LoginUserUid,
        uid: currentUser.uid,
        name: currentUser.displayName,
        profileURL: currentUser.photoURL,
        email: currentUser.email,
      });
    }
    UserSaving();
  }, []);

  //Modal
  const openModal = (artwork: ArtworkInfo) => {
    setSelectedArtwork(artwork);
  };

  const closeModal = () => {
    setSelectedArtwork(null);
  };

  // function parseAndStyleInfo(info: string) {
  //   const styledInfo = info.replace(/\[([^\]]+)\]/g, (match, content) => {
  //     return `<span style="font-weight: bold;">${content}</span>`;
  //   });
  //   return <div dangerouslySetInnerHTML={{ __html: styledInfo }} />;
  // }

  return (
    <div className="h-fit border-2 ">
      <SearchBar />
      <div className="my-3">
        {/* {BannerZip.map((banner) => ( */}
        <img src={BannerZip[0]} />
        {/* ))} */}
      </div>
      {/* 취향저격 전시 */}
      <div className="w-11/12 mx-auto">
        {currentUser && currentUser.displayName && currentUser?.email ? (
          <h1 className="w-fit text-lg px-4 my-2 flex">
            <p className="mr-2 font-extrabold">{currentUser.displayName}</p>
            님께 추천하는 전시 모음
          </h1>
        ) : (
          <>
            {currentUser &&
            currentUser.displayName === null &&
            currentUser.email ? (
              <h1 className="w-fit text-lg px-4 my-2 flex">
                <p className="mr-2 font-extrabold">
                  {currentUser.email.split("@", 1)[0]}
                </p>
                님께 추천하는 전시 모음
              </h1>
            ) : (
              <h1 className="w-fit font-extrabold text-2xl px-4 my-4">
                지금 떠오르는 전시는?
              </h1>
            )}
          </>
        )}

        <Carousel>
          {baseArray &&
            baseArray.map((list) => (
              <div
                key={list.DP_EX_NO}
                className="h-[500px] object-cover px-2 rounded-xl bg-transparent"
              >
                <div className="w-full h-full rounded-xl border-primary-YellowGreen border-4">
                  <img
                    className="rounded-t-lg h-[75%] w-full object-cover shadow-md object-center"
                    src={list.DP_MAIN_IMG}
                    alt={`list-${list.DP_EX_NO}`}
                  />
                  <div className="w-full h-[25%] rounded-b-lg bg-primary-YellowGreen  border-primary-YellowGreen border-t-4 flex flex-col">
                    <div className="h-fit flex flex-wrap">
                      {list.DP_ART_PART === "" ? (
                        <>
                          <Tag>#최신전시</Tag>
                          <Tag>#NEW</Tag>
                        </>
                      ) : (
                        <>
                          {list.DP_ART_PART.split(",").map((tag) => (
                            <Tag key={tag}>#{tag}</Tag>
                          ))}
                        </>
                      )}
                    </div>
                    <div className="p-2 text-xl font-extrabold text-white my-auto flex items-center overflow-hidden">
                      {list.DP_NAME}
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
        <div className="w-11/12 mx-auto overflow-hidden line-clamp-1">
          <h1 className="w-fit font-extrabold text-2xl px-4 my-2">
            종료예정 전시 모음
          </h1>
          <div className="overflow-scroll w-full">
            {latestArray &&
              latestArray.map((list: ArtworkInfo) =>
                list.DP_END > list.DP_DATE ? (
                  <div className="w-11/12 mx-auto" key={list.DP_EX_NO}>
                    <div
                      onClick={() => openModal(list)}
                      className="flex py-2 hover:cursor-pointer"
                    >
                      <div className="w-[130px] h-[90px] bg-white">
                        <img
                          className="w-full h-full mr-2 object-cover"
                          src={list.DP_MAIN_IMG}
                        />
                      </div>
                      <div className="flex flex-col mx-2 justify-start w-40">
                        <p className="text-primary-Gray text-xs">
                          {list.DP_ART_PART.split(",", 1)} 작품을 만나볼 시간
                        </p>
                        <p className="text-black font-bold text-base my-4 hover:text-primary-YellowGreen overflow-hidden line-clamp-1 flex-wrap">
                          {list.DP_NAME}
                        </p>

                        <p className="text-primary-Gray text-xs text-end">
                          {list.DP_END.toString()}까지
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null
              )}
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
            {baseArray &&
              baseArray.map((list) => (
                <div key={list.DP_EX_NO}>
                  {list.DP_ARTIST === "" ? null : (
                    <div className="w-fit flex flex-col justify-center text-center mr-4">
                      <div className="w-[72px] h-[72px] rounded-full bg-white border-black border-2 shadow-md">
                        <img
                          className="w-[70px] h-[70px]"
                          src={loadImg.Menu_User}
                        />
                      </div>
                      <p className="text-sm w-[50px] mx-auto my-2 text-center">
                        {list.DP_ARTIST.split(",", 1)}
                      </p>
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
      <MenuFooter />
    </div>
  );
}

const Tag = tw.p`
  text-xs text-primary-YellowGreen font-semibold
  border-primary-YellowGreen border-2 bg-white rounded-2xl
  w-fit h-fit py-1 px-3 m-1
`;

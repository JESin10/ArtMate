/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Carousel from "../modules/Carousel";
import { loadImg, BannerZip } from "../assets/images";
import RecommendSlider from "../component/RecommendSlider";
import SearchBar from "../modules/SearchBar";
// import { useQuery } from "react-query";
import { MainPage } from "../api/Gallery_OpenApi";
import tw from "tailwind-styled-components";
import { useAuth } from "./context/AuthContext";
import { collection, doc, setDoc } from "firebase/firestore";
import { db, rtd } from "../Firebase";
import { v4 as uidv } from "uuid";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ArtworkModal from "../component/ArtworkModal";
import MenuFooter from "../component/MenuFooter";
import { SeoulArtMuseum_ArtWorkData } from "../api/RTDatabase";
import { ArtworkInfo, LatestArtworkInfo, UserInfo } from "../assets/interface";

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
  const LoginedUserInfoRef = collection(
    db,
    `userInfo/${currentUser?.uid}/UserInfo`
  );
  const LoginedUserInfo = useCollectionData(LoginedUserInfoRef)[0];

  const listRef = collection(db, `userInfo/${currentUser?.uid}/ArtworkInfo`);
  const MyArtworkInfo = useCollectionData(listRef)[0];

  useEffect(() => {
    UserSaving();
    fetchData();
    if (LoginedUserInfo && currentUser?.email !== LoginedUserInfo[0]?.Email) {
      setUserInfo({
        userId: LoginUserUid,
        uid: currentUser.Uid,
        name: currentUser.displayName || "",
        profileURL: currentUser.photoURL || "",
        email: currentUser.email,
      });
    }
    // else {
    //   return;
    // }
  }, [userInfo?.name || userInfo?.profileURL]);

  // console.log(currentUser);
  // console.log(userInfo);

  const fetchData = async () => {
    const response = await SeoulArtMuseum_ArtWorkData();
    console.log(response);
    setBaseArray(response.slice(0, 11));
    setLatestArray([...response].reverse().slice(0, 10));

    return response;
  };

  console.log(latestArray);

  const UserSaving = async () => {
    try {
      if (currentUser && userInfo) {
        if (currentUser.displayName !== userInfo.name) {
          await currentUser.updateProfile({ displayName: userInfo.name });
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
          }
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

  return (
    <div className="h-fit border-2 border-blue-400">
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
            {baseArray &&
              baseArray.map((list) => (
                <div
                  key={list.dp_ex_no}
                  className="h-[500px] object-cover px-2 rounded-xl bg-transparent"
                >
                  <div className="w-full h-full rounded-xl border-primary-YellowGreen bg-primary-YellowGreen border-4">
                    <img
                      className="rounded-t-lg h-[72%] w-full object-cover shadow-md object-center"
                      src={list.dp_main_img}
                      alt={`list-${list.dp_ex_no}`}
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
                      <div className="p-2 text-xl font-extrabold text-white my-auto flex items-center overflow-hidden">
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
          <div className="w-11/12 mx-auto overflow-hidden line-clamp-1">
            <h1 className="w-fit font-extrabold text-2xl px-4 my-2">
              종료예정 전시 모음
            </h1>
            <div className="overflow-scroll w-full">
              {latestArray &&
                latestArray.map((list: ArtworkInfo) =>
                  list.dp_end > list.dp_date ? (
                    <div className="w-11/12 mx-auto" key={list.dp_ex_no}>
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
                          <p className="text-primary-Gray text-xs">
                            {list.dp_art_part?.split(",", 1)} 작품을 만나볼 시간
                          </p>
                          <p className="text-black font-bold text-base my-4 hover:text-primary-YellowGreen overflow-hidden line-clamp-1 flex-wrap">
                            {list.dp_name}
                          </p>

                          <p className="text-primary-Gray text-xs text-end">
                            {list.dp_end.toString()}까지
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
                  <div key={list.dp_ex_no}>
                    {list.dp_artist === "" ? null : (
                      <div className="w-fit flex flex-col justify-center text-center mr-4">
                        <div className="w-[72px] h-[72px] rounded-full bg-white border-black border-2 shadow-md">
                          <img
                            className="w-[70px] h-[70px]"
                            src={loadImg.Menu_User}
                          />
                        </div>
                        <ArtistName>{list.dp_artist.split(",", 1)}</ArtistName>
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

/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Menu_Footer from "../component/Menu_Footer";
import Carousel from "../modules/Carousel";
import { loadImg } from "../assets/images";
import RecommendSlider from "../modules/RecommendSlider";
import Search_Bar from "../component/Search_Bar";
import { useAuth } from "../modules/UserAuth";
import { useQuery } from "react-query";
import { MainPage } from "../api/Gallery_OpenApi";

export interface UserInfo {
  uid: string;
  name: string;
  profileURL: string;
  email: string;
  access_token?: string;
}

export interface LatestArtworkInfo {
  DP_END: Date;
  DP_DATE: Date;
  DP_MAIN_IMG: string;
  DP_NAME: string;
  DP_START: Date;
  DP_ARTIST: string;
}

export default function Home() {
  const example: string[] = [loadImg.EX_image1, loadImg.EX_image2];
  const [baseArray, setBaseArray] = useState<LatestArtworkInfo[]>([]);
  const [latestArray, setLatestArray] = useState<LatestArtworkInfo[]>([]);

  const { currentUser } = useAuth();
  const [getToken, setGetToken] = useState();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const Today = new Date();

  // console.log(currentUser);

  const { data } = useQuery(
    ["DP_EX_NO"],
    async () => {
      const response = await MainPage(1, 10);
      // console.log(response);
      return response;
    },
    {
      onSuccess: (data) => {
        setBaseArray(data.ListExhibitionOfSeoulMOAInfo.row);
        setLatestArray([...baseArray].reverse());
      },
    }
  );

  useEffect(() => {
    if (currentUser) {
      setGetToken(currentUser.accessToken);
      setUserInfo({
        uid: currentUser.uid,
        name: currentUser.reloadUserInfo.displayName,
        profileURL: currentUser.reloadUserInfo.photoUrl,
        email: currentUser.reloadUserInfo.email,
      });
    }
  }, []);

  // console.log(userInfo);

  console.log("baseArray", baseArray);
  // console.log("latestArray", latestArray);

  return (
    <div className="h-fit border-2">
      <Search_Bar />
      <div className="my-3">
        <img src={loadImg.EX_Event_Banner} />
      </div>
      {/* 취향저격 전시 */}
      <div className="border-blue-400 border-2">
        {currentUser ? (
          <h1 className="flex">
            <p className="mx-2 font-extrabold">{currentUser.displayName}</p>님의
            취향저격 전시 모음
          </h1>
        ) : (
          <h1 className="flex">지금 떠오르는 전시는?</h1>
        )}

        <Carousel>
          {example &&
            example.map((image: string, index: number) => (
              <img key={index} src={image} alt={`image-${index}`} />
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
              latestArray.map((list, index) =>
                list.DP_END > list.DP_DATE ? (
                  <div className="w-11/12 mx-auto" key={index}>
                    <div className="flex py-2">
                      <div className="w-[130px] h-[90px] bg-white">
                        <img
                          className="w-full h-full mr-2 object-cover"
                          src={list.DP_MAIN_IMG}
                        />
                      </div>
                      <div className="flex flex-col mx-2 justify-start w-40">
                        <p className="text-primary-Gray text-xs">
                          0월 한달간 진행하는 특별 전시!
                        </p>
                        <p className="text-black font-bold text-base my-2">
                          {list.DP_NAME}
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
          <div className="w-full flex overflow-x-scroll space-x-3 mx-auto my-4 px-2">
            {baseArray &&
              baseArray.map((list, index) => (
                <>
                  {list.DP_ARTIST === "" ? null : (
                    <div
                      key={index}
                      className="w-fit flex flex-col justify-center text-center"
                    >
                      <div className="w-[72px] h-[72px] rounded-full bg-white border-black border-2 shadow-md">
                        <img
                          className="w-[70px] h-[70px]"
                          src={loadImg.Menu_User}
                        />
                      </div>
                      <p className="text-sm w-[50px] mx-auto my-2 text-center overflow-hidden line-clamp-1">
                        {list.DP_ARTIST}
                      </p>
                    </div>
                  )}
                </>
              ))}
          </div>
        </div>
      </div>
      <Menu_Footer />
    </div>
  );
}

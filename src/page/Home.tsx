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
}

export default function Home() {
  const example: string[] = [loadImg.EX_image1, loadImg.EX_image2];
  const [recentArray, setRecentArray] = useState([]);
  const { currentUser } = useAuth();
  const [getToken, setGetToken] = useState();
  const [userInfo, setUserInfo] = useState<UserInfo>();

  // console.log(currentUser);

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

  // console.log(getToken, userInfo);

  const currentURL = window.location.href;
  const url = new URL(currentURL);
  const token = url.hash.split("=")[1].split("&")[0];
  // console.log, alert 창을 통해 어스코드가 잘 추출 되는지 확인하자!
  console.log(token);

  const { data } = useQuery(
    [
      "DP_EX_NO",
      {
        START_INDEX: 1,
        END_INDEX: 10,
      },
    ],
    async () => {
      const response = await MainPage(1, 30);
      return response;
    },
    {
      onSuccess: (data) => {
        setRecentArray(data.ListExhibitionOfSeoulMOAInfo.row);
        // recentArray.sort((a, b) => b - a);
        // console.log(recentArray);

        // const linkArray = GalleryOpenData.map((item: any) => item.HOME_PAGE);
        // setLinkList(linkArray);
      },
    }
  );

  return (
    <div className="h-fit border-red-400 border-2">
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
      <div className="h-[386px] bg-yellow-100 flex flex-col ">
        <h1>종료예정 전시 모음</h1>
        <div className="w-11/12 mx-auto">
          <div className="flex py-2">
            <img
              className="w-[130px] h-[90px] object-cover"
              src={loadImg.EX_image1}
            />
            <div className="flex flex-col mx-1 justify-center">
              <p className="text-primary-Gray text-xs">
                0월 한달간 진행하는 특별 전시!
              </p>
              <p className="text-black font-bold text-base my-2">
                주말마다 찾아오는 특별한가격
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 현재 전시중인 작가 */}
      <div className="h-[174px] bg-blue-100">
        <h1>현재 전시중인 작가</h1>
        <div className="w-fit flex space-x-3 justify-center mx-auto my-4">
          <div className="w-fit flex flex-col justify-center text-center bg-black/30">
            <div className="w-[72px] h-[72px] rounded-full bg-white border-black border-2">
              <img className="w-[70px] h-[70px]" src={loadImg.Menu_User} />
            </div>
            <p className="text-sm w-[72px] text-center">AAA</p>
          </div>
          <div className="w-fit flex flex-col justify-center text-center bg-black/30">
            <div className="w-[72px] h-[72px] rounded-full bg-white border-black border-2">
              <img className="w-[70px] h-[70px]" src={loadImg.Menu_User} />
            </div>
            <p className="text-sm w-[72px] text-center">BBB</p>
          </div>
          <div className="w-fit flex flex-col justify-center text-center bg-black/30">
            <div className="w-[72px] h-[72px] rounded-full bg-white border-black border-2">
              <img className="w-[70px] h-[70px]" src={loadImg.Menu_User} />
            </div>
            <p className="text-sm w-[72px] text-center">CCC</p>
          </div>
          <div className="w-fit flex flex-col justify-center text-center bg-black/30">
            <div className="w-[72px] h-[72px] rounded-full bg-white border-black border-2">
              <img className="w-[70px] h-[70px]" src={loadImg.Menu_User} />
            </div>
            <p className="text-sm w-[72px] text-center">DDD</p>
          </div>
        </div>
      </div>
      <Menu_Footer />
    </div>
  );
}

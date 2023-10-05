/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Menu_Footer from "../component/Menu_Footer";
import Carousel from "../modules/Carousel";
import { loadImg } from "../assets/images";
import RecommendSlider from "../modules/RecommendSlider";
import Search_Bar from "../component/Search_Bar";

export default function Home() {
  const example: string[] = [loadImg.EX_image1, loadImg.EX_image2];
  return (
    <div className="h-fit border-red-400 border-2">
      <Search_Bar />
      <div className="my-3">
        <img src={loadImg.EX_Event_Banner} />
      </div>
      {/* 취향저격 전시 */}
      <div className="border-blue-400 border-2">
        <h1>ㅇㅇ님의 취향저격 전시 모음</h1>
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

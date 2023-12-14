import React from "react";
import { ReactComponent as ReloadIcon } from "../assets/customSvg/reload.svg";
import Search_Bar from "../modules/Search_Bar";
import tw from "tailwind-styled-components";
import { loadImg } from "../assets/images";

export default function Saving() {
  return (
    <>
      <Search_Bar />
      <div className="w-full h-screen flex flex-col items-center bg-black/30 overflow-y-auto pb-[120px]">
        <div className="w-full h-fit">
          <div className="w-11/12 mx-auto bg-white">
            <div className="flex justify-between">
              <h1 className="text-3xl font-extrabold my-4">스크랩북</h1>
              <div className="flex space-x-1">
                <button
                  onClick={() => window.location.reload()}
                  className="cursor-pointe"
                >
                  <Reload />
                </button>
              </div>
            </div>
            <div className="border-primary-YellowGreen border-2 rounded-xl w-full h-[168px]">
              <div className="flex items-center space-x-4 m-4 ">
                <img
                  className="w-32 h-32 rounded-xl"
                  alt="artworkIMG"
                  src={loadImg.EX_image1}
                />
                <div className="w-36 h-5/6 flex flex-col">
                  <div className="flex w-full bg-blue-300 justify-between">
                    <p className="text-lg font-extrabold">제목</p>
                    <button>saving</button>
                  </div>
                  <p className="text-sm text-primary-DarkGray">작가명</p>
                  <p className=" mx-auto my-3 text-xs text-primary-Gray overflow-hidden text-ellipsis break-all line-clamp-3 flex-wrap">
                    말하는 사람은 ‘화자’에 대한 이야기다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Reload = tw(ReloadIcon)`
 w-8 h-auto fill-black
 hover:fill-primary-YellowGreen
 hover:rotate-180 hover:duration-500
`;

import React from "react";
import Search_Bar from "../component/Search_Bar";
import { loadImg } from "../assets/images";

export default function Review() {
  return (
    <>
      <Search_Bar />
      <div className="w-full h-screen flex flex-col items-center bg-black/30 overflow-y-auto pb-[120px]">
        <div className="w-full h-fit">
          <div className="w-11/12 mx-auto bg-white">
            <div className="flex justify-between">
              <h1 className="text-3xl font-extrabold my-2">관람 후기</h1>
              <div className="flex space-x-1">
                <button>
                  <img src={"./icons/Outline/filter.svg"} />
                </button>
                <button>
                  <img src={"./icons/Outline/reload.svg"} />
                </button>
              </div>
            </div>
            <div>
              <div className="border-primary-YellowGreen border-2 rounded-xl w-full h-[450px]">
                <div className="flex items-center space-x-4 m-4">
                  <img
                    alt="profile-img"
                    src={loadImg.Main_Logo}
                    className="w-10 h-10 rounded-full p-[1px] border-primary-Gray border"
                  />
                  <p>닉네임</p>
                </div>
                <img
                  alt="review-img"
                  className="w-11/12 mx-auto h-60 object-cover"
                  src={loadImg.EX_image1}
                />
                <div className="w-5/6 mx-auto my-3 text-sm text-primary-Gray overflow-hidden text-ellipsis break-all line-clamp-3 flex-wrap">
                  말하는 사람은 ‘화자’에 대한 이야기다. 시에는 언제나 말하는
                  사람이 존재하는데, 화자는 시인 자신일 수도 있고 시인이 내세운
                  대리인 혹은 페르소나일 수도 있다. 전시는...
                </div>
                <div className="w-5/6 mx-auto border-t-2 border-black flex space-x-4">
                  <div className="flex space-x-2">
                    <img alt="like-count" src={loadImg.Like_Icon} />
                    <p>좋아요</p>
                  </div>
                  <div className="flex space-x-2">
                    <img alt="commment-count" src={loadImg.Menu_List} />
                    <p>댓글</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

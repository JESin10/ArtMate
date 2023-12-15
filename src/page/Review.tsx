import React, { useState } from "react";
import Search_Bar from "../modules/Search_Bar";
import { loadImg } from "../assets/images";
import { ReactComponent as ReloadIcon } from "../assets/customSvg/reload.svg";
import { ReactComponent as LikeIcon } from "../assets/customSvg/Heart.svg";
import { ReactComponent as AddIcon } from "../assets/customSvg/Adding.svg";

import tw from "tailwind-styled-components";
import Review_Modal, { ReviewInfo } from "../component/Review_Modal";
import { useAuth } from "./context/AuthContext";

export default function Review() {
  const { currentUser } = useAuth();
  const [selectedReview, setSelectedReview] = useState<ReviewInfo | null>(null);
  const [isWriting, setIsWriting] = useState<boolean>(false);

  //Modal
  const openModal = () => {
    // setSelectedReview(review);
    setIsWriting(true);
  };

  const closeModal = () => {
    // setSelectedReview(null);
    setIsWriting(false);
  };

  console.log(isWriting);

  return (
    <>
      <Search_Bar />
      <div className="w-full h-screen flex flex-col items-center overflow-y-auto pb-[120px]">
        <div className="w-full h-fit">
          <div className="w-11/12 mx-auto bg-white">
            <div className="flex justify-between">
              <h1 className="text-3xl font-extrabold my-3">관람 후기</h1>
              <div className="flex space-x-2">
                <button onClick={() => window.location.reload()}>
                  <Reload />
                </button>
                <button>
                  <Adding onClick={openModal} />
                </button>
              </div>
            </div>
            {/* 리뷰카드 */}
            <div className="border-primary-YellowGreen border-2 rounded-xl w-full h-[450px] mt-3">
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
                  <Like />
                  <p>좋아요</p>
                </div>
                <div className="flex space-x-2">
                  <img alt="commment-count" src={loadImg.Menu_List} />
                  <p>댓글</p>
                </div>
              </div>
            </div>
            {isWriting ? (
              <Review_Modal
                isOpen={isWriting}
                closeModal={closeModal}
                currentUser={currentUser}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

const Reload = tw(ReloadIcon)`
  w-7 h-auto fill-black
  hover:fill-primary-YellowGreen
  hover:rotate-180 hover:duration-500
  cursor-pointer
`;

const Adding = tw(AddIcon)`
  w-6 h-auto
  fill-black 
  hover:fill-primary-YellowGreen
  hover:rotate-90 hover:duration-200
  cursor-pointer
`;

const Like = tw(LikeIcon)`
  w-6 h-auto stroke-black 
  hover:fill-red-500
  cursor-pointer
`;

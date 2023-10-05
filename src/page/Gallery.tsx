/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";
import KaKaoMap from "../modules/KaKaoMap";
import { loadImg } from "../assets/images";
import { useNavigate } from "react-router-dom";
import Search_Bar from "../component/Search_Bar";
import tw from "tailwind-styled-components";
import Gallery_Modal from "../component/Gallery_Modal";

export default function Gallery() {
  const navigate = useNavigate();
  const [mapMode, setMapMode] = useState<boolean>(false);

  const MapModeHandler = () => {
    setMapMode(true);
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const galleryInfo = {
    name: "갤러리명",
    address: "상세주소",
    closedDay: "휴관일",
    contact: "123-123-123",
    operation_Hour: "9:00-20:00",
    social_link: [
      "https://www.youtube.com/",
      "https://www.instagram.com/",
      " https://www.naver.com/",
    ],
    desc: "blah blah",
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Search_Bar />
      <div className="w-full h-screen flex flex-col items-center bg-black/30 overflow-y-auto pb-[120px]">
        <div className="w-[350px] h-fit my-4 mx-auto">
          <input
            placeholder="장소, 주소를 검색해보세요"
            className="w-full h-[35px] indent-4 text-sm border-black border-2 rounded-3xl"
          />
        </div>
        <div className="w-full h-fit">
          {/* gallery zip */}
          {mapMode ? (
            <KaKaoMap mapMode={mapMode} setMapMode={setMapMode} />
          ) : (
            <div className="w-11/12 mx-auto ">
              <div className="flex justify-between">
                <h1 className="text-3xl font-extrabold my-2">가까운 전시장</h1>
                <div className="flex space-x-1">
                  <button>
                    <img src={loadImg.Map_current1} />
                  </button>
                  <button onClick={MapModeHandler}>
                    <img src={loadImg.Map_all} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <GalleryContainer onClick={openModal}>
                  <img
                    className="w-36 h-36 rounded-xl mx-2 justify-center shadow-Ver1"
                    alt="gallery"
                    src={loadImg.EX_image3}
                  />
                  <div className="flex flex-col w-full justify-center px-2">
                    <div className="font-extrabold text-lg my-1">갤러리명</div>
                    <div className="text-sm">상세주소</div>
                    <div className="text-sm">휴관일</div>
                    <div className="text-right text-sm">00m</div>
                  </div>
                </GalleryContainer>
                <Gallery_Modal
                  isOpen={isModalOpen}
                  closeModal={closeModal}
                  galleryInfo={galleryInfo}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const GalleryContainer = tw.div`
flex h-fit w-full justify-center
cursor-pointer rounded-lg
hover:bg-primary-YellowGreen/10
`;

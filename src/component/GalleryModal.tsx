// import React, { useEffect } from "react";
import { loadImg } from "../assets/images";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GalleryInfo } from "../page/Gallery";
import tw from "tailwind-styled-components";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  galleryInfo: GalleryInfo;
}

export default function GalleryModal({
  isOpen,
  closeModal,
  galleryInfo,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <GalleryModalDiv>
      <GalleryModalContainer>
        <div className="fixed z-10">
          <button
            className="bg-white my-2 ml-80 justify-center w-8 h-8 rounded-full hover:text-primary-YellowGreen"
            onClick={closeModal}
          >
            <IoIosCloseCircleOutline size="100%" />
          </button>
        </div>
        <img
          alt="example"
          className="w-full h-[350px] object-contain mt-12 bg-white"
          src={loadImg.Gallery_MockUP}
        />
        <div className="px-4">
          <h2 className="text-xl font-bold my-3">{galleryInfo.KOR_NAME}</h2>
          {/* 상세정보 */}
          <div className="space-y-1">
            <div className="flex">
              <GalleryModalLabel>주소 </GalleryModalLabel>
              <GalleryModalContent>{galleryInfo.KOR_ADD}</GalleryModalContent>
            </div>
            <div className="flex">
              <GalleryModalLabel>운영시간 </GalleryModalLabel>
              <GalleryModalContent>10:00-20:00</GalleryModalContent>
            </div>
            <div className="flex">
              <GalleryModalLabel>휴관일 </GalleryModalLabel>
              <GalleryModalContent>매주 월 휴무</GalleryModalContent>
            </div>
            <div className="flex">
              <GalleryModalLabel>전화번호 </GalleryModalLabel>
              <GalleryModalContent>02-0000-0000</GalleryModalContent>
            </div>
            <div className="flex">
              <GalleryModalLabel>홈페이지 </GalleryModalLabel>
              {galleryInfo.HOME_PAGE ? (
                <div className="text-sm flex">
                  <a
                    href={galleryInfo.HOME_PAGE}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="resume-link"
                  >
                    <GalleryModalContent className="hover:text-primary-YellowGreen hover:font-extrabold">
                      홈페이지 방문
                    </GalleryModalContent>
                  </a>
                </div>
              ) : (
                <p className="text-sm flex cursor-not-allowed text-gray-400">
                  홈페이지 방문
                </p>
              )}
            </div>
          </div>
          {/* 갤러리 상세설명 */}
          {/* <p className="text-xs text-primary-Gray my-4 flex">
             {parseAndStyleInfo(galleryInfo.DP_INFO)}
          </p> */}
          {/* 위치 map */}
        </div>
      </GalleryModalContainer>
    </GalleryModalDiv>
  );
}

const GalleryModalDiv = tw.div`
fixed inset-0 flex items-center justify-center z-30
`;

const GalleryModalContainer = tw.div`
w-[370px] h-4/5 pb-[70px]
rounded-t-xl shadow-Ver2 overflow-y-auto
bg-white   
`;

const GalleryModalLabel = tw.p`
text-sm flex w-20 font-bold
`;

const GalleryModalContent = tw.p`
text-sm flex`;

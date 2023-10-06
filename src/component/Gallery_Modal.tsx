import React from "react";
import { loadImg } from "../assets/images";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GalleryInfo } from "../page/Gallery";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  galleryInfo: GalleryInfo;
}

export default function Gallery_Modal({
  isOpen,
  closeModal,
  galleryInfo,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-30  ">
      <div className="bg-blue-200 w-[370px] h-4/5 rounded-t-xl shadow-lg overflow-y-auto pb-[70px]">
        <div className="fixed z-10">
          <button
            className="my-2 ml-80 justify-center w-8 h-8 rounded-full hover:text-primary-YellowGreen"
            onClick={closeModal}
          >
            <IoIosCloseCircleOutline size="100%" />
          </button>
        </div>
        {/* <img
          alt="example"
          className="w-full h-[350px] object-cover mt-12"
          src={galleryInfo.DP_MAIN_IMG}
        /> */}
        <div className="px-4">
          <h2 className="text-xl font-bold my-3">{galleryInfo.KOR_NAME}</h2>
          {/* 상세정보 */}
          <div className="space-y-1">
            <div className="flex">
              <p className="text-sm flex w-20">주소 </p>
              <p className="text-sm flex ">{galleryInfo.KOR_ADD}</p>
            </div>
            {/* <div className="flex">
              <p className="text-sm flex w-20">운영시간 </p>
              <p className="text-sm flex ">{galleryInfo.DP_START}</p>
            </div>
            <div className="flex">
              <p className="text-sm flex w-20">휴관일 </p>
              <p className="text-sm flex ">{galleryInfo.DP_END}</p>
            </div>
            <div className="flex">
              <p className="text-sm flex w-20">전화번호 </p>
              <p className="text-sm flex ">{galleryInfo.DP_ARTIST}</p>
            </div> */}
            <div className="flex">
              <p className="text-sm flex w-20">SNS </p>
              {galleryInfo.HOME_PAGE && (
                <p className="text-sm flex">
                  <a
                    href={galleryInfo.HOME_PAGE}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="resume-link"
                  >
                    <img src={loadImg.Main_Logo} alt="Resume" /> 홈페이지 방문
                  </a>
                </p>
              )}
            </div>
          </div>
          {/* 갤러리 상세설명 */}
          <p className="text-xs text-primary-Gray my-4 flex">
            {/* {parseAndStyleInfo(galleryInfo.DP_INFO)} */}
          </p>
        </div>
      </div>
    </div>
  );
}
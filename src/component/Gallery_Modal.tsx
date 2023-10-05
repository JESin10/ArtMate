import React from "react";
import { loadImg } from "../assets/images";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  galleryInfo: {
    name: string;
    address: string;
    contact: string;
    operation_Hour: string;
    closedDay: string;
    social_link: string[];
    desc: string;
  };
}
export default function Gallery_Modal({
  isOpen,
  closeModal,
  galleryInfo,
}: ModalProps) {
  if (!isOpen) return null;

  console.log(isOpen);
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
        <img
          alt="example"
          className="w-full h-[350px] object-cover mt-12"
          src={loadImg.EX_image1}
        />
        <div className="px-4">
          <h2 className="text-xl font-bold my-3">{galleryInfo.name}</h2>
          {/* 상세정보 */}
          <div className="space-y-1">
            <div className="flex">
              <p className="text-sm flex w-20">주소 </p>
              <p className="text-sm flex ">{galleryInfo.address}</p>
            </div>
            <div className="flex">
              <p className="text-sm flex w-20">운영시간 </p>
              <p className="text-sm flex ">{galleryInfo.operation_Hour}</p>
            </div>
            <div className="flex">
              <p className="text-sm flex w-20">휴관일 </p>
              <p className="text-sm flex ">{galleryInfo.closedDay}</p>
            </div>
            <div className="flex">
              <p className="text-sm flex w-20">전화번호 </p>
              <p className="text-sm flex ">{galleryInfo.contact}</p>
            </div>
            <div className="flex">
              <p className="text-sm flex w-20">SNS </p>
              <p className="text-sm flex">{galleryInfo.social_link[1]}</p>
            </div>
          </div>
          {/* 갤러리 상세설명 */}
          <p className="text-xs text-primary-Gray my-4 flex">
            {galleryInfo.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

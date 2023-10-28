import React from "react";
import { loadImg } from "../assets/images";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ArtworkInfo } from "../page/Artwork";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  artworkInfo: ArtworkInfo;
}

export default function Artwork_Modal({
  isOpen,
  closeModal,
  artworkInfo,
}: ModalProps) {
  if (!isOpen) return null;

  function parseAndStyleInfo(info: string) {
    const styledInfo = info.replace(/\[([^\]]+)\]/g, (match, content) => {
      return `<span style="font-weight: bold;">${content}</span>`;
    });

    return <div dangerouslySetInnerHTML={{ __html: styledInfo }} />;
  }

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
          src={artworkInfo.DP_MAIN_IMG}
        />
        <div className="px-4">
          <h2 className="text-xl font-bold my-3">{artworkInfo.DP_NAME}</h2>
          {/* 상세정보 */}
          <div className="space-y-1">
            <div className="flex">
              <p className="text-sm flex w-20 font-bold">전시장소 </p>
              <p className="text-sm flex ">{artworkInfo.DP_PLACE}</p>
            </div>
            <div className="flex">
              <p className="text-sm flex w-20 font-bold">전시기간 </p>
              <p className="text-sm flex ">
                {artworkInfo.DP_START} ~ {artworkInfo.DP_END}
              </p>
            </div>
            <div className="flex">
              <p className="text-sm flex w-20 font-bold">운영시간</p>
              <div className="">
                <p className="text-sm flex">평일 10:00-20:00</p>
                <p className="text-sm flex">주말 10:00-19:00</p>
              </div>
            </div>
            <div className="flex">
              <p className="text-sm flex w-20 font-bold">작가 </p>
              <p className="text-sm w-fit h-10 flex overflow-hidden text-ellipsis break-all line-clamp-3 flex-wrap">
                {artworkInfo.DP_ARTIST}
              </p>
            </div>
            <div className="flex">
              <p className="text-sm flex w-20 font-bold">HOME </p>
              <p className="text-sm flex">
                <a
                  href={artworkInfo.DP_LNK}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="resume-link"
                >
                  {/* <img src='' alt="Resume" /> */} 홈페이지 방문
                </a>
              </p>
            </div>
          </div>
          {/* 갤러리 상세설명 */}
          <p className="text-xs text-primary-Gray my-4 flex">
            {parseAndStyleInfo(artworkInfo.DP_INFO)}
          </p>
        </div>
      </div>
    </div>
  );
}

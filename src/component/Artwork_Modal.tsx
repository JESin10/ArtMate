// import React from "react";
// import { loadImg } from "../assets/images";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ArtworkInfo } from "../page/Artwork";
import tw from "tailwind-styled-components";
import { ReactComponent as SaveIcon } from "../assets/customSvg/bookmark.svg";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  artworkInfo: ArtworkInfo | null;
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
    <ArtworkModal>
      {artworkInfo && (
        <ArtworkModalContainer>
          <div className="fixed z-10">
            <button
              className="my-2 ml-80 bg-white justify-center w-8 h-8 rounded-full hover:text-primary-YellowGreen"
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
            <div className="flex justify-between">
              <h2 className="text-xl font-bold my-3">{artworkInfo.DP_NAME}</h2>
              <button className=" h-fit my-auto">
                <Saving />
              </button>
            </div>
            {/* 상세정보 */}
            <div className="space-y-1">
              <div className="flex">
                <ArtworkModalLabel>전시장소 </ArtworkModalLabel>
                <ArtworkModalContent>
                  {artworkInfo.DP_PLACE}
                </ArtworkModalContent>
              </div>
              <div className="flex">
                <ArtworkModalLabel>전시기간 </ArtworkModalLabel>
                <ArtworkModalContent>
                  {artworkInfo.DP_START.toString()} ~{" "}
                  {artworkInfo.DP_END.toString()}
                </ArtworkModalContent>
              </div>
              <div className="flex">
                <ArtworkModalLabel>운영시간</ArtworkModalLabel>
                <div className="w-full">
                  <ArtworkModalContent>평일 10:00-20:00</ArtworkModalContent>
                  <ArtworkModalContent>주말 10:00-19:00</ArtworkModalContent>
                </div>
              </div>
              <div className="flex">
                <ArtworkModalLabel>작가 </ArtworkModalLabel>
                {artworkInfo.DP_ARTIST === "" ? (
                  <div className="text-sm  w-full h-fit flex overflow-hidden text-ellipsis break-all line-clamp-1 flex-wrap">
                    unknown
                  </div>
                ) : (
                  <div className="text-sm  w-full h-fit flex overflow-hidden text-ellipsis break-all line-clamp-1 flex-wrap">
                    {artworkInfo.DP_ARTIST}
                  </div>
                )}
              </div>
              <div className="flex">
                <ArtworkModalLabel>HOME </ArtworkModalLabel>
                <div className="flex w-full">
                  {artworkInfo.DP_LNK ? (
                    <a
                      className="text-sm flex"
                      href={artworkInfo.DP_LNK}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="resume-link"
                    >
                      <ArtworkModalContent className="hover:text-primary-YellowGreen hover:font-extrabold">
                        홈페이지 방문
                      </ArtworkModalContent>
                    </a>
                  ) : (
                    <p className="text-sm flex cursor-not-allowed text-gray-400">
                      홈페이지 방문
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* 갤러리 상세설명 */}
            <p className="text-xs text-primary-Gray my-4 flex">
              {parseAndStyleInfo(artworkInfo.DP_INFO)}
            </p>
          </div>
        </ArtworkModalContainer>
      )}
    </ArtworkModal>
  );
}

const ArtworkModal = tw.div`
  fixed inset-0 flex items-center justify-center z-30 
`;

const ArtworkModalContainer = tw.div`
  w-[370px] h-4/5 pb-[70px]
  rounded-t-xl overflow-y-auto 
  bg-white
  shadow-Ver2
`;

const ArtworkModalLabel = tw.p`
  text-sm flex w-24 font-bold
`;

const ArtworkModalContent = tw.p`
  text-sm flex w-full
`;

const Saving = tw(SaveIcon)`
mx-2 w-8 h-8
cursor-pointer 
hover:fill-primary-YellowGreen
active:fill-primary-YellowGreen
`;

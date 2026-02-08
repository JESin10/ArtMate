// import React, { useEffect } from "react";
import { loadImg } from "../assets/images";
import { IoIosCloseCircleOutline } from "react-icons/io";
import tw from "tailwind-styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { GalleryInfo } from "../assets/interface";

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
  const { galleryId } = useParams();

  console.log(galleryInfo);

  // 모달이외 공간 터치시 modal close
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const modalContainer = document.getElementById("GalleryModal");
      if (modalContainer && !modalContainer.contains(event.target as Node)) {
        closeModal();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  const siteThumbnail = (url?: string, w = 600) => {
    if (!url) return null;
    try {
      const u = url.startsWith("http") ? url : `https://${url}`;
      return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(u)}?w=${w}`;
    } catch {
      return null;
    }
  };

  return (
    <GalleryModalDiv>
      {galleryInfo && (
        <GalleryModalContainer id="GalleryModal">
          <div className="fixed z-10">
            <button
              className="bg-white my-2 ml-80 justify-center w-8 h-8 rounded-full hover:text-primary-YellowGreen"
              onClick={closeModal}
            >
              <IoIosCloseCircleOutline size="100%" />
            </button>
          </div>
          {/* <img
            alt="example"
            className="w-full h-[350px] object-contain mt-12 bg-white"
            src={loadImg.Gallery_MockUP}
          /> */}
          <img
            className="w-full h-full mt-12 object-cover justify-center "
            alt="gallery"
            src={
              (galleryInfo as any).dp_main_img ||
              (galleryInfo as any).imgUrl ||
              siteThumbnail(
                (galleryInfo as any).home_page || (galleryInfo as any).placeUrl,
              ) ||
              loadImg.Gallery_MockUP
            }
          />
          <div>
            <h2 className="text-lg font-bold my-8 border-b border-solid border-gray-300 pb-4">
              <p className="px-10">
                {galleryInfo.kor_name} / {galleryInfo.category}
              </p>
            </h2>

            {/* 상세정보 */}
            <div className="space-y-1 px-10">
              <div className="flex">
                <GalleryModalLabel>주소 </GalleryModalLabel>
                <GalleryModalContent>{galleryInfo.kor_add}</GalleryModalContent>
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
                {galleryInfo.home_page ? (
                  <div className="text-sm flex">
                    <a
                      href={galleryInfo.home_page}
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
            {/* <GalleryLocation address={galleryInfo.KOR_ADD} /> */}
          </div>
        </GalleryModalContainer>
      )}
    </GalleryModalDiv>
  );
}

const GalleryModalDiv = tw.div`
  w-mobileWidth mx-auto  bg-black/30
  fixed inset-0 flex items-center justify-center z-30 
  border-yellow-400 border-6 border-dotted
`;

const GalleryModalContainer = tw.div`
  w-[370px] h-4/5 pb-[70px]
  rounded-t-xl overflow-y-auto 
  shadow-Ver2 bg-white 
`;

const GalleryModalLabel = tw.p`
  text-sm flex w-20 font-bold
`;

const GalleryModalContent = tw.p`
  text-sm flex`;

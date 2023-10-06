import React, { useState } from "react";
import { useQuery } from "react-query";
import { SeoulArtMuseum_OpenData } from "../api/Gallery_OpenApi";
import Search_Bar from "../component/Search_Bar";
import tw from "tailwind-styled-components";
import { loadImg } from "../assets/images";
import Artwork_Modal from "../component/Artwork_Modal";

export interface ArtworkInfo {
  DP_ARTIST: string;
  DP_ART_CNT: number;
  DP_ART_PART: string;
  DP_DATE?: string;
  DP_END?: string;
  DP_EVENT?: string | null;
  DP_EX_NO: number;
  DP_HOMEPAGE?: string | null;
  DP_INFO: string;
  DP_LNK: string;
  DP_MAIN_IMG: string;
  DP_NAME: string;
  DP_PLACE: string;
  DP_SEQ?: number;
  DP_SPONSOR: string;
  DP_START?: string;
  DP_SUBNAME?: string | null;
  DP_VIEWPOINT?: string | null;
}

export default function Artwork() {
  const [artworklist, setArtWorkList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data } = useQuery("DP_EX_NO", SeoulArtMuseum_OpenData, {
    onSuccess: (data) => {
      setArtWorkList(data.ListExhibitionOfSeoulMOAInfo.row);
    },
  });

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
          <div className="w-11/12 mx-auto ">
            <div className="flex justify-between">
              <h1 className="text-3xl font-extrabold my-2">작품 정보</h1>
              <div className="flex space-x-1">
                <button>
                  <img src={loadImg.Map_current1} />
                </button>
                <button>
                  <img src={loadImg.Map_all} />
                </button>
              </div>
            </div>
            {artworklist.length > 0 &&
              artworklist.map((list: ArtworkInfo, index: number) => (
                <div className="flex flex-col space-y-2">
                  <GalleryContainer onClick={openModal}>
                    <div className="w-36 h-36 my-2">
                      <img
                        className="w-full h-full object-cover rounded-xl mx-2 justify-center shadow-Ver1"
                        alt="gallery"
                        src={list.DP_MAIN_IMG}
                      />
                    </div>
                    <div className="flex flex-col h-fit my-auto justify-center px-2">
                      <div className="w-40 h-[22px] bg-white font-extrabold text-base overflow-hidden text-ellipsis break-all line-clamp-1 flex-wrap my-1">
                        {list.DP_NAME}
                      </div>
                      <div className="text-sm">{list.DP_PLACE}</div>
                      <div className="text-sm">휴관일</div>
                      <div className="text-right text-sm">00m</div>
                    </div>
                  </GalleryContainer>
                  <Artwork_Modal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    artworkInfo={list}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

const GalleryContainer = tw.div`
  flex h-fit w-full justify-between
  cursor-pointer rounded-lg
  space-x-3
  hover:bg-primary-YellowGreen/10
  `;

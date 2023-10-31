import React, { useState } from "react";
import { useQuery } from "react-query";
import { SeoulArtMuseum_ArtWork_OpenData } from "../api/Gallery_OpenApi";
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
  const [artworkList, setArtWorkList] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkInfo | null>(
    null
  );

  const { data } = useQuery("DP_EX_NO", SeoulArtMuseum_ArtWork_OpenData, {
    onSuccess: (data) => {
      setArtWorkList(data.ListExhibitionOfSeoulMOAInfo.row);
    },
  });
  // console.log(artworkList);

  const openModal = (artwork: ArtworkInfo) => {
    setSelectedArtwork(artwork);
  };

  const closeModal = () => {
    setSelectedArtwork(null);
  };

  return (
    <>
      <Search_Bar />
      <div className="w-full h-screen flex flex-col items-center overflow-y-auto pb-[120px]">
        <div className="w-full h-fit">
          <div className="w-11/12 mx-auto ">
            <div className="flex justify-between">
              <h1 className="text-3xl font-extrabold my-2">작품 정보</h1>
              <div className="flex space-x-1">
                <button>
                  <img src={"./icons/Outline/filter.svg"} />
                </button>
                <button>
                  <img src={"./icons/Outline/reload.svg"} />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap justify-center">
              {artworkList.length > 0 &&
                artworkList.map((list: ArtworkInfo, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col w-fit h-full justify-center mx-auto"
                  >
                    <ArtworkContainer onClick={() => openModal(list)}>
                      <div className="w-36 h-32 my-3">
                        <img
                          className="w-full h-full object-cover rounded-xl justify-center shadow-Ver1"
                          alt="gallery"
                          src={list.DP_MAIN_IMG}
                        />
                      </div>
                      <div className="w-36 h-fit flex flex-col my-auto justify-center">
                        <div className="h-[22px] my-2 font-extrabold text-base overflow-hidden text-ellipsis break-all line-clamp-1 flex-wrap">
                          {list.DP_NAME}
                        </div>
                        <ArtworkDesc>{list.DP_ARTIST}</ArtworkDesc>
                        <ArtworkDesc>{list.DP_ART_PART}</ArtworkDesc>
                      </div>
                    </ArtworkContainer>
                    {selectedArtwork && (
                      <div className="overflow-inherit">
                        <Artwork_Modal
                          isOpen={true}
                          closeModal={closeModal}
                          artworkInfo={selectedArtwork}
                        />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const ArtworkContainer = tw.div`
  flex h-fit w-fit justify-between
  cursor-pointer rounded-lg
  space-y-1 flex-col
  hover:bg-primary-YellowGreen/10
`;

const ArtworkDesc = tw.div`
overflow-hidden flex-wrap
text-xs text-ellipsis break-all line-clamp-1 
`;

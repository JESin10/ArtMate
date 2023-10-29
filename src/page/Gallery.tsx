/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import KaKaoMap from "../modules/KaKaoMap";
import { loadImg } from "../assets/images";
import { useNavigate } from "react-router-dom";
import Search_Bar from "../component/Search_Bar";
import tw from "tailwind-styled-components";
import Gallery_Modal from "../component/Gallery_Modal";
import { useQuery } from "react-query";
import { Seoul_Museum_Gallery_OpenData } from "../api/Gallery_OpenApi";

export interface GalleryInfo {
  CATEGORY: string;
  ENG_NAME: string;
  HOME_PAGE?: string | null;
  KOR_ADD: string;
  KOR_ADD_ROAD: string;
  KOR_GU: string;
  KOR_NAME: string;
  MAIN_KEY: number;
  OPENING_YEAR: number;
  PHONE: string | null;
  ZIP_CODE: number;
}

export default function Gallery() {
  const navigate = useNavigate();
  const [mapMode, setMapMode] = useState<boolean>(false);
  const [GalleryOpenData, setGalleryOpenData] = useState([]);
  // const [linkList, setLinkList] = useState<string[]>([]);
  // const [linkPreviews, setLinkPreviews] = useState<React.ReactNode[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<GalleryInfo | null>(
    null
  );

  const { data } = useQuery("KOR_NAME", Seoul_Museum_Gallery_OpenData, {
    onSuccess: (data) => {
      setGalleryOpenData(data.SebcArtGalleryKor.row);
      // const linkArray = GalleryOpenData.map((item: any) => item.HOME_PAGE);
      // setLinkList(linkArray);
    },
  });
  console.log(GalleryOpenData);
  const MapModeHandler = () => {
    setMapMode(true);
  };

  const openModal = (gallery: GalleryInfo) => {
    setSelectedArtwork(gallery);
  };

  const closeModal = () => {
    setSelectedArtwork(null);
  };

  return (
    <>
      <Search_Bar />
      <GalleryPageContainer>
        <div className="w-[350px] h-fit my-4 mx-auto">
          <LocationSearch placeholder="장소, 주소를 검색해보세요" />
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
              {GalleryOpenData.length > 0 &&
                GalleryOpenData.map((list: GalleryInfo, index: number) => (
                  <div className="flex flex-col space-y-2" key={index}>
                    <GalleryContainer onClick={() => openModal(list)}>
                      <div className="w-36 h-36 my-2 bg-blue-200 rounded-2xl">
                        <GalleryMockupIMG
                          alt="gallery_mockup"
                          src={loadImg.Gallery_MockUP}
                        />
                      </div>
                      <div className="flex flex-col w-40 h-fit my-auto justify-center">
                        <div className=" w-fit h-[22px] font-extrabold text-base overflow-hidden text-ellipsis break-all line-clamp-1 flex-wrap my-1">
                          {list.KOR_NAME}
                        </div>
                        <div className="text-sm">{list.KOR_ADD}</div>
                        <div className="text-sm">{list.KOR_GU}</div>
                        <div className="text-right text-sm">00m</div>
                      </div>
                    </GalleryContainer>
                    {selectedArtwork && (
                      <Gallery_Modal
                        isOpen={true}
                        closeModal={closeModal}
                        galleryInfo={selectedArtwork}
                      />
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </GalleryPageContainer>
    </>
  );
}

const GalleryPageContainer = tw.div`
w-full h-screen pb-[120px]
flex flex-col items-center overflow-y-auto 
`;

const GalleryContainer = tw.div`
flex h-fit w-full justify-center
cursor-pointer rounded-lg
space-x-4
hover:bg-primary-YellowGreen/10
`;

const LocationSearch = tw.input`
w-full h-[35px] 
indent-4 text-sm rounded-3xl outline-none
border-black border-2 
`;

const GalleryMockupIMG = tw.img`
w-full h-full rounded-2xl border-2
shadow-md
`;

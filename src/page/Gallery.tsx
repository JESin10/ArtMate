/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import KaKaoMap from "../modules/KaKaoMap";
import { loadImg } from "../assets/images";
import { useNavigate } from "react-router-dom";
import SearchBar from "../modules/SearchBar";
import tw from "tailwind-styled-components";
import GalleryModal from "../component/GalleryModal";
import { Seoul_Museum_GalleryData } from "../api/RTDatabase";
import { GalleryInfo } from "../assets/interface";
import { Seoul_Museum_Gallery_OpenData } from "../api/Gallery_OpenApi";

export default function Gallery() {
  const navigate = useNavigate();
  const [mapMode, setMapMode] = useState<boolean>(false);
  const [GalleryOpenData, setGalleryOpenData] = useState<any[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<GalleryInfo | null>(
    null,
  );

  const siteThumbnail = (url?: string, w = 600) => {
    if (!url) return null;
    try {
      const u = url.startsWith("http") ? url : `https://${url}`;
      return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(u)}?w=${w}`;
    } catch {
      return null;
    }
  };

  // 페이지 렌딩과 동시에 데이터 가져오기
  // const fetchData = async () => {
  //   const response = await Seoul_Museum_Gallery_OpenData(1, 30);
  //   setGalleryOpenData(response.SebcArtGalleryKor.row);
  //   return response;
  // };
  const fetchData = async () => {
    try {
      const response = await Seoul_Museum_Gallery_OpenData(1, 30);

      if (typeof response === "string" && response?.trim().startsWith("<")) {
        console.log(1);
        const parser = new DOMParser();
        const xml = parser.parseFromString(response, "text/xml");
        const itemNodes = xml.getElementsByTagName("item");
        const arr = Array.from(itemNodes).map((node) => {
          const getText = (tag: string) =>
            node.getElementsByTagName(tag)[0]?.textContent || "";
          return {
            main_key: getText("seq"),
            kor_name: getText("culName"),
            category: getText("culGrpName"),
            phone: getText("culTel"),
            home_page: getText("culHomeUrl"),

            gpsX: getText("gpsX"),
            gpsY: getText("gpsY"),
          } as any;
        });
        setGalleryOpenData(arr as any);
        arr as any;
        return arr;
      }
    } catch (err) {
      console.error("GalleryOpenData error", err);
      setGalleryOpenData([]);
      return [];
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(GalleryOpenData);

  //지도모드
  const MapModeHandler = () => {
    setMapMode(true);
  };

  //Modal
  const openModal = (gallery: GalleryInfo) => {
    setSelectedGallery(gallery);
  };

  const closeModal = () => {
    setSelectedGallery(null);
  };

  return (
    <>
      <SearchBar />
      <GalleryPageContainer>
        <div className="w-[350px] h-fit my-4 mx-auto">
          <LocationSearch placeholder="장소, 주소를 검색해보세요" />
        </div>
        <div className="w-full h-fit">
          {/* gallery zip */}
          {mapMode ? (
            <KaKaoMap mapMode={mapMode} setMapMode={setMapMode} />
          ) : (
            <div className="w-11/12 mx-auto">
              <div className="flex justify-between">
                <h1 className="text-3xl font-extrabold my-2  ml-3">Gallery</h1>
                <div className="flex space-x-2 mx-2">
                  <MapModeBtn>
                    <img src={loadImg.Map_current1} alt="current-location" />
                  </MapModeBtn>
                  <MapModeBtn onClick={MapModeHandler}>
                    <img src={loadImg.Map_all} alt="map-mode" />
                  </MapModeBtn>
                </div>
              </div>
              {GalleryOpenData.length > 0 &&
                GalleryOpenData.map((list: GalleryInfo, index: number) => (
                  <div className="flex flex-col space-y-2" key={index}>
                    <GalleryContainer onClick={() => openModal(list)}>
                      <div className="w-36 h-36 my-2 bg-primary-YellowGreen rounded-2xl">
                        <GalleryMockupIMG
                          alt="gallery_mockup"
                          src={
                            (list as any).dp_main_img ||
                            (list as any).imgUrl ||
                            siteThumbnail(
                              (list as any).home_page || (list as any).placeUrl,
                            ) ||
                            loadImg.Gallery_MockUP
                          }
                        />
                      </div>
                      <div className="flex flex-col w-40 h-fit my-auto justify-center">
                        <div className=" w-fit h-[22px] font-extrabold text-base overflow-hidden text-ellipsis break-all line-clamp-1 flex-wrap my-1">
                          {list.kor_name}
                        </div>
                        <div className="text-sm">{list.category}</div>
                        <div className="text-sm">{list.phone}</div>
                        <div className="text-right text-sm">00m</div>
                      </div>
                    </GalleryContainer>
                  </div>
                ))}
              {selectedGallery && (
                <GalleryModal
                  isOpen={true}
                  closeModal={closeModal}
                  galleryInfo={selectedGallery}
                />
              )}
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

const MapModeBtn = tw.button`
  hover:scale-105 hover:duration-150
`;

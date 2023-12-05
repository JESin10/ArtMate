import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { useQuery } from "react-query";
import { MainPage } from "../api/Gallery_OpenApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RxSlash } from "react-icons/rx";
import { ArtworkInfo } from "../page/Artwork";
import Artwork_Modal from "../component/Artwork_Modal";
import { useAuth } from "../page/context/AuthContext";

interface RecommendArtworkInfo {
  index: number;
  DP_MAIN_IMG: string;
}
export default function RecommendSlider() {
  const [recentArray, setRecentArray] = useState<React.ReactNode[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PerItem = 4;
  const { currentUser } = useAuth();

  const { data } = useQuery(
    [
      "DP_EX_NO",
      {
        START_INDEX: 1,
        END_INDEX: 10,
      },
    ],
    async () => {
      const response = await MainPage(1, 12);
      return response;
    },
    {
      onSuccess: (data) => {
        setRecentArray(data.ListExhibitionOfSeoulMOAInfo.row);
      },
    }
  );

  const startIndex = (currentPage - 1) * PerItem;
  const endIndex = startIndex + PerItem;
  const currentItems = recentArray.slice(startIndex, endIndex);
  const totalPages = Math.ceil(recentArray.length / PerItem);
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkInfo | null>(
    null
  );

  // 이전 페이지로 이동하는 함수
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동하는 함수
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  //Modal
  const openModal = (artwork: ArtworkInfo) => {
    setSelectedArtwork(artwork);
  };

  const closeModal = () => {
    setSelectedArtwork(null);
  };

  return (
    <>
      <RecommendSliderContainer>
        <div className="w-11/12 justify-center mx-auto my-3">
          <h1 className="font-extrabold text-2xl w-fit px-4 my-2">
            금주의 최신 전시 모음
          </h1>
          <ImageContainer>
            <div className="flex flex-col">
              {currentItems.map((data: any, index: number) => (
                <div key={index} onClick={() => openModal(data)}>
                  {index % 4 === 0 && (
                    <RecommendImg_ver1
                      alt={index.toString()}
                      src={data.DP_MAIN_IMG}
                    />
                  )}
                  {index % 4 === 1 && (
                    <RecommendImg_ver2
                      alt={index.toString()}
                      src={data.DP_MAIN_IMG}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              {currentItems.map((data: any, index: number) => (
                <div key={index} onClick={() => openModal(data)}>
                  {index % 4 === 2 && (
                    <RecommendImg_ver2
                      alt={index.toString()}
                      src={data.DP_MAIN_IMG}
                    />
                  )}
                  {index % 4 === 3 && (
                    <RecommendImg_ver1
                      alt={index.toString()}
                      src={data.DP_MAIN_IMG}
                    />
                  )}
                </div>
              ))}
            </div>
          </ImageContainer>

          <div className="w-fit mx-auto text-center flex ">
            <PageBtn onClick={goToPrevPage} disabled={currentPage === 1}>
              <FaChevronLeft />
            </PageBtn>
            <div className="flex justify-center items-center mx-auto space-x-1">
              <p className="font-bold">{currentPage}</p>
              <RxSlash />
              <p className="font-bold text-primary-Gray">{totalPages}</p>
            </div>
            <PageBtn
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </PageBtn>
          </div>
        </div>
      </RecommendSliderContainer>
      {selectedArtwork && (
        <div className="overflow-inherit">
          <Artwork_Modal
            isOpen={true}
            closeModal={closeModal}
            artworkInfo={selectedArtwork}
            currentUser={currentUser}
          />
        </div>
      )}
    </>
  );
}

const RecommendSliderContainer = tw.div`
w-full h-[520px] mx-auto
justify-center items-center cursor-pointer
`;

const ImageContainer = tw.div`
w-full h-fit flex
justify-center items-center
rounded-lg mx-auto mb-4
overflow-hidden
`;

const RecommendImg_ver1 = tw.img`
w-[150px] h-[250px] rounded-xl
object-cover mx-2 my-1
border-primary-Gray/30 border-2
hover:scale-[102%] hover:duration-300
`;

const RecommendImg_ver2 = tw.img`
w-[150px] h-[140px] rounded-xl
object-cover mx-2 my-1
border-primary-Gray/30 border-2
hover:scale-[102%] hover:duration-300
`;

const PageBtn = tw.button`
w-14 p-2 mx-4
justify-center flex items-center 
bg-white rounded-2xl
border-primary-Gray border-solid border-2
`;

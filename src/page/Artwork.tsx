/* eslint-disable react/jsx-pascal-case */
import { useEffect, useState } from "react";
import { SeoulArtMuseum_ArtWork_OpenData } from "../api/Gallery_OpenApi";
import SearchBar from "../modules/SearchBar";
import { ReactComponent as ReloadIcon } from "../assets/customSvg/reload.svg";
import tw from "tailwind-styled-components";
import ArtworkModal from "../component/ArtworkModal";
import { useAuth } from "./context/AuthContext";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../Firebase";

import { collection, doc } from "firebase/firestore";
import FilterModal from "../component/FilterModal";
import { ArtworkInfo } from "../assets/interface";
import { SeoulArtMuseum_ArtWorkData } from "../api/RTDatabase";

export default function Artwork() {
  const [artworkList, setArtWorkList] = useState<Array<ArtworkInfo>>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkInfo | null>(
    null
  );
  const { currentUser } = useAuth();
  const listRef = collection(db, `userInfo/${currentUser?.uid}/ArtworkInfo`);
  // const docRef = doc(listRef, selectedArtwork?.DP_NAME);
  // const MyArtworkInfo = Array(useCollectionData(listRef));
  const MyArtworkInfo = useCollectionData(listRef)[0];
  const [filterMode, setFilterMode] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 페이지 렌딩과 동시에 데이터 가져오기
  // const fetchData = async () => {
  //   const response = await SeoulArtMuseum_ArtWork_OpenData(1, 10);
  //   console.log(response);
  //   setArtWorkList(response.ListExhibitionOfSeoulMOAInfo.row);
  //   return response;
  // };

  const fetchData = async () => {
    const response = await SeoulArtMuseum_ArtWorkData();

    // Get the current date
    const currentDate = new Date();

    // Filter the artworks based on the dp_end date
    const filteredResponse = response.filter((artwork: any) => {
      const endDate = new Date(artwork.dp_end);
      return endDate > currentDate;
    });

    setArtWorkList(response);
    // setLatestArray(filteredResponse);

    return filteredResponse;
  };
  useEffect(() => {
    fetchData();
    // test();
  }, []);

  const handleFilterChange = (filteredData: Array<ArtworkInfo>) => {
    // 여기서 filteredData를 사용하여 원하는 작업 수행
    console.log("filteredData:", filteredData);
    setArtWorkList(filteredData);
  };

  //Modal
  const openModal = (artwork: ArtworkInfo) => {
    setSelectedArtwork(artwork);
  };

  const closeModal = () => {
    setSelectedArtwork(null);
  };

  //Activate Filter
  const IsFilterMode = () => {
    setFilterMode(!filterMode);
    // if (filterMode) {
    //   console.log("FilterMode!");
    //   console.log(filterMode);
    // } else {
    //   console.log(filterMode);
    // }
  };

  return (
    <>
      <SearchBar />
      <div className="w-full h-screen flex flex-col items-center overflow-y-auto pb-[120px]">
        <div className="w-full h-fit">
          <div className="w-11/12 mx-auto ">
            <div className="flex justify-between">
              <h1 className="text-3xl font-extrabold my-2 ml-3">Artwork</h1>
              <div className="flex mx-2 space-x-2 ">
                <div className="h-fit w-fit flex my-auto ">
                  <button className="cursor-pointer" onClick={IsFilterMode}>
                    <img src={"./icons/Outline/filter.svg"} alt="filter" />
                  </button>

                  {filterMode ? (
                    // <FilterModalDiv id="mousedown">
                    <FilterModal
                      isOpen={isOpen}
                      closeModal={IsFilterMode}
                      artworkInfo={selectedArtwork}
                      currentUser={currentUser}
                      onFilterChange={handleFilterChange}
                    />
                  ) : // </FilterModalDiv>
                  null}
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="cursor-pointer"
                >
                  <Reload />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap justify-start">
              {artworkList.length > 0 &&
                artworkList.map((list: ArtworkInfo, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg hover:bg-primary-YellowGreen/10 flex flex-col w-fit pb-2 mb-2 h-full justify-center mx-auto"
                  >
                    <ArtworkContainer onClick={() => openModal(list)}>
                      <div className="w-36 h-32 mb-3">
                        <img
                          className="w-full h-full object-cover rounded-xl justify-center shadow-Ver1"
                          alt="gallery"
                          src={list.dp_main_img}
                        />
                      </div>
                      <div className="w-36 h-fit flex flex-col my-auto justify-center">
                        <div className="h-[22px] mb-2 font-extrabold text-base overflow-hidden text-ellipsis break-all line-clamp-1 flex-wrap">
                          {list.dp_name}
                        </div>
                        {list.dp_artist === "" ? (
                          <ArtworkDesc className="text-primary-Gray">
                            unknown
                          </ArtworkDesc>
                        ) : (
                          <ArtworkDesc>{list.dp_artist}</ArtworkDesc>
                        )}
                        {list.dp_art_part === "" ? (
                          <ArtworkDesc className="text-primary-Gray">
                            etc
                          </ArtworkDesc>
                        ) : (
                          <ArtworkDesc>{list.dp_art_part}</ArtworkDesc>
                        )}
                      </div>
                    </ArtworkContainer>
                  </div>
                ))}

              {/* 1------------ */}
              {selectedArtwork && (
                <ArtworkModal
                  isOpen={true}
                  closeModal={closeModal}
                  artworkInfo={selectedArtwork}
                  currentUser={currentUser}
                  CloudInfo={MyArtworkInfo}
                />
              )}
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
`;

const ArtworkDesc = tw.div`
overflow-hidden flex-wrap
text-xs text-ellipsis break-all line-clamp-1 
`;

const Reload = tw(ReloadIcon)`
 w-6 h-auto fill-black
 hover:fill-primary-YellowGreen
 hover:rotate-180 hover:duration-500
`;

const FilterModalDiv = tw.div`
  w-mobileWidth mx-auto  bg-black/30
  fixed inset-0 flex items-center justify-center z-30 
  border-red-400 border-4 border-dotted
`;

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

export interface ArtworkInfo {
  DP_ARTIST?: string;
  DP_ART_CNT?: number;
  DP_ART_PART: string;
  DP_START: Date;
  DP_END: Date;
  DP_DATE: Date;
  DP_EVENT?: string | null;
  DP_EX_NO?: number;
  DP_HOMEPAGE?: string | null;
  DP_INFO: string;
  DP_LNK?: string;
  DP_MAIN_IMG?: string;
  DP_NAME?: string;
  DP_PLACE?: string;
  DP_SEQ?: number;
  DP_SPONSOR?: string;
  DP_SUBNAME?: string | null;
  DP_VIEWPOINT?: string | null;
  DP_VIEWTIME: string;
}

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
  const [isOpen, setIsOpen] = useState(false);

  // 페이지 렌딩과 동시에 데이터 가져오기
  const fetchData = async () => {
    const response = await SeoulArtMuseum_ArtWork_OpenData(1, 100);
    setArtWorkList(response.ListExhibitionOfSeoulMOAInfo.row);
    return response;
  };
  useEffect(() => {
    fetchData();
    test();
  }, []);

  const test = () => {
    if (artworkList) {
      const movement: Array<string> = artworkList.map((list: any) => list);
      // console.log(movement);
      // 중복된 단어 제거
      const uniqueMovement = Array.from(new Set(movement));

      // 빈 문자열 및 공백 제거하고 새로운 배열 생성
      const filteredMovement = uniqueMovement
        .join(",")
        .split(",")
        .map((word) => word.trim())
        .filter((word) => word !== "");

      // console.log(Array.from(new Set(filteredMovement)));

      return filteredMovement;
    }
  };

  // const { data, isLoading } = useQuery(["DP_EX_NO"], fetchData);

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
              <div className="flex mx-2 space-x-2">
                <div className="h-fit w-fit flex my-auto">
                  <button className="cursor-pointer" onClick={IsFilterMode}>
                    <img src={"./icons/Outline/filter.svg"} alt="filter" />
                  </button>

                  {filterMode ? (
                    // <FilterModalDiv id="mousedown">
                    <FilterModal
                      isOpen={() => setIsOpen(true)}
                      closeModal={IsFilterMode}
                      artworkInfo={selectedArtwork}
                      currentUser={currentUser}
                      selectedKeyword={["aa", "dd"]}
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
                        {list.DP_ARTIST === "" ? (
                          <ArtworkDesc className="text-primary-Gray">
                            unknown
                          </ArtworkDesc>
                        ) : (
                          <ArtworkDesc>{list.DP_ARTIST}</ArtworkDesc>
                        )}
                        {list.DP_ART_PART === "" ? (
                          <ArtworkDesc className="text-primary-Gray">
                            etc
                          </ArtworkDesc>
                        ) : (
                          <ArtworkDesc>{list.DP_ART_PART}</ArtworkDesc>
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
  hover:bg-primary-YellowGreen/10
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

import React, { useState } from "react";
import Search_Bar from "../modules/Search_Bar";
import tw from "tailwind-styled-components";
import Gallery_Modal from "../component/Gallery_Modal";
import { GalleryInfo } from "./Gallery";
import Artwork_Modal from "../component/Artwork_Modal";
import { ArtworkInfo } from "./Artwork";
import { useAuth } from "./context/AuthContext";
import { collection } from "firebase/firestore";
import { db } from "../Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface SearchInfo {
  keyword?: string;
  searchMode?: boolean;
  searchResults?: any;
}

export default function SearchResult({
  keyword,
  searchMode,
  searchResults,
}: SearchInfo) {
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkInfo | null>(
    null
  );
  const { currentUser } = useAuth();
  const listRef = collection(db, `userInfo/${currentUser?.uid}/ArtworkInfo`);
  const MyArtworkInfo = useCollectionData(listRef)[0];

  //Modal
  const openModal = (artwork: ArtworkInfo) => {
    setSelectedArtwork(artwork);
  };

  const closeModal = () => {
    setSelectedArtwork(null);
  };
  return (
    <>
      {/* <Search_Bar /> */}
      <GalleryPageContainer>
        <div className="w-full h-fit">
          {/* gallery zip */}
          {!searchMode ? null : ( // <KaKaoMap mapMode={mapMode} setMapMode={setMapMode} />
            <div className="w-11/12 mx-auto">
              <div className="flex justify-between">
                <h1 className="text-3xl font-extrabold my-4 mx-2">검색 결과</h1>
              </div>
              {searchResults &&
                searchResults.map((list: any, index: number) => (
                  <div className="flex flex-col space-y-2" key={index}>
                    <GalleryContainer onClick={() => openModal(list)}>
                      <div className="w-32 h-24 my-2 bg-primary-YellowGreen rounded-2xl">
                        <GalleryMockupIMG
                          alt="gallery_mockup"
                          src={list.DP_MAIN_IMG}
                        />
                      </div>
                      <div className="flex flex-col w-40 h-fit my-auto justify-center">
                        <div className="flex justify-between w-full h-6 text-center">
                          <div className=" w-3/4 h-6 font-extrabold text-base overflow-hidden text-ellipsis break-all line-clamp-1 flex-wrap">
                            {list.DP_NAME}
                          </div>
                          <div className="text-sm text-right w-1/4">
                            {list.DP_ARTIST}
                          </div>
                        </div>

                        <div className="text-sm">{list.DP_PLACE}</div>
                        <div className="text-xs my-2 text-primary-Gray">
                          {list.DP_END}까지
                        </div>
                        {/* <div className="text-right text-sm">00m</div> */}
                      </div>
                    </GalleryContainer>
                    {selectedArtwork && (
                      <Artwork_Modal
                        isOpen={true}
                        closeModal={closeModal}
                        artworkInfo={selectedArtwork}
                        currentUser={currentUser}
                        CloudInfo={MyArtworkInfo}
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

const GalleryMockupIMG = tw.img`
w-full h-full rounded-2xl border-2
shadow-md
`;

const GalleryContainer = tw.div`
flex h-fit w-full justify-center
cursor-pointer rounded-lg
space-x-4
hover:bg-primary-YellowGreen/10
`;

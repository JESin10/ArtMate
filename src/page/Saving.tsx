import React from "react";
import { ReactComponent as ReloadIcon } from "../assets/customSvg/reload.svg";
import { ReactComponent as BookmarkIcon } from "../assets/customSvg/bookmark.svg";
import SearchBar from "../modules/SearchBar";
import tw from "tailwind-styled-components";
import { useAuth } from "./context/AuthContext";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { FaCircleRight } from "react-icons/fa6";

export default function Saving() {
  const { currentUser } = useAuth();
  const listRef = collection(db, `userInfo/${currentUser?.uid}/ArtworkInfo`);
  const MyArtworkInfo = useCollectionData(listRef)[0];
  const navigate = useNavigate();

  const deleteSavingInfo = async () => {
    try {
      const docRef = doc(listRef, MyArtworkInfo && MyArtworkInfo[0]?.DP_NAME);
      if (docRef) {
        await deleteDoc(docRef);
        console.log(`Document deleted successfully`);
      } else {
        console.error("Document reference not found");
      }
    } catch (error) {
      console.error(`Error deleting document: ${error}`);
    }
  };

  return (
    <>
      <SearchBar />
      <div className="w-full h-screen flex flex-col items-center overflow-y-auto pb-[120px]">
        <div className="w-full h-fit">
          <div className="w-11/12 mx-auto bg-white">
            <div className="flex justify-between">
              <h1 className="text-3xl font-extrabold my-4">Bookmark</h1>
              <div className="flex space-x-1">
                <button
                  onClick={() => window.location.reload()}
                  className="cursor-pointer"
                >
                  <Reload />
                </button>
              </div>
            </div>
            {MyArtworkInfo && MyArtworkInfo.length > 0 ? (
              MyArtworkInfo.map((list: any, index: number) => (
                <div
                  key={index}
                  className="border-primary-YellowGreen border-2 rounded-xl w-full h-[168px] mb-5"
                >
                  <div className="flex items-center space-x-4 m-4 ">
                    <img
                      className="w-32 h-32 rounded-xl"
                      alt="artworkIMG"
                      src={list.DP_MAIN_IMG}
                    />
                    <div className="w-40 h-full flex flex-col">
                      <div className="flex w-full justify-between">
                        <p className="w-32 text-base mr-2 font-extrabold overflow-hidden text-ellipsis break-all line-clamp-3 flex-wrap">
                          {list.DP_NAME}
                        </p>
                        <button className=" h-fit" onClick={deleteSavingInfo}>
                          {list.isSaved ? (
                            <Bookmark className="fill-primary-YellowGreen" />
                          ) : null}
                        </button>
                      </div>

                      <div className="flex">
                        {list.DP_ART_PART === "" ? (
                          <>
                            <Tag>#인기전시</Tag>
                            <Tag>#지금감상</Tag>
                            <Tag>#HOT</Tag>
                          </>
                        ) : (
                          <>
                            {list.DP_ART_PART.split(",").map((tag: string) => (
                              <Tag key={tag}>#{tag}</Tag>
                            ))}
                          </>
                        )}
                      </div>
                      <p className=" text-xs text-primary-Gray text-right">
                        {list.DP_END} 까지
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className=" mx-auto w-3/4 flex flex-col text-center mt-32 font-semibold">
                <p className="text-sm text-primary-DarkGray">
                  관심있는 작품을 저장해보세요!
                </p>
                <GotoReviewBtn onClick={() => navigate("/artwork")}>
                  <p>현재 전시중인 작품 둘러보기</p>
                  <GotoIcon />
                </GotoReviewBtn>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const Reload = tw(ReloadIcon)`
 w-8 h-auto fill-black
 hover:fill-primary-YellowGreen
 hover:rotate-180 hover:duration-500
`;

const Bookmark = tw(BookmarkIcon)`

`;

const Tag = tw.p`
  text-[10px] text-primary-Gray font-semibold
  w-fit h-fit my-3 mr-1
`;

const GotoReviewBtn = tw.button`
p-2 border-none text-base
font-extrabold mt-4 
flex justify-center items-center
hover:text-primary-YellowGreen
hover:underline
space-x-1
`;

const GotoIcon = tw(FaCircleRight)`
h-5 w-5 py-[2px] 
`;

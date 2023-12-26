import React, { useEffect, useState } from "react";
import { ReactComponent as ReloadIcon } from "../assets/customSvg/reload.svg";
import { ReactComponent as BookmarkIcon } from "../assets/customSvg/bookmark.svg";
import Search_Bar from "../modules/Search_Bar";
import tw from "tailwind-styled-components";
import { useAuth } from "./context/AuthContext";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../Firebase";
import { SeoulArtMuseum_ArtWork_OpenData } from "../api/Gallery_OpenApi";
import { ArtworkInfo } from "./Artwork";

export default function Liked() {
  const { currentUser } = useAuth();
  const AllReviewRef = collection(db, `AllReview`);
  const AllReviewInfo = useCollectionData(AllReviewRef)[0];

  const LikedReviewRef = collection(
    db,
    `userInfo/${currentUser?.uid}/MyLikeReviews`
  );
  const LikedReviewInfo = useCollectionData(LikedReviewRef)[0];

  console.log(AllReviewInfo);
  console.log(LikedReviewInfo);

  // const LikedReviews =
  //   LikedReviewInfo &&
  //   LikedReviewInfo.find(
  //     (item: any) =>
  //       item.Review_Uid === AllReviewInfo?.map((list: any) => list.Review_Uid)
  //   );

  const LikedReviews = [];
  if (LikedReviewInfo && AllReviewInfo) {
    for (let m = 0; m < LikedReviewInfo.length; m++) {
      const likedReviewUid = LikedReviewInfo[m].Review_Uid;
      for (let n = 0; n < AllReviewInfo.length; n++) {
        const allReviewUid = AllReviewInfo[n].Review_Uid;
        if (likedReviewUid === allReviewUid) {
          LikedReviews.push(AllReviewInfo[n]);
          break;
        }
      }
    }
  }

  // const deleteSavingInfo = async () => {
  //   try {
  //     const docRef = doc(listRef, MyArtworkInfo && MyArtworkInfo[0]?.DP_NAME);
  //     if (docRef) {
  //       await deleteDoc(docRef);
  //       console.log(`Document deleted successfully`);
  //     } else {
  //       console.error("Document reference not found");
  //     }
  //   } catch (error) {
  //     console.error(`Error deleting document: ${error}`);
  //   }
  // };

  return (
    <>
      <Search_Bar />
      <div className="w-full h-screen flex flex-col items-center overflow-y-auto pb-[120px]">
        <div className="w-full h-fit">
          <div className="w-11/12 mx-auto bg-white">
            <div className="flex justify-between">
              <h1 className="text-3xl font-extrabold my-4">Liked</h1>
              <div className="flex space-x-1">
                <button
                  onClick={() => window.location.reload()}
                  className="cursor-pointer"
                >
                  <Reload />
                </button>
              </div>
            </div>
            {LikedReviews &&
              LikedReviews.map((list: any, index: number) => (
                <div
                  key={index}
                  className="border-primary-YellowGreen border-2 rounded-xl w-full h-[168px] mb-5"
                >
                  <div className="flex items-center space-x-4 m-4 ">
                    <img
                      className="w-32 h-32 rounded-xl"
                      alt="artworkIMG"
                      src={list.Img[0]}
                    />
                    <div className="w-40 h-full flex flex-col">
                      <div className="flex w-full flex-col justify-center">
                        <div className="flex justify-between">
                          <p className="w-24 h-6 text-base font-extrabold overflow-hidden text-ellipsis break-all line-clamp-1 flex-wrap">
                            {list.Title}
                          </p>
                          <p className="text-xs text-primary-Gray my-auto">
                            {list.User_ID.split("@", 1)[0]}님
                          </p>
                        </div>
                        <p className="w-38 text-sm h-20 overflow-hidden text-ellipsis break-all line-clamp-3 flex-wrap">
                          {list.Content}
                        </p>
                      </div>

                      <p className=" text-xs my-2 text-primary-Gray text-right">
                        {list.Visited_Date} 작성
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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

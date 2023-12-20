import React, { useEffect, useState } from "react";
import Search_Bar from "../modules/Search_Bar";
import { loadImg } from "../assets/images";
import { ReactComponent as ReloadIcon } from "../assets/customSvg/reload.svg";
import { ReactComponent as LikeIcon } from "../assets/customSvg/Heart.svg";
import { ReactComponent as AddIcon } from "../assets/customSvg/Adding.svg";

import tw from "tailwind-styled-components";
import Review_Modal, { ReviewInfo } from "../component/Review_Modal";
import { useAuth } from "./context/AuthContext";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ref, listAll, getDownloadURL } from "@firebase/storage";

interface LikedReviewInfo {
  Review_Uid: string;
  Uid?: string;
}

export default function Review() {
  const { currentUser } = useAuth();
  // const [selectedReview, setSelectedReview] = useState<ReviewInfo | null>(null);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const AllReviewRef = collection(db, "AllReview");
  const MyReviewRef = collection(db, `userInfo/${currentUser?.uid}/Reviews`);
  const MyLikeReviewRef = collection(
    db,
    `userInfo/${currentUser?.uid}/MyLikeReviews`
  );

  const AllReviewInfo = useCollectionData(AllReviewRef)[0];
  const MyLikeReviewInfo = useCollectionData(MyLikeReviewRef)[0];
  const ComparedReview =
    MyLikeReviewInfo &&
    Array.isArray(MyLikeReviewInfo) &&
    MyLikeReviewInfo.find(
      (item: any) =>
        item.Review_Uid === AllReviewInfo?.map((list: any) => list.Review_Uid)
    );

  console.log(AllReviewInfo);
  console.log(MyLikeReviewInfo);
  // console.log("likeCount: ", likeCount);
  // console.log("isLike: ", isLike);

  //Modal
  const openModal = () => {
    // setSelectedReview(review);
    setIsWriting(true);
  };

  const closeModal = () => {
    // setSelectedReview(null);
    setIsWriting(false);
  };

  const [image, setImage] = useState<any>("");
  const imageRef = ref(storage, `images`);

  useEffect(() => {
    listAll(imageRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          if (url === image) {
            setImage(url);
          }
        });
      });
    });
  }, []);

  // const DeleteMyLikeReviews = async (id: string) => {
  //   try {
  //     await deleteDoc(
  //       doc(db, `userInfo/${currentUser?.uid}/MyLikeReviews`, id)
  //     );
  //     console.log(`dislike successfully`);
  //   } catch (error) {
  //     console.error(`Error updating document: ${error}`);
  //   }
  // };

  const onLikeCountHandler = async (id: string, like: number) => {
    setLikeCount(likeCount + 1);
    setIsLike(true);
    try {
      await updateDoc(doc(AllReviewRef, id), { Like_Cnt: likeCount + 1 });
      await setDoc(doc(db, `userInfo/${currentUser?.uid}/MyLikeReviews`, id), {
        // Reviewer_Id: AllReview.User_ID,
        Review_Uid: id,
      });
      console.log(`like successfully`);
    } catch (error) {
      console.error(`Error updating document: ${error}`);
    }
  };

  const onDislikeCountHandler = async (id: string, like: number) => {
    setLikeCount(likeCount - 1);
    setIsLike(false);
    try {
      await updateDoc(doc(AllReviewRef, id), { Like_Cnt: likeCount - 1 });
      await deleteDoc(
        doc(db, `userInfo/${currentUser?.uid}/MyLikeReviews`, id)
      );
      console.log(`dislike successfully`);
    } catch (error) {
      console.error(`Error updating document: ${error}`);
    }
  };

  return (
    <>
      <Search_Bar />
      <div className="w-full h-screen flex flex-col items-center overflow-y-auto pb-[120px]">
        <div className="w-full h-fit">
          <div className="w-11/12 mx-auto bg-white">
            <div className="flex justify-between">
              <h1 className="text-3xl font-extrabold my-3">관람 후기</h1>
              <div className="flex space-x-2">
                <button onClick={() => window.location.reload()}>
                  <Reload />
                </button>
                <button>
                  <Adding onClick={openModal} />
                </button>
              </div>
            </div>
            {/* 리뷰카드 */}
            {AllReviewInfo && AllReviewInfo.length > 0 ? (
              AllReviewInfo.map((list: any, index: number) => (
                <div
                  key={index}
                  className="border-primary-YellowGreen border-2 rounded-xl w-full h-[450px] mt-3"
                >
                  <div className="flex items-center space-x-4 m-4">
                    <img
                      alt="profile-img"
                      src={loadImg.Main_Logo}
                      className="w-10 h-10 rounded-full p-[1px] border-primary-Gray border"
                    />
                    <p>{list.User_ID}</p>
                  </div>
                  {/* map돌려서 슬라이더? 작게보기로 수정할것 */}
                  {/* {list.Img.map((img: any, i: number) => (
                    <img
                      key={i}
                      alt="review-img"
                      className="w-11/12 mx-auto h-60 object-cover bg-black/30"
                      src={img}
                    />
                  ))} */}
                  <img
                    alt="review-img"
                    className="w-11/12 mx-auto h-60 object-cover bg-black/30"
                    src={list.Img}
                  />
                  <div className="w-5/6 flex flex-col mx-auto my-3">
                    <div className="font-semibold">{list.Title}</div>
                    <div className="text-sm text-primary-Gray overflow-hidden text-ellipsis break-all line-clamp-3 flex-wrap">
                      {list.Content}
                    </div>
                    <div className="text-xs text-primary-Gray text-right">
                      {list.Visited_Date} 방문
                    </div>
                  </div>
                  <div className="w-5/6 mx-auto border-t-2 border-black flex space-x-4">
                    <div className="flex space-x-2">
                      {isLike ? (
                        <ToDislike
                          key={index}
                          onClick={() =>
                            onDislikeCountHandler(
                              list.Review_Uid,
                              list.Like_Cnt
                            )
                          }
                        />
                      ) : (
                        <ToLike
                          key={index}
                          onClick={() =>
                            onLikeCountHandler(list.Review_Uid, list.Like_Cnt)
                          }
                        />
                      )}

                      {/* {ComparedReview &&
                      (ComparedReview as LikedReviewInfo).Review_Uid ? (
                        <ToDislike
                          key={index}
                          onClick={() =>
                            onDislikeCountHandler(
                              list.Review_Uid,
                              list.Like_Cnt
                            )
                          }
                        />
                      ) : (
                        <ToLike
                          key={index}
                          onClick={() =>
                            onLikeCountHandler(list.Review_Uid, list.Like_Cnt)
                          }
                        />
                      )} */}

                      <p>{list.Like_Cnt} 좋아요</p>
                    </div>
                    <div className="flex space-x-2">
                      <img alt="commment-count" src={loadImg.Menu_List} />
                      <p>댓글</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-5/6 py-48 text-xl text-primary-DarkGray text-center mx-auto">
                <p className="my-2">등록된 리뷰가 없습니다.</p>
                <p className="my-2">첫번째 리뷰를 작성해보세요!</p>
              </div>
            )}
            {isWriting ? (
              <Review_Modal
                isOpen={isWriting}
                closeModal={closeModal}
                currentUser={currentUser}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

const Reload = tw(ReloadIcon)`
  w-7 h-auto fill-black
  hover:fill-primary-YellowGreen
  hover:rotate-180 hover:duration-500
  cursor-pointer
`;

const Adding = tw(AddIcon)`
  w-6 h-auto
  fill-black 
  hover:fill-primary-YellowGreen
  hover:rotate-90 hover:duration-200
  cursor-pointer
`;

const ToDislike = tw(LikeIcon)`
  w-6 h-auto stroke-black 
fill-red-500
hover:fill-white
  cursor-pointer
`;

const ToLike = tw(LikeIcon)`
  w-6 h-auto stroke-black 
fill-white
hover:fill-red-500
  cursor-pointer
`;

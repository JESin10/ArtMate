import React, { useEffect, useState } from "react";
import SearchBar from "../modules/SearchBar";
import { loadImg } from "../assets/images";
import { ReactComponent as ReloadIcon } from "../assets/customSvg/reload.svg";
import { ReactComponent as LikeIcon } from "../assets/customSvg/Heart.svg";
import { ReactComponent as AddIcon } from "../assets/customSvg/Adding.svg";
import { ReactComponent as WriteBtn } from "../assets/customSvg/write.svg";
import { ReactComponent as DeleteBtn } from "../assets/customSvg/delete.svg";
import tw from "tailwind-styled-components";
import ReviewModal from "../component/ReviewModal";
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
import CommentModal from "../component/CommentModal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ReviewInfo } from "../assets/interface";

export default function Review() {
  const { currentUser } = useAuth();
  const [selectedReview, setSelectedReview] = useState<ReviewInfo | null>(null);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const AllReviewRef = collection(db, "AllReview");
  const AllReviewInfo = useCollectionData(AllReviewRef)[0];
  const MyReviewRef = collection(db, `userInfo/${currentUser?.uid}/Reviews`);
  const MyReviewInfo = useCollectionData(MyReviewRef)[0];
  const MyLikeReviewRef = collection(
    db,
    `userInfo/${currentUser?.uid}/MyLikeReviews`
  );
  const MyLikeReviewInfo = useCollectionData(MyLikeReviewRef)[0];

  // console.log(MyReviews);
  // console.log(AllReviewInfo);
  // console.log(MyLikeReviewInfo);
  // console.log("likeCount: ", likeCount);
  // console.log("isLike: ", isLike);

  const ComparedReview =
    MyLikeReviewInfo &&
    Array.isArray(MyLikeReviewInfo) &&
    MyLikeReviewInfo.find(
      (item: any) =>
        item.Review_Uid === AllReviewInfo?.map((list: any) => list.Review_Uid)
    );

  const MyReviews = [];
  if (MyReviewInfo && AllReviewInfo) {
    for (let m = 0; m < MyReviewInfo.length; m++) {
      const myReviewUid = MyReviewInfo[m].Review_Uid;
      for (let n = 0; n < AllReviewInfo.length; n++) {
        const allReviewUid = AllReviewInfo[n].Review_Uid;
        if (myReviewUid === allReviewUid) {
          MyReviews.push(AllReviewInfo[n]);
          break;
        }
      }
    }
  }

  //Modal ON-OFF
  const openModal = () => {
    // setSelectedReview(review);
    if (!currentUser) {
      UserCheckHandler();
    } else {
      setIsWriting(true);
    }
  };

  const CommentModalClose = () => {
    setIsCommentOpen(false);
    setSelectedReview(null);
  };

  const closeModal = () => {
    // setSelectedReview(null);
    setIsWriting(false);
  };

  // console.log(MyLikeReviewInfo);
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

  //My Liked-Review Checker
  const isLiked = (reviewUid: string) => {
    return MyLikeReviewInfo?.some((item) => item.Review_Uid === reviewUid);
  };

  //Like Btn
  const onLikeCountHandler = async (
    id: string,
    like: number,
    title: string
  ) => {
    if (!currentUser) {
      UserCheckHandler();
    } else {
      setLikeCount(like + 1);
      setIsLike(true);
      try {
        await updateDoc(doc(AllReviewRef, id), { Like_Cnt: like + 1 });
        await setDoc(
          doc(db, `userInfo/${currentUser?.uid}/MyLikeReviews`, id),
          {
            // Reviewer_Id: AllReview.User_ID,
            Title: title,
            Review_Uid: id,
          }
        );
        console.log(`like successfully`);
      } catch (error) {
        console.error(`Error updating document: ${error}`);
      }
    }
  };

  //DisLike Btn
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

  //Loggin-User Check
  const UserCheckHandler = () => {
    Swal.fire({
      width: "300px",
      position: "center",
      icon: "warning",
      showCancelButton: true,
      title: "로그인 후 이용가능합니다.",
      html: "로그인을 누르실 경우 로그인페이지로 이동합니다",
      confirmButtonColor: "#608D00", // confrim 버튼 색깔 지정
      cancelButtonColor: "#6F6F6F", // cancel 버튼 색깔 지정
      confirmButtonText: "로그인", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      timer: 30000,
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
      if (result.isDenied) {
        navigate("/review");
      }
    });
  };

  //Comment
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const navigate = useNavigate();
  const onCommentHandler = (review: ReviewInfo) => {
    if (!currentUser) {
      UserCheckHandler();
    } else {
      setIsCommentOpen(true);
      setSelectedReview(review);
    }
  };

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [EditReviewTitle, setEditReviewTitle] = useState<string>("");
  const [EditReviewComment, setEditReviewComment] = useState<string>("");

  //Review Edit-Mode
  const ReivewEditHandler = () => {
    setEditReviewTitle("");
    setEditReviewComment("");
    setIsEditMode(true);
  };

  //Edit Review
  const onEditHandler = async (ReviewId: string) => {
    // if (EditingComment.trim() === "") {
    //   Swal.fire({
    //     width: "300px",
    //     position: "center",
    //     icon: "warning",
    //     showCancelButton: true,
    //     title: "Please fill the blank",
    //     text: "수정할 내용을 입력해주세요!",
    //     confirmButtonColor: "#608D00",
    //     cancelButtonColor: "#6F6F6F",
    //     confirmButtonText: "확인",
    //     timer: 3000,
    //   });
    //   return setIsEditMode(false);
    // } else {
    //   try {
    //     await updateDoc(
    //       doc(db, `AllComment/${ReviewInfo?.Review_Uid}/Comments/${CommentID}`),
    //       { Comment: EditingComment }
    //     );
    //     await updateDoc(
    //       doc(db, `userInfo/${currentUser.uid}/MyComments/${CommentID}`),
    //       { Comment: EditingComment }
    //     );
    //     console.log(`Comment edit successfully`);
    //     return setIsEditMode(false);
    //   } catch (error) {
    //     console.error(`Error Edit-Comment document: ${error}`);
    //   }
    // }
  };

  console.log(AllReviewInfo);
  //Delete Reivew
  const onReviewDeleteHandler = async (ReviewID: string) => {
    Swal.fire({
      width: "300px",
      position: "center",
      icon: "warning",
      showCancelButton: true,
      title: "Delete Comment",
      text: "정말 삭제하시겠습니까?",
      confirmButtonColor: "#d33", // confrim 버튼 색깔 지정
      cancelButtonColor: "#6F6F6F", // cancel 버튼 색깔 지정
      confirmButtonText: "삭제", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      timer: 10000,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "AllReview", ReviewID));
          await deleteDoc(
            doc(db, `userInfo/${currentUser.uid}/Reviews`, ReviewID)
          );
          console.log(`Delete successfully`);
        } catch (error) {
          console.error(`Error Delete document: ${error}`);
        }
      }
    });
  };

  // console.log(AllReviewInfo);

  return (
    <>
      <SearchBar />
      <div className="w-full h-screen flex flex-col items-center overflow-y-auto pb-[120px]">
        <div className="w-full h-fit ">
          <div className="w-11/12 mx-auto">
            <div className="flex justify-between mx-3">
              <h1 className="text-3xl font-extrabold my-3">Review</h1>
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
                  className="border-primary-YellowGreen border-2 rounded-xl w-11/12 mx-auto h-[450px] mt-3"
                >
                  <div className="flex justify-between items-center m-4">
                    <div className="flex items-center space-x-2">
                      <img
                        alt="profile-img"
                        src={loadImg.Main_Logo}
                        className="w-10 h-10 rounded-full p-[1px] border-primary-Gray border"
                      />
                      <p>{list.User_ID}</p>
                    </div>
                    <div>
                      {currentUser && list.User_Uid === currentUser.uid ? (
                        <div className="flex">
                          <button>
                            <ReviewEditBtn />
                          </button>
                          <button
                            onClick={() =>
                              onReviewDeleteHandler(list.Review_Uid)
                            }
                          >
                            <ReviewDeleteBtn />
                          </button>
                        </div>
                      ) : null}
                    </div>
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
                  <div className="w-11/12 mx-auto h-1/2 bg-black/20">
                    <img
                      alt="review-img"
                      className="w-full h-full object-cover mx-auto bg-black/10"
                      src={list.Img[0]}
                    />
                  </div>
                  <div className="w-5/6 flex flex-col mx-auto my-3">
                    <div className="font-semibold">{list.Title}</div>
                    <div className="text-sm text-primary-Gray overflow-hidden text-ellipsis break-all line-clamp-2 flex-wrap">
                      {list.Content}
                    </div>
                    <div className="text-xs text-primary-Gray text-right">
                      {list.Visited_Date} 방문
                    </div>
                  </div>
                  <div className="w-5/6 mx-auto border-t-2 border-black flex space-x-4">
                    <div className="flex space-x-2">
                      {isLiked(list.Review_Uid) ? (
                        <ToDislike
                          onClick={() =>
                            onDislikeCountHandler(
                              list.Review_Uid,
                              list.Like_Cnt
                            )
                          }
                        />
                      ) : (
                        <ToLike
                          onClick={() =>
                            onLikeCountHandler(
                              list.Review_Uid,
                              list.Like_Cnt,
                              list.Title
                            )
                          }
                        />
                      )}
                      <p>{list.Like_Cnt} 좋아요</p>
                    </div>
                    <div
                      className="flex space-x-2 cursor-pointer"
                      onClick={() => onCommentHandler(list)}
                    >
                      <img alt="comment-count" src={loadImg.Menu_List} />
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
              <ReviewModal
                isOpen={isWriting}
                closeModal={closeModal}
                currentUser={currentUser}
              />
            ) : null}

            {isCommentOpen ? (
              <CommentModal
                isOpen={isCommentOpen}
                ReviewInfo={selectedReview}
                closeModal={CommentModalClose}
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

const ReviewEditBtn = tw(WriteBtn)`
  h-fit w-5 fill-black hover:fill-primary-YellowGreen
`;

const ReviewDeleteBtn = tw(DeleteBtn)`
  h-fit w-5 ml-2 fill-black hover:fill-red-600 
`;

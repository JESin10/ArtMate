import React, { useEffect, useRef, useState } from "react";
// import { loadImg } from "../assets/images";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ArtworkInfo } from "../page/Artwork";
import tw from "tailwind-styled-components";
import { ReactComponent as SaveIcon } from "../assets/customSvg/bookmark.svg";
import { db, storage } from "../Firebase";
import { v4 as uidv4 } from "uuid";
import {
  doc,
  setDoc,
  collection,
  deleteDoc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { ReactComponent as AddIcon } from "../assets/customSvg/Adding.svg";
// import { ref } from "@firebase/storage";
import { ref, uploadBytes, listAll, getDownloadURL } from "@firebase/storage";

interface ReviewProps {
  isOpen: boolean;
  closeModal: () => void;
  currentUser: any;
}

export interface ReviewInfo {
  Uid: string;
  User_ID: string;
  Title: string;
  Content: string;
  Img?: string | ArrayBuffer | null;
  Visited_Date?: Date;
  Like_Cnt?: number;
  Comment_Uid?: string;
}

export interface ReviewCommentInfo {
  Uid: string;
  Comment_Uid: string;
  User_ID: string;
  Content: string;
  Updated_Date: Date;
}

export default function Review_Modal({
  isOpen,
  closeModal,
  currentUser,
}: ReviewProps) {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const TitleRef = useRef<HTMLInputElement | null>(null);
  const ContentRef = useRef<HTMLTextAreaElement | null>(null);
  const DateRef = useRef<HTMLInputElement | null>(null);
  // const ReviewList = collection(db, `userInfo/${currentUser?.uid}/Reviews`);
  const AllReviewList = collection(
    db,
    `userInfo/${currentUser?.uid}/AllReview`
  );
  const CommentUid = uidv4();
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);

  if (!isOpen) return null;

  // const ImageUploadHandeler = () => {
  //   if (imageUpload === null) return;

  //   const imageRef = ref(storage, `images/${imageUpload.name}`);
  //   uploadBytes(imageRef, imageUpload).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       setImageList((prev) => [...prev, url]);
  //     });
  //   });
  // };

  //리뷰 작성 폼
  const SubmitReviewHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (TitleRef.current && ContentRef.current) {
        const ReviewList = await setDoc(
          doc(db, `userInfo/${currentUser?.uid}/Reviews`, currentUser.uid),
          {
            Uid: currentUser.uid,
            User_ID: currentUser.email,
            Title: TitleRef.current?.value,
            Content: ContentRef.current?.value,
            // Img?: imageList,
            Visited_Date: DateRef.current?.value,
            Like_Cnt: 0,
            Comment_Uid: CommentUid,
          }
        );
        const ALLReviewList = await setDoc(
          doc(db, "AllReview", currentUser.uid),
          {
            Uid: currentUser.uid,
            User_ID: currentUser.email,
            Title: TitleRef.current?.value,
            Content: ContentRef.current?.value,
            // Img?: imageList as string[],
            Visited_Date: DateRef.current?.value,
            Like_Cnt: 0,
            Comment_Uid: CommentUid,
          }
        );
        if (imageUpload === null) return;

        const imageRef = ref(storage, `images/${imageUpload.name}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImageList((prev) => [...prev, url]);
          });
        });
        TitleRef.current.value = "";
        ContentRef.current.value = "";
      }
      console.log("Successfully upload the review!");
    } catch (err) {
      console.error(err);
    }

    // console.log(TitleRef.current?.value, DateRef.current?.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-30">
      <ModalContainer>
        <CloseBtn onClick={closeModal}>
          <IoIosCloseCircleOutline size="100%" />
        </CloseBtn>
        <div className="w-11/12 h-4/5 flex flex-col py-4 mx-auto bg-black/10">
          <div className="text-2xl font-extrabold">후기 작성</div>
          <form onSubmit={SubmitReviewHandler}>
            <div className="flex space-x-2 my-2">
              <p className="w-20">전시회명</p>
              <input
                type="text"
                ref={TitleRef}
                placeholder="title"
                className="w-2/3 h-8 border-primary-Gray border-2 p-2 rounded-sm"
              />
            </div>
            <div className="flex space-x-2 my-2">
              <p className="w-20">방문 후기</p>
              <textarea
                ref={ContentRef}
                placeholder="content"
                className="w-2/3 h-32 border-primary-Gray border-2 p-2 rounded-sm"
              />
            </div>
            <div className="flex space-x-2 my-2">
              <p className="w-20">방문일자</p>
              <input ref={DateRef} type="date" placeholder="Date" />
            </div>
            <div className="flex space-x-2 my-2">
              <p className="w-20">사진추가</p>
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImageUpload(e.target.files[0]);
                  }
                }}
              />
              {/* <button onClick={ImageUploadHandeler}>
                <p>✔️</p>
              </button> */}
            </div>
            <SubmitBtnContainer>
              <button>제출하기</button>
            </SubmitBtnContainer>
          </form>
        </div>
      </ModalContainer>
    </div>
  );
}

const ModalContainer = tw.div`
  w-[370px] h-4/5 
  pb-[70px] rounded-t-xl overflow-y-auto 
  bg-white border-black border-2
`;

const CloseBtn = tw.button`
  justify-center rounded-full 
  w-8 h-8 my-2 ml-80 bg-white 
  hover:rotate-90 hover:duration-300
  hover:text-red-500
`;

const Adding = tw(AddIcon)`
  w-6 h-auto
  fill-black 
  hover:fill-primary-YellowGreen
  hover:rotate-90 hover:duration-200
  cursor-pointer
`;

const SubmitBtnContainer = tw.div`
  w-20 p-2 mx-auto text-center cursor-pointer font-bold
  border-primary-YellowGreen border-2 rounded-lg bg-white
hover:bg-primary-YellowGreen 
  hover:font-extrabold hover:text-white
`;

import React, { useEffect, useRef, useState } from "react";
// import { loadImg } from "../assets/images";
import { IoIosCloseCircleOutline } from "react-icons/io";
import tw from "tailwind-styled-components";
import { ReactComponent as SaveIcon } from "../assets/customSvg/bookmark.svg";
import { db, storage } from "../Firebase";
import { v4 as uidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { ReactComponent as AddIcon } from "../assets/customSvg/Adding.svg";
// import { ref } from "@firebase/storage";
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { ReviewProps } from "../assets/interface";

export default function ReviewModal({
  isOpen,
  closeModal,
  currentUser,
}: ReviewProps) {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const TitleRef = useRef<HTMLInputElement | null>(null);
  const ContentRef = useRef<HTMLTextAreaElement | null>(null);
  const DateRef = useRef<HTMLInputElement | null>(null);
  const [isDone, setIsDone] = useState<boolean>(false);
  const ImageRef = useRef<HTMLInputElement | null>(null);

  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const [imageURL, setImageURL] = useState<string>("");

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

  // const uploadTask = uploadBytesResumable(imageRef, imageUpload);
  //리뷰 작성 폼
  const SubmitReviewHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const CommentUid = uidv4();
      const ReviewUid = uidv4();
      if (TitleRef.current && ContentRef.current) {
        if (imageUpload !== null) {
          const imageRef = ref(
            storage,
            `ReviewImage/${ReviewUid}/${imageUpload.name}`
          );
          // await uploadBytes(imageRef, imageUpload);

          // UploadTask 객체 생성
          const uploadTask = uploadBytesResumable(imageRef, imageUpload);

          // UploadTask의 state_changed 이벤트 구독하여 업로드 진행률 추적
          uploadTask.on(
            "state_changed",
            (snapshot: any) => {
              // 업로드 진행률 계산하여 설정
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              console.log("Upload is " + progress + "% done");
              // 진행률 상태를 사용할 수 있도록 설정
              if (progress === 100) {
                setIsDone(true);
              }
            },
            (error: any) => {
              // 업로드 도중 오류 발생 시 처리
              console.error(error);
            },
            async () => {
              const imageURL = await getDownloadURL(imageRef);
              setImageList([imageURL]);

              await setDoc(
                doc(db, `userInfo/${currentUser?.uid}/Reviews`, ReviewUid),
                {
                  Review_Uid: ReviewUid,
                  User_Uid: currentUser.uid,
                  User_ID: currentUser.email,
                  Title: TitleRef.current?.value,
                  Content: ContentRef.current?.value,
                  Img: imageList,
                  Visited_Date: DateRef.current?.value,
                  // Like_Cnt: 0,
                  Comment_Uid: CommentUid,
                }
              );
              await setDoc(doc(db, "AllReview", ReviewUid), {
                Review_Uid: ReviewUid,
                User_Uid: currentUser.uid,
                User_ID: currentUser.email,
                Title: TitleRef.current?.value,
                Content: ContentRef.current?.value,
                Img: imageList,
                Visited_Date: DateRef.current?.value,
                Like_Cnt: 0,
                Comment_Uid: CommentUid,
              });
              console.log("saved your Review");
              setIsDone(false);

              // 업로드가 완료되었을 때 처리

              console.log(imageList);
              console.log("Upload completed");
            }
          );
        }
        // const imageURL = await getDownloadURL(imageRef);

        // if (imageUpload === null) return;

        // const imageRef = ref(storage, `images/${imageUpload.name}`);
        // uploadBytes(imageRef, imageUpload).then((snapshot) => {
        //   getDownloadURL(snapshot.ref).then((url) => {
        //     setImageList((prev) => [...prev, url]);
        //     setImageURL(url);
        //   });
        // });

        //업로드 진행률을 모니터링, 업로드 진행률 퍼센트로 상태 지정
        // const task = uploadBytesResumable(storageRef, file);
        // task.on("state_changed", (snapshot) => {
        //   setProgress(
        //     Math.round(
        //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //     )
        //   );
        // });
        TitleRef.current.value = "";
        ContentRef.current.value = "";

        // console.log("Successfully upload the review!");
        // return getDownloadURL(imageRef);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const ImageCancelHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    // setImageList([]);
    if (ImageRef.current) {
      ImageRef.current.value = "";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-30">
      <ModalContainer>
        <CloseBtn onClick={closeModal}>
          <IoIosCloseCircleOutline size="100%" />
        </CloseBtn>
        <div className="w-11/12 h-4/5 flex flex-col py-4 mx-auto ">
          <div className="text-2xl font-extrabold w-fit flex">
            <img
              className="h-8 justify-center mr-2"
              src={"./favicon.ico"}
            ></img>
            MY REVIEW
          </div>
          <form className="my-4" onSubmit={SubmitReviewHandler}>
            <div className="flex space-x-2 my-2">
              <ReviewSub>전시회명</ReviewSub>
              <input
                type="text"
                ref={TitleRef}
                placeholder="title"
                className="w-2/3 h-8 border-primary-Gray border-2 p-2 rounded-sm"
              />
            </div>
            <div className="flex space-x-2 my-2">
              <ReviewSub>방문 후기</ReviewSub>
              <textarea
                ref={ContentRef}
                placeholder="content"
                className="w-2/3 h-56 border-primary-Gray border-2 p-2 rounded-sm"
              />
            </div>
            <div className="flex space-x-2 my-2">
              <ReviewSub>방문일자</ReviewSub>
              <input ref={DateRef} type="date" placeholder="Date" />
            </div>
            <div className="flex space-x-2">
              <ReviewSub>사진추가</ReviewSub>
              <div className="w-2/3 flex justify-between">
                <input
                  type="file"
                  ref={ImageRef}
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setImageUpload(e.target.files[0]);
                    }
                  }}
                />
                <ImageCancelBtn onClick={ImageCancelHandler}>
                  <IoIosCloseCircleOutline size="100%" />
                </ImageCancelBtn>
              </div>
              {/* <button onClick={ImageUploadHandeler}>
                <p>✔️</p>
              </button> */}
            </div>
            <SubmitBtnContainer>
              <button>Post My Review!</button>
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
  w-full p-2 my-8 mx-auto text-center cursor-pointer font-bold
  border-primary-YellowGreen border-2 rounded-lg bg-white
hover:bg-primary-YellowGreen 
  hover:font-extrabold hover:text-white
`;

const ReviewSub = tw.p`
  w-20
`;

const ImageCancelBtn = tw.button`
justify-center rounded-full 
w-8 h-8 ml-2
hover:text-red-500

`;

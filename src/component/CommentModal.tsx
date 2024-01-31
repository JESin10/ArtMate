import React, { ButtonHTMLAttributes, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Swal from "sweetalert2";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { v4 as uidv4 } from "uuid";
import { ReviewInfo } from "./ReviewModal";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface CommentProps {
  isOpen: boolean;
  closeModal: () => void;
  currentUser: any;
  ReviewInfo: ReviewInfo | null;
}

interface UserComment {
  commentId: string;
  name: string;
  comment: string;
  date: string | Date;
}

export default function CommentModal({
  isOpen,
  closeModal,
  currentUser,
  ReviewInfo,
}: CommentProps) {
  const [comment, setComment] = useState<string>("");
  // const CommentRef = useRef<HTMLInputElement | null>(null);
  // const CommentDateRef = useRef<HTMLInputElement | null>(null);
  const CommentId = uidv4();
  const LoginedUserInfoRef = collection(
    db,
    `userInfo/${currentUser?.uid}/UserInfo`
  );
  const LoginedUserInfo = useCollectionData(LoginedUserInfoRef)[0];

  const CommentRef = collection(
    db,
    `AllComment/${ReviewInfo?.Review_Uid}/Comments`
  );
  const CommentList = useCollectionData(CommentRef)[0];
  // console.log(CommentList);

  const userName = (LoginedUserInfo: any) => {
    if (LoginedUserInfo) {
      if (LoginedUserInfo[0].NickName === null || "") {
        console.log(LoginedUserInfo[0].Email);
        return LoginedUserInfo[0].Email;
      } else {
        console.log(LoginedUserInfo[0].NickName);

        return LoginedUserInfo[0].NickName;
      }
    }
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (comment.trim() !== "") {
        onCommentUpdateHandler(comment);
        // console.log("comment:", comment);
        Swal.fire({
          width: "300px",
          position: "center",
          icon: "success",
          titleText: "success written comment!",
          confirmButtonText: "OK",
          confirmButtonColor: "#608D00",
          timer: 3000,
        });
        setComment("");
        console.log("success update comment");
      } else {
        Swal.fire({
          width: "300px",
          position: "center",
          icon: "warning",
          titleText: "comment is empty!",
          confirmButtonText: "OK",
          confirmButtonColor: "#608D00",
          timer: 3000,
        });
      }
    }
  };

  const onCommentUpdateHandler = async (content: string) => {
    setComment(content);
    console.log("content:", content);
    const currentDate = new Date(); // Get the current date and time
    const formattedDate = currentDate.toISOString().split("T")[0]; // Convert to a string

    console.log(formattedDate);
    if (content === undefined || "") {
      console.error("Comment or Comment Date is undefined");
      return;
    }
    await setDoc(doc(db, `userInfo/${currentUser?.uid}/MyReviews`, CommentId), {
      User_Uid: currentUser.uid,
      User_Name: userName(LoginedUserInfo),
      Comment: content,
      Written_Date: formattedDate,
      Comment_ID: CommentId,
    });
    await setDoc(
      doc(db, `AllComment/${ReviewInfo?.Review_Uid}/Comments`, CommentId),
      {
        User_Uid: currentUser.uid,
        User_Name: userName(LoginedUserInfo),
        Comment: content,
        Written_Date: formattedDate,
        Comment_ID: CommentId,
      }
    );
    console.log("comment:", content);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-30">
      <ModalContainer>
        <CloseBtn onClick={closeModal}>
          <IoIosCloseCircleOutline size="100%" />
        </CloseBtn>
        {/* 댓글조회 영역 */}
        <CommentsBox>
          {CommentList &&
            CommentList.map((list: any, index: number) => (
              <div className=" my-auto w-full flex-col h-fit" key={index}>
                <CommentTitle>
                  <div className=" text-sm my-auto text-primary-DarkGray">
                    {list.User_Name}
                  </div>
                  <div className="w-10/12 px-2">{list.Comment}</div>
                </CommentTitle>
                <CommentDate>{list.Written_Date} 작성</CommentDate>
              </div>
            ))}
        </CommentsBox>

        {/* 댓글작성 영역 */}
        <CommentInputBox>
          <CommentInput
            type="text"
            value={comment || ""}
            onKeyUp={onKeyPressHandler}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 달아주세요"
          />
          <button
            onClick={() => onCommentUpdateHandler(comment)}
            className="px-2 hover:text-primary-YellowGreen hover:font-extrabold"
          >
            확인
          </button>
        </CommentInputBox>
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

const CommentInput = tw.input`
w-10/12 h-10 flex mx-auto
outline-none indent-2
`;

const CommentsBox = tw.div`
w-11/12 mx-auto h-4/5 mt-4 overflow-scroll
border-2 border-solid border-blue-400
`;

const CommentTitle = tw.div`
flex px-2 my-2
`;

const CommentDate = tw.p`
text-xs text-right  text-primary-DarkGray
`;

const CommentInputBox = tw.div`
w-11/12 h-fit p-2 
mx-auto flex justify-between
bg-red-100 
`;

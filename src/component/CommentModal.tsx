import React, { useRef, useState } from "react";
import tw from "tailwind-styled-components";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Swal from "sweetalert2";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import { v4 as uidv4 } from "uuid";
import { ReviewInfo } from "./ReviewModal";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ReactComponent as WriteBtn } from "../assets/customSvg/write.svg";
import { ReactComponent as DeleteBtn } from "../assets/customSvg/delete.svg";
import { ReactComponent as CheckBtn } from "../assets/customSvg/check.svg";
import { ReactComponent as CancelBtn } from "../assets/customSvg/cancel.svg";

interface CommentProps {
  isOpen: boolean;
  closeModal: () => void;
  currentUser: any;
  ReviewInfo: ReviewInfo | null;
}

// interface UserComment {
//   commentId: string;
//   name: string;
//   comment: string;
//   date: string | Date;
// }

export default function CommentModal({
  isOpen,
  closeModal,
  currentUser,
  ReviewInfo,
}: CommentProps) {
  const [comment, setComment] = useState<string>("");
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
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [EditingComment, setEditingComment] = useState<string>("");

  //UserNickName Checker
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

  //Comment Writing KeyPress
  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (comment.trim() !== "") {
        onCommentUpdateHandler(comment);
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

  //My Comment Checker
  const isMyComment = (UserUid: string, CommentId: string) => {
    return CommentList?.some((i: any) => UserUid === currentUser.uid);
  };

  //Write Comment
  const onCommentUpdateHandler = async (content: string) => {
    setComment(content);
    const currentDate = new Date(); // Get the current date and time
    const formattedDate = currentDate.toISOString().split("T")[0]; // Convert to a string
    if (content === undefined || "") {
      console.error("Comment or Comment Date is undefined");
      return;
    }
    await setDoc(
      doc(db, `userInfo/${currentUser?.uid}/MyComments`, CommentId),
      {
        User_Uid: currentUser.uid,
        User_Name: userName(LoginedUserInfo),
        Comment: content,
        Written_Date: formattedDate,
        Comment_ID: CommentId,
      }
    );
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
  };

  //Comment Editing KeyPress
  const onEditKeyPressHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
    CommentID: string
  ) => {
    if (e.key === "Enter") {
      onCommentEditHandler(CommentID);
      setIsEditMode(true);
    }
    setEditingComment(e.currentTarget.value);
  };

  //Comment Edit-Mode
  const EditModeHandler = () => {
    setEditingComment("");
    setIsEditMode(true);
  };

  //Edit Comment
  const onCommentEditHandler = async (CommentID: string) => {
    if (EditingComment.trim() === "") {
      Swal.fire({
        width: "300px",
        position: "center",
        icon: "warning",
        showCancelButton: true,
        title: "Please fill the blank",
        text: "수정할 내용을 입력해주세요!",
        confirmButtonColor: "#608D00",
        cancelButtonColor: "#6F6F6F",
        confirmButtonText: "확인",
        timer: 3000,
      });
      return setIsEditMode(false);
    } else {
      try {
        await updateDoc(
          doc(db, `AllComment/${ReviewInfo?.Review_Uid}/Comments/${CommentID}`),
          { Comment: EditingComment }
        );
        await updateDoc(
          doc(db, `userInfo/${currentUser.uid}/MyComments/${CommentID}`),
          { Comment: EditingComment }
        );
        console.log(`Comment edit successfully`);
        return setIsEditMode(false);
      } catch (error) {
        console.error(`Error Edit-Comment document: ${error}`);
      }
    }
  };

  //Delete Comment
  const onCommentDeleteHandler = async (CommentID: string) => {
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
          await deleteDoc(
            doc(db, `AllComment/${ReviewInfo?.Review_Uid}/Comments`, CommentID)
          );
          await deleteDoc(
            doc(db, `userInfo/${currentUser.uid}/MyComments`, CommentID)
          );
          console.log(`Delete successfully`);
        } catch (error) {
          console.error(`Error Delete document: ${error}`);
        }
      }
    });
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
                  {isMyComment(list.User_Uid, list.Comment_ID) ? (
                    <div className=" w-full flex justify-between">
                      {isEditMode ? (
                        <div className="flex justify-between w-full">
                          <input
                            className="w-3/4 outline-none border-b-2 mx-2"
                            placeholder={list.Comment}
                            type="text"
                            onChange={(e) => setEditingComment(e.target.value)}
                            value={EditingComment || ""}
                            onKeyUp={(
                              e: React.KeyboardEvent<HTMLInputElement>
                            ) => onEditKeyPressHandler(e, list.Comment_ID)}
                          />
                          <div className="flex">
                            <button
                              onClick={() =>
                                onCommentEditHandler(list.Comment_ID)
                              }
                            >
                              <EditCheckBtn />
                            </button>
                            <button onClick={() => setIsEditMode(false)}>
                              <EditCancelBtn />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="w-11/12 px-2">{list.Comment}</div>
                          <div className="flex">
                            <button
                              id="Comment-EditButton"
                              onClick={EditModeHandler}
                            >
                              <CommentEditBtn />
                            </button>
                            <button
                              id="Comment-DeleteButton"
                              onClick={() =>
                                onCommentDeleteHandler(list.Comment_ID)
                              }
                            >
                              <CommentDeleteBtn />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="w-10/12 px-2">{list.Comment}</div>
                  )}
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

const CommentEditBtn = tw(WriteBtn)`
  h-fit w-5 fill-black hover:fill-primary-YellowGreen
`;

const CommentDeleteBtn = tw(DeleteBtn)`
  h-fit w-5 ml-2 fill-black hover:fill-red-600 
`;

const EditCheckBtn = tw(CheckBtn)`
  h-fit w-6 ml-2 fill-black hover:fill-primary-YellowGreen
`;

const EditCancelBtn = tw(CancelBtn)`
  h-fit w-6 ml-2 fill-black hover:fill-red-600 
`;

// hover:scale-[120%]

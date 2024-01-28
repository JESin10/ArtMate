import React from "react";
import tw from "tailwind-styled-components";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface CommentProps {
  isOpen: boolean;
  closeModal: () => void;
  currentUser: any;
}

export default function CommentModal({
  isOpen,
  closeModal,
  currentUser,
}: CommentProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-30">
      <ModalContainer>
        <CloseBtn onClick={closeModal}>
          <IoIosCloseCircleOutline size="100%" />
        </CloseBtn>
        <div className="bg-blue-200 w-11/12 mx-auto h-3/4 mt-4 overflow-scroll">
          dd
        </div>
        <CommentInput placeholder="댓글을 달아주세요" />
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
w-11/12 h-10 flex mx-auto my-4
outline-double
`;

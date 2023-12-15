import React, { useState } from "react";
// import { loadImg } from "../assets/images";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ArtworkInfo } from "../page/Artwork";
import tw from "tailwind-styled-components";
import { ReactComponent as SaveIcon } from "../assets/customSvg/bookmark.svg";
import { db } from "../Firebase";
import { doc, setDoc, collection, deleteDoc, getDoc } from "firebase/firestore";

interface ReviewProps {
  isOpen: boolean;
  closeModal: () => void;
  currentUser: any;
}

export interface ReviewInfo {
  Uid: string;
  User_Name: string;
  Title: string;
  Content: string;
  Img?: string | ArrayBuffer | null;
  Visited_Date: Date;
  Like_Cnt: number;
  Comment_Uid: string;
}

export interface ReviewCommentInfo {
  Uid: string;
  Comment_Uid: string;
  User_Name: string;
  Content: string;
  Updated_Date: Date;
}

export default function Review_Modal({
  isOpen,
  closeModal,
  currentUser,
}: ReviewProps) {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const listRef = collection(db, `userInfo/${currentUser?.uid}/ArtworkInfo`);
  // const docRef = doc(listRef, artworkInfo?.DP_NAME);

  if (!isOpen) return null;

  function parseAndStyleInfo(info: string) {
    const styledInfo = info.replace(/\[([^\]]+)\]/g, (match, content) => {
      return `<span style="font-weight: bold;">${content}</span>`;
    });
    return <div dangerouslySetInnerHTML={{ __html: styledInfo }} />;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-30">
      <div className=" w-[370px] h-4/5 pb-[70px] rounded-t-xl overflow-y-auto bg-white  shadow-Ver2">
        <div className="fixed z-10">
          <button
            className="my-2 ml-80 bg-white justify-center w-8 h-8 rounded-full hover:text-primary-YellowGreen"
            onClick={closeModal}
          >
            <IoIosCloseCircleOutline size="100%" />
          </button>
        </div>
        Modal
      </div>
    </div>
  );
}

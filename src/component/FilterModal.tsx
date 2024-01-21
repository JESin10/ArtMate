import React, { useEffect, useRef, useState } from "react";
import { ArtworkInfo } from "../page/Artwork";
import tw from "tailwind-styled-components";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import FilterDropdown from "../modules/FilterDropdown";

interface ModalProps {
  isOpen: any;
  closeModal: () => void;
  selectedKeyword: Array<string>;
  artworkInfo: ArtworkInfo | null;
  currentUser: any;
  // CloudInfo?: Object | null;
}

export interface FilterInfo {
  Uid: string;
  // Artwork_No : number;
  // isSaved: boolean;
  DP_NAME: string;
  DP_EX_NO: number;
  DP_MAIN_IMG: string;
  DP_END: Date;
  DP_ART_PART: string;
}

export default function FilterModal({
  isOpen,
  closeModal,
  selectedKeyword,
  currentUser,
}: // CloudInfo,
ModalProps) {
  const [viewGenre, setViewGenre] = useState(false);
  const [viewAMovement, setViewAMovement] = useState(false);

  // 모달이외 공간 터치시 modal close
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const modalContainer = document.getElementById("FilterModal");

      if (modalContainer && !modalContainer.contains(event.target as Node)) {
        closeModal();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  const FilterActiveHandler = () => {
    closeModal();
  };

  return (
    <FilterModalDiv>
      <FilterModalContainer id="FilterModal">
        <h1 className="font-extrabold text-2xl w-fit my-4 mx-auto">Filter</h1>
        <div className=" w-11/12 flex-col my-4 mx-auto h-fit overflow-scroll">
          <div className="w-full h-fit py-4 border-b-2 border-b-primary-Gray flex flex-col">
            <div
              onClick={() => setViewGenre(!viewGenre)}
              className="flex items-center justify-between px-4 cursor-pointer"
            >
              <h1 className="text-xl font-bold my-2">장르</h1>
              <p>{viewGenre ? <DropUpIcon /> : <DropDownIcon />}</p>
            </div>
            {viewGenre && <FilterDropdown category="Genre" />}
          </div>
          <div className="py-4">
            <div
              onClick={() => setViewAMovement(!viewAMovement)}
              className="flex items-center justify-between px-4 cursor-pointer"
            >
              <h1 className=" text-xl font-bold my-2">사조</h1>
              <p>{viewAMovement ? <DropUpIcon /> : <DropDownIcon />}</p>
            </div>
            {viewAMovement && <FilterDropdown category="ArtMovement" />}
          </div>
        </div>
        <div className="flex w-full">
          <ActiveBtn onClick={FilterActiveHandler}>선택완료</ActiveBtn>
        </div>
      </FilterModalContainer>
    </FilterModalDiv>
  );
}

const FilterModalDiv = tw.div`
  w-mobileWidth mx-auto  bg-black/30
  fixed inset-0 flex items-center justify-center z-30 
  border-red-400 border-4 border-dotted
`;

const FilterModalContainer = tw.div`
  w-[370px] h-4/5 pb-[70px]
  rounded-t-xl overflow-y-auto 
  shadow-Ver2 bg-white 
  border-yellow-400 border-4
`;

const DropDownIcon = tw(RiArrowDropDownLine)`
  w-auto h-6 bg-white 
`;

const DropUpIcon = tw(RiArrowDropUpLine)`
  w-auto h-6 bg-white 
`;

const ActiveBtn = tw.button`
  bg-primary-YellowGreen text-white 
  rounded-3xl px-4 py-2 w-fit mx-auto
  font-base text-lg
  hover:font-bold
`;

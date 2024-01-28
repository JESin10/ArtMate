import React, { useEffect, useRef, useState } from "react";
import { ArtworkInfo } from "../page/Artwork";
import tw from "tailwind-styled-components";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import FilterDropdown from "../modules/FilterDropdown";
import { SearchingInfo } from "../api/Gallery_OpenApi";

interface ModalProps {
  isOpen: any;
  closeModal: () => void;
  // selectedKeyword: any;
  artworkInfo: ArtworkInfo | null;
  currentUser: any;
  // CloudInfo?: Object | null;
  onFilterChange: (filteredData: ArtworkInfo[]) => void; // Add this line
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
  // selectedKeyword,
  currentUser,
  onFilterChange,
}: ModalProps) {
  const [viewGenre, setViewGenre] = useState(false);
  const [viewAMovement, setViewAMovement] = useState(false);
  const [viewAMonth, setViewMonth] = useState(false);

  const [filterValue, setFilterValue] = useState("");
  const [selectedGenreTags, setSelectedGenreTags] = useState<string[]>([]);
  const [selectedMonthTags, setSelectedMonthTags] = useState<string[]>([]);

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

  const FilterActiveHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // setFilterValue(filterValue);
    // onFilterChange(selectedMonthTags);
    // onFilteringHandler(selectedGenreTags);
    closeModal();
  };

  const onFilteringHandler = async (results: any) => {
    try {
      if (onFilterChange) {
        onFilterChange(results);
        // selectedKeyword();
      }
    } catch (err) {
      console.error(err);
    }
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
            {viewGenre && (
              <FilterDropdown
                category="Genre"
                onFilterChange={(setSelectedGenreTags) => {
                  onFilteringHandler(setSelectedGenreTags);
                  // selectedKeyword(selectedGenreTags);
                }}
                tags={[
                  { id: "all", name: "전체" },
                  { id: "painting", name: "회화" },
                  { id: "oilDrawing", name: "유화" },
                  { id: "sculpture", name: "조각" },
                  { id: "installation", name: "설치" },
                  { id: "kinetic", name: "키네틱" },
                  { id: "archive", name: "아카이브" },
                  { id: "newMedia", name: "뉴미디어" },
                  { id: "media", name: "미디어아트" },
                  { id: "3D", name: "입체" },
                  { id: "video", name: "영상" },
                  { id: "sound", name: "사운드" },
                  { id: "animation", name: "애니메이션" },
                  { id: "graphic", name: "그래픽디자인" },
                  { id: "drawing", name: "드로잉" },
                  { id: "picture", name: "사진" },
                  { id: "light", name: "조명" },
                  { id: "perform", name: "퍼포먼스" },
                  { id: "koreanPainting", name: "한국화" },
                  { id: "fiberArt", name: "섬유예술" },
                  { id: "ceramics", name: "도예" },
                  { id: "tapestry", name: "태피스트리" },
                ]}
              />
            )}
          </div>
          <div className="py-4">
            <div
              onClick={() => setViewMonth(!viewAMonth)}
              className="flex items-center justify-between px-4 cursor-pointer"
            >
              <h1 className=" text-xl font-bold my-2">월별</h1>
              <p>{viewAMonth ? <DropUpIcon /> : <DropDownIcon />}</p>
            </div>
            {viewAMonth && (
              <FilterDropdown
                category="Month"
                onFilterChange={(tags) => {
                  setSelectedMonthTags(tags);
                  // selectedKeyword(tags);
                }}
                // onFilterChange={(setSelectedMonthTags) =>
                //   console.log(setSelectedMonthTags)
                // }
                tags={[
                  { id: "Jan", name: "1월" },
                  { id: "Feb", name: "2월" },
                  { id: "March", name: "3월" },
                  { id: "April", name: "4월" },
                  { id: "May", name: "5월" },
                  { id: "June", name: "6월" },
                  { id: "July", name: "7월" },
                  { id: "Aug", name: "8월" },
                  { id: "Seb", name: "9월" },
                  { id: "Oct", name: "10월" },
                  { id: "Nov", name: "11월" },
                  { id: "Dec", name: "12월" },
                ]}
              />
            )}
          </div>
        </div>
        <div className="flex w-full">
          <ActiveBtn value={"Active"} onClick={FilterActiveHandler}>
            선택완료
          </ActiveBtn>
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

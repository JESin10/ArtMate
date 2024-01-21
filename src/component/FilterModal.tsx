import React, { useState } from "react";
// import { loadImg } from "../assets/images";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ArtworkInfo } from "../page/Artwork";
import tw from "tailwind-styled-components";
import { ReactComponent as SaveIcon } from "../assets/customSvg/bookmark.svg";
import { db } from "../Firebase";
import { doc, setDoc, collection, deleteDoc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import FilterDropdown from "../modules/FilterDropdown";

interface ModalProps {
  isOpen: boolean;
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
  // const [isSaved, setIsSaved] = useState<boolean>(false);
  // const listRef = collection(db, `userInfo/${currentUser?.uid}/ArtworkInfo`);
  // const docRef = doc(listRef, artworkInfo?.DP_NAME);
  // const [artworkList] = useCollectionData(listRef);
  // const targetArtwork =
  //   CloudInfo &&
  //   Array.isArray(CloudInfo) &&
  //   CloudInfo.find(
  //     (item: ArtWorkSaveInfo) => item.DP_NAME === artworkInfo?.DP_NAME
  //   );

  const [viewGenre, setViewGenre] = useState(false);
  const [viewAMovement, setViewAMovement] = useState(false);

  if (!isOpen) return null;

  // const ArtWorkSaving = async () => {
  //   const DocSnap = await getDoc(docRef);

  //   if (!DocSnap.data()?.isSaved && artworkInfo?.DP_NAME) {
  //     const ArtworkRef = await setDoc(
  //       doc(
  //         db,
  //         `userInfo/${currentUser?.uid}/ArtworkInfo`,
  //         artworkInfo?.DP_NAME
  //       ),
  //       {
  //         Uid: currentUser.uid,
  //         // Artwork_No : number,
  //         isSaved: true,
  //         DP_NAME: artworkInfo?.DP_NAME,
  //         DP_EX_NO: artworkInfo?.DP_EX_NO,
  //         DP_MAIN_IMG: artworkInfo?.DP_MAIN_IMG,
  //         DP_END: artworkInfo?.DP_END,
  //         DP_ART_PART: artworkInfo?.DP_ART_PART,
  //       }
  //     );
  //     setIsSaved(true);
  //     console.log(`Document saved successfully`);
  //     return ArtworkRef;
  //   } else if ((targetArtwork as ArtWorkSaveInfo).isSaved) {
  //     const docRef = doc(listRef, artworkInfo?.DP_NAME);

  //     if (artworkInfo?.DP_NAME) {
  //       try {
  //         await deleteDoc(docRef);
  //         setIsSaved(false);
  //         console.log(`Document deleted successfully`);
  //       } catch (error) {
  //         console.error(`Error deleting document: ${error}`);
  //       }
  //     }
  //   }
  // };

  function parseAndStyleInfo(info: string) {
    const styledInfo = info.replace(/\[([^\]]+)\]/g, (match, content) => {
      return `<span style="font-weight: bold;">${content}</span>`;
    });
    return <div dangerouslySetInnerHTML={{ __html: styledInfo }} />;
  }

  //Copy
  const handleCopyClipBoard = async (artworkInfo: ArtworkInfo) => {
    const URL = window.location.href;
    // const copiedArtwork = {
    //   Title: `${artworkInfo?.DP_NAME}`,
    //   Artist: `${artworkInfo?.DP_ARTIST}`,
    //   Image: `${artworkInfo?.DP_MAIN_IMG}`,
    //   Place: `${artworkInfo?.DP_PLACE}`,
    //   Due: `${artworkInfo?.DP_START} ~ ${artworkInfo?.DP_END}`,
    //   Site: `${artworkInfo?.DP_LNK}`,
    // };

    try {
      await navigator.clipboard.writeText(URL);
      // window.alert("클립보드에 복사되었습니다");
      Swal.fire({
        width: "300px",
        position: "center",
        icon: "success",
        titleText: "COPY SUCCESS!",
        html: "클립보드에 복사되었습니다.",
        confirmButtonText: "OK",
        confirmButtonColor: "#608D00",
        timer: 300000,
      });
    } catch (err) {
      window.alert("복사에 실패하였습니다. 다시 시도 해주세요");
      console.error(err);
    }
  };

  return (
    <FilterModalDiv>
      <FilterModalContainer>
        <h1 className="font-extrabold text-2xl w-fit my-4 mx-auto">Filter</h1>
        <div className=" w-11/12 flex-col my-4 mx-auto">
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
`;

const DropDownIcon = tw(RiArrowDropDownLine)`
  w-auto h-6 bg-white 
`;

const DropUpIcon = tw(RiArrowDropUpLine)`
  w-auto h-6 bg-white 
`;

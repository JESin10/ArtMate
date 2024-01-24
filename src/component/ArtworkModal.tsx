import React, { useEffect, useState } from "react";
// import { loadImg } from "../assets/images";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ArtworkInfo } from "../page/Artwork";
import tw from "tailwind-styled-components";
import { ReactComponent as SaveIcon } from "../assets/customSvg/bookmark.svg";
import { db } from "../Firebase";
import { doc, setDoc, collection, deleteDoc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  artworkInfo: ArtworkInfo | null;
  currentUser: any;
  CloudInfo?: Object | null;
}

export interface ArtWorkSaveInfo {
  Uid: string;
  // Artwork_No : number;
  isSaved: boolean;
  DP_NAME: string;
  DP_EX_NO: number;
  DP_MAIN_IMG: string;
  DP_END: Date;
  DP_ART_PART: string;
}

export default function ArtworkModal({
  isOpen,
  closeModal,
  artworkInfo,
  currentUser,
  CloudInfo,
}: ModalProps) {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const listRef = collection(db, `userInfo/${currentUser?.uid}/ArtworkInfo`);
  const docRef = doc(listRef, artworkInfo?.DP_NAME);
  // const [artworkList] = useCollectionData(listRef);
  const targetArtwork =
    CloudInfo &&
    Array.isArray(CloudInfo) &&
    CloudInfo.find(
      (item: ArtWorkSaveInfo) => item.DP_NAME === artworkInfo?.DP_NAME
    );

  // 모달이외 공간 터치시 modal close
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const modalContainer = document.getElementById("ArtworkModal");
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

  const ArtWorkSaving = async () => {
    const DocSnap = await getDoc(docRef);

    if (!DocSnap.data()?.isSaved && artworkInfo?.DP_NAME) {
      const ArtworkRef = await setDoc(
        doc(
          db,
          `userInfo/${currentUser?.uid}/ArtworkInfo`,
          artworkInfo?.DP_NAME
        ),
        {
          Uid: currentUser.uid,
          // Artwork_No : number,
          isSaved: true,
          DP_NAME: artworkInfo?.DP_NAME,
          DP_EX_NO: artworkInfo?.DP_EX_NO,
          DP_MAIN_IMG: artworkInfo?.DP_MAIN_IMG,
          DP_END: artworkInfo?.DP_END,
          DP_ART_PART: artworkInfo?.DP_ART_PART,
        }
      );
      setIsSaved(true);
      console.log(`Document saved successfully`);
      return ArtworkRef;
    } else if ((targetArtwork as ArtWorkSaveInfo).isSaved) {
      const docRef = doc(listRef, artworkInfo?.DP_NAME);

      if (artworkInfo?.DP_NAME) {
        try {
          await deleteDoc(docRef);
          setIsSaved(false);
          console.log(`Document deleted successfully`);
        } catch (error) {
          console.error(`Error deleting document: ${error}`);
        }
      }
    }
  };

  // function parseAndStyleInfo(info: string) {
  //   const styledInfo = info.replace(/\[([^\]]+)\]/g, (match, content) => {
  //     return `<span style="font-weight: bold;">${content}</span>`;
  //   });
  //   return <div dangerouslySetInnerHTML={{ __html: styledInfo }} />;
  // }

  function parseAndStyleInfo(info: string) {
    const lines = info.split(/\r\n/);

    const styledLines = lines.map((line, index) => {
      if (line.trim() === "") {
        return null;
      }

      if (line.includes("휴관일")) {
        return (
          <div key={index}>
            <span style={{ color: "red" }}>{line}</span>
          </div>
        );
      }

      return <div key={index}>{line}</div>;
    });

    return <div>{styledLines}</div>;
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
    <ArtworkModalDiv>
      {artworkInfo && (
        <ArtworkModalContainer id="ArtworkModal">
          <div className="fixed z-10">
            <button
              className="my-2 ml-80 bg-white justify-center w-8 h-8 rounded-full hover:text-primary-YellowGreen"
              onClick={closeModal}
            >
              <IoIosCloseCircleOutline size="100%" />
            </button>
          </div>
          <img
            alt="example"
            className="w-full h-[350px] object-cover mt-12"
            src={artworkInfo.DP_MAIN_IMG}
          />
          <div className="px-3">
            <div className="flex justify-between">
              <h2 className="w-3/4 text-xl font-bold my-3">
                {artworkInfo.DP_NAME}
              </h2>
              <div className="h-fit my-auto w-1/4 justify-center flex space-x-3">
                <button
                  onClick={() => handleCopyClipBoard(artworkInfo)}
                  className="h-8 w-auto my-auto"
                >
                  <img
                    className="w-auto h-full"
                    alt="share_icon"
                    src={"./icons/Outline/share.svg"}
                  />
                </button>
                {targetArtwork && (targetArtwork as ArtWorkSaveInfo).isSaved ? (
                  <button className="h-fit w-fit my-auto">
                    <Saving
                      onClick={ArtWorkSaving}
                      style={{ fill: "#608D00" }}
                    />
                  </button>
                ) : (
                  <button className="h-fit w-fit my-auto">
                    <Saving onClick={ArtWorkSaving} style={{ fill: "white" }} />
                  </button>
                )}
              </div>
            </div>
            {/* 상세정보 */}
            <div className="space-y-1">
              <div className="flex">
                <ArtworkModalLabel>전시장소 </ArtworkModalLabel>
                <ArtworkModalContent>
                  {artworkInfo.DP_PLACE}
                </ArtworkModalContent>
              </div>
              <div className="flex">
                <ArtworkModalLabel>전시기간 </ArtworkModalLabel>
                <ArtworkModalContent>
                  {artworkInfo.DP_START.toString()} ~{" "}
                  {artworkInfo.DP_END.toString()}
                </ArtworkModalContent>
              </div>
              <div className="flex">
                <ArtworkModalLabel>운영시간</ArtworkModalLabel>
                <div className="w-full">
                  {artworkInfo.DP_VIEWTIME === "" ? (
                    <>
                      <ArtworkModalContent>
                        평일 10:00-20:00
                      </ArtworkModalContent>
                      <ArtworkModalContent>
                        주말 10:00-19:00
                      </ArtworkModalContent>
                    </>
                  ) : (
                    <ArtworkModalContent>
                      {parseAndStyleInfo(artworkInfo.DP_VIEWTIME)}
                    </ArtworkModalContent>
                  )}
                </div>
              </div>
              <div className="flex">
                <ArtworkModalLabel>작가 </ArtworkModalLabel>
                {artworkInfo.DP_ARTIST === "" ? (
                  <div className="text-sm  w-full h-fit flex overflow-hidden text-ellipsis break-all line-clamp-1 flex-wrap">
                    unknown
                  </div>
                ) : (
                  <div className="text-sm  w-full h-fit flex overflow-hidden text-ellipsis break-all line-clamp-1 flex-wrap">
                    {artworkInfo.DP_ARTIST}
                  </div>
                )}
              </div>
              <div className="flex">
                <ArtworkModalLabel>HOME </ArtworkModalLabel>
                <div className="flex w-full">
                  {artworkInfo.DP_LNK ? (
                    <a
                      className="text-sm flex"
                      href={artworkInfo.DP_LNK}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="resume-link"
                    >
                      <ArtworkModalContent className="hover:text-primary-YellowGreen hover:font-extrabold">
                        홈페이지 방문
                      </ArtworkModalContent>
                    </a>
                  ) : (
                    <p className="text-sm flex cursor-not-allowed text-gray-400">
                      홈페이지 방문
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* 갤러리 상세설명 */}
            <div className="text-xs text-primary-Gray my-4 flex">
              {parseAndStyleInfo(artworkInfo.DP_INFO)}
            </div>
          </div>
        </ArtworkModalContainer>
      )}
    </ArtworkModalDiv>
  );
}

const ArtworkModalDiv = tw.div`
  w-mobileWidth mx-auto  bg-black/30
  fixed inset-0 flex items-center justify-center z-30 
  border-red-400 border-4 border-dotted
`;

const ArtworkModalContainer = tw.div`
  w-[370px] h-4/5 pb-[70px]
  rounded-t-xl overflow-y-auto 
  shadow-Ver2 bg-white 
`;

const ArtworkModalLabel = tw.p`
  text-sm flex w-24 font-bold
`;

const ArtworkModalContent = tw.p`
  text-sm flex w-full
`;

const Saving = tw(SaveIcon)`
  w-8 h-8 space-x-2
  cursor-pointer 
`;

// hover:fill-primary-YellowGreen
// active:fill-primary-YellowGreen

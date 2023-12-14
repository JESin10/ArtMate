import React, { useState } from "react";
// import { loadImg } from "../assets/images";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ArtworkInfo } from "../page/Artwork";
import tw from "tailwind-styled-components";
import { ReactComponent as SaveIcon } from "../assets/customSvg/bookmark.svg";
import { db } from "../Firebase";
import { doc, setDoc, collection, deleteDoc, getDoc } from "firebase/firestore";
// import { useAuth } from "../page/context/AuthContext";
import { useCollectionData } from "react-firebase-hooks/firestore";

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
}

export default function Artwork_Modal({
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

  // const targetArtwork = CloudInfo && Object.entries(CloudInfo);
  // console.log(targetArtwork);

  function parseAndStyleInfo(info: string) {
    const styledInfo = info.replace(/\[([^\]]+)\]/g, (match, content) => {
      return `<span style="font-weight: bold;">${content}</span>`;
    });
    return <div dangerouslySetInnerHTML={{ __html: styledInfo }} />;
  }

  return (
    <ArtworkModal>
      {artworkInfo && (
        <ArtworkModalContainer>
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
          <div className="px-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold my-3">{artworkInfo.DP_NAME}</h2>
              {targetArtwork && (targetArtwork as ArtWorkSaveInfo).isSaved ? (
                <button className="h-fit my-auto">
                  <Saving onClick={ArtWorkSaving} style={{ fill: "#608D00" }} />
                </button>
              ) : (
                <button className="h-fit my-auto">
                  <Saving onClick={ArtWorkSaving} style={{ fill: "white" }} />
                </button>
              )}
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
                  <ArtworkModalContent>평일 10:00-20:00</ArtworkModalContent>
                  <ArtworkModalContent>주말 10:00-19:00</ArtworkModalContent>
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
    </ArtworkModal>
  );
}

const ArtworkModal = tw.div`
  fixed inset-0 flex items-center justify-center z-30 
`;

const ArtworkModalContainer = tw.div`
  w-[370px] h-4/5 pb-[70px]
  rounded-t-xl overflow-y-auto 
  bg-white
  shadow-Ver2
`;

const ArtworkModalLabel = tw.p`
  text-sm flex w-24 font-bold
`;

const ArtworkModalContent = tw.p`
  text-sm flex w-full
`;

const Saving = tw(SaveIcon)`
mx-2 w-8 h-8
cursor-pointer 
`;

// hover:fill-primary-YellowGreen
// active:fill-primary-YellowGreen

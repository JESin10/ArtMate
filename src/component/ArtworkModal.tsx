import React, { useEffect, useState } from "react";
// import { loadImg } from "../assets/images";
import { IoIosCloseCircleOutline } from "react-icons/io";
// import { ArtworkInfo } from "../page/Artwork";
import tw from "tailwind-styled-components";
import { ReactComponent as SaveIcon } from "../assets/customSvg/bookmark.svg";
import { db } from "../Firebase";
import { doc, setDoc, collection, deleteDoc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ArtWorkSaveInfo, ArtworkInfo, ModalProps } from "../assets/interface";

export default function ArtworkModal({
  isOpen,
  closeModal,
  artworkInfo,
  currentUser,
  CloudInfo,
}: ModalProps) {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const listRef = collection(db, `userInfo/${currentUser?.uid}/ArtworkInfo`);
  const docRef = doc(listRef, artworkInfo?.dp_name);
  // const [artworkList] = useCollectionData(listRef);
  const targetArtwork =
    CloudInfo &&
    Array.isArray(CloudInfo) &&
    CloudInfo.find(
      (item: ArtWorkSaveInfo) => item.dp_name === artworkInfo?.dp_name
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

  //Loggin-User Check

  const UserCheckHandler = () => {
    Swal.fire({
      width: "300px",
      position: "center",
      icon: "warning",
      showCancelButton: true,
      title: "로그인 후 이용가능합니다.",
      html: "로그인을 누르실 경우 로그인페이지로 이동합니다",
      confirmButtonColor: "#608D00", // confrim 버튼 색깔 지정
      cancelButtonColor: "#6F6F6F", // cancel 버튼 색깔 지정
      confirmButtonText: "로그인", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      timer: 30000,
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };

  const ArtWorkSaving = async () => {
    const DocSnap = await getDoc(docRef);
    if (!currentUser) {
      UserCheckHandler();
    } else {
      if (!DocSnap.data()?.isSaved && artworkInfo?.dp_name) {
        const ArtworkRef = await setDoc(
          doc(
            db,
            `userInfo/${currentUser?.uid}/ArtworkInfo`,
            artworkInfo?.dp_name
          ),
          {
            Uid: currentUser.uid,
            // Artwork_No : number,
            isSaved: true,
            DP_NAME: artworkInfo?.dp_name,
            DP_EX_NO: artworkInfo?.dp_ex_no,
            DP_MAIN_IMG: artworkInfo?.dp_main_img,
            DP_END: artworkInfo?.dp_end,
            DP_ART_PART: artworkInfo?.dp_art_part,
          }
        );
        setIsSaved(true);
        console.log(`Document saved successfully`);
        return ArtworkRef;
      } else if ((targetArtwork as ArtWorkSaveInfo).isSaved) {
        const docRef = doc(listRef, artworkInfo?.dp_name);

        if (artworkInfo?.dp_name) {
          try {
            await deleteDoc(docRef);
            setIsSaved(false);
            console.log(`Document deleted successfully`);
          } catch (error) {
            console.error(`Error deleting document: ${error}`);
          }
        }
      }
    }
  };

  function parseAndStyleInfo(info: string) {
    const styledInfo = info.replace(/\[([^\]]+)\]/g, (match, content) => {
      return `<span style="font-weight: bold;">${content}</span>`;
    });
    return <div dangerouslySetInnerHTML={{ __html: styledInfo }} />;
  }

  // function parseAndStyleInfo(info: string) {
  //   const lines = info.split(/\r\n/);

  //   const styledLines = lines.map((line, index) => {
  //     if (line.trim() === "") {
  //       return null;
  //     }

  //     if (line.includes("휴관일")) {
  //       return (
  //         <div key={index}>
  //           <span style={{ color: "red" }}>{line}</span>
  //         </div>
  //       );
  //     }

  //     return <div key={index}>{line}</div>;
  //   });

  //   return <div>{styledLines}</div>;
  // }

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
            src={artworkInfo.dp_main_img}
          />
          <div className="px-3">
            <div className="flex-col justify-between">
              <div className="h-fit w-full justify-end  pt-3 my-auto flex space-x-3">
                <button
                  onClick={() => handleCopyClipBoard(artworkInfo)}
                  className="h-8 w-auto my-auto hover:scale-[105%] hover:duration-150"
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
                  <button className="h-fit w-fit my-auto ">
                    <Saving onClick={ArtWorkSaving} style={{ fill: "white" }} />
                  </button>
                )}
              </div>
              <h2 className="w-11/12 text-xl font-bold my-3">
                {artworkInfo.dp_name}
              </h2>
            </div>
            {/* 상세정보 */}
            <div className="space-y-1">
              <div className="flex">
                <ArtworkModalLabel>전시장소 </ArtworkModalLabel>
                <ArtworkModalContent>
                  {artworkInfo.dp_place}
                </ArtworkModalContent>
              </div>
              <div className="flex">
                <ArtworkModalLabel>전시기간 </ArtworkModalLabel>
                <ArtworkModalContent>
                  {artworkInfo.dp_start.toString()} ~{" "}
                  {artworkInfo.dp_end.toString()}
                </ArtworkModalContent>
              </div>
              <div className="flex">
                <ArtworkModalLabel>운영시간</ArtworkModalLabel>
                <div className="w-full">
                  {artworkInfo.dp_viewtime === "" ? (
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
                      {artworkInfo.dp_viewtime}
                    </ArtworkModalContent>
                  )}
                </div>
              </div>
              <div className="flex">
                <ArtworkModalLabel>작가 </ArtworkModalLabel>
                {artworkInfo.dp_artist === "" ? (
                  <div className="text-sm  w-full h-fit flex overflow-hidden text-ellipsis break-all line-clamp-1 flex-wrap">
                    unknown
                  </div>
                ) : (
                  <div className="text-sm  w-full h-fit flex overflow-hidden text-ellipsis break-all line-clamp-1 flex-wrap">
                    {artworkInfo.dp_artist}
                  </div>
                )}
              </div>
              <div className="flex">
                <ArtworkModalLabel>HOME </ArtworkModalLabel>
                <div className="flex w-full">
                  {artworkInfo.dp_link ? (
                    <a
                      className="text-sm flex"
                      href={artworkInfo.dp_link}
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
              {parseAndStyleInfo(artworkInfo.dp_info)}
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
  hover:scale-[105%] hover:duration-150
`;

// hover:fill-primary-YellowGreen
// active:fill-primary-YellowGreen

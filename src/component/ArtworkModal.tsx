import React, { useEffect, useState } from "react";
// import { loadImg } from "../assets/images";
import { IoIosCloseCircleOutline } from "react-icons/io";
// import { ArtworkInfo } from "../page/Artwork";
import tw from "tailwind-styled-components";
import { ReactComponent as SaveIcon } from "../../assets/customSvg/bookmark.svg";
import { db } from "../Firebase";
import { doc, setDoc, collection, deleteDoc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ArtWorkSaveInfo, ArtworkInfo, ModalProps } from "../assets/interface";
import { SeoulArtMuseum_Detail_OpenData } from "../api/Gallery_OpenApi";
import { useCollectionData } from "react-firebase-hooks/firestore";

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
  const [artworkList] = useCollectionData(listRef);
  const [detailData, setDetailData] = useState<ArtworkInfo>();
  const targetArtwork =
    CloudInfo &&
    Array.isArray(CloudInfo) &&
    CloudInfo.find(
      (item: ArtWorkSaveInfo) => item.DP_NAME === artworkInfo?.dp_name,
    );
  const getDetailArtwork = async (num?: number) => {
    if (!num) return null;
    try {
      const response = await SeoulArtMuseum_Detail_OpenData(num);

      const jsonItems =
        response?.response?.body?.items?.item ||
        response?.body?.items?.item ||
        response?.items?.item ||
        response?.items ||
        null;
      if (jsonItems) {
        const arr = Array.isArray(jsonItems) ? jsonItems : [jsonItems];
        setDetailData(arr[0] as any);
        return arr;
      }

      if (typeof response === "string" && response.trim().startsWith("<")) {
        const parser = new DOMParser();
        const xml = parser.parseFromString(response, "text/xml");
        const itemNodes = xml.getElementsByTagName("item");
        const arr = Array.from(itemNodes).map((node) => {
          const getText = (tag: string) =>
            node.getElementsByTagName(tag)[0]?.textContent || "";
          return {
            dp_ex_no: getText("seq"),
            dp_name: getText("title"),
            dp_main_img: getText("imgUrl"),
            dp_art_part: getText("realmName") || getText("serviceName"),
            dp_artist: "",
            dp_start: getText("startDate"),
            dp_end: getText("endDate"),
            dp_place: getText("place"),
            dp_area: getText("area"),
            dp_sigungu: getText("sigungu"),
            dp_price: getText("price"),
            dp_link: getText("url") || getText("placeUrl"),
            dp_phone: getText("phone"),
            dp_info: getText("contents1") || getText("contents"),
            dp_viewtime: getText("viewTime"),
            dp_placeAdrs: getText("placeAddr"),
            dp_gpsX: getText("gpsX"),
            dp_gpsY: getText("gpsY"),
          } as any;
        });
        setDetailData(arr[0] as any);
        return arr;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // 모달이외 공간 터치시 modal close
  useEffect(() => {
    getDetailArtwork(Number(artworkInfo?.dp_ex_no));
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
    if (!currentUser) {
      UserCheckHandler();
      return;
    }
    if (!artworkInfo?.dp_name) return;

    const localDocRef = doc(listRef, artworkInfo.dp_name);
    const DocSnap = await getDoc(localDocRef);

    if (!DocSnap.exists() || !DocSnap.data()?.isSaved) {
      await setDoc(localDocRef, {
        Uid: currentUser.uid,
        isSaved: true,
        DP_NAME: artworkInfo.dp_name,
        DP_EX_NO: artworkInfo.dp_ex_no,
        DP_MAIN_IMG: artworkInfo.dp_main_img,
        DP_END: artworkInfo.dp_end,
        DP_ART_PART: artworkInfo.dp_art_part,
      });
      setIsSaved(true);
      console.log("Document saved successfully");
      return;
    }

    try {
      await deleteDoc(localDocRef);
      setIsSaved(false);
      console.log("Document deleted successfully");
    } catch (error) {
      console.error(`Error deleting document: ${error}`);
    }
  };

  // console.log("detailData:", detailData);

  const formatYMD = (s: any) => {
    if (s === null || s === undefined || s === "") return "정보없음";
    let str = typeof s === "number" ? s.toString() : String(s);
    str = str.replace(/\D/g, "");
    if (str.length >= 8) {
      return `${str.slice(0, 4)}년 ${str.slice(4, 6)}월 ${str.slice(6, 8)}일`;
    }
    return str;
  };

  const parseAndStyleInfo = (info: string) => {
    const styledInfo = info.replace(/\[([^\]]+)\]/g, (match, content) => {
      return `<span style="font-weight: bold;">${content}</span>`;
    });
    return <div dangerouslySetInnerHTML={{ __html: styledInfo }} />;
  };

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
        showConfirmButton: false,
        // confirmButtonText: "OK",
        // confirmButtonColor: "#608D00",
        timer: 1000,
      });
    } catch (err) {
      window.alert("복사에 실패하였습니다. 다시 시도 해주세요");
      console.error(err);
    }
  };

  return (
    <ArtworkModalDiv>
      {detailData && (
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
            src={detailData.dp_main_img}
          />
          <div className="">
            <div className="w-full flex justify-between">
              <div
                className="w-full flex flex-wrap text-xs justify-start 
              items-center mt-3 whitespace-normal break-words px-10"
              >
                <h3 className=" text-primary-Gray">
                  <p className="">
                    {detailData.dp_place} / {detailData.dp_area}
                  </p>
                </h3>
              </div>
              <div className="h-fit w-1/3 justify-end pt-3 my-auto px-10 flex space-x-3">
                <button
                  onClick={() => handleCopyClipBoard(detailData)}
                  className="h-8 w-auto my-auto hover:scale-[105%] hover:duration-150"
                >
                  <img
                    className="w-auto h-full"
                    alt="share_icon"
                    src={"./icons/Outline/share.svg"}
                  />
                </button>
                {targetArtwork &&
                detailData &&
                (targetArtwork as ArtWorkSaveInfo).isSaved ? (
                  <button className="h-fit w-fit my-auto">
                    <Saving
                      onClick={() => ArtWorkSaving()}
                      style={{ fill: "#608D00" }}
                    />
                  </button>
                ) : (
                  <button className="h-fit w-fit my-auto ">
                    <Saving
                      onClick={() => ArtWorkSaving()}
                      style={{ fill: "white" }}
                    />
                  </button>
                )}
              </div>
            </div>
            <h2 className="w-full text-lg font-bold my-3 px-10 border-b border-solid border-gray-300 pb-4">
              {detailData.dp_name}
            </h2>
            {/* 상세정보 */}
            <div className="space-y-1 px-10">
              <div className="flex">
                <ArtworkModalLabel>전시장소 </ArtworkModalLabel>
                <ArtworkModalContent>{detailData.dp_place}</ArtworkModalContent>
              </div>
              <div className="flex">
                <ArtworkModalLabel>전시기간 </ArtworkModalLabel>
                <ArtworkModalContent>
                  {formatYMD(detailData?.dp_start)} ~{" "}
                  {formatYMD(detailData?.dp_end)}
                </ArtworkModalContent>
              </div>
              <div className="flex">
                <ArtworkModalLabel>운영시간</ArtworkModalLabel>
                <div className="w-full">
                  {detailData.dp_viewtime === "" ? (
                    <>
                      <ArtworkModalContent>정보없음</ArtworkModalContent>
                    </>
                  ) : (
                    <ArtworkModalContent>
                      {detailData.dp_viewtime}
                    </ArtworkModalContent>
                  )}
                </div>
              </div>
              <div className="flex">
                <ArtworkModalLabel>입장료</ArtworkModalLabel>
                <div className="w-full">
                  {detailData.dp_price === "" ? (
                    <>
                      <ArtworkModalContent>정보없음</ArtworkModalContent>
                    </>
                  ) : (
                    <ArtworkModalContent>
                      {detailData.dp_price}
                    </ArtworkModalContent>
                  )}
                </div>
              </div>
              <div className="flex">
                <ArtworkModalLabel>작가 </ArtworkModalLabel>
                {detailData.dp_artist === "" ? (
                  <div className="text-sm  w-full h-fit flex overflow-hidden text-ellipsis break-all line-clamp-1 flex-wrap">
                    unknown
                  </div>
                ) : (
                  <div className="text-sm  w-full h-fit flex overflow-hidden text-ellipsis break-all line-clamp-1 flex-wrap">
                    {detailData.dp_artist}
                  </div>
                )}
              </div>
              <div className="flex">
                <ArtworkModalLabel>HOME </ArtworkModalLabel>
                <div className="flex w-full">
                  {detailData.dp_link ? (
                    <a
                      className="text-sm flex"
                      href={detailData.dp_link}
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
              <div className="flex">
                <ArtworkModalLabel>주소</ArtworkModalLabel>

                <div className="text-sm  w-full h-fit flex overflow-hidden text-ellipsis break-all line-clamp-1 flex-wrap">
                  {detailData.dp_placeAdrs}
                </div>
              </div>
              <div className="my-8">
                <div className="text-xs text-primary-Gray my-4 flex">
                  {/* {parseAndStyleInfo(artworkInfo.dp_info)} */}
                </div>
                <div className="text-xs text-primary-Gray my-4 flex">
                  {detailData.dp_gpsX} /{detailData.dp_gpsY}{" "}
                </div>
              </div>
            </div>
            {/* 갤러리 상세설명 */}
          </div>
        </ArtworkModalContainer>
      )}
    </ArtworkModalDiv>
  );
}

const ArtworkModalDiv = tw.div`
  w-mobileWidth mx-auto  bg-black/30
  fixed inset-0 flex items-center justify-center z-30 
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
  text-sm flex w-full h-full
`;

const Saving = tw(SaveIcon)`
  w-6 h-7 space-x-2
  cursor-pointer 
  hover:scale-[105%] hover:duration-150
`;

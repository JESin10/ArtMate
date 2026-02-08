import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { useQuery } from "react-query";
import {
  MainPage,
  SeoulArtMuseum_ArtWork_OpenData,
} from "../api/Gallery_OpenApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RxSlash } from "react-icons/rx";
import ArtworkModal from "./ArtworkModal";
import { useAuth } from "../page/context/AuthContext";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../Firebase";
import { ArtworkInfo } from "../assets/interface";
import { SeoulArtMuseum_ArtWorkData } from "../api/RTDatabase";

export default function RecommendSlider() {
  const [recentArray, setRecentArray] = useState<ArtworkInfo[]>([]);
  const [basicArr, setBasicArray] = useState<ArtworkInfo[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const PerItem = 4;
  const { currentUser } = useAuth();
  // const listRef = collection(db, `userInfo/${currentUser?.uid}/ArtworkInfo`);
  // const MyArtworkInfo = useCollectionData(listRef)[0];
  const startIndex = (currentPage - 1) * PerItem;
  const endIndex = startIndex + PerItem;
  const currentItems = recentArray.slice(startIndex, endIndex);
  const totalPages = Math.ceil(recentArray.length / PerItem);
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkInfo | null>(
    null,
  );

  useEffect(() => {
    (async () => {
      const arr = await fetchData();
      await recentFunc(arr as any);
    })();
  }, []);

  const fetchData = async () => {
    try {
      const result = await SeoulArtMuseum_ArtWork_OpenData(1, 50);

      // JSON 형태일 때 (axios로 파싱된 객체)
      const jsonItems =
        result?.response?.body?.items?.item ||
        result?.body?.items?.item ||
        result?.items?.item ||
        result?.items ||
        null;

      if (jsonItems) {
        const arr = Array.isArray(jsonItems) ? jsonItems : [jsonItems];
        setBasicArray(arr as any);
        return arr;
      }

      // 문자열(XML)로 오는 경우
      if (typeof result === "string" && result.trim().startsWith("<")) {
        const parser = new DOMParser();
        const xml = parser.parseFromString(result, "text/xml");
        const itemNodes = xml.getElementsByTagName("item");
        const arr = Array.from(itemNodes).map((node) => {
          const getText = (tag: string) =>
            node.getElementsByTagName(tag)[0]?.textContent || "";
          return {
            dp_ex_no: getText("seq"),
            dp_name: getText("title"),
            dp_main_img: getText("thumbnail"),
            dp_art_part: getText("realmName") || getText("serviceName"),
            dp_artist: "",
            dp_start: getText("startDate"),
            dp_end: getText("endDate"),
            dp_place: getText("place"),
          } as any;
        });
        setBasicArray(arr as any);
        return arr;
      }
    } catch (err) {
      console.error("basicData error", err);
      setBasicArray([]);
      return [];
    }
    return [];
  };
  const parseYMD = (s: any): Date | null => {
    if (!s) return null;
    let str = typeof s === "number" ? s.toString() : s;
    str = str.trim();
    if (/^\d{8}$/.test(str)) {
      return new Date(
        `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}`,
      );
    }
    const d = new Date(str);
    return isNaN(d.getTime()) ? null : d;
  };

  const recentFunc = async (sourceArr?: ArtworkInfo[]) => {
    const source = sourceArr && sourceArr.length ? sourceArr : basicArr;
    if (!source || source.length === 0) {
      setRecentArray([]);
      return [];
    }
    const currentDate = new Date();

    const filteredAndSorted = source
      .map((artwork: any) => {
        const startDate = parseYMD(artwork.dp_start);
        return { artwork, startDate };
      })
      // .filter((x) => x.startDate && x.startDate > currentDate)
      .sort((a, b) => a.startDate!.getTime() - b.startDate!.getTime())
      .map((x) => x.artwork)
      .slice(0, 12);

    setRecentArray(filteredAndSorted as ArtworkInfo[]);
    return recentArray;
  };

  // console.log("recentArray", recentArray);

  // 이전 페이지로 이동하는 함수
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동하는 함수
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  //Modal
  const openModal = (artwork: ArtworkInfo) => {
    setSelectedArtwork(artwork);
  };

  const closeModal = () => {
    setSelectedArtwork(null);
  };

  return (
    <>
      <RecommendSliderContainer>
        <div className="w-11/12 h-full justify-center mx-auto my-3">
          <h1 className="w-full font-extrabold text-2xl px-4 my-2">
            금주의 최신 전시 모음
          </h1>
          <ImageContainer>
            <div className="flex flex-col">
              {currentItems.map((data: any, index: number) => (
                <div key={index} onClick={() => openModal(data)}>
                  {index % 4 === 0 && (
                    <RecommendImgVer1
                      alt={index.toString()}
                      src={data.dp_main_img}
                    />
                  )}
                  {index % 4 === 1 && (
                    <RecommendImgVer2
                      alt={index.toString()}
                      src={data.dp_main_img}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              {currentItems.map((data: any, index: number) => (
                <div key={index} onClick={() => openModal(data)}>
                  {index % 4 === 2 && (
                    <RecommendImgVer2
                      alt={index.toString()}
                      src={data.dp_main_img}
                    />
                  )}
                  {index % 4 === 3 && (
                    <RecommendImgVer1
                      alt={index.toString()}
                      src={data.dp_main_img}
                    />
                  )}
                </div>
              ))}
            </div>
          </ImageContainer>

          <div className="w-fit mx-auto text-center flex ">
            <PageBtn onClick={goToPrevPage} disabled={currentPage === 1}>
              <FaChevronLeft />
            </PageBtn>
            <div className="flex justify-center items-center mx-auto space-x-1">
              <p className="font-bold">{currentPage}</p>
              <RxSlash />
              <p className="font-bold text-primary-Gray">{totalPages}</p>
            </div>
            <PageBtn
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </PageBtn>
          </div>
        </div>
      </RecommendSliderContainer>
      {selectedArtwork && (
        <div className="overflow-inherit">
          <ArtworkModal
            isOpen={true}
            closeModal={closeModal}
            artworkInfo={selectedArtwork}
            currentUser={currentUser}
            CloudInfo={selectedArtwork}
          />
        </div>
      )}
    </>
  );
}

const RecommendSliderContainer = tw.div`
w-full h-[520px] mx-auto
justify-center items-center cursor-pointer
`;

const ImageContainer = tw.div`
w-full h-fit flex
justify-center items-center
rounded-lg mx-auto mb-4
overflow-hidden
`;

const RecommendImgVer1 = tw.img`
w-[150px] h-[250px] rounded-xl
object-cover mx-2 my-1
border-primary-Gray/30 border-2
hover:scale-[102%] hover:duration-300
`;

const RecommendImgVer2 = tw.img`
w-[150px] h-[140px] rounded-xl
object-cover mx-2 my-1
border-primary-Gray/30 border-2
hover:scale-[102%] hover:duration-300
`;

const PageBtn = tw.button`
w-14 p-2 mx-4
justify-center flex items-center 
bg-white rounded-2xl
border-primary-Gray border-solid border-2
`;

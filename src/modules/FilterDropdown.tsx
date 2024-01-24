import { useState } from "react";
import tw from "tailwind-styled-components";
import { SearchingInfo } from "../api/Gallery_OpenApi";

interface FilterComponentProps {
  category?: string;
}

export const onFilteringHandler = async (filterValue: any) => {
  try {
    const response = (await SearchingInfo()).ListExhibitionOfSeoulMOAInfo.row;
    // 검색어가 포함된 결과만 필터링
    const Results = response.filter((item: any) => {
      // DP_ARTIST 또는 DP_NAME 중에 검색어가 포함되어 있는지 확인
      return item.DP_ART_PART?.toLowerCase().includes(
        filterValue.toLowerCase()
      );
      // item.DP_NAME?.toLowerCase().includes(filterValue.toLowerCase())
    });

    console.log(Results);

    // return setFilterValue(Results);
  } catch (err) {
    console.error(err);
  }
};

export default function FilterDropdown({ category }: FilterComponentProps) {
  const [filterValue, setFilterValue] = useState("");

  const renderFilterTags = () => {
    switch (category) {
      case "Genre":
        return (
          <FilterTagContainer id="Genre">
            <FilterTag id="Genre-all">전체</FilterTag>
            <FilterTag id="Genre-painting">회화</FilterTag>
            <FilterTag id="Genre-oilDrawing">유화</FilterTag>
            <FilterTag id="Genre-sculpture">조각</FilterTag>
            <FilterTag id="Genre-install">설치</FilterTag>
            <FilterTag id="Genre-kinetic">키네틱</FilterTag>
            <FilterTag id="Genre-archive">아카이브</FilterTag>
            <FilterTag id="Genre-newMedia">뉴미디어</FilterTag>
            <FilterTag id="Genre-Media">미디어아트</FilterTag>
            <FilterTag id="Genre-3D">입체</FilterTag>
            <FilterTag id="Genre-video">영상</FilterTag>
            <FilterTag id="Genre-sound">사운드</FilterTag>
            <FilterTag id="Genre-anime">애니메이션</FilterTag>
            <FilterTag id="Genre-graphic">그래픽 디자인</FilterTag>
            <FilterTag id="Genre-drawing">드로잉</FilterTag>
            <FilterTag id="Genre-picture">사진</FilterTag>
            <FilterTag id="Genre-light">조명</FilterTag>
            <FilterTag id="Genre-perform">퍼포먼스</FilterTag>
            <FilterTag id="Genre-koreanPainting">한국화</FilterTag>
            <FilterTag id="Genre-fiber">섬유예술</FilterTag>
            <FilterTag id="Genre-ceramics">도예</FilterTag>
            <FilterTag id="Genre-tapestry">태피스트리</FilterTag>
          </FilterTagContainer>
        );
      // case "ArtMovement":
      //   return (
      //     <FilterTagContainer id="ArtMovement">
      //       <FilterTag id="all-Move">전체</FilterTag>
      //       <FilterTag id="ArtMovement1">현대미술</FilterTag>
      //       <FilterTag id="ArtMovement2">팝아트</FilterTag>
      //       <FilterTag id="ArtMovement3">바로크회화</FilterTag>
      //       <FilterTag id="ArtMovement4">르네상스</FilterTag>
      //       <FilterTag id="ArtMovement5">야수파</FilterTag>
      //       <FilterTag id="ArtMovement6">인상주의</FilterTag>
      //       <FilterTag id="ArtMovement7">표현주의</FilterTag>
      //       <FilterTag id="ArtMovement8">입체주의</FilterTag>
      //       <FilterTag id="ArtMovement9">해체주의</FilterTag>
      //       <FilterTag id="ArtMovement10">미래</FilterTag>
      //       <FilterTag id="ArtMovement11">바르비종파</FilterTag>
      //       <FilterTag id="ArtMovement12">미래주의</FilterTag>
      //       <FilterTag id="ArtMovement13">옵아트</FilterTag>
      //       <FilterTag id="ArtMovement14">개념주의</FilterTag>
      //       <FilterTag id="ArtMovement15">아카데믹미술</FilterTag>
      //       <FilterTag id="ArtMovement16">포스트모더니즘</FilterTag>
      //       <FilterTag id="ArtMovement17">원시주의</FilterTag>
      //       <FilterTag id="ArtMovement18">러시아구성주의</FilterTag>
      //       <FilterTag id="ArtMovement19">독일표현주의</FilterTag>
      //     </FilterTagContainer>
      //   );
      case "Month":
        return (
          <FilterTagContainer id="Month">
            <FilterTag id="Month1">1월</FilterTag>
            <FilterTag id="Month2">2월</FilterTag>
            <FilterTag id="Month3">3월</FilterTag>
            <FilterTag id="Month4">4월</FilterTag>
            <FilterTag id="Month5">5월</FilterTag>
            <FilterTag id="Month6">6월</FilterTag>
            <FilterTag id="Month7">7월</FilterTag>
            <FilterTag id="Month8">8월</FilterTag>
            <FilterTag id="Month9">9월</FilterTag>
            <FilterTag id="Month10">10월</FilterTag>
            <FilterTag id="Month11">11월</FilterTag>
            <FilterTag id="Month12">12월</FilterTag>
          </FilterTagContainer>
        );
      default:
        return null;
    }
  };

  return <>{renderFilterTags()}</>;
}

const FilterTag = tw.li`
w-fit py-2 px-4 m-1
  border-2 border-black cursor-pointer
  text-black rounded-3xl
  hover:text-white hover:bg-primary-YellowGreen
  hover:font-bold hover:border-primary-YellowGreen
`;

const FilterTagContainer = tw.ul`
  flex flex-wrap w-11/12 mx-auto overflow-scroll
  list-none
`;

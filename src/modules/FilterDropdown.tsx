import tw from "tailwind-styled-components";

interface FilterComponentProps {
  category?: string;
}

export default function FilterDropdown({ category }: FilterComponentProps) {
  const renderFilterTags = () => {
    switch (category) {
      case "Genre":
        return (
          <FilterTagContainer id="Genre">
            <FilterTag id="all-Genre">전체</FilterTag>
            <FilterTag id="Genre1">회화</FilterTag>
            <FilterTag id="Genre2">설치</FilterTag>
            <FilterTag id="Genre3">영상</FilterTag>
            <FilterTag id="Genre4">조각</FilterTag>
            <FilterTag id="Genre5">키네틱</FilterTag>
            <FilterTag id="Genre6">조명</FilterTag>
            <FilterTag id="Genre7">드로잉</FilterTag>
            <FilterTag id="Genre8">아카이브</FilterTag>
            <FilterTag id="Genre9">뉴미디어</FilterTag>
            <FilterTag id="Genre10">한국화</FilterTag>
            <FilterTag id="Genre11">사진</FilterTag>
            <FilterTag id="Genre19">퍼포먼스</FilterTag>

            <FilterTag id="Genre13">조각형 설치</FilterTag>
            <FilterTag id="Genre14">사운드</FilterTag>
            <FilterTag id="Genre15">입체</FilterTag>
            <FilterTag id="Genre16">드로잉애니메이션</FilterTag>
            <FilterTag id="Genre17">그래픽 디자인</FilterTag>
            <FilterTag id="Genre18">섬유예술</FilterTag>
            <FilterTag id="Genre20">태피스트리</FilterTag>
            <FilterTag id="Genre12">판화</FilterTag>
          </FilterTagContainer>
        );
      case "ArtMovement":
        return (
          <FilterTagContainer id="ArtMovement">
            <FilterTag id="all-Move">전체</FilterTag>
            <FilterTag id="ArtMovement1">현대미술</FilterTag>
            <FilterTag id="ArtMovement2">팝아트</FilterTag>
            <FilterTag id="ArtMovement3">바로크회화</FilterTag>
            <FilterTag id="ArtMovement4">르네상스</FilterTag>
            <FilterTag id="ArtMovement5">야수파</FilterTag>
            <FilterTag id="ArtMovement6">인상주의</FilterTag>
            <FilterTag id="ArtMovement7">표현주의</FilterTag>
            <FilterTag id="ArtMovement8">입체주의</FilterTag>
            <FilterTag id="ArtMovement9">해체주의</FilterTag>
            <FilterTag id="ArtMovement10">미래</FilterTag>
            <FilterTag id="ArtMovement11">바르비종파</FilterTag>
            <FilterTag id="ArtMovement12">미래주의</FilterTag>
            <FilterTag id="ArtMovement13">옵아트</FilterTag>
            <FilterTag id="ArtMovement14">개념주의</FilterTag>
            <FilterTag id="ArtMovement15">아카데믹미술</FilterTag>
            <FilterTag id="ArtMovement16">포스트모더니즘</FilterTag>
            <FilterTag id="ArtMovement17">원시주의</FilterTag>
            <FilterTag id="ArtMovement18">러시아구성주의</FilterTag>
            <FilterTag id="ArtMovement19">독일표현주의</FilterTag>
          </FilterTagContainer>
        );
      // Add more cases as needed
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

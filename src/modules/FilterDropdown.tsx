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
            <FilterTag>전체</FilterTag>
            <FilterTag>수묵</FilterTag>
            <FilterTag>선묘화</FilterTag>
            <FilterTag>영상</FilterTag>
            <FilterTag>인터렉티브아트</FilterTag>
            <FilterTag>아크릴</FilterTag>
            <FilterTag>담채</FilterTag>
            <FilterTag>자화상</FilterTag>
            <FilterTag>텍스타일</FilterTag>
            <FilterTag>추상</FilterTag>
            <FilterTag>상상화</FilterTag>
            <FilterTag>세라믹</FilterTag>
            <FilterTag>전면회화</FilterTag>
            <FilterTag>일러스트</FilterTag>
            <FilterTag>삽화</FilterTag>
            <FilterTag>실크</FilterTag>
            <FilterTag>실크스크린</FilterTag>
            <FilterTag>애니메이션</FilterTag>
            <FilterTag>조각</FilterTag>{" "}
          </FilterTagContainer>
        );
      case "ArtMovement":
        return (
          <FilterTagContainer id="ArtMovement">
            <FilterTag>전체</FilterTag>
            <FilterTag>현대미술</FilterTag>
            <FilterTag>팝아트</FilterTag>
            <FilterTag>바로크회화</FilterTag>
            <FilterTag>르네상스</FilterTag>
            <FilterTag>야수파</FilterTag>
            <FilterTag>인상주의</FilterTag>
            <FilterTag>표현주의</FilterTag>
            <FilterTag>입체주의</FilterTag>
            <FilterTag>해체주의</FilterTag>
            <FilterTag>미래</FilterTag>
            <FilterTag>바르비종파</FilterTag>
            <FilterTag>미래주의</FilterTag>
            <FilterTag>옵아트</FilterTag>
            <FilterTag>개념주의</FilterTag>
            <FilterTag>아카데믹미술</FilterTag>
            <FilterTag>포스트모더니즘</FilterTag>
            <FilterTag>원시주의</FilterTag>
            <FilterTag>러시아구성주의</FilterTag>
            <FilterTag>독일표현주의</FilterTag>{" "}
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

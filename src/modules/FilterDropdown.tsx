import { useState } from "react";
import tw from "tailwind-styled-components";
import { SearchingInfo } from "../api/Gallery_OpenApi";

interface FilterComponentProps {
  category: string;
  onFilterChange?: (selectedTags: string[]) => void;
}

interface FilterTagProps {
  TagId: string;
  onClick: (id: string) => void;
  children: React.ReactNode;
}

export const FilterTag: React.FC<FilterTagProps> = ({
  TagId,
  onClick,
  children,
}: any) => {
  const [isSelectedGenre, setIsSelectedGenre] = useState(false);
  const [isSelectedMonth, setIsSelectedMonth] = useState(false);

  const handleClick = () => {
    onClick(TagId);
    if (TagId.includes("Genre_") || TagId.includes("Month_")) {
      setIsSelectedGenre(!isSelectedGenre);
      setIsSelectedMonth(!isSelectedMonth);
    }
  };

  const FilteringTag = tw.li`
    w-fit py-2 px-4 m-1 border-2 border-black  
    text-black rounded-3xl cursor-pointer
    hover:text-white hover:bg-primary-YellowGreen hover:font-bold hover:border-primary-YellowGreen
    active:bg-primary-YellowGreen
   `;

  const SelectedFilteringTag = tw.li`
    w-fit py-2 px-4 m-1 border-2 border-primary-YellowGreen font-bold
    text-white rounded-3xl cursor-pointer bg-primary-YellowGreen
    hover:text-black hover:bg-white hover:font-bold hover:border-black
   `;

  return (
    <>
      {isSelectedGenre || isSelectedMonth ? (
        <SelectedFilteringTag onClick={handleClick}>
          {children}
        </SelectedFilteringTag>
      ) : (
        <FilteringTag onClick={handleClick}>{children}</FilteringTag>
      )}
    </>
  );
};

export default function FilterDropdown({
  category,
  onFilterChange,
  tags,
}: FilterComponentProps & { tags: { id: string; name: string }[] }) {
  // const [filterValue, setFilterValue] = useState("");
  // const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const onFilteringHandler = async (tagName: any) => {
    // console.log("tagName:", tagName);
    // setSelectedTags(tagName);
    // console.log(selectedTags);
    try {
      const response = (await SearchingInfo()).ListExhibitionOfSeoulMOAInfo.row;
      if (tagName === "" || tagName === "전체") {
        return response;
      } else {
        const newArr = response.filter((item: any) =>
          item.DP_ART_PART.includes(tagName)
        );
        if (onFilterChange) {
          onFilterChange(newArr);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderFilterTags = () => {
    return (
      <FilterTagContainer id={category}>
        {tags.map((tag) => (
          <FilterTag
            key={tag.id}
            TagId={`${category}_${tag.name}`}
            onClick={() => onFilteringHandler(tag.name)}
          >
            {tag.name}
          </FilterTag>
        ))}
      </FilterTagContainer>
    );
  };

  return <>{renderFilterTags()}</>;
}

const FilterTagContainer = tw.ul`
  flex flex-wrap w-11/12 mx-auto overflow-scroll
  list-none
`;

// switch (category) {
//   case "Genre":
//     return (
//       <FilterTagContainer id="Genre">
//         <FilterTag id="Genre-all">전체</FilterTag>
//         <FilterTag id="Genre-painting">회화</FilterTag>
//         <FilterTag id="Genre-oilDrawing">유화</FilterTag>
//         <FilterTag id="Genre-sculpture">조각</FilterTag>
//         <FilterTag id="Genre-install">설치</FilterTag>
//         <FilterTag id="Genre-kinetic">키네틱</FilterTag>
//         <FilterTag id="Genre-archive">아카이브</FilterTag>
//         <FilterTag id="Genre-newMedia">뉴미디어</FilterTag>
//         <FilterTag id="Genre-Media">미디어아트</FilterTag>
//         <FilterTag id="Genre-3D">입체</FilterTag>
//         <FilterTag id="Genre-video">영상</FilterTag>
//         <FilterTag id="Genre-sound">사운드</FilterTag>
//         <FilterTag id="Genre-anime">애니메이션</FilterTag>
//         <FilterTag id="Genre-graphic">그래픽 디자인</FilterTag>
//         <FilterTag id="Genre-drawing">드로잉</FilterTag>
//         <FilterTag id="Genre-picture">사진</FilterTag>
//         <FilterTag id="Genre-light">조명</FilterTag>
//         <FilterTag id="Genre-perform">퍼포먼스</FilterTag>
//         <FilterTag id="Genre-koreanPainting">한국화</FilterTag>
//         <FilterTag id="Genre-fiber">섬유예술</FilterTag>
//         <FilterTag id="Genre-ceramics">도예</FilterTag>
//         <FilterTag id="Genre-tapestry">태피스트리</FilterTag>
//       </FilterTagContainer>
//     );
//   case "Month":
//     return (
//       <FilterTagContainer id="Month">
//         <FilterTag id="Month1">1월</FilterTag>
//         <FilterTag id="Month2">2월</FilterTag>
//         <FilterTag id="Month3">3월</FilterTag>
//         <FilterTag id="Month4">4월</FilterTag>
//         <FilterTag id="Month5">5월</FilterTag>
//         <FilterTag id="Month6">6월</FilterTag>
//         <FilterTag id="Month7">7월</FilterTag>
//         <FilterTag id="Month8">8월</FilterTag>
//         <FilterTag id="Month9">9월</FilterTag>
//         <FilterTag id="Month10">10월</FilterTag>
//         <FilterTag id="Month11">11월</FilterTag>
//         <FilterTag id="Month12">12월</FilterTag>
//       </FilterTagContainer>
//     );
//   default:
//     return null;
// }

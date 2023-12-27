import React, { useState } from "react";
import { ReactComponent as MainLogo } from "../assets/customSvg/main_text_logo.svg";
import { ReactComponent as Searching } from "../assets/customSvg/search.svg";
import { SearchingInfo } from "../api/Gallery_OpenApi";

import tw from "tailwind-styled-components";

export default function Search_Bar(): JSX.Element {
  const [isInputVisible, setInputVisible] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  // const [searchkeyword, setSearchKeyword] = useState("");

  const handleSearchClick = () => {
    setInputVisible((prevVisible) => !prevVisible);
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchHandler();
    }
    setSearchInput(searchInput);
  };

  const onSearchHandler = async () => {
    if (searchInput.trim() === "") {
      window.alert("검색어를 입력하세요");
    }
    try {
      const response = (await SearchingInfo()).ListExhibitionOfSeoulMOAInfo.row;
      // 검색어가 포함된 결과만 필터링
      const searchResults = response.filter((item: any) => {
        // DP_ARTIST 또는 DP_NAME 중에 검색어가 포함되어 있는지 확인
        return (
          item.DP_ARTIST?.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.DP_NAME?.toLowerCase().includes(searchInput.toLowerCase())
        );
      });

      console.log(searchResults);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="py-4 flex-col mx-auto justify-center ">
      <div className="flex flex-col">
        {isInputVisible ? (
          <>
            <MainBarContainer>
              <MainTextLogo />
            </MainBarContainer>
            <SearchContainer>
              <SearchInput
                type="text"
                value={searchInput || ""}
                placeholder="전시, 작품, 작가를 검색해보세요."
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyUp={onKeyPressHandler}
              />
              <button
                onClick={handleSearchClick}
                // onKeyPress={onKeyPressHandler}
              >
                <SearchingIcon className="mr-2" />
              </button>
            </SearchContainer>
          </>
        ) : (
          <MainBarContainer>
            <div className="ml-6 flex w-60">
              <MainTextLogo />
            </div>
            <button
              onClick={handleSearchClick}
              className="bg-transparent flex justify-end"
            >
              <SearchingIcon />
            </button>
          </MainBarContainer>
        )}
      </div>
    </div>
  );
}

const MainTextLogo = tw(MainLogo)`
fill-primary-YellowGreen
  w-30 h-fit mx-auto
`;

const MainBarContainer = tw.div`
 border-primary-YellowGreen border-b-2 
 flex py-2 w-11/12 justify-center mx-auto
`;

const SearchInput = tw.input`
  w-full h-8 
  rounded-2xl indent-0 px-3 
  bg-transparent outline-none
`;

const SearchContainer = tw.div`
  flex justify-between 
  border-black border-2 
  bg-white w-4/5 rounded-2xl 
  mt-4 mx-auto
`;

const SearchingIcon = tw(Searching)`
  w-6 h-6 fill-primary-YellowGreen
`;

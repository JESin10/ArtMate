import React, { useState } from "react";
import { ReactComponent as MainLogo } from "../assets/customSvg/main_text_logo.svg";
import { ReactComponent as Searching } from "../assets/customSvg/search.svg";
import { SearchingInfo } from "../api/Gallery_OpenApi";
import tw from "tailwind-styled-components";
import SearchResult from "../page/SearchResult";
import { Navigate, BrowserRouter as Router } from "react-router-dom";

import { Route, Routes, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import SearchResultPage from "../page/SearchResultPage";
import Swal from "sweetalert2";

interface SearchMode {
  isSearchOn: boolean;
}

export default function SearchBar(): JSX.Element {
  const [isInputVisible, setInputVisible] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setInputVisible((prevVisible) => !prevVisible);
    if (isInputVisible === false) {
      setSearchInput("");
    }
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchMode(true);
      onSearchHandler();
    }
    setSearchInput(searchInput);
  };

  const onSearchHandler = async () => {
    if (searchInput.trim() === "") {
      Swal.fire({
        width: "300px",
        icon: "warning",
        position: "center",
        showCancelButton: false,
        title: "검색어를 입력하세요",
        confirmButtonColor: "#608D00", // confrim 버튼 색깔 지정
        cancelButtonColor: "#6F6F6F", // cancel 버튼 색깔 지정
        confirmButtonText: "확인", // confirm 버튼 텍스트 지정
        timer: 30000,
      });
      return;
    }
    try {
      const response = (await SearchingInfo()).ListExhibitionOfSeoulMOAInfo.row;
      // 검색어가 포함된 결과만 필터링
      const Results = response.filter((item: any) => {
        // DP_ARTIST 또는 DP_NAME 중에 검색어가 포함되어 있는지 확인
        return (
          item.DP_ARTIST?.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.DP_NAME?.toLowerCase().includes(searchInput.toLowerCase())
        );
      });
      setSearchResults(Results);
      return (
        <>
          <SearchResult
            searchMode={searchMode}
            keyword={searchInput}
            searchResults={searchResults}
          />
        </>
      );
    } catch (err) {
      console.error(err);
      navigate("/error");
    }
  };

  return (
    <>
      <div className="py-4 flex-col mx-auto justify-center">
        <div className="flex flex-col">
          {isInputVisible ? (
            <>
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
              <SearchContainer>
                <SearchInput
                  type="text"
                  value={searchInput || ""}
                  placeholder="전시, 작품, 작가를 검색해보세요."
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyUp={onKeyPressHandler}
                />
                <button onClick={handleSearchClick}>
                  <CloseIcon />
                </button>
              </SearchContainer>
              {/* {searchMode && (
                <SearchResult
                  searchMode={searchMode}
                  keyword={searchInput}
                  searchResults={searchResults}
                />
              )} */}
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
    </>
  );
}

const MainTextLogo = tw(MainLogo)`
fill-primary-YellowGreen
  w-30 h-fit mx-auto
  cursor-pointer
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
  my-4 mx-auto
`;

const SearchingIcon = tw(Searching)`
  w-6 h-6 fill-primary-YellowGreen
  hover:fill
`;

const CloseIcon = tw(IoIosCloseCircleOutline)`
  w-5 h-5 fill-primary-DarkGray
  hover:fill-red-400 mx-2
`;

// {searchMode && (
//  <Link to="/search">
//   <SearchResultPage
//     searchMode={searchMode}
//     keyword={searchInput}
//     searchResults={searchResults}
//   />
//    <SearchResult
//      searchMode={searchMode}
//      keyword={searchInput}
//      searchResults={searchResults}
//    />
//    </Link>
// )}

import React, { ReactHTML, useState } from "react";
import { loadImg } from "../assets/images";
import { ReactComponent as MainLogo } from "../assets/CustomSvg/main_text_logo.svg";
import tw from "tailwind-styled-components";

export default function Search_Bar(): JSX.Element {
  const svgStyle = {
    fill: "#608D00",
  };

  const [isInputVisible, setInputVisible] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchClick = () => {
    setInputVisible((prevVisible) => !prevVisible);
  };

  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // onSearchHandler();
      window.alert("검색완료");
    }
    setSearchInput("");
  };

  const onSearchHandler = async () => {};

  return (
    <div className="py-4 bg-red-100 flex-col mx-auto justify-center ">
      <div className="flex flex-col">
        {isInputVisible ? (
          <>
            <MainBarContainer>
              <MainTextLogo />
            </MainBarContainer>
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder="전시, 작품, 작가를 검색해보세요."
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyUp={onKeyPressHandler}
              />
              <button
                onClick={handleSearchClick}
                // onKeyPress={onKeyPressHandler}
              >
                <img
                  className="w-6 h-6 mr-2"
                  src={"./icons/Outline/search.svg"}
                  alt="Search"
                  style={{ fill: "#608D00" }}
                />
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
              <img
                className="w-6 h-6"
                src={"./icons/Outline/search.svg"}
                alt="Search"
                style={{ fill: "#608D00" }}
              />
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
flex border-primary-YellowGreen border-b-2 py-2 w-4/5 justify-center mx-auto
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

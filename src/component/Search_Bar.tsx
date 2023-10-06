import React, { useState } from "react";
import { loadImg } from "../assets/images";

export default function Search_Bar() {
  const svgStyle = {
    fill: "#608D00",
  };

  const [isInputVisible, setInputVisible] = useState<boolean>(false);

  const handleSearchClick = () => {
    setInputVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className="py-4 bg-red-100 flex-col mx-auto justify-center ">
      <div className="flex flex-col">
        {isInputVisible ? (
          <>
            <div className="flex border-primary-YellowGreen border-b-2 py-2 w-4/5 justify-center mx-auto">
              <img
                className="w-30 h-fit mx-auto"
                alt="main-logo"
                style={svgStyle}
                // style={{ filter: "brightness(0) invert(1) hue-rotate(120deg)" }}
                src={loadImg.Main_TextLogo}
              />
            </div>
            <div className="flex justify-between border-primary-YellowGreen border-2 bg-white w-4/5 rounded-xl mt-4 mx-auto">
              <input
                type="text"
                className="w-full h-fit rounded-l-xl bg-transparent indent-0 px-3"
              />
              <button onClick={handleSearchClick}>
                <img
                  className="w-6 h-6 "
                  src={"./icons/Outline/search.svg"}
                  alt="Search"
                  style={{ fill: "#608D00" }}
                />
              </button>
            </div>
          </>
        ) : (
          <div className="flex border-primary-YellowGreen border-b-2 py-2 w-4/5 justify-center mx-auto">
            <img
              className="w-30 h-fit mx-auto pl-6"
              alt="main-logo"
              style={svgStyle}
              // style={{ filter: "brightness(0) invert(1) hue-rotate(120deg)" }}
              src={loadImg.Main_TextLogo}
            />
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
          </div>
        )}
      </div>
    </div>
  );
}

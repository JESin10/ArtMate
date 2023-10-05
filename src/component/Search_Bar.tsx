import React from "react";
import { loadImg } from "../assets/images";

export default function Search_Bar() {
  const svgStyle = {
    fill: "#608D00",
  };

  return (
    <div className="py-4 bg-red-100 flex-col mx-auto justify-center ">
      <img
        className="w-36 h-fit"
        alt="main-logo"
        style={svgStyle}
        // style={{ filter: "brightness(0) invert(1) hue-rotate(120deg)" }}
        src={loadImg.Main_TextLogo}
      />
      <div className="flex">
        <input type="text" className="border-primary-YellowGreen border-2" />
        <img
          className="w-10 h-10"
          src={loadImg.Main_Logo}
          alt="Search"
          style={{ fill: "#608D00" }}
        />
      </div>
    </div>
  );
}

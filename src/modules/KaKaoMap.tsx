import React, { useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import tw from "tailwind-styled-components";
import { loadImg } from "../assets/images";
import { useNavigate } from "react-router-dom";

export interface MapModeProps {
  mapMode: boolean;
  setMapMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function KaKaoMap({ mapMode, setMapMode }: MapModeProps) {
  const MapModeHandler = (mapMode: boolean) => {
    setMapMode(false);
  };

  return (
    <div className="w-full h-screen justify-center">
      {/* button */}
      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold my-2 text-transparent">
          내 주변 갤러리
        </h1>

        <div className="flex space-x-2 mr-3">
          <button>
            <img src={loadImg.Map_current1} />
          </button>
          <button onClick={() => MapModeHandler(false)}>
            <img src={loadImg.Menu_List} />
          </button>
        </div>
      </div>
      {/* map */}
      <div className=" border-red-400 border-4 w-full h-[70%]">
        <MyMap
          center={{ lat: 37.568, lng: 126.977 }} // 지도의 중심 좌표
          level={4} // 지도 확대 레벨
          // style={{ width: "100px", height: "100px" }}
        ></MyMap>
      </div>
    </div>
  );
}

const MyMap = tw(Map)`
w-full h-full
`;

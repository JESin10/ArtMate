import React from "react";
import { Map } from "react-kakao-maps-sdk";

export default function KaKaoMap() {
  return (
    <div className="bg-white">
      <Map
        center={{ lat: 37.568, lng: 126.977 }} // 지도의 중심 좌표
        style={{ width: "370px", height: "600px" }} // 지도 크기
        level={4} // 지도 확대 레벨
      ></Map>
    </div>
  );
}

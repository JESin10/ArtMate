import React from "react";
import KaKaoMap from "../modules/KaKaoMap";

export default function NearBy() {
  return (
    <div className="w-full h-screen flex flex-col items-center bg-black/30 ">
      <input
        placeholder="장소, 주소를 검색해보세요"
        className=" w-[350px] h-[35px] my-4 mx-auto indent-4 text-sm border-black border-2 rounded-3xl"
      />
      <KaKaoMap />
    </div>
  );
}

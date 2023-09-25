import React from "react";
import tw from "tailwind-styled-components";
import { loadImg } from "../assets/images";

export default function RecommendSlider() {
  return (
    <RecommendSliderContainer>
      <h1>금주의 최신 전시 모음</h1>
      <ImageContainer>
        <div className="flex flex-col space-y-1">
          <RecommendImg_ver1 src={loadImg.EX_image1} />
          <RecommendImg_ver2 src={loadImg.EX_image2} />
        </div>
        <div className="flex flex-col space-y-1">
          <RecommendImg_ver2 src={loadImg.EX_image1} />
          <RecommendImg_ver1 src={loadImg.EX_image2} />
        </div>
      </ImageContainer>
      <div className="w-full bg-black/30 mx-auto text-center">Page Number</div>
    </RecommendSliderContainer>
  );
}

const RecommendSliderContainer = tw.div`
w-full h-[520px] mx-auto
justify-center items-center 
`;

const ImageContainer = tw.div`
w-11/12 h-fit flex
justify-center items-center
rounded-lg  mx-auto my-4

border-red-500 border-2
`;

const RecommendImg_ver1 = tw.img`
w-[150px] h-[250px] 
object-cover mx-1
border-blue-300 border-2
`;

const RecommendImg_ver2 = tw.img`
w-[150px] h-[140px] 
object-cover mx-2
border-black border-2
`;

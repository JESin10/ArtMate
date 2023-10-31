import React from "react";
import { loadImg } from "../../assets/images";
import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";
import { BsArrowRightSquare } from "react-icons/bs";

export default function Error() {
  const navigate = useNavigate();

  return (
    <ErrorContainer>
      <div className="flex flex-col items-center">
        <LogoDiv>
          <LogoImg src={loadImg.Main_Logo} />
          <LogoImg className="w-28" src={loadImg.Main_TextLogo} />
        </LogoDiv>
        <div className="space-y-2 text-center w-fit mx-auto">
          <p className="text-5xl text-white font-extrabold">404 Error</p>
          <p className="text-lg text-white font-semibold">
            현재 주소를 찾을 수 없습니다.
          </p>
        </div>
        <div className="flex my-4 items-center">
          {/* <p className="text-white text-2xl font-bold mr-4">I can't find</p> */}
          <GotoMainBtn onClick={() => navigate("/")}>
            <p className="mx-2"> Go to Main</p>
            <BsArrowRightSquare />
          </GotoMainBtn>
        </div>
      </div>
    </ErrorContainer>
  );
}

const ErrorContainer = tw.div`
bg-primary-YellowGreen/80 text-lg 
flex items-center justify-center 
h-screen w-full mt-[-30px]
`;

const LogoDiv = tw.div`
flex h-fit w-auto justify-center 
space-x-2 mb-10
`;

const LogoImg = tw.img`
h-[40px] w-auto
`;

const GotoMainBtn = tw.button`
p-2 border-none 
font-extrabold text-2xl 
flex justify-center items-center
hover:text-white

`;

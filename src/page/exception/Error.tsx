import React from "react";
import { IconLoad } from "../../assets/images";
import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  return (
    <ErrorContainer>
      <div className="flex flex-col items-center">
        <p className="text-3xl text-white font-extrabold mb-5">404 Error</p>
        <LogoDiv>
          <LogoImg src={IconLoad.Main_Logo} />
          <LogoImg src={IconLoad.Main_TextLogo} />
        </LogoDiv>
        <div className="flex my-4 items-center">
          {/* <p className="text-white text-2xl font-bold mr-4">I can't find</p> */}
          <GotoMainBtn onClick={() => navigate("/")}>Go to Main</GotoMainBtn>
        </div>
      </div>
    </ErrorContainer>
  );
}

const ErrorContainer = tw.div`
bg-primary-YellowGreen/80 text-lg 
flex items-center justify-center 
h-screen w-full
`;

const LogoDiv = tw.div`
flex h-fit w-auto justify-center 
`;

const LogoImg = tw.img`
h-[40px] w-auto
`;

const GotoMainBtn = tw.button`
py-[2px] px-[4px]
bg-white font-bold
border-primary-Gray border-2 rounded-xl
hover:bg-yellow-200

`;

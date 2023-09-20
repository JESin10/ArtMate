/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { IconLoad } from "../../assets/images";
import { Oval } from "react-loader-spinner";

export default function Loading() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 페이지 로딩 시 로딩 상태를 변경
    setTimeout(() => {
      setLoading(false);
    }, 3000); // 예시로 3초 후에 로딩을 종료하는 것으로 설정
  }, []);

  return (
    <LoadingContainer>
      <div className="flex flex-col justify-center items-center">
        <div style={{ display: loading ? "block" : "none" }}>
          {/* 로딩 스피너 */}
          <div className="w-fit h-fit mb-6">
            <Oval color="#608D00" height={50} width={50} ariaLabel="loading" />
          </div>
        </div>
        <LogoDiv>
          <LogoImg src={IconLoad.Main_Logo} />
          <LogoImg src={IconLoad.Main_TextLogo} />
        </LogoDiv>
      </div>
    </LoadingContainer>
  );
}

const LoadingContainer = tw.div`
bg-white text-lg 
flex items-center justify-center 
h-screen w-full
`;

const LogoDiv = tw.div`
flex h-fit w-auto justify-center 
`;

const LogoImg = tw.img`
h-[40px] w-auto
`;

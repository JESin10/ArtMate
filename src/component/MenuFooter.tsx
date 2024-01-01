import React from "react";
import tw from "tailwind-styled-components";
import { loadImg } from "../assets/images";

export default function MenuFooter() {
  return (
    <FooterContainer>
      <SNSLogoContainer>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noreferrer"
          aria-label="instagram-link"
        >
          <SNSLogoImg
            alt="insta-logo"
            src={loadImg.SNS_Insta_Logo}
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </a>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noreferrer"
          aria-label="youtube-link"
        >
          <SNSLogoImg
            alt="youtube-logo"
            src={loadImg.SNS_YouTube_Logo}
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </a>
        <a
          href="https://twitter.com/?lang=ko"
          target="_blank"
          rel="noreferrer"
          aria-label="twittwe-link"
        >
          <SNSLogoImg
            alt="twitter-logo"
            src={loadImg.SNS_Twitter_Logo}
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </a>
      </SNSLogoContainer>
      <FooterInfoContainer>
        <FooterInfoTag>이용약관</FooterInfoTag>
        <FooterInfoTag>개인정보취급약관</FooterInfoTag>
        <FooterInfoTag className="border-transparent">고객센터</FooterInfoTag>
      </FooterInfoContainer>
    </FooterContainer>
  );
}

const FooterContainer = tw.div`
bg-primary-Gray h-[240px] w-full
flex flex-col justify-center items-center
z-10 pb-[90px]
`;

const SNSLogoContainer = tw.div`
space-x-10 flex justify-center items-center
w-fit h-fit p-3 mx-auto mb-2
`;

const SNSLogoImg = tw.img`
cursor-pointer
hover:bg-black/80
rounded-lg
`;

const FooterInfoContainer = tw.div`
w-fit flex space-4 mx-auto
text-center justify-center  items-center
`;

const FooterInfoTag = tw.p`
border-white border-r-2 
mx-auto px-3 w-fit
text-white text-sm
cursor-pointer
`;

import React, { useEffect, useRef, useState } from "react";
import { loadImg } from "../assets/images";
import { useAuth } from "../modules/UserAuth_Google";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { ReactComponent as MainLogo } from "../assets/CustomSvg/main_text_logo.svg";
import { ReactComponent as DescLogo } from "../assets/CustomSvg/main_logo_desc.svg";
import { UserInfo } from "./Home";
import UserAuth_Naver from "../modules/UserAuth_Naver";
import { v4 as uidv } from "uuid";

export default function Login() {
  const { login, signup, signupWithGoogle, currentUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [getToken, setGetToken] = useState();
  const [userInfo, setUserInfo] = useState<UserInfo>();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string>("");
  const LoginUid = uidv();

  const SignupWithGoogleHandler = () => {
    setLoading(true);
    signupWithGoogle();
    navigate("/");
    setLoading(false);
  };

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("user_name", userInfo.name);
      localStorage.setItem("user_email", userInfo.email);
      localStorage.setItem("user_profile", userInfo.profileURL);
      localStorage.setItem("user_uid", userInfo.uid);
    }
  }, [userInfo?.uid]);

  // basic singup form
  const BasicLoginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      if (emailRef.current && passwordRef.current) {
        await (emailRef.current.value, passwordRef.current.value);
        localStorage.setItem("user_name", emailRef.current.value);
        localStorage.setItem("user_email", emailRef.current.value);
        localStorage.setItem("user_profile", "./favicon.ico");
        localStorage.setItem("user_uid", LoginUid);
      }
      window.location.replace("/");
    } catch (err) {
      setError("Fail to sign up");
    }
    setLoading(false);
  };

  // console.log(getToken, userInfo);
  console.log(userInfo);

  return (
    <div className="w-full h-screen flex flex-col mt-20 justify-center items-center">
      <div className="flex-col w-fit mx-auto justify-center mb-20">
        <MainTextLogo />
        <DescTextLogo />
      </div>
      <div className="flex-col flex justify-center w-fit">
        <form
          className="w-fit my-5 flex flex-col space-y-4"
          onSubmit={BasicLoginHandler}
        >
          <AuthInput type="text" placeholder="아이디" ref={emailRef} />
          <AuthInput type="text" placeholder="비밀번호" ref={passwordRef} />
          <div className="flex space-x-2 items-center w-fit mx-2">
            <input type="checkbox" className="w-4 h-4" />
            <p className="w-fit ">자동로그인</p>
          </div>
          <button className="bg-primary-YellowGreen rounded-3xl text-white w-[320px] h-[42px]">
            로그인
          </button>
        </form>
        <div className="flex justify-center w-fit mx-auto text-xs mb-4">
          <button className="mx-4">아이디 찾기</button>
          <button className="mx-4">비밀번호 찾기</button>
          <button className="mx-4">회원가입</button>
        </div>
        <div className="my-10 flex flex-col justify-center items-center border-t-2 border-primary-Gray/60">
          <p className="w-fit my-4 text-sm ">소셜로 시작하기</p>
          <div className="flex flex-col space-y-4 font-semibold">
            <SocialAuthBtn className="bg-[#FEE500]">
              <SocialAuthBtnContainer>
                <img alt="SocialAuth_Kakao" src={loadImg.Kakao_LoginBtn} />
                <p>카카오로 시작하기</p>
              </SocialAuthBtnContainer>
            </SocialAuthBtn>
            <SocialAuthBtn
              onClick={SignupWithGoogleHandler}
              className=" bg-white border-black border-2"
            >
              <SocialAuthBtnContainer>
                <img alt="SocialAuth_Google" src={loadImg.Google_LoginBtn} />
                <p> 구글로 시작하기</p>
              </SocialAuthBtnContainer>
            </SocialAuthBtn>
            <SocialAuthBtn className="bg-[#03C75A]">
              <SocialAuthBtnContainer>
                {/* <img
                  alt="SocialAuth_Naver"
                  className="w-10"
                  src={loadImg.Naver_LoginBtn}
                /> */}
                <UserAuth_Naver
                  setGetToken={setGetToken}
                  setNaverUserInfo={setUserInfo}
                />
                {/* <p>네이버로 시작하기</p> */}
              </SocialAuthBtnContainer>
            </SocialAuthBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

const MainTextLogo = tw(MainLogo)`
fill-primary-YellowGreen
h-[64px] w-[250px]
`;

const DescTextLogo = tw(DescLogo)`
fill-primary-Gray
h-[34px] w-[200px] mx-auto
`;

const AuthInput = tw.input`
w-[320px] h-[42px] 
border-primary-YellowGreen border-2 
rounded-3xl px-2 text-center

`;

const SocialAuthBtn = tw.button`
flex rounded-3xl items-center
w-[320px] h-[42px] pr-4
`;

const SocialAuthBtnContainer = tw.div`
flex w-fit justify-end items-center
mx-auto
`;

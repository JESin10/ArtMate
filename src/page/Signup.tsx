import React, { useEffect, useRef, useState } from "react";
import { loadImg } from "../assets/images";
import { useAuth } from "../page/context/AuthContext";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { ReactComponent as MainLogo } from "../assets/customSvg/main_text_logo.svg";
import { ReactComponent as DescLogo } from "../assets/customSvg/main_logo_desc.svg";
import Swal from "sweetalert2";
import { current } from "@reduxjs/toolkit";
import {
  errorAlert_verA,
  errorAlert_verB,
  errorAlert_verC,
} from "../modules/AlertModule";
import "../page/Signup_Css.css";
// import { UserInfo } from "./Home";
// import { v4 as uidv } from "uuid";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../Firebase";

export default function Signup() {
  const { signup, signupWithGoogle } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  // const [getToken, setGetToken] = useState();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const nicknameRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string>("");
  // const LoginUserUid = uidv();

  const SignupWithGoogleHandler = () => {
    setLoading(true);
    signupWithGoogle();
    navigate("/");
    setLoading(false);
  };

  // basic singup form
  const BasicLoginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      if (
        emailRef.current &&
        passwordRef.current
        // nicknameRef.current?.value
      ) {
        await signup(
          emailRef.current.value,
          passwordRef.current.value
          // nicknameRef.current?.value
        );
      }
      // window.alert("Welcome!");
      Swal.fire({
        width: "300px",
        icon: "success",
        position: "center",
        showCancelButton: false,
        text: "Welcome to artmate!",
        // html : "enjoy our page",
        confirmButtonColor: "#608D00",
        confirmButtonText: "확인",
        timer: 30000,
      });
      navigate("/my-page");
    } catch (err: any) {
      setError("Failed to create an account");
      switch (err.code) {
        case "auth/email-already-in-use":
          return errorAlert_verB();
        case "auth/network-request-failed" || "auth/internal-error":
          return errorAlert_verC();
        default:
          return errorAlert_verA();
      }
    } finally {
      setLoading(false);
      return loading;
    }
  };

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
          <AuthInput className="relative">
            <input
              className="Email-Input h-full indent-1"
              type="text"
              placeholder="이메일"
              ref={emailRef}
            />
            <p className="Email-Label text-primary-Gray absolute top-4">
              이메일을 입력해주세요.
            </p>
          </AuthInput>
          <AuthInput className="relative">
            <input
              className="PW-Input h-full indent-1"
              type="text"
              placeholder="비밀번호"
              ref={passwordRef}
            />
            <p className="PW-Label text-primary-Gray absolute top-4">
              비밀번호는 8-20자 사이여야 합니다.
            </p>
          </AuthInput>
          <button
            // onClick={UserSaving}
            className="bg-primary-YellowGreen rounded-3xl text-white w-[320px] h-[42px]"
          >
            회원가입
          </button>
        </form>
        <div className="flex justify-center w-fit mx-auto text-xs mb-4"></div>
        <div className="my-10 flex flex-col justify-center items-center border-t-2 border-primary-Gray/60">
          <p className="w-fit my-4 text-sm ">소셜로 시작하기</p>
          <div className="flex flex-col space-y-4 font-semibold">
            <SocialAuthBtn className="bg-[#FEE500]">
              {/* <SocialAuthBtnContainer>
                <img alt="SocialAuth_Kakao" src={loadImg.Kakao_LoginBtn} />
                <p>카카오로 시작하기</p>
              </SocialAuthBtnContainer> */}
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
              {/* <SocialAuthBtnContainer>
                <img
                  alt="SocialAuth_Naver"
                  className="w-10"
                  src={loadImg.Naver_LoginBtn}
                /> 
              <UserAuth_Naver
                  setGetToken={setGetToken}
                  setNaverUserInfo={setUserInfo}
                /> 
                <p>네이버로 시작하기</p>
              </SocialAuthBtnContainer> */}
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

const AuthInput = tw.div`
w-[320px] h-[52px]
border-primary-YellowGreen border-2 
rounded-3xl  py-2 px-6
`;

const SocialAuthBtn = tw.button`
flex rounded-3xl items-center
w-[320px] h-[42px] pr-4
`;

const SocialAuthBtnContainer = tw.div`
flex w-fit justify-end items-center
mx-auto
`;

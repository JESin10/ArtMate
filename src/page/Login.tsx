import React, { useRef, useState } from "react";
import { loadImg } from "../assets/images";
import { useAuth } from "../page/context/AuthContext";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { ReactComponent as MainLogo } from "../assets/customSvg/main_text_logo.svg";
import { ReactComponent as DescLogo } from "../assets/customSvg/main_logo_desc.svg";
import Swal from "sweetalert2";
import {
  errorAlert_verA,
  errorAlert_verB,
  errorAlert_verC,
} from "../modules/AlertModule";

export default function Login() {
  const { login, signupWithGoogle } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  // const [getToken, setGetToken] = useState();
  // const [userInfo, setUserInfo] = useState<UserInfo>();
  // const LoginUserUid = uidv();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  // const [error, setError] = useState<string>("");

  const SignupWithGoogleHandler = () => {
    // setLoading(true);
    signupWithGoogle();
    window.location.replace("/");
    // setLoading(false);
  };

  // basic login form
  const BasicLoginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(!loading);
      if (emailRef.current && passwordRef.current) {
        await login(emailRef.current.value, passwordRef.current.value);
      } else {
        Swal.fire({
          width: "300px",
          icon: "warning",
          position: "center",
          showCancelButton: false,
          title: "로그인 정보를 입력하세요",
          confirmButtonColor: "#608D00", // confrim 버튼 색깔 지정
          cancelButtonColor: "#6F6F6F", // cancel 버튼 색깔 지정
          confirmButtonText: "확인", // confirm 버튼 텍스트 지정
          timer: 30000,
        });
      }
      window.location.replace("/");
    } catch (err: any) {
      switch (err.code) {
        case "auth/email-already-in-use":
          return errorAlert_verB();
        case "auth/internal-error":
          return errorAlert_verC();
        default:
          return errorAlert_verA();
      }
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex flex-col  justify-center items-center">
      <div className="flex-col w-fit mx-auto justify-center mb-20 pt-24">
        <MainTextLogo />
        <DescTextLogo />
      </div>
      <div className="flex-col flex justify-center w-fit">
        <form
          className="w-fit my-5 flex flex-col space-y-4"
          onSubmit={BasicLoginHandler}
        >
          <AuthInput type="text" placeholder="이메일" ref={emailRef} />
          <AuthInput type="text" placeholder="비밀번호" ref={passwordRef} />
          {/* <div className="flex space-x-2 items-center w-fit mx-2">
            <input type="checkbox" className="w-4 h-4" />
            <p className="w-fit ">자동로그인</p>
          </div> */}
          <button className="bg-primary-YellowGreen rounded-3xl text-white w-[320px] h-[42px]">
            로그인
          </button>
        </form>
        <div className="flex justify-center w-fit mx-auto text-xs mb-4">
          <button className="mx-4">이메일 찾기</button>
          <button className="mx-4 text-primary-Gray cursor-not-allowed">
            비밀번호 찾기
          </button>
          <button className="mx-4" onClick={() => navigate("/sign-up")}>
            회원가입
          </button>
        </div>
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

import React from "react";
import { loadImg } from "../assets/images";

export default function Login() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <img
        className="h-[64px]"
        src={loadImg.Main_TextLogo}
        style={{ fill: "#608D00" }}
      />
      <img className="h-[34px]" src={"./icons/Outline/main_logo_desc.svg"} />
      <div className="flex-col flex justify-center w-fit">
        <div className="w-fit my-5 flex flex-col space-y-4">
          <input
            type="text"
            className="border-primary-YellowGreen border-2 rounded-3xl px-2 w-[320px] h-[42px]"
            placeholder="아이디"
          />
          <input
            type="text"
            className="border-primary-YellowGreen border-2 rounded-3xl px-2 w-[320px] h-[42px]"
            placeholder="비밀번호"
          />
          <div className="flex space-x-2 items-center w-fit">
            <input type="radio" className="w-[18px] h-[18px]" />
            <p className="w-fit ">자동로그인</p>
          </div>
          <button className="bg-primary-YellowGreen rounded-3xl text-white w-[320px] h-[42px]">
            로그인
          </button>
        </div>
        <div className="flex justify-center w-fit mx-auto">
          <button className="bg-blue-200 mx-2">아이디 찾기</button>
          <button className="bg-blue-300 mx-2">비밀번호 찾기</button>
          <button className="bg-blue-400 mx-2">회원가입</button>
        </div>
        <div className="my-4 flex flex-col justify-center items-center">
          <p className="w-fit my-4">소셜로 시작하기</p>
          <div className="flex flex-col space-y-4">
            <button className="bg-yellow-400 rounded-3xl w-[320px] h-[42px]">
              카카오 로그인
            </button>
            <button className="bg-white border-black border-2 rounded-3xl w-[320px] h-[42px]">
              구글 로그인
            </button>
            <button className="bg-green-600 rounded-3xl w-[320px] h-[42px]">
              네이버 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

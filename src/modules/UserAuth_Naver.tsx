import React, { useEffect, useState } from "react";
import { UserInfo } from "../page/Home";

declare global {
  interface Window {
    naver: any;
  }
}

export default function UserAuth_Naver({
  setGetToken,
  setNaverUserInfo,
}: {
  setGetToken: any;
  setNaverUserInfo: any;
}) {
  const { naver } = window;
  const [userInfo, setUserInfo] = useState<UserInfo>();
  // console.log(naver);

  const initializeNaver = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: `${process.env.REACT_APP_NAVER_CLIENTID}`,
      callbackUrl: "http://localhost:3000/login",
      isPopup: false,
      loginButton: { color: "green", type: 3, height: 20 },
      callbackHandle: true,
    });
    naverLogin.init();
    naverLogin.getLoginStatus(async function (status: any) {
      if (status) {
        const user_email = naverLogin.user.getEmail();
        const user_name = naverLogin.user.getName();

        // console.log(user_name, user_email);
        setNaverUserInfo({ ...naverLogin.user });
        setUserInfo({
          uid: naverLogin.user.id,
          name: naverLogin.user.nickname,
          profileURL: naverLogin.user.profile_image,
          email: naverLogin.user.email,
        });
      }
    });
  };

  const userAccessToken = () => {
    window.location.href.includes("access_token") && getToken();
  };

  const getToken = () => {
    const currentURL = window.location.href;
    const url = new URL(currentURL);
    const token = url.hash.split("=")[1];

    // console.log(token);
    localStorage.setItem("access_token", token);
  };

  // 화면 첫 렌더링이후 바로 실행하기 위해 useEffect 를 사용하였다.
  useEffect(() => {
    initializeNaver();
    userAccessToken();
    getToken();

    if (userInfo) {
      localStorage.setItem("user_name", userInfo.name);
      localStorage.setItem("user_email", userInfo.email);
      localStorage.setItem("user_profile", userInfo.profileURL);
      localStorage.setItem("user_uid", userInfo.uid);
    }
  }, []);

  console.log(userInfo);

  // 구현할 위치에 아래와 같이 코드를 입력해주어야 한다.
  // 태그에 id="naverIdLogin" 를 해주지 않으면 오류가 발생한다!
  return <div id="naverIdLogin"></div>;
}

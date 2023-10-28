import React, { useEffect } from "react";

export default function Auth_Api() {
  const { naver } = window;

  console.log(naver);

  const initializeNaver = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: `${process.env.REACT_APP_NAVER_CLIENTID}`,
      callbackUrl: "http://localhost:3000",
      // 팝업창으로 로그인을 진행할 것인지?
      isPopup: false,
      // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
      loginButton: { color: "green", type: 3, height: 58 },
      callbackHandle: true,
    });
    naverLogin.init();
    // naverLogin.getLoginStatus(async function (status) {
    //   if (status) {
    //     // 아래처럼 선택하여 추출이 가능하고,
    //     const userid = naverLogin.user.getEmail();
    //     const username = naverLogin.user.getName();
    //     // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다.
    //     // setUserInfo(naverLogin.user)
    //   }
    // });
  };
  const userAccessToken = () => {
    window.location.href.includes("access_token") && getToken();
  };
  const getToken = () => {
    const token = window.location.href.split("=")[1].split("&")[0];
    // console.log, alert 창을 통해 어스코드가 잘 추출 되는지 확인하자!

    // 이후 로컬 스토리지 또는 state에 저장하여 사용하자!
    // localStorage.setItem('access_token', token)
    // setGetToken(token)
  };

  // 화면 첫 렌더링이후 바로 실행하기 위해 useEffect 를 사용하였다.
  useEffect(() => {
    initializeNaver();
    userAccessToken();
  }, []);

  // 구현할 위치에 아래와 같이 코드를 입력해주어야 한다.
  // 태그에 id="naverIdLogin" 를 해주지 않으면 오류가 발생한다!
  return <div id="naverIdLogin"></div>;
}

/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import { loadImg } from "../assets/images";
import { useAuth } from "../modules/UserAuth_Google";
import { useNavigate } from "react-router-dom";
// import { ReactComponent as BookMarkIcon } from "../assets/CustomSvg/bookmark.svg";
// import { ReactComponent as LikeIcon } from "../assets/CustomSvg/like.svg";
import tw from "tailwind-styled-components";
import { UserInfo } from "./Home";

export default function Mypage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>();

  useEffect(() => {
    if (!userInfo) {
      return navigate("/login");
    } else {
      setUserInfo({
        uid: localStorage.getItem("user_uid") || "",
        name: localStorage.getItem("user_name") || "",
        profileURL: localStorage.getItem("user_profile") || "",
        email: localStorage.getItem("user_email") || "",
        access_token: localStorage.getItem("access_token") || "",
      });
    }
  }, []);

  console.log("userInfo: ", userInfo);

  const googleLogoutHandler = async () => {
    try {
      await logout();
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="flex w-full justify-end px-4 space-x-2 pt-5 cursor-pointer">
        <button>
          <img alt="notify_icon" src={"./icons/Outline/notification.svg"} />
        </button>
        <button>
          <img alt="share_icon" src={"./icons/Outline/share.svg"} />
        </button>
        <button>
          <img alt="setting_icon" src={"./icons/Outline/setting.svg"} />
        </button>
      </div>
      <div className="w-fit mx-auto my-5">
        <div className="bg-primary-YellowGreen w-[350px] h-[250px] rounded-xl shadow-md py-4">
          <div className="flex p-4 h-fit  my-auto">
            {userInfo && userInfo.profileURL ? (
              <img
                alt="user_img"
                src={userInfo.profileURL}
                className="w-[80px] h-[80px] mx-3 bg-white shadow-lg rounded-full"
              />
            ) : null}
            <div className="text-white flex flex-col justify-center ml-4 ">
              {userInfo && userInfo.name ? (
                <div className="text-xl flex space-x-3">
                  <p>{userInfo.name}</p>
                  <button
                    onClick={googleLogoutHandler}
                    className="bg-white border-2 border-solid rounded-md text-sm px-2 text-black"
                  >
                    Logout
                  </button>
                </div>
              ) : null}
              <div className="flex">
                <div className="flex mr-2">
                  <p>팔로워</p>
                  <p>00</p>
                </div>
                <div className="flex mx-2">
                  <p>팔로잉</p>
                  <p>00</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-6 w-fit justify-center mx-auto my-4">
            <MyPage_Btn>
              {/* <Review_Icon /> */}
              <MyPage_BtnImg alt="review" src={"./icons/Outline/receipt.svg"} />
              <MyPage_BtnLabel>관람 내역</MyPage_BtnLabel>
            </MyPage_Btn>
            <MyPage_Btn>
              {/* <BookMark_Icon /> */}
              <MyPage_BtnImg
                alt="bookmark"
                src={"./icons/Outline/bookmark.svg"}
              />
              <MyPage_BtnLabel>스크랩북</MyPage_BtnLabel>
            </MyPage_Btn>
            <MyPage_Btn>
              {/* <Like_Icon /> */}
              <MyPage_BtnImg alt="like" src={"./icons/Outline/like.svg"} />
              <MyPage_BtnLabel>좋아요</MyPage_BtnLabel>
            </MyPage_Btn>
          </div>
        </div>
        <div>
          <p className="w-fit my-4">나의 후기 목록</p>
          <ReviewContainer>
            <ReviewImg alt="preview" src={loadImg.EX_image1} />
            <ReviewImg alt="preview" src={loadImg.EX_image2} />
            <ReviewImg alt="preview" src={loadImg.EX_image1} />
            <ReviewImg alt="blank" />
            <ReviewImg alt="blank" />
            <ReviewImg alt="blank" />
          </ReviewContainer>
        </div>
      </div>
    </div>
  );
}

const MyPage_Btn = tw.button`
cursor-pointer mx-auto 
w-[80px] h-[80px] px-2
hover:font-semibold hover:bg-white/10 hover:rounded-full
`;

const MyPage_BtnImg = tw.img`
w-[40px] h-[40px] mx-auto
`;

const MyPage_BtnLabel = tw.p`
w-fit text-white mx-auto
`;

const ReviewContainer = tw.div`
grid grid-cols-3 w-[330px] mx-auto
`;

const ReviewImg = tw.img`
w-[100px] h-[120px] rounded-2xl bg-white my-1 border-2
`;

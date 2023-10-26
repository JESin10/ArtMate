import React, { useEffect } from "react";
import { loadImg } from "../assets/images";
import { useAuth } from "../modules/UserAuth";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

export default function Mypage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      return navigate("/login");
    }
  });

  const googleLogoutHandler = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-screen bg-black/30">
      <div className="flex justify-end w-full space-x-2 pt-5">
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
            {currentUser && currentUser.photoURL ? (
              <img
                alt="user_img"
                src={currentUser.photoURL}
                className="w-[80px] h-[80px] mx-3 bg-white shadow-lg rounded-full"
              />
            ) : null}
            <div className="text-white flex flex-col justify-center ml-4 ">
              {currentUser && currentUser.displayName ? (
                <div className="text-xl flex space-x-3">
                  <p>{currentUser.displayName}</p>
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
          <div className="flex space-x-10 w-fit justify-center mx-auto my-4">
            <div className="flex flex-col justify-center items-center">
              <img
                alt="record_icon"
                src={"./icons/Outline/receipt.svg"}
                className="w-[40px] h-[40px]"
              />
              <p className="w-fit text-white">관람 내역</p>
            </div>
            <div className="flex flex-col">
              <img
                alt="bookmark_icon"
                src={"./icons/Outline/bookmark.svg"}
                className="w-[40px] h-[40px]"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <p className="w-fit text-white">스크랩북</p>
            </div>
            <div className="flex flex-col">
              <img
                alt="like_icon"
                src={"./icons/Outline/like.svg"}
                className="w-[40px] h-[40px]"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <p className="w-fits text-white">좋아요</p>
            </div>
          </div>
        </div>
        <div>
          <p className="w-fit my-4">나의 후기 목록</p>
          <div className="grid grid-cols-3 w-[330px] mx-auto">
            <img
              alt="preview"
              className="w-[100px] h-[120px] rounded-2xl my-1"
              src={loadImg.EX_image1}
            />
            <img
              alt="preview"
              className="w-[100px] h-[120px] rounded-2xl my-1"
              src={loadImg.EX_image2}
            />
            <img
              alt="preview"
              className="w-[100px] h-[120px] rounded-2xl my-1"
              src={loadImg.EX_image1}
            />
            <img
              alt="blank"
              className="w-[100px] h-[120px] rounded-2xl bg-white"
            />
            <img
              alt="blank"
              className="w-[100px] h-[120px] rounded-2xl bg-white"
            />
            <img
              alt="blank"
              className="w-[100px] h-[120px] rounded-2xl bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from "react";
import { loadImg } from "../assets/images";
import { useAuth } from "../modules/UserAuth";
import { useNavigate } from "react-router-dom";
// import { ReactComponent as BookMarkIcon } from "../assets/CustomSvg/bookmark.svg";
// import { ReactComponent as LikeIcon } from "../assets/CustomSvg/like.svg";
// import { ReactComponent as ReviewIcon } from "../assets/CustomSvg/receipt.svg";
import tw from "tailwind-styled-components";

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
    <div className="w-full h-screen">
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

// const BookMark_Icon = tw(BookMarkIcon)`
// w-[40px] h-[40px] mx-auto
// fill-white
// hover:fill-primary-YellowGreen
// `;

// const Review_Icon = tw(ReviewIcon)`
// w-[40px] h-[40px] mx-auto
// fill-white
// hover:fill-primary-YellowGreen
// `;

// const Like_Icon = tw(LikeIcon)`
// w-[40px] h-[40px] mx-auto
// fill-white
// hover:fill-primary-YellowGreen
// `;

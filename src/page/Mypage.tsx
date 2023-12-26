import { useEffect, useState } from "react";
import { loadImg } from "../assets/images";
import { Route, useNavigate } from "react-router-dom";
// import { ReactComponent as BookMarkIcon } from "../assets/CustomSvg/bookmark.svg";
// import { ReactComponent as LikeIcon } from "../assets/CustomSvg/like.svg";
import tw from "tailwind-styled-components";
import { UserInfo } from "./Home";
import { useAuth } from "./context/AuthContext";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import "firebase/compat/firestore";
import { db } from "../Firebase";
import { v4 as uidv } from "uuid";
import Saving from "./Saving";
import { FaFilePen } from "react-icons/fa6";

export default function Mypage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  // const UserUid = uidv();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const UserlistRef = collection(db, `userInfo/${currentUser?.uid}/UserInfo`);
  const SavinglistRef = collection(
    db,
    `userInfo/${currentUser?.uid}/ArtworkInfo`
  );
  const MyReviewRef = collection(db, `userInfo/${currentUser?.uid}/Reviews`);
  const MyReviewInfo = useCollectionData(MyReviewRef)[0];
  // const LikedReviewRef = collection(
  //   db,
  //   `userInfo/${currentUser?.uid}/MyLikeReviews`
  // );
  // const LikedReviewInfo = useCollectionData(LikedReviewRef)[0];

  const NowUserInfo = useCollectionData(UserlistRef);
  const MyArtworkInfo = useCollectionData(SavinglistRef)[0];
  const LoginUserUid = uidv();

  // console.log(MyReviewInfo);
  // console.log(NowUserInfo);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      setUserInfo({
        userId: LoginUserUid,
        uid: currentUser.uid,
        name: currentUser.displayName,
        profileURL: currentUser.photoURL,
        email: currentUser.email,
        // access_token?: string;
      });
      // UserSaving();
    }
  }, []);

  const googleLogoutHandler = async () => {
    try {
      await logout();
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  // console.log(currentUser);

  // const UserSaving = async () => {
  //   const docRef = await setDoc(
  //     doc(db, `userList/${currentUser.uid}/userInfo`, LoginUserUid),
  //     {
  //       id: currentUser?.uid,
  //       Email: userInfo?.email,
  //       NickName: userInfo?.name,
  //       ProfileURL: userInfo?.profileURL,
  //       FollowerCount: 0,
  //       FollowingCount: 0,
  //       ReviewList: [],
  //       LikePostList: [],
  //       SavePostList: [],
  //     }
  //   );
  //   console.log(docRef);
  // };

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
            {currentUser && currentUser.photoURL ? (
              <img
                alt="user_img"
                src={currentUser.photoURL}
                className="w-[80px] h-[80px] mx-3 bg-white shadow-lg rounded-full"
              />
            ) : (
              <img
                alt="user_img"
                src={"./favicon.ico"}
                className="w-[80px] h-[80px] mx-3 bg-white shadow-lg rounded-full"
              />
            )}
            <div className="text-white flex flex-col justify-center ml-4 ">
              <div className=" font-extrabold flex space-x-3 text-center items-center justify-center my-auto">
                {currentUser && currentUser.displayName ? (
                  <p className="text-xl h-fit overflow-hidden text-center items-center">
                    {currentUser.displayName}
                  </p>
                ) : (
                  <p className="text-xl h-fit overflow-hidden text-center items-center">
                    {currentUser.email.split("@", 1)[0]}
                  </p>
                )}

                {/* <p>{currentUser.displayName}</p> */}
                <div className="flex space-x-2 justify-center px-2">
                  {/* <button
                    className="bg-transparent outline-none rounded-md text-sm px-2"
                  > */}
                  <img
                    className="cursor-pointer"
                    src={"./icons/Outline/user_edit.svg"}
                    alt="user-edit"
                  />
                  <img
                    className="cursor-pointer "
                    src={loadImg.User_LogOut}
                    alt="user-logout"
                    onClick={googleLogoutHandler}
                  />
                </div>
              </div>

              <div className="flex text-xs">
                <div className="flex mr-2 mt-2 space-x-1">
                  <p>팔로워</p>
                  <p>00</p>
                </div>
                <div className="flex mx-2 mt-2 space-x-1">
                  <p>팔로잉</p>
                  <p>00</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-6 w-fit justify-center mx-auto my-4">
            <MyPageBtn>
              {/* <Review_Icon /> */}
              <MyPageBtnImg alt="review" src={"./icons/Outline/receipt.svg"} />
              <MyPageBtnLabel>관람 내역</MyPageBtnLabel>
            </MyPageBtn>
            <MyPageBtn onClick={() => navigate("/my-page/saving")}>
              {/* <BookMark_Icon /> */}
              <MyPageBtnImg
                alt="bookmark"
                src={"./icons/Outline/bookmark.svg"}
              />
              <MyPageBtnLabel>스크랩북</MyPageBtnLabel>
            </MyPageBtn>
            <MyPageBtn onClick={() => navigate("/my-page/liked")}>
              {/* <Like_Icon /> */}
              <MyPageBtnImg alt="like" src={"./icons/Outline/like.svg"} />
              <MyPageBtnLabel>좋아요</MyPageBtnLabel>
            </MyPageBtn>
          </div>
        </div>
        <div>
          <p className="w-fit mt-10 mx-2 font-extrabold text-lg">
            나의 후기 목록
          </p>
          {/* <div className="flex my-4 bg-black mx-auto justify-center"> */}
          {/* <ReviewContainer> */}
          {MyReviewInfo && MyReviewInfo.length > 0 ? (
            <ReviewContainer>
              {MyReviewInfo.map((list: any, index: number) => (
                <ReviewImg alt="preview" src={list.Img[0]} key={index} />
              ))}
            </ReviewContainer>
          ) : (
            <div className=" mx-auto w-3/4 flex flex-col text-center mt-10 font-semibold">
              <p className="text-sm text-primary-DarkGray">
                리뷰를 등록해보세요!
              </p>
              <GotoReviewBtn onClick={() => navigate("/review")}>
                <p className="mx-2">첫 리뷰 남기기</p>
                <FaFilePen />
              </GotoReviewBtn>
            </div>
          )}
          {/* </div> */}
          {/* </ReviewContainer> */}
        </div>
      </div>
    </div>
  );
}

const MyPageBtn = tw.button`
cursor-pointer mx-auto 
w-[80px] h-[80px] px-2
hover:font-semibold hover:bg-white/10 hover:rounded-full
`;

const MyPageBtnImg = tw.img`
w-[40px] h-[40px] mx-auto
`;

const MyPageBtnLabel = tw.p`
w-fit text-white mx-auto
`;

const ReviewContainer = tw.div`
grid grid-cols-3 w-[330px]
mx-auto my-4
`;

const ReviewImg = tw.img`
w-[100px] h-[120px] rounded-2xl bg-white my-1 border-2
`;

const GotoReviewBtn = tw.button`
p-2 border-none text-base
font-extrabold mt-4 
flex justify-center items-center
hover:text-primary-YellowGreen
hover:underline
`;

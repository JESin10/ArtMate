import { useEffect, useState } from "react";
import { loadImg } from "../assets/images";
import { useNavigate } from "react-router-dom";
// import { ReactComponent as BookMarkIcon } from "../assets/CustomSvg/bookmark.svg";
// import { ReactComponent as LikeIcon } from "../assets/CustomSvg/like.svg";
import tw from "tailwind-styled-components";
import { UserInfo } from "./Home";
import { useAuth } from "./context/AuthContext";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import "firebase/compat/firestore";
import { db, storage } from "../Firebase";
import { v4 as uidv } from "uuid";
// import Saving from "./Saving";
import { FaFilePen } from "react-icons/fa6";
import UserSettingModal from "../component/UserSettingModal";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { ref, uploadBytes, listAll, getDownloadURL } from "@firebase/storage";
import { BiSolidImageAdd } from "react-icons/bi";
import { updateProfile } from "firebase/auth";

export default function Mypage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  // const UserUid = uidv();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [nickname, setNickName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [IsEditMode, setIsEditMode] = useState<boolean>(false);

  // const UserlistRef = collection(db, `userInfo/${currentUser?.uid}/UserInfo`);
  // const SavinglistRef = collection(
  //   db,
  //   `userInfo/${currentUser?.uid}/ArtworkInfo`
  // );
  const MyReviewRef = collection(db, `userInfo/${currentUser?.uid}/Reviews`);
  const MyReviewInfo = useCollectionData(MyReviewRef)[0];
  // const LikedReviewRef = collection(
  //   db,
  //   `userInfo/${currentUser?.uid}/MyLikeReviews`
  // );
  // const LikedReviewInfo = useCollectionData(LikedReviewRef)[0];

  // const NowUserInfo = useCollectionData(UserlistRef);
  // const MyArtworkInfo = useCollectionData(SavinglistRef)[0];
  const LoginUserUid = uidv();
  // const BasicImage = ref(storage, "Basic");
  // const [basicImageUrl, setBasicImageUrl] = useState<string[]>([]);

  const [ProfileImageUpload, setProfileImageUpload] = useState<File | null>(
    null
  );
  const [profileImgUrl, setProfileImgURL] = useState<string[]>([]);
  const ProfileImage = ref(storage, `UserProfile/${currentUser.uid}`);
  const CommentRef = collection(db, `userInfo/${currentUser?.uid}/MyReviews`);
  const MyCommentList = useCollectionData(CommentRef)[0];
  // console.log(ProfileImage);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      // const getImageUrl = async () => {
      //   const imageUrl = await getDownloadURL(BasicImage);
      //   setBasicImageUrl([imageUrl]);
      // };
      setUserInfo({
        userId: LoginUserUid,
        uid: currentUser.uid,
        name: currentUser.displayName,
        profileURL: ["./favicon.ico"],
        // profileURL: currentUser.photoURL,
        email: currentUser.email,
        // access_token?: string;
      });
      // UserSaving();
      // getImageUrl();
    }
  }, []);

  //Log-out
  const googleLogoutHandler = async () => {
    try {
      await logout();
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  //Modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //Copy
  const handleCopyClipBoard = async () => {
    const URL = window.location.href;

    try {
      await navigator.clipboard.writeText(URL);
      // window.alert("클립보드에 복사되었습니다");
      Swal.fire({
        width: "300px",
        position: "center",
        icon: "success",
        titleText: "COPY SUCCESS!",
        html: "클립보드에 복사되었습니다.",
        confirmButtonText: "OK",
        confirmButtonColor: "#608D00",
        timer: 300000,
      });
    } catch (err) {
      window.alert("복사에 실패하였습니다. 다시 시도 해주세요");
      console.error(err);
    }
  };

  const onUserInfoEditHandler = async () => {
    setIsEditMode(true);
  };

  const onImageUpload = async (profileImage: any) => {
    if (profileImage !== null) {
      const imageRef = ref(
        storage,
        `UserProfile/${currentUser.uid}/${profileImage.name}`
      );
      await uploadBytes(imageRef, profileImage);
      const imageURL = await getDownloadURL(imageRef);
      setProfileImgURL([imageURL]);
      console.log(imageURL);
    }
    console.log(typeof profileImgUrl, profileImgUrl);
    return profileImgUrl;
  };
  // console.log(currentUser);

  const onEditCompleteHandler = async () => {
    setIsEditMode(false);
    if (currentUser.displayName !== nickname) {
      await updateProfile(currentUser, {
        displayName: nickname,
      });
      await updateDoc(
        doc(db, `userInfo/${currentUser.uid}/UserInfo/${currentUser.email}`),
        { NickName: nickname }
      );
    }
    if (currentUser.photoURL !== profileImage) {
      onImageUpload(profileImage);
      // if (ProfileImageUpload !== null) {
      //   const imageRef = ref(
      //     storage,
      //     `UserProfile/${currentUser.uid}/${ProfileImageUpload.name}`
      //   );
      //   await uploadBytes(imageRef, ProfileImageUpload);
      //   const imageURL = await getDownloadURL(imageRef);
      //   setProfileImgURL(imageURL);
      // }
      // await updateProfile(currentUser, { photoURL: profileImgUrl });
      await updateDoc(
        doc(db, `userInfo/${currentUser.uid}/UserInfo/${currentUser.email}`),
        { ProfileURL: profileImgUrl }
      );
    }
    navigate("/");
  };

  // console.log(profileImage);

  return (
    <div className="w-full h-screen mb-[70px]">
      <div className="flex w-full justify-end px-4 space-x-2 pt-5 cursor-pointer">
        <button>
          <img alt="notify_icon" src={"./icons/Outline/notification.svg"} />
        </button>
        <button onClick={handleCopyClipBoard}>
          <img alt="share_icon" src={"./icons/Outline/share.svg"} />
        </button>
        <button onClick={() => openModal()}>
          <img alt="setting_icon" src={"./icons/Outline/setting.svg"} />
        </button>
      </div>
      <div className="w-fit mx-auto my-5">
        <div className="bg-primary-YellowGreen w-[350px] h-[250px] rounded-xl shadow-md py-4">
          {IsEditMode ? (
            // Edit-Mode
            <div className="flex p-4 h-fit  my-auto">
              <div className="flex flex-col w-fit relative ">
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
                <div className="  w-auto h-6 inline-block absolute bottom-0 right-0">
                  {/* <BiSolidImageAdd size="100%" color="white"> */}
                  <input
                    className="text-black cursor-pointer"
                    id="Profile-Image"
                    type="file"
                    placeholder={currentUser.photoURL}
                    // value={profileImage}
                    // onChange={(e) => setProfileImage(e.target.value)}
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setProfileImage(e.target.files[0]);
                      }
                    }}
                  />
                  {/* <button onClick={onImageUpload}>업로드</button> */}
                  {/* </BiSolidImageAdd> */}
                </div>
              </div>
              <div className="text-white flex flex-col justify-center ml-4 ">
                <div className=" font-extrabold flex space-x-3 text-center items-center justify-center my-auto">
                  <p className="text-xl h-fit overflow-hidden text-center items-center">
                    <input
                      className="text-black w-32 indent-1 font-normal text-base outline-none rounded-sm"
                      id="NickNameInput"
                      type="text"
                      placeholder={currentUser.displayName}
                      value={nickname}
                      onChange={(e) => setNickName(e.target.value)}
                    />
                  </p>
                  <div className="flex space-x-2 justify-center w-6">
                    <button
                      className="cursor-pointer "
                      onClick={onEditCompleteHandler}
                    >
                      <CheckBtn size="100%" />
                    </button>
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
          ) : (
            // Normal-Mode
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
                <div className=" font-extrabold flex space-x-3 text-left items-center justify-center my-auto">
                  {currentUser && currentUser.displayName ? (
                    <p className="text-xl w-32 h-fit overflow-hidden text-left items-center">
                      {currentUser.displayName}
                    </p>
                  ) : (
                    <p className="text-xl w-32 text-left h-fit overflow-hidden  items-center">
                      {currentUser.email.split("@", 1)[0]}
                    </p>
                  )}

                  <div className="flex space-x-2 justify-center px-2">
                    <button onClick={onUserInfoEditHandler}>
                      <img
                        className="cursor-pointer"
                        src={"./icons/Outline/user_edit.svg"}
                        alt="user-edit"
                      />
                    </button>
                    <button onClick={googleLogoutHandler}>
                      <img
                        className="cursor-pointer "
                        src={loadImg.User_LogOut}
                        alt="user-logout"
                      />
                    </button>
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
          )}

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
        <div>
          <p className="w-fit mt-10 mx-2 font-extrabold text-lg">
            내가 작성한 댓글
          </p>
          {MyCommentList &&
            MyCommentList.map((comment: any, index: number) => (
              <div>
                <div className="text-xs text-primary-Gray">
                  {comment.Comment_ID}
                </div>
                <div className="flex justify-between" key={index}>
                  <div>{comment.Comment}</div>
                  <div>{comment.Written_Date}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {isModalOpen && (
        <UserSettingModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          currentUser={currentUser}
        />
      )}
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

const CheckBtn = tw(FaCheckCircle)`
hover:fill-primary-Yellow
hover:rotate-y-360 hover:duration-500
`;

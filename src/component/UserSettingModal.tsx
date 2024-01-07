// import React, { useEffect } from "react";
// import { loadImg } from "../assets/images";
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { IoIosCloseCircleOutline } from "react-icons/io";
import tw from "tailwind-styled-components";
import { db } from "../Firebase";
import { getAuth, deleteUser } from "firebase/auth";

interface SettingModalProps {
  isOpen?: boolean;
  closeModal: () => void;
  currentUser: any;
}

export default function UserSettingModal({
  isOpen,
  closeModal,
  currentUser,
}: SettingModalProps) {
  if (!isOpen) return null;

  const auth = getAuth();

  // console.log(currentUser.uid);
  // const User = collection(db, "userInfo");
  // console.log("UserInfo:", UserInfo);

  const onUserDeleteHandler = async (UID: string) => {
    const user = auth.currentUser;
    const isConfirmed = window.confirm("정말 탈퇴하시겠습니까?");
    if (isConfirmed && user) {
      try {
        //Cloud userInfo 삭제구문
        await deleteDoc(
          doc(db, `userInfo/`, `${user.uid}/UserInfo/${user.email}`)
        )
          .then(() => {
            deleteDoc(doc(db, `userInfo/`, `${user.uid}`));
          })
          .catch((err) => console.error(err));
        //Authentication User 삭제구문
        deleteUser(user)
          .then(() => {
            window.location.replace("/");
          })
          .catch((err: any) => {
            console.error(err);
          });
        console.log(`Delete ${currentUser.email} successfully!`);
      } catch (error) {
        console.error(`Error! : ${error}`);
      }
    } else return;
  };

  return (
    <SettingModalBG>
      <SettingModalContainer>
        <div className="z-10 mx-auto justify-center">
          <CloseBtn onClick={closeModal}>
            <IoIosCloseCircleOutline size="100%" />
          </CloseBtn>
          <div className="flex flex-col mx-auto w-full">
            <SettingBtn>
              <a
                href="mailto:shinej1029@gmail.com"
                target="_blank"
                rel="noreferrer"
                aria-label="email-link"
              >
                고객문의
              </a>
            </SettingBtn>
            <SettingBtn onClick={() => onUserDeleteHandler(currentUser.uid)}>
              회원탈퇴
            </SettingBtn>
          </div>
        </div>
      </SettingModalContainer>
    </SettingModalBG>
  );
}

const SettingModalBG = tw.div`
fixed inset-0 flex items-center justify-center z-30

`;

const SettingModalContainer = tw.div`
w-[350px] h-1/3  pb-[70px]
rounded-xl shadow-lg overflow-y-auto
bg-white border-primary-Gray/30 border-2
`;

const CloseBtn = tw.button`
w-8 h-8 rounded-full
my-4 ml-[300px] justify-center
bg-white hover:text-primary-YellowGreen
`;

const SettingBtn = tw.button`
w-10/12 h-14 p-2 my-2 mx-auto rounded-lg
bg-primary-Gray/80
hover:bg-primary-DarkGray hover:font-extrabold
text-lg text-white font-semibold
tracking-widest
`;

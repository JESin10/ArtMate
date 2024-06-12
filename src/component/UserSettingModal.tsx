import { deleteDoc, doc } from "@firebase/firestore";
import { IoIosCloseCircleOutline } from "react-icons/io";
import tw from "tailwind-styled-components";
import { db } from "../Firebase";
import { getAuth, deleteUser } from "firebase/auth";
import Swal from "sweetalert2";

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

  const onUserDeleteHandler = (UID: string) => {
    const user = auth.currentUser;
    // const isConfirmed = window.confirm("정말 탈퇴하시겠습니까?");
    Swal.fire({
      width: "300px",
      position: "center",
      icon: "warning",
      showCancelButton: true,
      title: "User Withdrawal",
      text: "정말 탈퇴하시겠습니까?",
      confirmButtonColor: "#d33", // confrim 버튼 색깔 지정
      cancelButtonColor: "#6F6F6F", // cancel 버튼 색깔 지정
      confirmButtonText: "승인", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      timer: 10000,
    }).then(async (result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        if (user) {
          try {
            //Cloud userInfo 삭제구문
            await deleteDoc(
              doc(db, `userInfo/`, `${user.uid}/UserInfo/${user.email}`)
            )
              .then(() => {
                deleteDoc(doc(db, `userInfo/`, `${user.uid}`));
              })
              .catch((err) => {
                console.error(`Error in Cloud! : ${err}`);
              });
            //Authentication User 삭제구문
            deleteUser(user)
              .then(() => {
                window.location.replace("/");
              })
              .catch((err: any) => {
                console.error(`Error in Auth! : ${err}`);
              });
            // console.log(`Delete ${currentUser.email} successfully!`);
            Swal.fire({
              width: "300px",
              title: "Good Bye!",
              html: "완료되었습니다. <br/> 다음에 또 이용해주세요!",
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "#608D00",
              timer: 3000,
            });
          } catch (error: any) {
            Swal.fire({
              width: "300px",
              title: "ERROR!",
              html: "다시 시도해주세요",
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: "#608D00",
              timer: 3000,
              footer:
                '<a href="#" >문제가 계속된다면 </br>고객문의를 통해 문의해주세요.</a>',
            });
            console.error(`Error! : ${error}`);
          }
        }
      }
    });
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
w-[350px] h-1/3 mb-2 
rounded-xl shadow-lg overflow-y-auto
bg-white border-primary-Gray/30 border-2
`;

const CloseBtn = tw.button`
w-8 h-8 rounded-full
my-2 ml-[300px] justify-center
bg-white hover:text-primary-YellowGreen
`;

const SettingBtn = tw.button`
w-10/12 h-12 p-2 my-2 mx-auto rounded-lg
bg-primary-Gray/80
hover:bg-primary-DarkGray hover:font-extrabold
text-md  text-white font-semibold
tracking-widest
`;

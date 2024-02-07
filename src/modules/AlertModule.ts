import React from "react";
import Swal from "sweetalert2";

//  function AlertModule() {
export const errorAlert_verA = () => {
  Swal.fire({
    width: "300px",
    icon: "warning",
    position: "center",
    showCancelButton: false,
    text: "가입정보가 올바르지 않습니다!",
    confirmButtonColor: "#608D00", // confrim 버튼 색깔 지정
    cancelButtonColor: "#6F6F6F", // cancel 버튼 색깔 지정
    confirmButtonText: "확인", // confirm 버튼 텍스트 지정
    timer: 30000,
  });
};

export const errorAlert_verB = () => {
  Swal.fire({
    width: "300px",
    icon: "warning",
    position: "center",
    showCancelButton: false,
    text: "이미 사용 중인 이메일입니다.",
    confirmButtonColor: "#608D00", // confrim 버튼 색깔 지정
    cancelButtonColor: "#6F6F6F", // cancel 버튼 색깔 지정
    confirmButtonText: "확인", // confirm 버튼 텍스트 지정
    timer: 30000,
  });
};

export const errorAlert_verC = () => {
  Swal.fire({
    width: "300px",
    icon: "warning",
    position: "center",
    showCancelButton: false,
    text: "네트워트 요청에 실패 하였습니다.",
    confirmButtonColor: "#608D00", // confrim 버튼 색깔 지정
    cancelButtonColor: "#6F6F6F", // cancel 버튼 색깔 지정
    confirmButtonText: "확인", // confirm 버튼 텍스트 지정
    timer: 30000,
  });
};

//   return;
// }

import axios from "axios";
import { errorAlert_NetworkErr, errorAlert_verA } from "../modules/AlertModule";

//서울시 문화시설현황
// const GalleyURL = `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_OPENAPI_KEY}/json/SebcArtGalleryKor/1/30/`;
//서울시 관광명소 - Eng
const VisitSeoulURL = `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_OPENAPI_KEY}/json/TbVwAttractions/1/30/`;

// const response = await fetch(
//   `${SERVER_URL}/artgallery?serviceKey=${process.env.REACT_APP_API_KEY}&PageNo=${pageNum}&numOfrows=${listCnt}`
// );

const ErrorCheck = (err: any) => {
  switch (err.code) {
    case "ERR_NETWORK":
      // window.location.replace("/error");
      return errorAlert_NetworkErr();

    // case "":
    //   return console.log(100);

    default:
      return errorAlert_verA();
  }
};

//서울시립미술관 전시 정보-ArtworkPage
export const SeoulArtMuseum_ArtWork_OpenData = async (
  START_INDEX: number,
  END_INDEX: number,
) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SEOUL_SERVER_URL}cultureinfo/area2?serviceKey=${process.env.REACT_APP_SEOUL_API_KEY}&PageNo=${START_INDEX}&numOfrows=${END_INDEX}`,
    );
    return data;
  } catch (err) {
    console.error(err);
    return ErrorCheck(err);
  }
};

export const SeoulArtMuseum_Detail_OpenData = async (seq: any) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SEOUL_SERVER_URL}cultureinfo/detail2?serviceKey=${process.env.REACT_APP_SEOUL_API_KEY}&seq=${seq}`,
    );
    return data;
  } catch (err) {
    console.error(err);
    return ErrorCheck(err);
  }
};

//서울시립미술관 전시 정보-MainPage
export const MainPage = async (START_INDEX: number, END_INDEX: number) => {
  try {
    const { data } = await axios.get(
      `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_OPENAPI_KEY}/json/ListExhibitionOfSeoulMOAInfo/${START_INDEX}/${END_INDEX}/`,
      {
        params: {
          START_INDEX: START_INDEX,
          END_INDEX: END_INDEX,
        },
      },
    );
    return data;
  } catch (err) {
    console.error(err);
    return ErrorCheck(err);
  }
};

//서울시 문화시설현황-Gallery
export const Seoul_Museum_Gallery_OpenData = async (
  pageNum: number,
  listCnt: number,
) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SEOUL_SERVER_URL}nopenapi/rest/cultureartspaces/artgallery?serviceKey=${process.env.REACT_APP_SEOUL_API_KEY}&PageNo=${pageNum}&numOfrows=${listCnt}`,
    );
    return data;
  } catch (err) {
    console.error(err);
    return ErrorCheck(err);
  }
};

export const Visit_Seoul_OpenData = async () => {
  try {
    const { data } = await axios.get(VisitSeoulURL, {
      // params: {
      //   serviceKey: process.env.REACT_APP_OPENAPI_KEY,
      //   numOfRows: 1,
      //   pageNo: 10,
      // },
    });
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return ErrorCheck(err);
  }
};

//서울시립미술관 전시 정보-searching
export const SearchingInfo = async () => {
  try {
    const { data } = await axios.get(
      `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_OPENAPI_KEY}/json/ListExhibitionOfSeoulMOAInfo/1/800/`,
    );
    return data;
  } catch (err) {
    console.error(err);
    return ErrorCheck(err);
  }
};

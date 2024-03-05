import axios from "axios";
import { errorAlert_NetworkErr, errorAlert_verA } from "../modules/AlertModule";

//서울시 문화시설현황
// const GalleyURL = `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_OPENAPI_KEY}/json/SebcArtGalleryKor/1/30/`;
//서울시 관광명소 - Eng
const VisitSeoulURL = `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_OPENAPI_KEY}/json/TbVwAttractions/1/30/`;

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
  END_INDEX: number
) => {
  try {
    const { data } = await axios.get(
      `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_OPENAPI_KEY}/json/ListExhibitionOfSeoulMOAInfo/${START_INDEX}/${END_INDEX}`,
      {
        params: {
          START_INDEX: START_INDEX,
          END_INDEX: END_INDEX,
        },
      }
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
      }
    );
    return data;
  } catch (err) {
    console.error(err);
    return ErrorCheck(err);
  }
};

//서울시 문화시설현황-Gallery
export const Seoul_Museum_Gallery_OpenData = async (
  START_INDEX: number,
  END_INDEX: number
) => {
  try {
    const { data } = await axios.get(
      `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_OPENAPI_KEY}/json/SebcArtGalleryKor/${START_INDEX}/${END_INDEX}/`,
      {
        params: {
          START_INDEX: START_INDEX,
          END_INDEX: END_INDEX,
        },
      }
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
      `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_OPENAPI_KEY}/json/ListExhibitionOfSeoulMOAInfo/1/800/`
    );
    return data;
  } catch (err) {
    console.error(err);
    return ErrorCheck(err);
  }
};

import axios from "axios";

//서울시립미술관 전시 정보
const SeoulMuseum_artwor_URL = `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_OPENAPI_KEY}/json/ListExhibitionOfSeoulMOAInfo/1/30/`;
//서울시 문화시설현황
const GalleyURL = `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_OPENAPI_KEY}/json/SebcArtGalleryKor/1/30/`;
//서울시 관광명소
const VisitSeoulURL = `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_OPENAPI_KEY}/json/TbVwAttractions/1/30/`;

// export const baseURL = axios.create({
//   baseURL: URL,
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     accept: "application/json",
//   },
// });

export const SeoulArtMuseum_ArtWork_OpenData = async () => {
  try {
    const { data } = await axios.get(SeoulMuseum_artwor_URL, {
      // params: {
      //   serviceKey: process.env.REACT_APP_OPENAPI_KEY,
      //   numOfRows: 1,
      //   pageNo: 10,
      // },
    });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const Seoul_Museum_Gallery_OpenData = async () => {
  try {
    const { data } = await axios.get(GalleyURL, {
      // params: {
      //   serviceKey: process.env.REACT_APP_OPENAPI_KEY,
      //   numOfRows: 1,
      //   pageNo: 10,
      // },
    });
    return data;
  } catch (err) {
    console.error(err);
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
    return data;
  } catch (err) {
    console.error(err);
  }
};

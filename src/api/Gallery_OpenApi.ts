import axios from "axios";

// const SeoulMuseum_artwork_URL = `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_OPENAPI_KEY}/json/ListExhibitionOfSeoulMOAInfo/${START_INDEX}/${END_INDEX}`;
// const SeoulMuseum_artwork_URL2 = `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_OPENAPI_KEY}/json/ListExhibitionOfSeoulMOAInfo/${START_INDEX}/${END_INDEX}/`;
// ${process.env.REACT_APP_OPENAPI_KEY}/json/ListExhibitionOfSeoulMOAInfo/1/30/

//서울시 문화시설현황
// const GalleyURL = `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_OPENAPI_KEY}/json/SebcArtGalleryKor/1/30/`;
//서울시 관광명소 - Eng
const VisitSeoulURL = `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_OPENAPI_KEY}/json/TbVwAttractions/1/30/`;

// export const baseURL = axios.create({
//   baseURL: URL,
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     accept: "application/json",
//   },
// });

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
  }
};

import axios from "axios";

const URL = `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_OPENAPI_KEY}/json/ListExhibitionOfSeoulMOAInfo/1/5/`;

export const baseURL = axios.create({
  baseURL: URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    accept: "application/json",
  },
});

export const SeoulArtMuseum_OpenData = async () => {
  try {
    const response = await axios.get(URL, {
      // params: {
      //   serviceKey: process.env.REACT_APP_OPENAPI_KEY,
      //   numOfRows: 1,
      //   pageNo: 10,
      // },
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

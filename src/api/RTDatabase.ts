import axios from "axios";
import { errorAlert_NetworkErr, errorAlert_verA } from "../modules/AlertModule";
import { getDatabase, onValue, child, get, ref } from "firebase/database";
import { rtd } from "../Firebase";

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
export const SeoulArtMuseum_ArtWorkData = async () => {
  const RtdRefArtwork = ref(rtd);
  try {
    const snapshot = await get(
      child(RtdRefArtwork, "/ListExhibitionOfSeoulMOAInfo/DATA")
    );
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const Seoul_Museum_GalleryData = async () => {
  const RtdRefGallery = ref(rtd);
  try {
    const snapshot = await get(child(RtdRefGallery, "/SebcArtGalleryKor/DATA"));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

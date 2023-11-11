import React, { useEffect, useState } from "react";
import { UserLocationProps } from "./KaKaoMap";
import tw from "tailwind-styled-components";
// import { UserLocation } from "./KaKaoMap";
import { Map } from "react-kakao-maps-sdk";

export const UserLocation = ({
  latitude,
  longitude,
  option,
}: UserLocationProps) => {
  const [locate, setLocate] = useState<UserLocationProps>();
  const [error, setError] = useState<any>();
  const [marker, setMarker] = useState<any>(null);

  var mapOption = {
    center: new (window as any).kakao.maps.LatLng(latitude, longitude),
    level: 3,
  };
  var map: any;

  const handleSuccess = (pos: GeolocationPosition) => {
    setLocate({ latitude, longitude, option });
    if (!map) {
      map = new (window as any).kakao.maps.Map(
        document.getElementById("map"),
        mapOption
      );
    }
    // 마커생성, 위치설정
    if (!marker) {
      const newMarker = new (window as any).kakao.maps.Marker({
        position: new (window as any).kakao.maps.LatLng(latitude, longitude),
        mapOption,
      });
      // console.log(1);
      newMarker.setMap(map);
      setMarker(newMarker);
      // console.log(newMarker);
    } else {
      marker.setPosition(
        new (window as any).kakao.maps.LatLng(latitude, longitude)
      );
      // console.log(2);
    }
  };

  console.log("Test", latitude, longitude);

  const handleError = (err: GeolocationPositionError) => {
    setError(err.message);
    console.error(error);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      // setError("Geolocation is not supported.");
      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, option);
    // console.log(locate?.latitude, locate?.longitude);
  }, [option]);

  return (
    <>
      <MyMap
        id="map"
        center={{ lat: latitude, lng: longitude }} // 지도의 중심 좌표
        level={2} // 지도 확대 레벨
        // style={{ width: "100px", height: "100px" }}
      ></MyMap>
    </>
  );
};

const MyMap = tw(Map)`
w-full h-full
`;

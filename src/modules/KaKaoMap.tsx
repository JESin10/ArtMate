import React, { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import tw from "tailwind-styled-components";
import { loadImg } from "../assets/images";
import { useLocation, useNavigate } from "react-router-dom";
import { UserLocation } from "./UserLocation";

export interface MapModeProps {
  mapMode: boolean;
  setMapMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UserLocationProps {
  latitude: number;
  longitude: number;
  option: PositionOptions;
}

export default function KaKaoMap({ mapMode, setMapMode }: MapModeProps) {
  const MapModeHandler = (mapMode: boolean) => {
    setMapMode(false);
  };
  const [location, setLocation] = useState<UserLocationProps>({
    latitude: 37.568,
    longitude: 126.977,
    option: {
      enableHighAccuracy: true,
      timeout: 1000 * 10,
      maximumAge: 1000 * 3600 * 24,
    },
  });
  const [marker, setMarker] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;
    setLocation({ latitude, longitude, option: location.option });

    // 마커생성, 위치설정
    // if (!marker) {
    //   const newMarker = new (window as any).kakao.maps.Marker({
    //     position: new (window as any).kakao.maps.LatLng(
    //       location.latitude,
    //       location.longitude
    //     ),
    //   });

    //   newMarker.setMap(MyMap);
    //   setMarker(newMarker);
    // } else {
    //   marker.setPosition(
    //     new (window as any).kakao.maps.LatLng(
    //       location.latitude,
    //       location.longitude
    //     )
    //   );
    // }
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    geolocation.getCurrentPosition(handleSuccess);
    // console.log("KAKAO", location.latitude, location.longitude);
  }, [location.option]);

  return (
    <div className="w-full h-screen justify-center">
      {/* button */}
      <UserLocation
        latitude={location.latitude}
        longitude={location.longitude}
        option={location.option}
        // option={geolocationOptions}
      />
      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold my-2 text-transparent">
          내 주변 갤러리_공백
        </h1>
        <div className="flex space-x-2 mr-3">
          <button onClick={() => handleSuccess}>
            <img alt="current-location" src={loadImg.Map_current1} />
          </button>
          <button onClick={() => MapModeHandler(false)}>
            <img alt="gallery-list" src={loadImg.Menu_List} />
          </button>
        </div>
      </div>
      {/* map */}
      <div className=" border-red-400 border-4 w-full h-[70%]">
        <MyMap
          center={{ lat: location.latitude, lng: location.longitude }} // 지도의 중심 좌표
          level={4} // 지도 확대 레벨
          // style={{ width: "100px", height: "100px" }}
        ></MyMap>
      </div>
    </div>
  );
}

const MyMap = tw(Map)`
w-full h-full
`;

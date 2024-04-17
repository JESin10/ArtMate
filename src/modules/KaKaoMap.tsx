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

  // var mapContainer: any = document.getElementById("map"), // 지도를 표시할 div
  //   mapOption = {
  //     center: new kakao.maps.LatLng(location.latitude, location.longitude), // 지도의 중심좌표
  //     level: 3, // 지도의 확대 레벨
  //   };
  // var map = new kakao.maps.Map(mapContainer, mapOption);

  const [marker, setMarker] = useState<any>(null);
  const [error, setError] = useState<string>("");

  var mapOption = {
    center: new (window as any).kakao.maps.LatLng(
      location.latitude,
      location.longitude
    ),
    level: 3,
  };
  var map: any;

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    geolocation.getCurrentPosition(handleSuccess);
    // console.log("KAKAO", location.latitude, location.longitude);
  }, [location.latitude]);

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;
    setLocation({ latitude, longitude, option: location.option });
    // console.log(location.latitude, location.longitude, "zzz");
    if (!map) {
      map = new (window as any).kakao.maps.Map(
        document.getElementById("map"),
        mapOption
      );
    }
    // 마커생성, 위치설정
    if (!marker) {
      const newMarker = new (window as any).kakao.maps.Marker({
        position: new (window as any).kakao.maps.LatLng(
          location.latitude,
          location.longitude
        ),
        mapOption,
      });
      // console.log(1);
      newMarker.setMap(map);
      setMarker(newMarker);
      // console.log(newMarker);
    } else {
      marker.setPosition(
        new (window as any).kakao.maps.LatLng(
          location.latitude,
          location.longitude
        )
      );
      // console.log(2);
    }
  };

  return (
    <div className="w-full h-screen justify-center">
      {/* button */}
      {/* <UserLocation
        latitude={location.latitude}
        longitude={location.longitude}
        option={location.option}
        // option={geolocationOptions}
      /> */}
      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold my-2  ml-3">Nearby</h1>

        <div className="flex space-x-2 mr-3">
          <MapModeBtn onClick={() => handleSuccess}>
            <img alt="current-location" src={loadImg.Map_current1} />
          </MapModeBtn>
          <MapModeBtn onClick={() => MapModeHandler(false)}>
            <img alt="gallery-list" src={loadImg.Menu_List} />
          </MapModeBtn>
        </div>
      </div>
      {/* map */}
      <div className=" w-full h-[70%]">
        {/* <MyMap
          id="map"
          center={{ lat: location.latitude, lng: location.longitude }} // 지도의 중심 좌표
          level={2} // 지도 확대 레벨
          // style={{ width: "100px", height: "100px" }}
        ></MyMap> */}
        <UserLocation
          latitude={location.latitude}
          longitude={location.longitude}
          option={location.option}
        />
        {/* <div id="map" style={{ width: "100%", height: "400px" }}>
          dddas
        </div> */}
      </div>
    </div>
  );
}

const MyMap = tw(Map)`
w-full h-full
`;

const MapModeBtn = tw.button`
  hover:scale-105 hover:duration-150
`;

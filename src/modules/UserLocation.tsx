import React, { useEffect, useState } from "react";
import { UserLocationProps } from "./KaKaoMap";
// import { UserLocation } from "./KaKaoMap";

export const UserLocation = ({
  latitude,
  longitude,
  option,
}: UserLocationProps) => {
  const [locate, setLocate] = useState<UserLocationProps>();
  const [error, setError] = useState<any>();
  const handleSuccess = (pos: GeolocationPosition) => {
    setLocate({ latitude, longitude, option });
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
    console.log(locate?.latitude, locate?.longitude);
  }, [option]);

  return (
    <div className="hidden">
      <p>lat : {locate?.latitude}</p>
      <p>lng : {locate?.longitude}</p>
    </div>
  );
};

import React, { useEffect, useState } from "react";

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export const UserLocation = (option = {}) => {
  const [location, setLocation] = useState<UserLocation>();

  const [error, setError] = useState("");

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;

    setLocation({ latitude, longitude });
    console.log(location);
  };

  const handleError = (err: GeolocationPositionError) => {
    setError(err.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, option);
  }, [option]);

  return (
    <div className="flex w-full space-x-3">
      <div className="flex text-xs">lat : {location?.latitude}</div>
      <div className="flex text-xs">lng : {location?.longitude}</div>
    </div>
  );
};

"use client";

import { PositionData } from "@/app/(public)/mate/_components/post/matePostList";
import { useQuery } from "@tanstack/react-query";
import { locationStore } from "@/zustand/locationStore";

export const useGeoData = () => {
  const { setIsUseGeo, setGeoData } = locationStore();

  const getCurrentPosition = (): Promise<PositionData | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        // console.error('위치 정보 사용 거부:', error);
        const defaultPosition = {
          center: { lat: 37.5556236021213, lng: 126.992199507869 },
          errMsg: "Geolocation is not supported",
          isLoading: false
        };
        setIsUseGeo(false);
        setGeoData(defaultPosition);
        resolve(defaultPosition);
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = {
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            isLoading: false
          };
          setGeoData(newPosition);
          // console.log('위치 정보 획득 성공');
          setIsUseGeo(true);
          resolve(newPosition);
        },
        (error) => {
          // console.error('위치 정보 획득 실패:', error);
          const defaultPosition = {
            center: { lat: 37.5556236021213, lng: 126.992199507869 },
            errMsg: error.message,
            isLoading: false
          };
          setIsUseGeo(false);
          setGeoData(defaultPosition);
          resolve(defaultPosition);
        }
      );
    });
  };
  
  const {
    data: geolocationData,
    isPending: isGeoPending,
    error: geoError
  } = useQuery<PositionData, Error>({
    queryKey: ["geoData"],
    queryFn: getCurrentPosition,
    retry: false
  });


  return { geolocationData, isGeoPending, geoError };
}
"use client";

import { useQuery } from "@tanstack/react-query";
import { locationStore } from "@/zustand/locationStore";
import { getUserCurrentPosition } from "@/app/(public)/mate/getUserCurrentPostion";
import { queryKeys } from "@/lib/queryKeys";
// Type
import { PositionData } from "@/types/position.type";

/**
 * @file useGeoData.ts
 * @brief 사용자 현재 위치 정보를 가져오는 훅
 * 
 * @returns geolocationData - 사용자의 현재 위치 정보를 포함하는 데이터 객체
 * @returns isPending
 * @returns error
 * 
 * `getUserCurrentPosition` 함수를 사용하여 사용자의 현재 위치 정보를 비동기적으로 요청함.
 * 
 * 사용 ) const { geolocationData } = useGeoData();
 */

export const useGeoData = () => {
  const { setIsUseGeo, setGeoData } = locationStore();
  
  const {
    data: geolocationData,
    isPending: isGeoPending,
    error: geoError
  } = useQuery<PositionData, Error>({
    queryKey: queryKeys.geoData,
    queryFn: () => getUserCurrentPosition({ setIsUseGeo, setGeoData }),
    retry: false
  });

  return { geolocationData, isGeoPending, geoError };
}
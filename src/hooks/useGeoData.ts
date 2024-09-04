"use client";

import { useQuery } from "@tanstack/react-query";
import { locationStore } from "@/zustand/locationStore";
import { getUserCurrentPosition } from "@/app/(public)/mate/getUserCurrentPostion";
import { queryKeys } from "@/lib/queryKeys";
// Type
import { PositionData } from "@/types/position.type";

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
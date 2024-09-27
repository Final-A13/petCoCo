"use client";

import { getConvertAddress } from "@/app/(public)/mate/getConvertAddress";
import { useQuery } from "@tanstack/react-query";
import { locationStore } from "@/zustand/locationStore";
import { queryKeys } from "@/lib/queryKeys";

/**
 * @file useAddressData.ts
 * @brief 현재 위치 정보(위도, 경도)를 기반으로 주소 데이터를 가져오는 훅
 * 
 * @returns addressData - 주소 데이터 전체
 * @returns isPending
 * @returns error
 * @returns roadAddress - 도로명 주소
 * @returns address - 구주소
 * 
 * * `locationStore`에서 현재 위치 정보를 가져오고, `getConvertAddress` 함수를 사용하여 
 * 주소 데이터를 비동기적으로 요청함
 * 
 * * roadAddress는 도로명 주소를 기본적으로 나타내지만, 산과 같은 도로명 주소가 없는 곳은 구주소를 나타내도록 처리
 * 
 * 사용 ) const { isPending, error, roadAddress } = useAddressData();
 */

export const useAddressData = () => {
  const { position } = locationStore();
  const {
    data: addressData,
    isPending,
    error
  } = useQuery({
    queryKey: queryKeys.address(position.center),
    queryFn: async () => {
      const response = await getConvertAddress(position.center);
      return response;
    },
    enabled: !!position.center
  });

  const roadAddress =
    (addressData && addressData?.documents[0]?.road_address?.address_name) ||
    addressData?.documents[0]?.address?.address_name ||
    "주소 정보를 찾을 수 없어요";

  const address = (addressData && addressData?.documents[0]?.address?.address_name) || "주소 정보를 찾을 수 없어요";

  return { addressData, isPending, error, roadAddress, address };
};
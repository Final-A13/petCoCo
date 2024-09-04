"use client";

import { getConvertAddress } from "@/app/(public)/mate/getConvertAddress";
import { useQuery } from "@tanstack/react-query";
import { locationStore } from "@/zustand/locationStore";
import { queryKeys } from "@/lib/queryKeys";

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
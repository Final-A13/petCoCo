"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { useAuthStore } from "@/zustand/useAuth";
// Type
import { UsersPetType } from "@/types/usersPet.type";

/**
 * @file useUserPetsData.ts
 * @brief 사용자의 반려견에 대한 정보를 가져오는 훅
 * 
 * @returns userPets - 사용자의 반려견에 대한 정보를 포함하는 배열, 타입 : UsersPetType[]
 * @returns isPetPending
 * @returns petError
 *  
 * * 현재 로그인한 사용자의 userId를 사용하여 해당 사용자의 반려견 정보를 가져오는 훅
 * * 가져온 데이터는 배열 형태로, 반려견이 한 마리가 아니라 여러 마리일 수도 있기 때문임.
 * * 사용자의 userId는 useAuthStore 훅을 이용함.
 * 
 * 사용 ) const { userPets, isPetPending, petError } = useUserPetsData();
 */

export const useUserPetsData = () => {
  const { user } = useAuthStore();
  const userId: string = user && user.id;

  const {
    data: userPets,
    isPending: isPetPending,
    error: petError
  } = useQuery<UsersPetType[]>({
    queryKey: queryKeys.userPets(userId),
    queryFn: async () => {
      const response = await fetch(`/api/usersPetInfo/${userId}`);
      return response.json();
    },
    enabled: !!userId
  });

  return { userPets, isPetPending, petError };
}
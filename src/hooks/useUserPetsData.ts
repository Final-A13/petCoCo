"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { useAuthStore } from "@/zustand/useAuth";
// Type
import { UsersPetType } from "@/types/usersPet.type";

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
      const response = await fetch(`/api/mypage/${userId}/mypetprofile`);
      return response.json();
    },
    enabled: !!userId
  });

  return { userPets, isPetPending, petError };
}
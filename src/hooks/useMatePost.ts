"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
// Type

export const useMatePost= (id: string) => {

  const {
    data: post,
    isPending,
    error
  } = useQuery({
    queryKey: queryKeys.matePosts(id),
    queryFn: async () => {
      const response = await fetch(`/api/mate/post/${id}`);
      const data = response.json();

      return data;
    }
  });


  return { post, isPending, error };
}
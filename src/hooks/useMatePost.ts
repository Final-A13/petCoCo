"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

/**
 * @file useMatePost.ts
 * @brief 사용자의 게시글에 대한 정보 가져오는 훅
 * 
 * @returns post - 사용자의 게시글에 대한 정보를 포함하는 데이터 객체
 * @returns isPending
 * @returns error
 * 
 * 게시글의 상세 페이지에 정보를 나타내기 위해 사용
 * 
 * 사용 ) const { post, isPending, error } = useMatePost();
 */

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
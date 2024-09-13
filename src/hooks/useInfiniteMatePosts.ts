"use client";

import { PostsResponse } from "@/types/mate.type";
import { locationStore } from "@/zustand/locationStore";
import { Filters } from "@/zustand/useFilterStore";
import { useInfiniteQuery } from "@tanstack/react-query";


interface UseMatePostsProps {
  activeSearchTerm: string;
  sortBy: string;
  filters: Filters;
}

/**
 * @file useInfiniteMatePosts.ts
 * @brief 현재 사용자의 위치와 필터를 기반으로 모든 사용자의 게시글을 무한 스크롤로 가져오는 훅
 * 
 * @param props.activeSearchTerm - 검색어
 * @param props.sortBy - 정렬 기준
 * @param props.filters - 필터 조건
 * 
 * @returns data - 현재 페이지의 게시글 데이터 (API 응답 결과)
 * @returns fetchNextPage - 다음 페이지를 로드하는 함수
 * @returns hasNextPage - 다음 페이지가 존재하는지 여부
 * @returns isFetchingNextPage - 다음 페이지를 로드하는 중인지 여부
 * @returns isPending
 * @returns isError
 * @returns error
 * 
 * * 산책 메이트의 메인 페이지에서 전체 게시글을 출력할 때 사용
 * * 검색과 필터링이 연관되어 있음
 * 
 * 사용 ) const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError, error } = useInfiniteMatePosts({
 *  activeSearchTerm,
    sortBy,
    filters
  });
 */

export const useInfiniteMatePosts = ({ activeSearchTerm, sortBy, filters }: UseMatePostsProps) => {
  const { geoData } = locationStore();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    error
  } = useInfiniteQuery<PostsResponse, Error>({
    queryKey: ["matePosts", activeSearchTerm, sortBy, filters, geoData],
    queryFn: async ({ pageParam = 1 }) => {
      const getValidFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== null && value !== "" && value !== undefined)
      );

      let query = Object.keys(getValidFilters)
        .map((key) => {
          const value = getValidFilters[key];
          return value != null ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}` : "";
        })
        .join("&");

      const userLat = geoData?.center.lat || 0;
      const userLng = geoData?.center.lng || 0;

      const response = await fetch(
        `/api/mate?page=${pageParam}&limit=4&search=${activeSearchTerm}&sort=${sortBy}&${query}&userLat=${userLat}&userLng=${userLng}`
      );
      return response.json();
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.length === 4 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!geoData, // 지오데이터가 있는 경우에만 쿼리를 활성화
    staleTime: 5 * 60 * 1000, 
  });


  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError, error };
};
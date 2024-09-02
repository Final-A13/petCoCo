"use client";

import { PostsResponse } from "@/types/mate.type";
import { locationStore } from "@/zustand/locationStore";
import { useInfiniteQuery } from "@tanstack/react-query";


interface UseMatePostsProps {
  activeSearchTerm: string;
  sortBy: string;
  filters: Record<string, any>;
}

export const useMatePosts = ({ activeSearchTerm, sortBy, filters }: UseMatePostsProps) => {
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

      const defaultSortBy = sortBy && sortBy !== "all" ? sortBy : "all";
      const response = await fetch(
        `/api/mate?page=${pageParam}&limit=4&search=${activeSearchTerm}&sort=${defaultSortBy}&${query}&userLat=${userLat}&userLng=${userLng}`
      );
      return response.json();
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.length === 4 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!geoData // 지오데이터가 있는 경우에만 쿼리를 활성화
  });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError, error };
};
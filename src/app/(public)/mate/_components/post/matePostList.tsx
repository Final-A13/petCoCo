"use client";
import MatePostItem from "./matePostItem";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCallback, useRef, useEffect } from "react";
import { locationStore } from "@/zustand/locationStore";
import LoadingComponent from "@/components/loadingComponents/Loading";
import { MatePostAllTypeForItem, PostsResponse } from "@/types/mate.type";
import { useGeoData } from "@/hooks/useGeoData";

export type PositionData = {
  center: {
    lat: number;
    lng: number;
  };
  errMsg?: string;
  isLoading: boolean;
} | null;

interface MatePostListProps {
  activeSearchTerm: string;
  sortBy: string;
  filters: {
    gender: string | null;
    date_time: string | undefined;
    male_female: string | null;
    age: string | null;
    weight: string | null;
    regions: string | null;
    times: string | null;
    neutralized: string | null;
  };
}

const MatePostList = ({ activeSearchTerm, sortBy, filters }: MatePostListProps) => {
  const { geoData } = locationStore();
  const { geolocationData, isGeoPending, geoError } = useGeoData();
  const observerTarget = useRef<HTMLDivElement>(null);


  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError, error } = useInfiniteQuery<
    PostsResponse,
    Error
  >({
    queryKey: ["matePosts", activeSearchTerm, sortBy, filters, geoData],
    queryFn: async ({ pageParam = 1 }) => {
      const getValidFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== null && value !== "" && value !== undefined)
      );

      let query = "";
      query = Object.keys(getValidFilters)
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
    enabled: !!geolocationData
  });

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [handleObserver]);

  const posts = data?.pages.flatMap((page) => page.data) || [];

  if (isPending) {
    return (
      <div className="mt-[30%] flex h-full w-full flex-col items-center justify-center">
        <div className="text-mainColor">사용자의 위치를 계산하는 중입니다 🐶</div>
        <LoadingComponent />
      </div>
    );
  }

  if (isGeoPending) {
    return (
      <div className="mt-[30%] flex h-full w-full flex-col items-center justify-center">
      <div className="text-mainColor">사용자의 위치를 계산하는 중입니다 🐶</div>
      <LoadingComponent />
    </div>
    );
  }

  return (
    <div className="mb-[100px] flex w-full flex-col items-center justify-center px-[1.5rem]">
      <div className="flex w-full flex-col gap-y-[1.5rem]">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="w-full">
              <MatePostItem post={post} />
            </div>
          ))
        ) : (
          <div className="flex h-screen w-full items-center justify-center">
            <div className="flex flex-col items-center">
              <span className="mr-2 text-3xl">🐶</span>
              <p className="py-4 text-center">현재 모집 중인 산책 메이트가 없습니다.</p>
            </div>
          </div>
        )}
      </div>

      <div ref={observerTarget} className="h-10 w-full">
        {isFetchingNextPage && (
          <div className="flex justify-center">
            <div className="h-8 w-8 mt-10 animate-spin rounded-full border-t-4 border-solid border-mainColor"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatePostList;

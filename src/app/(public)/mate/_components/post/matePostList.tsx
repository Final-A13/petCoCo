"use client";
import { useCallback, useRef, useEffect } from "react";
import { useGeoData } from "@/hooks/useGeoData";
import MatePostItem from "./matePostItem";
import LoadingComponent from "@/components/loadingComponents/Loading";
import MatePostListSkeleton from "../Skeleton_UI/matePostItemSkeleton";
// Type
import { useInfiniteMatePosts } from "@/hooks/useInfiniteMatePosts";
import { Filters } from "@/zustand/useFilterStore";

interface MatePostListProps {
  activeSearchTerm: string;
  sortBy: string;
  filters: Filters;
}

const MatePostList = ({ activeSearchTerm, sortBy, filters }: MatePostListProps) => {
  const { geolocationData, isGeoPending, geoError } = useGeoData();
  const observerTarget = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError, error } = useInfiniteMatePosts({
    activeSearchTerm,
    sortBy,
    filters,
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
      <div className="mb-[100px] flex w-full flex-col items-center justify-center px-[1.5rem]">
        <div className="flex w-full flex-col gap-y-[1.5rem]">
        <div className="w-full">
          <MatePostListSkeleton />
          </div>
        </div>
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

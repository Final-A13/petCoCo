"use client";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import dynamic from "next/dynamic";

import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/zustand/useAuth";
import { useFilterStore } from "@/zustand/useFilterStore";
import { Filters } from "@/zustand/useFilterStore";
// import MatePostItemSkeleton from "./Skeleton_UI/matePostItemSkeleton";
import { Header } from "./tab/header";
// import PlusIcon from "@/app/utils/plusIcon";
import { BackgroundImage } from "./tab/backgroundImage";

import SearchBar from "@/components/SearchBar";
import PostListFilterTab from "./tab/postListFilterTab";
import MatePostList from "./post/matePostList";
// import FloatingButton from "./filter/floatingButton";

// const FloatingButton = dynamic(() => import("./filter/floatingButton"), {
//   ssr: true,
//   loading: () => (
//     <div
//       className="fixed bottom-[10.815rem] z-50 cursor-pointer rounded-full bg-gray-200 p-[0.81rem] shadow-plusBtn lg:hidden"
//       style={{ right: "calc(50% - 187.5px + 0.56rem)" }}
//     />
//   )
// });

const FloatingButton = dynamic(() => import("./filter/floatingButton"), {
  ssr: true,
  loading: () => (
    <div
      className="fixed bottom-[10.815rem] z-50 cursor-pointer rounded-full bg-gray-200 p-[0.81rem] shadow-plusBtn lg:hidden"
      style={{ right: "calc(50% - 187.5px + 0.56rem)" }}
    />
  )
});

const PlusIcon = dynamic(() => import("@/app/utils/plusIcon"), {
  ssr: true
});

// const PostListFilterTab = dynamic(() => import("./tab/postListFilterTab"), {
//   ssr: true
// });

// const SearchBar = dynamic(() => import("@/components/SearchBar"), {
//   ssr: true
// });

const MateContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("all");

  const { user } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filters, setFilters } = useFilterStore();

  // 검색 및 필터링
  const handleSearchPosts = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActiveSearchTerm(searchTerm);
    setSearchTerm("");
  };
  
  const handleSort = (type: string) => () => setSortBy(type);

  const handleLoginCheck = () => {
    if (user) {
      router.push("/mate/posts");
    } else {
      router.push("/signin");
    }
  };

  const handleMovePage = () => {
    router.push("/mate/filter");
  };

  useEffect(() => {
    const newFilters = { ...filters };
    let hasChanged = false;

    searchParams.forEach((value, key) => {
      if (key in newFilters) {
        (newFilters as Filters)[key as keyof Filters] = value;
        hasChanged = true;
      }
    });

    if (hasChanged) {
      setFilters(newFilters);
    }
  }, [searchParams]);

  return (
    <div className="relative mx-auto mt-[4rem] min-h-screen max-w-[420px] lg:mt-0 lg:max-w-none">
      <div className="w-full gap-y-[1.9375rem] lg:flex lg:flex-col">
        <div className="h-full w-full lg:relative lg:flex lg:flex-col lg:items-center lg:bg-gray-100">
          <BackgroundImage />
          <div className="lg:relative lg:z-10">
            <Header />
            <Suspense fallback={<div className="lg:h-48" />}>
              <div className="flex flex-col lg:flex lg:flex-col-reverse xl:flex xl:flex-col-reverse">
                <div className="mt-[1rem] overflow-x-auto whitespace-nowrap scrollbar-hide lg:mb-[3.12rem] lg:ml-6 lg:mt-0">
                  <PostListFilterTab
                    handleAllPosts={handleSort("all")}
                    handleRecruiting={handleSort("recruiting")}
                    handleDateSort={handleSort("recruitment_end")}
                    handleDistanceSort={handleSort("distance")}
                    handleNewSort={handleSort("new")}
                    sortBy={sortBy}
                  />
                </div>
                <div className="mx-auto mb-[0.75rem] mt-[1.5rem] w-full px-[1.5rem] lg:mb-[1.37rem] lg:mt-[2.12rem]">
                  <SearchBar
                    setSearchTerm={setSearchTerm}
                    value={searchTerm}
                    onSubmit={handleSearchPosts}
                    className="mb-[0.75rem] w-full rounded-full border border-mainColor lg:w-[28.25rem] lg:bg-white"
                  />
                </div>
              </div>
            </Suspense>
          </div>
        </div>
        <MatePostList activeSearchTerm={activeSearchTerm} sortBy={sortBy} filters={filters} />
      </div>
      <FloatingButton
        img_src="/assets/svg/filter-lines-color.svg"
        alt="filter icon"
        buttonClassName="lg:hidden fixed bottom-[10.815rem] z-50 cursor-pointer rounded-full bg-gray-200 p-[0.81rem] shadow-plusBtn"
        buttonStyle={{ right: "calc(50% - 187.5px + 0.56rem)" }}
        onClick={handleMovePage}
      />
      <div className="lg:hidden">
        <PlusIcon handleLoginCheck={handleLoginCheck} />
      </div>
    </div>
  );
};

export default MateContent;
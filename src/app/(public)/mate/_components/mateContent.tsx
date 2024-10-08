"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/zustand/useAuth";
import { useFilterStore } from "@/zustand/useFilterStore";
import SearchBar from "@/components/SearchBar";
import PostListFilterTab from "./tab/postListFilterTab";
import MatePostList from "./post/matePostList";
import PlusIcon from "@/app/utils/plusIcon";
//Type
import { Filters } from "@/zustand/useFilterStore";
import FloatingButton from "./filter/floatingButton";

const MateContent = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeSearchTerm, setActiveSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

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
  const handleAllPosts = () => setSortBy("all");
  const handleRecruiting = () => setSortBy("recruiting");
  const handleDateSort = () => setSortBy("recruitment_end");
  const handleDistanceSort = () => setSortBy("distance");
  const handleNewSort = () => setSortBy("new");

  const handleLoginCheck = () => {
    if (user) {
      router.push("/mate/posts");
    }
    if (user === null) {
      router.push("/signin");
    }
  };

  const handleMovePage = () => {
    router.push("/mate/filter");
  };

  useEffect(() => {
    const newFilters = { ...filters };
    searchParams.forEach((value, key) => {
      if (key in newFilters) {
        (newFilters as Filters)[key as keyof Filters] = value;
      }
    });
    setFilters(newFilters);
  }, [searchParams]);

  return (
    <div className="relative mx-auto min-h-screen max-w-[420px] lg:max-w-none">
      <div className="w-full lg:flex lg:flex-col lg: gap-y-[1.9375rem]">
        {/* 웹사이트 메인 부분 */}
        <div className="w-full h-full lg:bg-[url('/assets/svg/web_bg.svg')] lg:bg-cover lg:bg-center lg:flex lg:flex-col lg:items-center">
          <h1 className="hidden lg:block lg:text-[2rem] lg:font-[600] lg:w-[28.25rem] lg:mt-[3.13rem]">산책 메이트</h1>
          <p className="hidden lg:block lg:text-[1rem] lg:font-[400] lg:w-[28.25rem] lg:mt-[1rem]">여러분의 소중한 반려견의 산책 친구를 만들어 주세요.</p>
          <div className="mt-[1rem] overflow-x-auto whitespace-nowrap scrollbar-hide lg:mt-[2.12rem] lg:mr-8">
            <PostListFilterTab
              handleAllPosts={handleAllPosts}
              handleRecruiting={handleRecruiting}
              handleDateSort={handleDateSort}
              handleDistanceSort={handleDistanceSort}
              handleNewSort={handleNewSort}
              sortBy={sortBy || "all"} // 정렬 기본 값 all로 설정
            />
          </div>
          <div className="mx-auto mb-[1.5rem] mt-[1.5rem] w-full px-[1.5rem] lg:flex lg:justify-center lg:mb-[3.12rem] lg:mt-[2.12rem]">
            <SearchBar setSearchTerm={setSearchTerm} value={searchTerm} onSubmit={handleSearchPosts} />
          </div>
        </div>
        <div>
          <div className="mx-auto mt-[1.5rem] min-h-screen">
            {/* <div className="mx-auto w-full px-[1.5rem] mb-[1.5rem]">
                <SearchBar setSearchTerm={setSearchTerm} value={searchTerm} onSubmit={handleSearchPosts} />
              </div> */}
            <MatePostList activeSearchTerm={activeSearchTerm} sortBy={sortBy || "all"} filters={filters} />
          </div>
        </div>
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

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/zustand/useAuth";
import { useFilterStore } from '@/zustand/useFilterStore';
import SearchBar from "@/components/SearchBar";
import PostListFilterTab from "./tab/postListFilterTab";
import MatePostList from "./post/matePostList";
import PlusIcon from "@/app/utils/plusIcon";
//Type 
import { Filters } from "@/zustand/useFilterStore";

const MateContent = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeSearchTerm, setActiveSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState("");

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
      router.push('/mate/posts')
    }
    if (user === null) {
        router.push("/signin");
      };
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
    <div className="relative mx-auto min-h-screen max-w-[420px]">
      <div className="flex w-full">
        <div className="w-full">
          <div className="mt-[1rem] overflow-x-auto whitespace-nowrap scrollbar-hide">
            <PostListFilterTab
              handleAllPosts={handleAllPosts}
              handleRecruiting={handleRecruiting}
              handleDateSort={handleDateSort}
              handleDistanceSort={handleDistanceSort}
              handleNewSort={handleNewSort}
              sortBy={sortBy || "all"}
            />
          </div>
          <div>
            <div className="mx-auto mt-[1.5rem] min-h-screen">
              <div className="mx-auto w-full px-[1.5rem] mb-[1.5rem]">
                <SearchBar setSearchTerm={setSearchTerm} value={searchTerm} onSubmit={handleSearchPosts} />
              </div>
              <MatePostList activeSearchTerm={activeSearchTerm} sortBy={sortBy} filters={filters} />
            </div>
          </div>
        </div>
      </div>
      <PlusIcon handleLoginCheck={handleLoginCheck} />
    </div>
  );
}

export default MateContent
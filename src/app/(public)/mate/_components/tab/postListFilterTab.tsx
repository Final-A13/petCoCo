import Chip from "@/components/Chip";

interface PostListFilterTabProps {
  handleAllPosts: () => void;
  handleRecruiting: () => void;
  handleDateSort: () => void;
  handleDistanceSort: () => void;
  handleNewSort: () => void;
  sortBy: string;
  // defaultSort: string;
}

const PostListFilterTab = ({
  sortBy,
  // defaultSort,
  handleAllPosts,
  handleRecruiting,
  handleDateSort,
  handleDistanceSort,
  handleNewSort
}: PostListFilterTabProps) => {
  const isSelected = (chipSortBy: string) => {
    return sortBy === chipSortBy 
    // || (sortBy === "" && chipSortBy === "all"); // 기본 값 all로 -> 중복 처리 제거
  };

  return (
    <div className="z-40 ml-[1.5rem] flex w-max gap-x-[0.62rem] lg:ml-0">
      <Chip
        text="전체"
        className={`cursor-pointer rounded-[2.25rem] px-[0.75rem] py-[0.2rem] text-[1.125rem] ${
          isSelected("all") ? "bg-mainColor text-white" : "border border-mainColor text-mainColor lg:bg-gray-200"
        }`}
        onClick={handleAllPosts}
      ></Chip>
      <Chip
        text="거리순"
        className={`cursor-pointer rounded-[2.25rem] px-[0.75rem] py-[0.2rem] text-[1.125rem] ${
          isSelected("distance") ? "bg-mainColor text-white" : "border border-mainColor text-mainColor lg:bg-gray-200"
        }`}
        onClick={handleDistanceSort}
      ></Chip>
      <Chip
        text="모집중"
        className={`cursor-pointer rounded-full px-[0.75rem] py-[0.2rem] text-[1.125rem] ${
          isSelected("recruiting") ? "bg-mainColor text-white" : "border border-mainColor text-mainColor lg:bg-gray-200"
        }`}
        onClick={handleRecruiting}
      ></Chip>
      <Chip
        text="최신순"
        className={`cursor-pointer rounded-full px-[0.75rem] py-[0.2rem] text-[1.125rem] ${
          isSelected("new") ? "bg-mainColor text-white" : "border border-mainColor text-mainColor lg:bg-gray-200"
        }`}
        onClick={handleNewSort}
      ></Chip>
      <Chip
        text="마감 임박순"
        className={`cursor-pointer rounded-full px-[0.75rem] py-[0.2rem] text-[1.125rem] ${
          isSelected("recruitment_end") ? "bg-mainColor text-white" : "border border-mainColor text-mainColor lg:bg-gray-200"
        }`}
        onClick={handleDateSort}
      ></Chip>
    </div>
  );
};

export default PostListFilterTab;

import React from "react";

const MatePostItemSkeleton = () => {
  return (
    <div className="w-full animate-pulse space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 xl:grid xl:grid-cols-3 xl:gap-4 xl:space-y-0 3xl:grid 3xl:grid-cols-4 3xl:gap-4 3xl:space-y-0">
      {[...Array(12)].map((_, index) => (
        <div key={index} className="w-full rounded-[0.75rem] border px-4 py-[0.75rem] shadow-custom">
          <div className="flex flex-col">
            {/* 첫번째 줄 */}
            <div className="flex items-center justify-between">
              <div className="h-3 w-16 rounded bg-gray-200"></div>
              <div className="h-3 w-24 rounded bg-gray-200"></div>
            </div>

            {/* 두번째 줄 */}
            <div className="mt-[0.5rem] flex justify-around">
              {/* 사용자 프로필 */}
              <div className="mr-[2px] mt-4 flex flex-col items-center gap-[0.5rem]">
                <div className="h-[3.75rem] w-[3.75rem] rounded-full bg-gray-200"></div>
                <div className="h-5 w-20 rounded-full bg-gray-200 px-[0.62rem] py-[0.12rem]"></div>
              </div>

              <div className="ml-4.5 flex flex-col">
                {/* 본문 내용 */}
                <div>
                  <div className="flex flex-col">
                    {/* title */}
                    <div className="h-6 w-[200px] mt-1 rounded-full bg-gray-200"></div>
                    {/* info */}
                    <div className="flex flex-col gap-y-3">
                      <div className="mt-[0.37rem] flex gap-[0.5rem]">
                        <div className="h-[1.25rem] w-[1.25rem] rounded bg-gray-200"></div>
                        <div className="h-5 w-[170px] rounded bg-gray-200"></div>
                      </div>
                      <div className="text-4 flex gap-[0.5rem] text-[#444447]">
                        <div className="h-[1.25rem] w-[1.25rem] rounded bg-gray-200"></div>
                        <div className="h-5 w-[170px] rounded bg-gray-200"></div>
                      </div>
                      <div className="flex gap-[0.5rem]">
                        <div className="h-[1.25rem] w-[1.25rem] rounded bg-gray-200"></div>
                        <div className="h-5 w-[60px] rounded bg-gray-200"></div>
                        <div className="h-5 w-[40px] rounded-full bg-gray-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-[0.69rem]">
                  <div className="h-10 w-full rounded-full bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatePostItemSkeleton;

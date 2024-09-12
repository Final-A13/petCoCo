import React from "react";
import Image from "next/image";

import { formatDateTimeContent } from "@/app/utils/getConvertTime";
// Type
import { MatePostAllType } from "@/types/mate.type";

interface MateInfoItemProps {
  post: MatePostAllType;
}

const MateInfoItem = ({ post }: MateInfoItemProps) => {
  return (
    <>
      <div className="mb-[0.25rem] flex">
        <div className="h-[1.25rem] w-[1.25rem]">
          <Image
            src="/assets/svg/ic_location2.svg"
            alt="위치 아이콘"
            width={20}
            height={20}
            priority
            className="h-full w-full object-cover"
          />
        </div>
        <p className="ml-[0.5rem] w-[170px] overflow-hidden text-ellipsis whitespace-nowrap text-[1rem] font-[400]">
          {post.place_name || ""}
        </p>
      </div>
      <div className="mb-[0.25rem] flex">
        <div className="h-[1.25rem] w-[1.25rem]">
          <Image
            src="/assets/svg/ic_calendar2.svg"
            alt="달력 아이콘"
            width={20}
            height={20}
            priority
            className="h-full w-full object-cover"
          />
        </div>
        <p className="ml-[0.5rem] text-[1rem] font-[400]">{formatDateTimeContent(post.date_time)}</p>
      </div>
      <div className="flex items-center">
        <div className="h-[1.25rem] w-[1.25rem]">
          <Image
            src="/assets/svg/ic_user2.svg"
            alt="사용자 아이콘"
            width={20}
            height={20}
            priority
            className="h-full w-full object-cover"
          />
        </div>
        <p className="ml-[0.5rem] flex text-[1rem] font-[400]">{post.members}명 모집</p>
        <div
          className={`${post.recruiting ? "bg-[#11BBB0]" : "bg-bgGray400"} ml-[0.5rem] flex items-center justify-center rounded-full px-[0.62rem] py-[0.12rem] text-white`}
        >
          <p className="text-[0.875rem] font-[400]">{post.recruiting ? "모집중" : "모집 완료"}</p>
        </div>
      </div>
    </>
  );
};

export default MateInfoItem;

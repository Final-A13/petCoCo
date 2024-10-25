import React from "react";
import Link from "next/link";
import Image from "next/image";

import Button from "@/components/Button";
// Type
import { MatePostAllType } from "@/types/mate.type";

interface DetailUserCardProps {
  post: MatePostAllType;
  handleStartChat: () => void;
}

const DetailUserCard = ({ post, handleStartChat }: DetailUserCardProps) => {
  return (
    <div className="mb-[0.79rem] flex gap-x-[1rem] rounded-[0.75rem] border border-[#C2C0BD] px-[0.69rem] py-[0.75rem]">
      <div className="my-auto flex flex-col items-center gap-y-[0.5rem] px-[1rem]">
        <div className="mx-auto flex h-[3.75rem] w-[3.75rem]">
          <Image
            src={
              post.users && post.users?.profile_img
                ? post.users?.profile_img
                : "https://eoxrihspempkfnxziwzd.supabase.co/storage/v1/object/public/post_image/1722324396777_xo2ka9.jpg"
            }
            alt="사용자 프로필 이미지"
            width={60}
            height={60}
            className="h-full w-full rounded-full object-cover"
            priority
          />
        </div>
        <Button
          className="flex flex-shrink-0 cursor-pointer flex-col items-center justify-center whitespace-nowrap rounded-full bg-mainColor px-[0.71rem] py-[0.19rem] text-[0.85rem] text-white"
          onClick={handleStartChat}
          text="채팅하기"
        />
      </div>
      <div className="ml-1 flex flex-col justify-center">
        <Link href={`/userInfo/${post.user_id}`} className="flex cursor-pointer font-semibold">
          {post.users?.nickname}
        </Link>
        <div className="flex flex-col">
          <div className="flex gap-x-[0.5rem]">
            <p className="text-[1rem] text-[#939396] text-[400] lg:hidden xl:block">성별 / 연령대 </p>
            {post.users?.gender || post.users?.age ? (
              <p className="lg:hidden xl:block">
                {post.users?.gender || "미등록"} / {post.users?.age || "미등록"}
              </p>
            ) : (
              <p>미등록</p>
            )}
            {post.users?.gender || post.users?.age ? (
              <div className="lg:flex lg:flex-col hidden">
                <div className="lg:flex lg:gap-x-4 xl:hidden">
                  <p className="lg:flex lg:text-[1rem] lg:text-[#939396] lg:text-[400] xl:hidden">연령대 </p>
                  <p>{post.users?.gender || "미등록"}</p>
                </div>
                <div className="lg:flex lg:gap-x-4 xl:hidden">
                  <p className="lg:flex lg:text-[1rem] lg:text-[#939396] lg:text-[400] xl:hidden">성별</p>
                  <p>{post.users?.age || "미등록"}</p>
                </div>
              </div>
            ) : (
              <p>미등록</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailUserCard;

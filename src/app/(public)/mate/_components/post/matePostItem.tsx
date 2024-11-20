import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/useAuth";
import Button from "@/components/Button";
import startChat from "@/app/utils/startChat";
import MateInfoItem from "../../_components/mateInfoItem";
// Type
import { MatePostAllTypeForItem } from "@/types/mate.type";
import React from "react";

interface MatePostItemPorps {
  post: MatePostAllTypeForItem;
}

const MatePostItem = React.memo(({ post }: MatePostItemPorps) => {
  const router = useRouter();
  const { user } = useAuthStore();

  const handleStartChat = () => {
    startChat(post.user_id, user, router);
  };

  const handleLoginCheck = () => {
    if (user) {
      router.push(`/mate/posts/${post.id}`);
    }

    if (user === null) {
      router.push("/signin");
    }
  };

  return (
    <div className="w-full rounded-[0.75rem] border px-4 py-[0.75rem] shadow-custom">
      <div className="flex flex-col">
        {/* 첫번째 줄 */}
        <div className="flex items-center justify-between text-[0.625rem] text-[#A9A7A2]">
          <p className="">{post.created_at.split("T")[0]}</p>

          {post.distance !== null && <p className="">현위치에서 {post.distance.toFixed(1)}km 거리</p>}
        </div>

        {/* 두번째 줄 */}
        <div className="mt-[0.5rem] flex justify-around">
          {/* 사용자 프로필 */}
          <div className="mt-4 flex flex-col items-center gap-[0.5rem]">
            <div className="h-[3.75rem] w-[3.75rem] shrink">
              <Image
                src={
                  post.users.profile_img
                    ? `${post.users.profile_img}?width=60&height=60&format=webp`
                    : "https://eoxrihspempkfnxziwzd.supabase.co/storage/v1/object/public/post_image/1722324396777_xo2ka9.jpg"
                }
                alt="사용자 프로필 이미지"
                width={60}
                height={60}
                priority
                className="h-full w-full rounded-full object-cover"
                quality={75}
              />
            </div>
            <Link
              href={`/userInfo/${post.user_id}`}
              className="cursor-pointer whitespace-nowrap rounded-full border border-mainColor bg-[#EAE3FC] px-[0.62rem] py-[0.12rem] text-center text-[0.625rem] text-mainColor"
            >
              {post.users.nickname}
            </Link>
          </div>

          {/* 본문 내용 */}
          <div className="flex flex-col" onClick={handleLoginCheck}>
            <div className="cursor-pointer">
              <div className="flex flex-col">
                <p className="w-[170px] overflow-hidden text-ellipsis whitespace-nowrap text-[1.125rem] font-semibold">
                  {post.title}
                </p>
                <div className="flex flex-col gap-y-[0.25rem]">
                  <div className="mt-1">
                    <MateInfoItem post={post} />
                  </div>
                </div>
              </div>
            </div>

            {/* 세번째 줄 */}
            {/* 채팅하기 버튼 */}
            <div className="mt-[0.69rem] flex">
              <Button
                className="w-full cursor-pointer rounded-full bg-mainColor px-4 py-[0.5rem] text-center font-semibold text-white"
                onClick={handleStartChat}
                text="채팅하기"
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Display name 설정
MatePostItem.displayName = "MatePostItem";


export default MatePostItem;

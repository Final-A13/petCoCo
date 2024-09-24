"use client";

import React, { Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";
import { useAddressData } from "@/hooks/useAddressData";
// Type
import { MateNextPostType, MatePostAllType } from "@/types/mate.type";
import PetEdit from "../../_components/post/pet/petEdit";
// 동적 로딩 설정
const DynamicMapEditComponent = dynamic(() => import("@/app/(public)/mate/_components/map/mapEdit"), { ssr: false });

interface DetailEditProps {
  post: MatePostAllType;
  handleUpdatePost: (e: React.FormEvent<HTMLFormElement>) => void;
  handleResetEditPost: () => void;
  formPosts: Omit<MateNextPostType, "position" | "user_id">;
  setFormPosts: Dispatch<SetStateAction<Omit<MateNextPostType, "position" | "user_id">>>;
}

const DetailEdit = ({ post, handleUpdatePost, handleResetEditPost, formPosts, setFormPosts }: DetailEditProps) => {
  const { isPending, error, roadAddress } = useAddressData();

  return (
    <>
      <form onSubmit={handleUpdatePost} className="flex flex-col">
        {/* 소개 부분 */}
        <div className="mt-[2.69rem] flex flex-col px-[1.5rem]">
          <h1 className="mb-[1rem] text-[2rem] font-[600]">글 수정하기</h1>
          <div className="text-[1rem] font-[500]">
            <p>수정 후 수정 완료 버튼을 눌러주세요.</p>
          </div>
        </div>
        {/* 제목, 산책 일시, 모집 인원 수 */}
        <div className="mt-[2.69rem] flex flex-col justify-center px-[1.5rem]">
          <div className="mb-[1rem] flex flex-col gap-y-[0.5rem]">
            <label htmlFor="title" className="w-full text-[1rem] font-[500]">
              제목
            </label>
            <input
              type="text"
              value={formPosts.title || ""}
              onChange={(e) => setFormPosts({ ...formPosts, title: e.target.value })}
              placeholder="제목을 입력해 주세요"
              className="rounded-[0.5rem] border border-subTitle2 p-[0.75rem]"
              id="title"
            />
          </div>
          <div className="mb-[1rem] flex w-full flex-col gap-y-[0.5rem]">
            <label htmlFor="date_time" className="w-fulltext-[1rem] font-[500]">
              산책 일시
            </label>
            <input
              type="datetime-local"
              id="date_time"
              value={formPosts.date_time || ""}
              onChange={(e) => setFormPosts({ ...formPosts, date_time: e.target.value })}
              className="rounded-[0.5rem] border border-subTitle2 p-[0.75rem] text-subTitle1"
            />
          </div>
          <div className="flex flex-col gap-y-[0.5rem]">
            <label htmlFor="members" className="text-[1rem] font-[500]">
              모집 인원 수
            </label>
            <input
              type="number"
              id="members"
              placeholder="0명"
              className="rounded-[0.5rem] border border-subTitle2 p-[0.75rem]"
              value={formPosts.members || ""}
              onChange={(e) => setFormPosts({ ...formPosts, members: e.target.value })}
              min="1"
            />
          </div>
        </div>
        {/* 산책 장소 */}
        <div className="mb-[1rem] mt-[1.94rem] flex flex-col gap-y-[0.5rem] px-[1.5rem]">
          <label className="text-[1rem] font-[500]">산책 장소</label>
          <div>
            <DynamicMapEditComponent
              isEditing={true}
              dbPosition={{
                lat: Number(post.position?.center?.lat),
                lng: Number(post.position?.center?.lng)
              }}
            />
          </div>
        </div>
        <div className="px-[1.5rem]">
          <div className="mb-[2rem] flex flex-col gap-y-[0.5rem]">
            <p className="text-[1rem] font-[500]">주소</p>
            <div className="border-b border-subTitle2 p-[0.75rem]">
              <div className="text-subTitle1">
                {isPending ? (
                  <p>주소 정보를 찾는 중입니다...</p>
                ) : error ? (
                  <p>주소 정보를 가져오는 데 실패했습니다.</p>
                ) : (
                  <p>{roadAddress}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-[0.5rem]">
            <label>장소 정보</label>
            <input
              type="text"
              className="rounded-[0.5rem] border border-subTitle2 p-[0.75rem]"
              value={formPosts.place_name || ""}
              onChange={(e) => setFormPosts({ ...formPosts, place_name: e.target.value })}
              placeholder="장소 정보를 추가로 기입해 주세요"
            />
          </div>
        </div>
        {/* 내용 */}
        <div className="mb-[1rem] mt-[1.06rem] flex flex-col gap-y-[0.5rem] px-[1.5rem]">
          <label htmlFor="content" className="text-[1rem] font-[600]">
            내용
          </label>
          <textarea
            value={formPosts.content || ""}
            onChange={(e) => setFormPosts({ ...formPosts, content: e.target.value })}
            placeholder="선호하는 산책 동선이나 총 예상 산책 시간, 혹은 특별한 요구 사항이 있다면 적어주세요."
            className="h-[6.0625rem] w-full resize-none rounded-[0.5rem] border border-subTitle2 p-[0.75rem]"
            id="content"
            maxLength={199}
          ></textarea>
          <p className="flex justify-end text-subTitle2">{formPosts.content?.length}/200</p>
        </div>
        <PetEdit post={post} setFormPosts={setFormPosts} />
        <div className="mb-[2rem] mt-[2rem] flex flex-col gap-y-[0.5rem]">
          <div className="flex w-full items-center justify-center px-[1.5rem]">
            <button
              className="w-full cursor-pointer rounded-full bg-mainColor px-[1.5rem] py-[0.75rem] text-white"
              type="submit"
            >
              수정 완료
            </button>
          </div>
          <div className="mb-[5.5rem] flex w-full items-center justify-center px-[1.5rem]">
            <button
              className="w-full cursor-pointer rounded-full border border-mainColor px-[1.5rem] py-[0.75rem] text-mainColor"
              type="button"
              onClick={handleResetEditPost}
            >
              수정 취소
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default DetailEdit;

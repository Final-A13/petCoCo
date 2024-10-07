"use client";

import React, { Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";
import { useAddressData } from "@/hooks/useAddressData";
// Type
import { MateNextPostType, MatePostAllType } from "@/types/mate.type";
import PetEdit from "../../_components/post/pet/petEdit";
import TextAreaField from "../../_components/common/textAreaField";
import TextInputField from "../../_components/common/textInputField";
import { isFormValid } from "../../isFormValid";
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

  const handleInputChange =
    (fieldName: keyof Omit<MateNextPostType, "position" | "user_id">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.target;

      setFormPosts((prevState) => ({
        ...prevState,
        [fieldName]: value
      }));
    };

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
            <TextInputField
              type="text"
              value={formPosts.title || ""}
              formPosts={formPosts}
              fieldName="title"
              handleInputChange={handleInputChange}
              placeholder="제목을 입력해 주세요"
              textareaClassName="rounded-[0.5rem] border border-subTitle2 p-[0.75rem]"
              labelName="제목"
              labelClassName="w-full text-[1rem] font-[500]"
              id="title"
            />
          </div>
          {/* 반응형 div */}
          <div>
            <div className="flex flex-col lg:flex-row lg:gap-x-20">
              {/* 산책 일시 */}
              <div className="lg:w-50% mb-[1rem] flex w-full flex-col gap-y-[0.5rem]">
                <TextInputField
                  type="datetime-local"
                  value={formPosts.date_time || ""}
                  formPosts={formPosts}
                  fieldName="date_time"
                  handleInputChange={handleInputChange}
                  textareaClassName="rounded-[0.5rem] border border-subTitle2 p-[0.75rem]"
                  labelName="산책 일시"
                  labelClassName="w-full text-[1rem] font-[500]"
                  id="date_time"
                />
              </div>
              {/* 모집 인원 수 */}
              <div className="lg:w-50% flex w-full flex-col gap-y-[0.5rem]">
                <TextInputField
                  type="number"
                  value={formPosts.members || ""}
                  formPosts={formPosts}
                  fieldName="members"
                  handleInputChange={handleInputChange}
                  placeholder="0"
                  textareaClassName="rounded-[0.5rem] border border-subTitle2 p-[0.75rem]"
                  labelName="모집 인원 수"
                  labelClassName="w-full text-[1rem] font-[500]"
                  min={1}
                  id="members"
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-x-20">
              {/* 산책 장소 */}
              <div className="lg:w-50% mb-[1rem] mt-[1.94rem] flex w-full flex-col gap-y-[0.5rem]">
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
              <div className="lg:w-50% w-full lg:mt-8">
                <div className="mb-[2rem] flex flex-col gap-y-[0.5rem]">
                  <p className="text-[1rem] font-[500]">주소</p>
                  <div className="border-b border-subTitle2 p-[0.75rem] text-subTitle1">
                    {isPending ? (
                      <p>주소 정보를 찾는 중입니다...</p>
                    ) : error ? (
                      <p>주소 정보를 가져오는 데 실패했습니다.</p>
                    ) : (
                      <p>{roadAddress}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-y-[0.5rem]">
                  <TextInputField
                    type="text"
                    value={formPosts.place_name || ""}
                    formPosts={formPosts}
                    fieldName="place_name"
                    handleInputChange={handleInputChange}
                    placeholder="장소 정보를 추가로 기입해 주세요. ex) 00공원 등"
                    textareaClassName="rounded-[0.5rem] border border-subTitle2 p-[0.75rem]"
                    labelName="장소 정보"
                    labelClassName="w-full text-[1rem] font-[500]"
                    id="place_name"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 내용 */}
        <div className="mb-[1rem] mt-[1.06rem] flex flex-col gap-y-[0.5rem] px-[1.5rem]">
          <TextAreaField
            value={formPosts.content || ""}
            formPosts={formPosts}
            fieldName="content"
            handleInputChange={handleInputChange}
            labelName="내용"
            placeholder="선호하는 산책 동선이나 총 예상 산책 시간, 혹은 특별한 요구 사항이 있다면 적어주세요."
            labelClassName="text-[1rem] font-[600]"
            textareaClassName="h-[6.0625rem] w-full resize-none overflow-x-scroll rounded-[0.5rem] border border-subTitle2 p-[0.75rem] scrollbar-hide"
            maxLength={199}
            id="content"
          />
        </div>

        <PetEdit post={post} setFormPosts={setFormPosts} />
        <div className="lg:flex lg:flex-row lg:justify-center lg:gap-x-[1.5rem] lg:mt-10 mb-[2rem] mt-[2rem] flex flex-col gap-y-[0.5rem]">
          <div className="flex w-full items-center justify-center px-[1.5rem] lg:w-[20.4375rem] lg:px-0">
            <button
              className={`w-full cursor-pointer rounded-full px-[1.5rem] py-[0.75rem] text-white ${
                !isFormValid(formPosts) ? "cursor-not-allowed bg-gray-400 opacity-50" : "bg-mainColor"
              }`}
              type="submit"
            >
              수정 완료
            </button>
          </div>
          <div className="lg:mb-0 mb-[5.5rem] flex w-full items-center justify-center px-[1.5rem] lg:w-[20.4375rem] lg:px-0">
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

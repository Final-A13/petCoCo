"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { locationStore } from "@/zustand/locationStore";
import { useAuthStore } from "@/zustand/useAuth";
import { getConvertDate } from "../../../../utils/getConvertDate";
import { isFormValid } from "../../isFormValid";
import Swal from "sweetalert2";
import PetForm from "./pet/petForm";
// Type
import { MateNextPostType } from "@/types/mate.type";
import { useAddressData } from "@/hooks/useAddressData";
import usePostAddMutation from "@/hooks/matePost/usePostAddMutation";
import TextAreaField from "../common/textAreaField";
import TextInputField from "../common/textInputField";
import Link from "next/link";

// 동적 로딩 설정
const DynamicMapComponent = dynamic(() => import("@/app/(public)/mate/_components/map/mapForm"), { ssr: false });

const PostForm = () => {
  const { user } = useAuthStore();
  const userId: string = user && user.id;
  const { position } = locationStore();
  const { isPending, error, roadAddress, address } = useAddressData();

  const initialState: Omit<MateNextPostType, "user_id"> = {
    title: "",
    content: "",
    position: { center: { lat: 37.5556236021213, lng: 126.992199507869 }, errMsg: null, isLoading: true },
    date_time: getConvertDate(),
    members: "",
    recruiting: true,
    address: "",
    place_name: "",
    location: "",
    pet_id: []
  };

  const [formPosts, setFormPosts] = useState<Omit<MateNextPostType, "user_id">>(initialState);
  const { addMutation } = usePostAddMutation();

  const handleInputChange =
    (fieldName: keyof Omit<MateNextPostType, "position" | "user_id">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.target;
      setFormPosts((prevState) => ({
        ...prevState,
        [fieldName]: value
      }));
    };

  const handleUploadPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid(formPosts)) {
      Swal.fire({
        title: "모든 항목을 입력해 주세요!",
        text: "빠진 부분이 있는지 확인해 주세요.",
        icon: "warning"
      });
      return;
    }

    // if ((new Date(formPosts.date_time) > new Date())) {
    //   Swal.fire({
    //     title: "유효하지 않은 날짜입니다!",
    //     text: "선택한 날짜가 오늘보다 이후여야 합니다.",
    //     icon: "error"
    //   });
    //   return;
    // }

    const formAllData = {
      post: {
        ...formPosts,
        address,
        position,
        user_id: userId
      }
    };

    try {
      addMutation.mutate(formAllData);
      setFormPosts(initialState);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen">
      <form onSubmit={handleUploadPost} className="flex flex-col">
        {/* 소개 부분 */}
        <div className="mt-[2.69rem] flex flex-col px-[1.5rem]">
          <h1 className="mb-[1rem] text-[2rem] font-[600]">글 작성하기</h1>
          <div className="text-[1rem] font-[500]">
            <p>함께 산책할 메이트를 구하는 글을 올려요!</p>
            <p>내용이 더 자세할수록 다른 메이트 분들에게 도움이 되어요.</p>
          </div>
        </div>
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
              {/* 산책 장소 지도 */}
              <div className="lg:w-50% mb-[1rem] mt-[1.94rem] flex w-full flex-col gap-y-[0.5rem]">
                <label className="text-[1rem] font-[600]">산책 장소</label>
                <div className="relative z-10">
                  <DynamicMapComponent center={{ lat: 37.5556236021213, lng: 126.992199507869 }} />
                </div>
              </div>
              {/* 주소, 장소정보 */}
              <div className="lg:w-50% w-full lg:mt-8">
                <div className="mb-[2rem] flex flex-col gap-y-[0.5rem]">
                  <p className="text-[1rem] font-[600]">주소</p>
                  <div className="border-b border-subTitle2 p-[0.75rem]">
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
            textareaClassName="h-[6.0625rem] lg:h-[12.75rem] w-full resize-none overflow-x-scroll rounded-[0.5rem] border border-subTitle2 p-[0.75rem] scrollbar-hide"
            maxLength={199}
            id="content"
          />
        </div>

        {/* 반려동물 정보 등록 */}
        <PetForm setFormPosts={setFormPosts} />
        <div className="lg:flex lg:flex-row lg:justify-center lg:gap-x-[1.5rem] lg:mt-10">
        {/* 취소하기 버튼 */}
          <div className="hidden lg:w-[20.4375rem] lg:flex lg:items-center lg:justify-center lg:h-full">
            <Link
              href="/mate"
              className="lg:w-[20.4375rem] cursor-pointer rounded-full border border-mainColor px-[1.5rem] py-[0.75rem] text-mainColor text-center"
            >
              취소하기
            </Link>
          </div>
          {/* 작성하기 버튼 */}
          <div className="mb-[7.5rem] mt-[1.5rem] flex w-full items-center justify-center px-[1.5rem] lg:mt-0 lg:mb-[5rem] lg:w-[20.4375rem] lg:px-0">
            <button
              type="submit"
              className={`w-full cursor-pointer rounded-full px-[1.5rem] py-[0.75rem] text-white ${
                !isFormValid(formPosts) ? "cursor-not-allowed bg-gray-400 opacity-50" : "bg-mainColor"
              }`}
              disabled={!isFormValid(formPosts)}
            >
              작성완료
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;

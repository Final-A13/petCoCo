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
            <p>
              내용이 더 자세할수록 다른 메이트 분들에게
              <br />
              도움이 되어요.
            </p>
          </div>
        </div>
        <div className="mt-[2.69rem] flex flex-col justify-center px-[1.5rem]">
          <div className="mb-[1rem] flex flex-col gap-y-[0.5rem]">
            <label htmlFor="title" className="w-full text-[1rem] font-[600]">
              제목
            </label>
            {/* <input
              type="text"
              value={formPosts.title || ""}
              onChange={(e) => setFormPosts({ ...formPosts, title: e.target.value })}
              placeholder="제목을 입력해 주세요"
              className="rounded-[0.5rem] border border-subTitle2 p-[0.75rem]"
              id="title"
            /> */}
            <TextInputField
              type="text"
              value={formPosts.title || ""}
              formPosts={formPosts}
              fieldName="title"
              handleInputChange={handleInputChange}
              placeholder="제목을 입력해 주세요"
              className="rounded-[0.5rem] border border-subTitle2 p-[0.75rem]"
              id="title"
            />
          </div>
          <div className="mb-[1rem] flex w-full flex-col gap-y-[0.5rem]">
            <label htmlFor="date_time" className="w-fulltext-[1rem] font-[600]">
              산책 일시
            </label>
            {/* <input
              type="datetime-local"
              id="date_time"
              value={formPosts.date_time || ""}
              onChange={(e) => setFormPosts({ ...formPosts, date_time: e.target.value })}
              className="rounded-[0.5rem] border border-subTitle2 p-[0.75rem] text-subTitle1"
            /> */}
            <TextInputField
              type="datetime-local"
              value={formPosts.date_time || ""}
              formPosts={formPosts}
              fieldName="date_time"
              handleInputChange={handleInputChange}
              className="rounded-[0.5rem] border border-subTitle2 p-[0.75rem]"
              id="date_time"
            />
          </div>
          <div className="flex flex-col gap-y-[0.5rem]">
            <label htmlFor="members" className="text-[1rem] font-[600]">
              모집 인원 수
            </label>
            {/* <input
              type="number"
              id="members"
              placeholder="0"
              className="rounded-[0.5rem] border border-subTitle2 p-[0.75rem]"
              value={formPosts.members || ""}
              onChange={(e) => setFormPosts({ ...formPosts, members: e.target.value })}
              min="1"
            /> */}
            <TextInputField
              type="number"
              value={formPosts.members || ""}
              formPosts={formPosts}
              fieldName="members"
              handleInputChange={handleInputChange}
              placeholder="0명"
              className="rounded-[0.5rem] border border-subTitle2 p-[0.75rem]"
              min={1}
              id="members"
            />
          </div>
        </div>
        <div className="mb-[1rem] mt-[1.94rem] flex flex-col gap-y-[0.5rem] px-[1.5rem]">
          <label className="text-[1rem] font-[600]">산책 장소</label>
          <div className="relative z-10">
            <DynamicMapComponent center={{ lat: 37.5556236021213, lng: 126.992199507869 }} />
          </div>
        </div>
        <div className="px-[1.5rem]">
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
          <label className="text-[1rem] font-[600]">장소 정보</label>
          {/* <div className="flex flex-col gap-y-[0.5rem]">
            <input
              type="text"
              className="rounded-[0.5rem] border border-subTitle2 p-[0.75rem]"
              value={formPosts.place_name || ""}
              onChange={(e) => setFormPosts({ ...formPosts, place_name: e.target.value })}
              placeholder="장소 정보를 추가로 기입해 주세요. ex) 00공원 등"
            />
          </div> */}
          <TextInputField
              type="text"
              value={formPosts.place_name || ""}
              formPosts={formPosts}
              fieldName="place_name"
              handleInputChange={handleInputChange}
              placeholder="장소 정보를 추가로 기입해 주세요. ex) 00공원 등"
              className="rounded-[0.5rem] border border-subTitle2 p-[0.75rem]"
              id="place_name"
            />
        </div>
        {/* 내용 */}
        <label htmlFor="content" className="text-[1rem] font-[600]">
          내용
        </label>
        {/* <div className="mb-[1rem] mt-[1.06rem] flex flex-col gap-y-[0.5rem] px-[1.5rem]">
          <textarea
            value={formPosts.content || ""}
            onChange={(e) => setFormPosts({ ...formPosts, content: e.target.value })}
            placeholder="선호하는 산책 동선이나 총 예상 산책 시간, 혹은 특별한 요구 사항이 있다면 적어주세요."
            className="h-[6.0625rem] w-full resize-none overflow-x-scroll rounded-[0.5rem] border border-subTitle2 p-[0.75rem] scrollbar-hide"
            id="content"
            maxLength={199}
          ></textarea>
          <p className="flex justify-end text-subTitle2">{formPosts.content?.length}/200</p>
        </div> */}
        <TextAreaField
          value={formPosts.content || ""}
          formPosts={formPosts}
          fieldName="content"
          handleInputChange={handleInputChange}
          placeholder="선호하는 산책 동선이나 총 예상 산책 시간, 혹은 특별한 요구 사항이 있다면 적어주세요."
          className="h-[6.0625rem] w-full resize-none overflow-x-scroll rounded-[0.5rem] border border-subTitle2 p-[0.75rem] scrollbar-hide"
          maxLength={199}
          id="content"
        />

        {/* 반려동물 정보 등록 */}
        <PetForm setFormPosts={setFormPosts} />
        {/* 작성하기 버튼 */}
        <div className="mb-[7.5rem] mt-[1.5rem] flex w-full items-center justify-center px-[1.5rem]">
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
      </form>
    </div>
  );
};

export default PostForm;

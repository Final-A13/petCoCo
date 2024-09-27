import { MateNextPostType } from "@/types/mate.type";
import React, { Dispatch, SetStateAction } from "react";
import { FormPostsType } from "./addressInfoField";

interface TextAreaFieldProps<T extends FormPostsType> {
  formPosts: T,
  setFormPosts:  Dispatch<SetStateAction<T>>
}

const TextAreaField = <T extends FormPostsType>({formPosts, setFormPosts}: TextAreaFieldProps<T>) => {
  return (
    <div className="mb-[1rem] mt-[1.06rem] flex flex-col gap-y-[0.5rem] px-[1.5rem]">
      <label htmlFor="content" className="text-[1rem] font-[600]">
        내용
      </label>
      <textarea
        value={formPosts.content || ""}
        onChange={(e) => setFormPosts({ ...formPosts, content: e.target.value })}
        placeholder="선호하는 산책 동선이나 총 예상 산책 시간, 혹은 특별한 요구 사항이 있다면 적어주세요."
        className="h-[6.0625rem] w-full resize-none overflow-x-scroll rounded-[0.5rem] border border-subTitle2 p-[0.75rem] scrollbar-hide"
        id="content"
        maxLength={199}
      ></textarea>
      <p className="flex justify-end text-subTitle2">{formPosts.content?.length}/200</p>
    </div>
  );
};

export default TextAreaField;

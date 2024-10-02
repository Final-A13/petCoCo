import React from "react";
import { FormPostsType } from "@/types/mate.type";

interface TextAreaFieldProps {
  value: string;
  formPosts: FormPostsType;
  fieldName: keyof FormPostsType;
  handleInputChange: (
    fieldName: keyof FormPostsType
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  id: string;
}

const TextAreaField = ({ formPosts, handleInputChange, value, fieldName, placeholder, className, maxLength, id}: TextAreaFieldProps) => {
  return (
    <div className="mb-[1rem] mt-[1.06rem] flex flex-col gap-y-[0.5rem] px-[1.5rem]">
      <label htmlFor="content" className="text-[1rem] font-[600]">
        내용
      </label>
      <textarea
        value={value}
        onChange={handleInputChange(fieldName)}
        placeholder={placeholder}
        className={className}
        maxLength={maxLength}
        id={id}
      ></textarea>
      <p className="flex justify-end text-subTitle2">{formPosts.content?.length}/200</p>
    </div>
  );
};

export default TextAreaField;

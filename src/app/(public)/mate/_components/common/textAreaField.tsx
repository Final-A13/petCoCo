import React from "react";
import { FormPostsType } from "@/types/mate.type";

interface TextAreaFieldProps {
  value: string;
  formPosts: FormPostsType;
  fieldName: keyof FormPostsType;
  handleInputChange: (
    fieldName: keyof FormPostsType
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  labelName?: string;
  placeholder?: string;
  labelClassName?: string;
  textareaClassName?: string;
  maxLength?: number;
  id: string;
}

const TextAreaField = ({
  formPosts,
  handleInputChange,
  value,
  fieldName,
  labelName,
  placeholder,
  labelClassName,
  textareaClassName,
  maxLength,
  id
}: TextAreaFieldProps) => {
  return (
    <>
      <label htmlFor={id} className={labelClassName}>
        {labelName}
      </label>
      <textarea
        value={value}
        onChange={handleInputChange(fieldName)}
        placeholder={placeholder}
        className={textareaClassName}
        maxLength={maxLength}
        id={id}
      ></textarea>
      <p className="flex justify-end text-subTitle2">{formPosts.content?.length}/200</p>
    </>
  );
};

export default TextAreaField;

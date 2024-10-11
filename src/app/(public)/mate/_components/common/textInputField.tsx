import { FormPostsType } from "@/types/mate.type";
import React from "react";

interface TextInputFieldProps {
  type: string;
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
  min?: number;
  id: string;
}

const TextInputField = ({
  type,
  value,
  fieldName,
  handleInputChange,
  labelName,
  placeholder,
  labelClassName,
  textareaClassName,
  min,
  id
}: TextInputFieldProps) => {
  return (
    <>
      <label htmlFor={id} className={labelClassName}>
        {labelName}
      </label>
      <input
        type={type}
        value={value}
        onChange={handleInputChange(fieldName)}
        placeholder={placeholder}
        className={textareaClassName}
        min={min}
        id={id}
      />
    </>
  );
};

export default TextInputField;

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
  placeholder?: string;
  className?: string;
  min?: number;
  id: string;
}

const TextInputField = ({ type, value, fieldName, handleInputChange, placeholder, id, className, min}: TextInputFieldProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={handleInputChange(fieldName)}
      placeholder={placeholder}
      className={className}
      min={min}
      id={id}
    />
  );
};

export default TextInputField;

import { MateNextPostType } from "@/types/mate.type";
import React, { Dispatch, SetStateAction } from "react";
import { FormPostsType } from "./addressInfoField";

interface TextInputFieldProps<T extends FormPostsType> {
  formPosts: T,
  setFormPosts:  Dispatch<SetStateAction<T>>
}
const TextInputField = <T extends FormPostsType>({formPosts, setFormPosts}: TextInputFieldProps<T>) => {
  return (
    <div>TextInputField</div>
  )
}

export default TextInputField
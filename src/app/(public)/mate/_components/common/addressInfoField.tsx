import { MateNextPostType } from "@/types/mate.type";
import React, { Dispatch, SetStateAction } from "react";

export type FormPostsType = Omit<MateNextPostType, "user_id"> | Omit<MateNextPostType, "position" | "user_id">;

interface AddressInfoFieldProps<T extends FormPostsType> {
  formPosts: T;
  setFormPosts: Dispatch<SetStateAction<T>>;
}

const AddressInfoField = <T extends FormPostsType>({ formPosts, setFormPosts }: AddressInfoFieldProps<T>) => {
  return (
    <div className="flex flex-col gap-y-[0.5rem]">
      <label className="text-[1rem] font-[600]">장소 정보</label>
      <input
        type="text"
        className="rounded-[0.5rem] border border-subTitle2 p-[0.75rem]"
        value={formPosts.place_name || ""}
        onChange={(e) => setFormPosts({ ...formPosts, place_name: e.target.value } as T)}
        placeholder="장소 정보를 추가로 기입해 주세요. ex) 00공원 등"
      />
    </div>
  );
};

export default AddressInfoField;
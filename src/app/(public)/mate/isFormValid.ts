import { MateNextPostType } from "@/types/mate.type";

export const isFormValid = (formPosts: Omit<MateNextPostType, "user_id">) => {

  const { title, date_time, members, place_name, content, pet_id } = formPosts;
  // pet_id가 배열인지 확인하고, 배열일 경우에만 길이를 체크
  const isPetSelected = Array.isArray(pet_id) && pet_id.length > 0;
  return !!(title && date_time && members && place_name && content && isPetSelected);
};
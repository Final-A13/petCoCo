"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { MateNextPostType } from "@/types/mate.type";

const usePostAddMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // 게시물 등록
  const addPost = async (formAllData: { post: MateNextPostType }) => {
    try {
      const response = await fetch(`/api/mate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          post_data: formAllData.post
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const addMutation = useMutation({
    mutationFn: async (formAllData: { post: MateNextPostType }) => await addPost(formAllData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matePosts"] });
      Swal.fire({
        title: "완료!",
        text: "게시글이 등록되었습니다!",
        icon: "success"
      });
      router.replace("/mate");
    }
  });

  return {
    addMutation
  };
};

export default usePostAddMutation;

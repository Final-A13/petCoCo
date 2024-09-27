"use client";

import { Dispatch, SetStateAction } from 'react';
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { MatePostAllType, PostUpdate } from "@/types/mate.type";

interface UserPostMutationProps {
  updatePost: PostUpdate;
  post: MatePostAllType;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const usePostMutation = ({ updatePost, post, setIsEditing}: UserPostMutationProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // 게시물 수정, 삭제, 상태 변경
  const deletePost = async (id: string) => {
    try {
      const response = await fetch(`/api/mate/post/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editPost = async (id: string) => {
    try {
      const response = await fetch(`/api/mate/post/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatePost)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsEditing(true);
    } catch (error) {
      console.error(error);
    }
  };

  const togglePost = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: `${post.recruiting ? "모집 완료하시겠습니까?" : "모집 중으로 변경하시겠습니까?"}`,
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
        confirmButtonColor: "#1763e7",
        cancelButtonColor: "#c0c0c0",
        icon: "question"
      });

      if (result.isConfirmed) {
        
        const response = await fetch(`/api/mate/post/${post.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ recruiting: !post.recruiting })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        Swal.fire("완료!", "모집 상태가 변경되었습니다!", "success");
      } 
    } catch (error) {
      console.error(error);
      Swal.fire("오류!", "모집상태가 변경되지 않았습니다.", "error");
    }
  };

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deletePost(id),
    retry: 1,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["matePosts"] });
      Swal.fire({
        title: "완료!",
        text: "게시글 삭제가 완료되었습니다.",
        icon: "success"
      });
      router.replace("/mate");
    },
    onError: (error) => {
      console.error("삭제 중 오류 발생:", error);
      Swal.fire({
        title: "오류가 발생했습니다!",
        text: "게시글 삭제에 실패했습니다.",
        icon: "error"
      });
    }
  });

  const editMutation = useMutation({
    mutationFn: (id: string) => editPost(id),
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matePosts"] });
      Swal.fire({
        title: "완료!",
        text: "게시글 수정이 완료되었습니다.",
        icon: "success"
      });
      setIsEditing(false);
    },
    onError: (error) => {
      console.error("수정 중 오류 발생:", error);
      Swal.fire({
        title: "오류가 발생했습니다!",
        text: "게시글 수정에 실패했습니다.",
        icon: "error"
      });
    }
  });

  const toggleMutation = useMutation({
    mutationFn: (id: string) => togglePost(id),
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matePosts"] });
    }
  });

  return {
    deleteMutation,
    editMutation,
    toggleMutation
  };
};

export default usePostMutation;

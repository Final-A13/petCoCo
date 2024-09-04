"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuthStore } from "@/zustand/useAuth";
import { locationStore } from "@/zustand/locationStore";
import Swal from "sweetalert2";
import DetailView from "./detailView";
import DetailEdit from "./detailEdit";
import { useAddressData } from "@/hooks/useAddressData";
// Type
import { MateNextPostType, MatePostAllType } from "@/types/mate.type";

interface DetailMatePostProps {
  post: MatePostAllType;
}


const DetailMatePost = ({ post }: DetailMatePostProps) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const userId = user && user.id;
  const router = useRouter();
  // const [isMapLoading, setIsMapLoading] = useState(true);
  const initialState: Omit<MateNextPostType, "user_id" | "position"> = {
    title: post.title || "",
    content: post.content || "",
    date_time: post.date_time || "",
    members: post.members || "",
    recruiting: post.recruiting || true,
    address: post.address || "",
    place_name: post.place_name || "",
    location: post.location || "",
    pet_id: post.pet_id || []
  };

  const [formPosts, setFormPosts] = useState<Omit<MateNextPostType, "user_id" | "position">>(initialState);
  const { position, setPosition } = locationStore();
  const { address } = useAddressData();
  const [isEditing, setIstEditting] = useState<boolean>(false);

  const updatePost = {
    ...formPosts,
    address,
    position,
    location: `POINT(${position.center.lng} ${position.center.lat})`
  };

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

      setIstEditting(true);
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
        Swal.fire("완료!", "모집 상태가 변경되었습니다!", "success");

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
      } else if (result.isDenied) {
        Swal.fire("오류!", "모집상태가 변경되지 않았습니다.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("오류!", "모집상태가 변경되지 않았습니다.", "error");
    }
  };

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["matePosts", post.id] });
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matePosts"] });
      Swal.fire({
        title: "완료!",
        text: "게시글 수정이 완료되었습니다.",
        icon: "success"
      });
      setIstEditting(false);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matePosts"] });
    }
  });

  const handleDeletePost = (id: string) => {
    Swal.fire({
      title: "게시글 삭제",
      text: "현재 게시글을 삭제하시겠어요?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#c0c0c0",
      confirmButtonText: "삭제",
      cancelButtonText: "취소"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleEditPost = () => {
    Swal.fire({
      title: "게시글 수정",
      text: "현재 게시글을 수정하시겠어요?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1763e7",
      cancelButtonColor: "#c0c0c0",
      confirmButtonText: "확인",
      cancelButtonText: "취소"
    }).then((result) => {
      if (result.isConfirmed) {
        setIstEditting(true);
      }
    });
  };

  const handleTogglePost = (id: string) => {
    toggleMutation.mutate(id);
    setIstEditting(false);
  };

  const handleResetEditPost = () => {
    setIstEditting(false);
    setPosition({
      center: {
        lat: Number(post.position?.center?.lat),
        lng: Number(post.position?.center?.lng)
      },
      isLoading: false
    });
  };

  const handleUpdatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editMutation.mutate(post.id);
  };



  return (
    <div className="container min-h-screen">
      {isEditing ? (
      <DetailEdit
        post={post}
        handleUpdatePost={handleUpdatePost}
        handleResetEditPost={handleResetEditPost}
        formPosts={formPosts}
        setFormPosts={setFormPosts}
      />
      ) : (
        <DetailView
          post={post}
          userId={userId}
          handleEditPost={handleEditPost}
          handleDeletePost={handleDeletePost}
          handleTogglePost={handleTogglePost}
        />
      )}
    </div>
  );
};

export default DetailMatePost;

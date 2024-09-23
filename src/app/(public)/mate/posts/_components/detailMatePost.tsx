"use client";

import { useState } from "react";
import { useAuthStore } from "@/zustand/useAuth";
import { locationStore } from "@/zustand/locationStore";
import Swal from "sweetalert2";
import DetailView from "./detailView";
import DetailEdit from "./detailEdit";
import { useAddressData } from "@/hooks/useAddressData";
import usePostMutation from "@/hooks/matePost/usePostDetailMutations";
// Type
import { MateNextPostType, MatePostAllType } from "@/types/mate.type";

interface DetailMatePostProps {
  post: MatePostAllType;
}

const DetailMatePost = ({ post }: DetailMatePostProps) => {
  const { user } = useAuthStore();
  const userId = user && user.id;
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
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const updatePost = {
    ...formPosts,
    address,
    position,
    location: `POINT(${position.center.lng} ${position.center.lat})`
  };
  const { deleteMutation, editMutation, toggleMutation } = usePostMutation({
    updatePost,
    post,
    setIsEditing
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
        setIsEditing(true);
      }
    });
  };

  const handleTogglePost = (id: string) => {
    toggleMutation.mutate(id);
    setIsEditing(false);
  };

  const handleResetEditPost = () => {
    setIsEditing(false);
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

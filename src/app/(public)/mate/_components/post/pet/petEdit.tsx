"use client";

import { useState } from "react";
import PetSelection from "./petSelection";
// Type
import { MateNextPostType, MatePostAllType } from "@/types/mate.type";
import { Json } from "@/types/supabase";

interface handlePetSelect {
  post: MatePostAllType;
  setFormPosts: React.Dispatch<React.SetStateAction<Omit<MateNextPostType, "position" | "user_id">>>;
}

const PetEdit = ({ post, setFormPosts }: handlePetSelect) => {
  const getInitialSelectedPetIds = (petId: Json): string[] => {
    if (!petId) return [];
    
    if (Array.isArray(petId)) {
      return petId.map(String);
    }
  
    return [String(petId)];
  };
  const [selectedPetIds, setSelectedPetIds] = useState<string[]>(() => getInitialSelectedPetIds(post.pet_id));

  const handlePetSelect = (value: string[]) => {
    setSelectedPetIds(value);

    setFormPosts((prevFormPosts: Omit<MateNextPostType, "position" | "user_id">) => ({
      ...prevFormPosts,
      pet_id: value
    }));
  };

  return (
    <PetSelection selectedPetIds={selectedPetIds} handlePetSelect={handlePetSelect} />
  );
};

export default PetEdit;

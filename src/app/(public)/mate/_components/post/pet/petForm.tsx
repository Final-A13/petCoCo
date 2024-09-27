"use client";

import { useState } from "react";
import { MateNextPostType } from "@/types/mate.type";
import { PetFormSkeleton } from "../../Skeleton_UI/petFormSkeleton";
import PetSelection from "./petSelection";

interface handlePetSelect {
  setFormPosts: React.Dispatch<React.SetStateAction<Omit<MateNextPostType, "user_id">>>;
}

const PetForm = ({ setFormPosts }: handlePetSelect) => {
  const [selectedPetIds, setSelectedPetIds] = useState<string[]>([]);

  const handlePetSelect = (value: string[]) => {
    setSelectedPetIds(value);

    setFormPosts((prevFormPosts: Omit<MateNextPostType, "user_id">) => ({
      ...prevFormPosts,
      pet_id: value
    }));
  };

  return (
    <PetSelection selectedPetIds={selectedPetIds} handlePetSelect={handlePetSelect} />
  );
};

export default PetForm;

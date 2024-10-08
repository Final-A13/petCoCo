import React from "react";
import { PetFormSkeleton } from "../../Skeleton_UI/petFormSkeleton";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { useUserPetsData } from "@/hooks/useUserPetsData";

interface PetSelectionProps {
  selectedPetIds: string[];
  handlePetSelect: (value: string[]) => void;
}

const PetSelection = ({ selectedPetIds, handlePetSelect }: PetSelectionProps) => {
  const { userPets, isPetPending, petError } = useUserPetsData();

  if (isPetPending) {
    return <PetFormSkeleton />;
  }

  if (petError) {
    return <div className="ml-[1.5rem]">펫 정보를 불러오는 데 문제가 발생했습니다.</div>;
  }

  return (
    <div>
      <div className="mt-[1.63rem] flex items-center justify-between px-[1.5rem] lg:justify-start">
        <p className="text-[1rem] font-[600] text-black">반려동물 정보 추가</p>
        <p className="mb-2 text-sm font-semibold text-subTitle1 lg:mb-0 lg:ml-10">다중 선택 가능</p>
      </div>
      <div className="mt-[0.81rem] flex w-full">
        <div className="mx-[1.5rem] w-full">
          {userPets && userPets.length > 0 ? (
            <CheckboxGroup value={selectedPetIds} onValueChange={handlePetSelect} color="default">
              {userPets.map((pet) => (
                <Checkbox key={pet.id} value={pet.id}>
                  {pet.petName}
                </Checkbox>
              ))}
            </CheckboxGroup>
          ) : (
            <div className="text-subTitle2">
              <p>반려견 정보가 없습니다! </p>
              <p>마이페이지에서 반려견을 등록해 주세요🐾</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetSelection;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FilterDateSelect from "../_components/filter/select/filterDateSelect";
import FilterWeightSelect from "../_components/filter/select/filterWeightSelect";
import FilterOptionSelect from "../_components/filter/select/filterOptionSelect";
import Male_femaleFilter from "../_components/filter/button/male_femaleFilter";
import NeuteredFilter from "../_components/filter/button/neuteredFilter";
import Button from "@/components/Button";
import { gender, age, regions, times } from "../selectOptionArray";
import { useFilterStore } from "@/zustand/useFilterStore";
// Type
import { Filters } from "@/zustand/useFilterStore";

const FilterPage = () => {
  const { filters, setFilters } = useFilterStore();
  const [localFilters, setLocalFilters] = useState<Filters>(filters);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedNeutered, setSelectedNeutered] = useState<string | null>(null);

  const router = useRouter();

  const updateFilter = (filterName: keyof Filters, value: string) => {
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const handleSaveFilter = () => {
    const queryParams = new URLSearchParams();

    Object.entries(localFilters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        queryParams.append(key, value);
      }
    });

    router.push(`/mate?${queryParams.toString()}`);
  };

  const handleResetFilter = () => {
    const resetFilters = {
      gender: null,
      age: null,
      date_time: undefined,
      male_female: null,
      weight: null,
      regions: null,
      times: null,
      neutralized: null
    };

    setLocalFilters(resetFilters);
    setFilters(resetFilters);
    setSelectedGender(null);
    setSelectedNeutered(null);

    // router.push("/mate");
  };

  return (
    <div>
      <div className="mx-auto max-w-[420px] lg:max-w-none">
        <Button className="hidden lg:block cursor-pointer" text="뒤로가기" />
        <div className="lg:flex lg:flex-row lg:mt-14">
          <div className="w-full lg:w-50%">
            <p className="ml-[1rem] mt-[1rem] text-[1.5rem] font-[600]">산책 메이트 상세 필터</p>
            <div className="w-full px-[1.5rem]">
              <FilterOptionSelect
                label="성별"
                array={gender}
                selected={localFilters.gender}
                onSelect={(items) => updateFilter("gender", items)}
              />
              <FilterOptionSelect
                label="연령대"
                array={age}
                selected={localFilters.age}
                onSelect={(items) => updateFilter("age", items)}
              />
              <FilterOptionSelect
                label="지역별"
                array={regions}
                selected={localFilters.regions}
                onSelect={(items) => updateFilter("regions", items)}
              />
              <FilterDateSelect
                label="산책일"
                selected={localFilters.date_time}
                onSelect={(items) => updateFilter("date_time", items)}
              />
              <FilterOptionSelect
                label="시간대"
                array={times}
                selected={localFilters.times}
                onSelect={(items) => updateFilter("times", items)}
              />
            </div>
          </div>
          <div className="w-full lg:w-50%">
            <p className="ml-[1rem] mt-[3.38rem] lg:mt-[1rem] text-[1.5rem] font-[600]">반려견 정보 필터</p>
            <div className="mt-5 px-[1.5rem]">
              <Male_femaleFilter
                selectedGender={selectedGender || localFilters.male_female}
                setSelectedGender={setSelectedGender}
                onSelect={(items) => updateFilter("male_female", items)}
              />
              <NeuteredFilter
                selectedNeutered={selectedNeutered || localFilters.neutralized}
                setSelectedNeutered={setSelectedNeutered}
                onSelect={(items) => updateFilter("neutralized", items)}
              />
              <FilterWeightSelect
                label="몸무게"
                selected={localFilters.weight}
                onSelect={(items) => updateFilter("weight", items)}
              />
            </div>
          </div>
        </div>
        <div className="mb-[6.63rem] mt-[3.63rem] flex flex-col gap-y-[0.5rem] px-[1.5rem] lg:flex-row lg:justify-center lg:gap-x-[1.5rem] lg:mt-[6rem]">
          <Button
            className="flex w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-[0.5rem] bg-mainColor px-[8.53rem] py-[0.75rem] text-[0.9375rem] font-[590] text-white lg:w-[20.4375rem]"
            text="저장하기"
            onClick={handleSaveFilter}
          />
          <Button
            className="mb-[2rem] flex w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-[0.5rem] border-1 border-mainColor px-[8rem] py-[0.75rem] text-[0.9375rem] font-[590] text-mainColor lg:w-[20.4375rem] lg:mb-0"
            text="초기화 하기"
            onClick={handleResetFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPage;

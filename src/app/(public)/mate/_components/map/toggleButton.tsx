import React, { Dispatch, SetStateAction } from 'react';

interface ToggleButtonProps {
  toggle: string;
  setToggle: Dispatch<SetStateAction<"map" | "roadview">>
}

const ToggleButton = ({ toggle, setToggle }: ToggleButtonProps) => {
  
  return (
    <div className="absolute left-2 top-2 z-10">
        <button
          type="button"
          onClick={() => setToggle(toggle === "map" ? "roadview" : "map")}
          className={`rounded-md ${toggle === "roadview" ? "bg-blue-500 text-white" : "bg-white text-black"} px-2 py-1.5 text-sm shadow-md`}
        >
          {toggle === "map" ? "로드뷰" : " 지도 "}
        </button>
      </div>
  )
}

export default ToggleButton
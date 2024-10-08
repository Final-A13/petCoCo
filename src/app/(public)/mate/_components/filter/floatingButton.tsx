import React from "react";
import Image from "next/image";

interface FloatingButtonProps {
  buttonClassName: string;
  buttonStyle?: React.CSSProperties;
  onClick: () => void;
  img_src: string;
  alt: string;
  children?: React.ReactNode; 
}

const FloatingButton = ({ buttonClassName, buttonStyle, onClick, img_src, alt, children }: FloatingButtonProps) => {

  return (
    <div className={buttonClassName} style={buttonStyle} onClick={onClick}>
      <div className="h-[1.5rem] w-[1.5rem]">
      {img_src ? (
        <Image src={img_src} alt={alt} width={24} height={24} className="h-full w-full object-cover" />
      ) : (
        children 
      )}
      </div>
    </div>
  );
};

export default FloatingButton;

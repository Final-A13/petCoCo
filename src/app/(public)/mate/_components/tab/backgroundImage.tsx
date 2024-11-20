import Image from "next/image";
import bgImage from "/public/assets/img/mate_bg.png";

export const BackgroundImage = () => (
  <div className="hidden lg:block lg:absolute lg:inset-0">
    <div className="relative w-full h-full"> 
      <Image
        src={bgImage}
        fill
        placeholder="blur"
        priority={true}
        loading="eager"
        sizes="(max-width: 1024px) 0vw, 100vw"
        alt="메이트 웹 배경 이미지"
        quality={75}
        style={{ objectFit: 'cover' }}
      />
    </div>
  </div>
);
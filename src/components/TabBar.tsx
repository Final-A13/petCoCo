"use client";
import { useAuthStore } from "@/zustand/useAuth";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TabBar: React.FC = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user
  }));
  const pathname = usePathname();

  const getImageSrc = (path: string, defaultSrc: string, activeSrc: string): string => {
    return pathname === path ? activeSrc : defaultSrc;
  };

  const getTextColor = (path: string): string => {
    return pathname === path ? "#8E6EE8" : "#292826";
  };

  const menuItems = [
    { path: "/", label: "홈", defaultIcon: "/assets/svg/Kenner.svg", activeIcon: "/assets/svg/ActiveKenner.svg" },
    {
      path: "/community2",
      label: "커뮤니티",
      defaultIcon: "/assets/svg/dog.svg",
      activeIcon: "/assets/svg/Activedog.svg"
    },
    {
      path: "/mate",
      label: "산책 메이트",
      defaultIcon: "/assets/svg/paw.svg",
      activeIcon: "/assets/svg/Activepaw.svg"
    },
    {
      path: "/message/list",
      label: "채팅",
      defaultIcon: "/assets/svg/chat(message).svg",
      activeIcon: "/assets/svg/Activechat(message).svg"
    },
    {
      path: `/mypage2/${user?.id}`,
      label: "마이페이지",
      defaultIcon: "/assets/svg/my.svg",
      activeIcon: "/assets/svg/Activemy.svg"
    }
  ];

  if (pathname === "/message" || pathname === "/message/list") {
    return null;
  }

  return (
    <nav className="fixed bottom-0 z-40 w-full max-w-[420px] border border-t-bgGray500 bg-white bg-opacity-80 px-2 pb-[0.7rem] pt-[0.3rem] lg:left-0 lg:top-0 lg:h-full lg:w-[180px] lg:max-w-none lg:flex-col lg:justify-start lg:pt-[5rem]">
      <div className="flex justify-between gap-x-[1.2rem] px-[0.8rem] py-[0.2rem] lg:flex-col lg:items-start lg:gap-y-[2rem]">
        {menuItems.map((item) => (
          <Link key={item.path} href={item.path} passHref>
            <div className="flex flex-col items-center justify-center gap-y-[0.2rem] lg:flex-row lg:gap-x-[1rem]">
              <Image
                src={getImageSrc(item.path, item.defaultIcon, item.activeIcon)}
                alt={item.label}
                width={24}
                height={24}
                priority
              />
              <p className="text-center text-[0.61863rem] lg:text-base" style={{ color: getTextColor(item.path) }}>
                {item.label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default TabBar;

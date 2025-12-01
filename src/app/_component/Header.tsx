"use client";

import { SiteLogo } from "@/components/icons";

export const Header = () => {
  return (
    <header className="fixed z-10 w-full h-[60px]">
      <div className="flex justify-between px-6 mx-auto py-4 xl:justify-center">
        <SiteLogo color="#000" className="w-36" />
      </div>
    </header>
  );
};

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Logo, SiteLogo } from "@/components/icons";
import { LogoutButton } from "@/components";
import { usePathname } from "next/navigation";
import { formatDateWithDay } from "@/utils/format/date";
import { CardWithShadow } from "@/components/ui";

const formatedDisplayDate = formatDateWithDay(new Date());

// Page title
const PAGE_TITLES: Record<string, string> = {
  "/dashboard": `${formatedDisplayDate}`,
  "/dashboard/histories": "履歴ページ",
  "/dashboard/regular-foods": "レギュラーフード",
  "/dashboard/target-kcal-plans": "カロリープラン",
};

// Title color
const TITLE_COLORS: Record<string, string> = {
  "/dashboard": "bg-blue-500",
  "/dashboard/histories": "bg-yellow-500",
  "/dashboard/regular-foods": "bg-emerald-500",
  "/dashboard/target-kcal-plans": "bg-purple-400",
};

export const DashboardHeader = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] || "Page";
  const colorClass = TITLE_COLORS[pathname] || "text-gray-600";

  return (
    <header className="w-screen bg-card shadow-border">
      <nav className="w-[90vw] py-2 mx-auto">
        <div className="flex justify-between items-center">
          <SiteLogo color="#000" className="w-24" />

          <h2
            className={`font-bold py-1 px-2 rounded-lg text-white ${colorClass}`}
          >
            {title}
          </h2>

          {/* PC メニュー */}
          <div className="hidden md:flex flex-row gap-4">
            <Link href="/" className="flex items-center gap-2">
              HOME
            </Link>
            <LogoutButton />
          </div>

          {/* モバイル用ハンバーガー */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              className="md:hidden p-2 font-medium"
              aria-label="Menu"
            >
              Menu
            </DialogTrigger>

            <DialogContent>
              <CardWithShadow>
                <DialogHeader className="text-center">
                  <DialogTitle>
                    <Logo className="w-6 mr-2 inline" />
                    Menu
                  </DialogTitle>
                </DialogHeader>
                <nav className="flex flex-col items-center gap-6 text-lg">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="flex items-center"
                  >
                    HOME
                  </Link>

                  <LogoutButton />
                </nav>
              </CardWithShadow>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </header>
  );
};

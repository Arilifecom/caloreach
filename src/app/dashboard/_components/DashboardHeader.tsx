"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Logo, SiteLogo } from "@/components/icons";
import { LogoutButton } from "@/components";

export const DashboardHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed w-screen bg-card shadow-border z-30">
      <nav className="w-[90vw] py-2 mx-auto">
        <div className="flex justify-between">
          <SiteLogo color="#000" className="w-24" />

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

            <DialogContent className="flex flex-col gap-8 p-6 max-w-sm text-center">
              <DialogTitle>
                <Logo className="w-6 mr-2 inline" />
                Menu
              </DialogTitle>
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
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </header>
  );
};

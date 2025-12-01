import { LogoutButton } from "@/components";
import { SiteLogo } from "@/components/icons";
import Link from "next/link";

export const DashboardHeader = () => {
  return (
    <header className="fixed top-2 flex justify-center w-screen">
      <nav className="w-[95vw] pt-2">
        <div className="flex justify-between">
          <Link href="/" className="flex items-center gap-2">
            <SiteLogo color="#000" className="w-28" />
            HOME
          </Link>
          <LogoutButton />
        </div>
      </nav>
    </header>
  );
};

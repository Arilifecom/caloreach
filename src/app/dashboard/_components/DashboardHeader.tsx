import { LogoutButton } from "@/components";
import { SiteLogo } from "@/components/icons";

export const DashboardHeader = () => {
  return (
    <header className="fixed top-2 flex justify-center w-screen">
      <nav className="w-[95vw] pt-2">
        <div className="flex justify-between">
          <SiteLogo color="#000" className="w-28" />
          <LogoutButton />
        </div>
      </nav>
    </header>
  );
};

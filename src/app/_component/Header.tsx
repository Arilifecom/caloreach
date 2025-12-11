import { GetStartedButton } from "@/components";
import { SiteLogo } from "@/components/icons";
import { checkAuthClient } from "@/utils/auth";

export const Header = async () => {
  const isLoggedIn = await checkAuthClient();

  return (
    <header className="fixed w-screen bg-card shadow-border z-30">
      <nav className="w-[90vw] py-2 mx-auto">
        <div className="flex justify-between">
          <SiteLogo color="#000" className="w-24" />

          <div>
            <GetStartedButton isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </nav>
    </header>
  );
};

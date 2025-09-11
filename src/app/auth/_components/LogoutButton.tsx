"use client";

import { Button } from "@/components/ui";
import { LogOut } from "lucide-react";
import { memo } from "react";

type LogoutButtonProps = {
  handleLogout: () => void;
};

const Component = ({ handleLogout }: LogoutButtonProps) => {
  return (
    <div>
      <Button onClick={handleLogout}>
        <LogOut />
      </Button>
    </div>
  );
};

const LogoutButton = memo(Component);
export { LogoutButton };

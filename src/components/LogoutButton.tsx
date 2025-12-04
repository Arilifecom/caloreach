"use client";

import { NavLogoutIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { signOut } from "@/utils/api/auth";
import { getQueryClient } from "@/utils/tanstack";
import { useRouter } from "next/navigation";
import React, { memo } from "react";

const Component = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    await signOut();
    const queryClient = getQueryClient();
    queryClient.clear();

    return router.push("/auth/login");
  };

  return (
    <Button
      variant={"outline"}
      onClick={handleLogOut}
      className="cursor-pointer gap-0"
    >
      ログアウト
      <NavLogoutIcon className="w-6" />
    </Button>
  );
};

const LogoutButton = memo(Component);
export { LogoutButton };

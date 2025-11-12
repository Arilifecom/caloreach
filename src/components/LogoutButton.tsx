"use client";

import { NavLogoutIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { createClient } from "@/utils/supabase/client";
import { getQueryClient } from "@/utils/tanstack";
import { useRouter } from "next/navigation";
import React, { memo } from "react";

const Component = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();
    const queryClient = getQueryClient();
    queryClient.clear();

    if (error) {
      console.error("サインアウトに失敗しました", error);
      return;
    }

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

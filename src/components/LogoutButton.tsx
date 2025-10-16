"use client";

import { Button } from "@/components/ui";
import { createClient } from "@/utils/supabase/client";
import { getQueryClient } from "@/utils/tanstack";
import { LogOut } from "lucide-react";
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
    <div>
      <Button onClick={handleLogOut}>
        <LogOut />
      </Button>
    </div>
  );
};

const LogoutButton = memo(Component);
export { LogoutButton };

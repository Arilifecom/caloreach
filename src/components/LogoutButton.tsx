"use client";

import { NavLogoutIcon } from "@/components/icons";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui";
import { createClient } from "@/utils/supabase/client";
import { getQueryClient } from "@/utils/tanstack";
import { useRouter } from "next/navigation";
import React, { memo, useState } from "react";
import { toast } from "sonner";

const Component = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogOut = async () => {
    const supabase = createClient();

    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      const queryClient = getQueryClient();
      queryClient.clear();
      return router.push("/auth/login");
    } catch (error) {
      console.error("サインアウトに失敗しました", error);
      toast.error("サインアウトに失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={"outline"}
      onClick={handleLogOut}
      className="cursor-pointer gap-0 min-w-28"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          ログアウト
          <NavLogoutIcon className="w-6" />
        </>
      )}
    </Button>
  );
};

const LogoutButton = memo(Component);
export { LogoutButton };

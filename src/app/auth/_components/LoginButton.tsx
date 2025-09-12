"use client";

import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";

export const LoginButton = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center z px-6 mt-4">
      <Button onClick={() => router.push("/auth/login")}>ログインページ</Button>
    </div>
  );
};

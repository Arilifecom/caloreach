"use client";

import { LogoutButton } from "@/components";
import { SiteLogo } from "@/components/icons";
import {
  Button,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardWithShadow,
} from "@/components/ui";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
    toast.error("ページの読み込みに失敗しました");
  }, [error]);

  return (
    <div className="relative font-sans grid grid-rows-[20px_1fr_20px] items-center mx-auto justify-items-center min-h-screen max-w-md text-sm p-6 pb-20 sm:p-20">
      <main className="flex flex-col gap-[32px] w-full row-start-2 items-center">
        <SiteLogo className="w-28" color="#000" />
        <CardWithShadow>
          <CardHeader>
            <CardTitle className="text-xl">Something went wrong</CardTitle>
            <CardDescription>
              エラーが発生しました。時間を置いて再度お試しください。
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2 justify-center">
            <Button onClick={() => reset()} variant={"outline"}>
              Try again
            </Button>
            <LogoutButton />
          </CardContent>
        </CardWithShadow>
      </main>
    </div>
  );
}

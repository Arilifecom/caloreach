"use client";

import { SiteLogo } from "@/components/icons";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();
  return (
    <div className="relative font-sans grid grid-rows-[20px_1fr_20px] items-center mx-auto justify-items-center min-h-screen max-w-md text-sm p-6 pb-20 sm:p-20">
      <main className="flex flex-col gap-[32px] w-full row-start-2 items-center">
        <SiteLogo className="w-28" color={"#000"} />
        <h1>404 - Page Not Found</h1>
        <Button onClick={() => router.push("/dashboard")}>ホームへ戻る</Button>
      </main>
    </div>
  );
}

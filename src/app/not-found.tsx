"use client";

import { SiteLogo } from "@/components/icons";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();
  return (
    <div className="relative font-sans grid grid-rows-[20px_1fr_20px] items-center mx-auto justify-items-center min-h-screen p-6 pb-20 sm:p-20">
      <main className="flex flex-col gap-8 w-full row-start-2 items-center">
        <SiteLogo className="w-24 md:w-28" color={"#000"} />
        <h1 className="text-2xl font-black md:text-4xl">
          404 - Page Not Found
        </h1>
        <div>
          <p>指定されたページは存在しないか、削除されています。</p>
          <p> トップページより再度操作してください。</p>
        </div>
        <Button onClick={() => router.push("/")}>ホームへ戻る</Button>
      </main>
    </div>
  );
}

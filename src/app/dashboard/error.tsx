"use client";

import { SiteLogo } from "@/components/icons";
import {
  CardDescription,
  CardHeader,
  CardTitle,
  CardWithShadow,
} from "@/components/ui";
import { useEffect } from "react";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <SiteLogo className="w-24 md:w-28" color="#000" />
      <CardWithShadow>
        <CardHeader>
          <CardTitle className="text-xl">Something went wrong...</CardTitle>
          <CardDescription>
            エラーが発生しました。時間を置いて再度お試しください。
          </CardDescription>
        </CardHeader>
      </CardWithShadow>
    </>
  );
}

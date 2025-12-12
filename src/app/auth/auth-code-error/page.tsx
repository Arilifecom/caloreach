"use client";

import { SiteLogo } from "@/components/icons";
import {
  Button,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardWithShadow,
} from "@/components/ui";
import { useRouter } from "next/navigation";

export default function AuthCodeErrorPage() {
  const router = useRouter();

  return (
    <>
      <SiteLogo className="w-24 md:w-28" />
      <CardWithShadow className="text-center">
        <CardHeader>
          <CardTitle className="text-xl">ログインに失敗しました</CardTitle>
          <CardDescription>
            ユーザー情報を取得できませんでした。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Button onClick={() => router.push("/auth/login")}>
              ログイン画面に戻る
            </Button>
          </div>
        </CardContent>
      </CardWithShadow>
    </>
  );
}

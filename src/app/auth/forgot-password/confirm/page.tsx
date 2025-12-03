"use client";

import { PageHeader } from "@/components";
import { SiteLogo } from "@/components/icons";
import { Button, CardContent, CardWithShadow } from "@/components/ui";
import { useSearchParams, useRouter } from "next/navigation";

export default function ConfirmPage() {
  const params = useSearchParams();
  const router = useRouter();

  // Get confirmation_url form URL
  const confirmationUrlEncoded = params.get("confirmation_url");
  if (!confirmationUrlEncoded) {
    router.push("/auth/auth-code-error");
    return null;
  }

  // decode URL
  const confirmationUrl = decodeURIComponent(confirmationUrlEncoded);

  // get token and type
  const url = new URL(confirmationUrl);
  const token = url.searchParams.get("token");
  const type = url.searchParams.get("type");
  const next =
    url.searchParams.get("redirect_to") ??
    "/auth/forgot-password/update-password";

  // pass token and type to callback route.ts
  const handleConfirm = () => {
    router.push(
      `/auth/forgot-password/confirm/callback?token_hash=${token}&type=${type}&next=${next}`
    );
  };

  return (
    <>
      <SiteLogo className="w-28" />
      <CardWithShadow className="relative w-full bg-primary-foreground">
        <div className="text-center px-6">
          <PageHeader
            title="Reset your password"
            description="下記ボタンをクリックして、パスワード再設定フォームへ進んでください"
          />
        </div>
        <CardContent className="text-center">
          <Button onClick={handleConfirm}>パスワード再設定フォーム</Button>
        </CardContent>
      </CardWithShadow>
    </>
  );
}

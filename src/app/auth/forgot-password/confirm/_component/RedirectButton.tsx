"use client";

import { PageHeader } from "@/components";
import { SiteLogo } from "@/components/icons";
import { Button, CardContent, CardWithShadow } from "@/components/ui";
import { useRouter } from "next/navigation";

type RedairectButtonProps = {
  confirmation_url: string;
};

export const RedairectButton = ({ confirmation_url }: RedairectButtonProps) => {
  const router = useRouter();
  // Get confirmation_url form URL
  if (!confirmation_url) {
    router.push("/auth/auth-code-error");
    return null;
  }

  // decode URL
  const confirmationUrl = decodeURIComponent(confirmation_url);

  // get token and type
  const url = new URL(confirmationUrl);
  const token = url.searchParams.get("token");
  const type = url.searchParams.get("type");
  const next =
    url.searchParams.get("redirect_to") ??
    "/auth/forgot-password/update-password";

  // get token and type to callback route.ts for user auth
  const handleConfirm = () => {
    router.push(
      `/auth/forgot-password/confirm/callback?token_hash=${token}&type=${type}&next=${next}`
    );
  };

  return (
    <>
      <SiteLogo className="w-24 md:w-28" />
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
};

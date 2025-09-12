"use client";

import { resetPassWord } from "@/actions/auth";
import { resetPassWordDefaultstValues } from "@/app/auth/_components/_constant";
import { resetPassWordSchema } from "@/app/auth/_components/_schema";
import { resetPassWordFormInput } from "@/app/auth/_components/_types";
import { PageHeader, VerticalLine } from "@/components";
import { SiteLogo } from "@/components/icons";
import { Button, CardContent, CardWithShadow, Input } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const ResetPassWordForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPassWordFormInput>({
    resolver: zodResolver(resetPassWordSchema),
    defaultValues: resetPassWordDefaultstValues,
  });

  const submitEmailSent = async (values: resetPassWordFormInput) => {
    try {
      await resetPassWord(values);
      //go to mailnotice UI page
      router.push("/auth/mailnotice?type=reset");
    } catch (error) {
      console.error(error);
      setErrorMessage("送信に失敗しました");
    }
  };

  const cancelPasswordReset = () => {
    router.push("/auth/login");
  };

  return (
    <>
      <SiteLogo className="w-28" />
      <CardWithShadow className="relative w-full max-w-sm bg-primary-foreground">
        <div className="text-center px-6">
          <PageHeader
            title="Reset your password"
            description="パスワードをリセットする"
          />
          <p className="text-red-500">{errorMessage}</p>
        </div>
        <VerticalLine className="px-6" />
        <div className="px-6">
          <p>
            ご登録のメールアドレスを入力してください。パスワードリセット用のリンクをお送りします。
          </p>
        </div>
        <CardContent>
          <form onSubmit={handleSubmit(submitEmailSent)}>
            <div className="flex flex-col gap-4 ">
              <div className="grid gap-1">
                <Label>メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@caloreach.com"
                  {...register("email")}
                  required
                />
                {errors.email && (
                  <p className="text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div className="flex justify-center gap-2 mt-4 h-10">
                <Button
                  onClick={cancelPasswordReset}
                  className="rounded-lg"
                  variant={"outline"}
                >
                  ログインに戻る
                </Button>
                <Button type="submit" className="rounded-lg">
                  リセットメール送信
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <VerticalLine className="px-6" />
        <p className="text-xs text-gray-500 mx-auto">
          © {new Date().getFullYear()} カロリーチ
        </p>
      </CardWithShadow>
    </>
  );
};

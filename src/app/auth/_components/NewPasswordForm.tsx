"use client";

import { newPassWordDefaultstValues } from "@/app/auth/_components/_constant";
import { newPassWordSchema } from "@/app/auth/_components/_schema";
import { newPasswordFormInput } from "@/app/auth/_components/_types";
import { PageHeader, VerticalLine } from "@/components";
import { SiteLogo } from "@/components/icons";
import { Button, CardContent, CardWithShadow, Input } from "@/components/ui";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const NewPassWordForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const supabase = createClient();

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<newPasswordFormInput>({
    resolver: zodResolver(newPassWordSchema),
    defaultValues: newPassWordDefaultstValues,
  });

  //Update password
  const UpdateNewPassWord = async (data: newPasswordFormInput) => {
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      console.error(error);
      setErrorMessage("送信に失敗しました");
    }
    //go to mailnotice UI page
    router.push("/auth/mailnotice?type=reset-success");
  };

  return (
    <>
      <SiteLogo className="w-28" />
      <CardWithShadow className="relative w-full max-w-sm bg-primary-foreground">
        <div className="text-center px-6">
          <PageHeader
            title="Comfirm your New password"
            description="新しいパスワードの入力"
          />
          <p className="text-red-500">{errorMessage}</p>
        </div>
        <VerticalLine className="px-6" />
        <CardContent>
          <form onSubmit={handleSubmit(UpdateNewPassWord)}>
            <div className="flex flex-col gap-4 ">
              <div className="grid gap-1">
                <Label>新しいパスワード</Label>
                <Input
                  id="pasword"
                  type="password"
                  placeholder="6字以上を入力してください"
                  {...register("password")}
                  required
                />
                {errors.password && (
                  <p className="text-destructive">{errors.password.message}</p>
                )}
              </div>
              <div className="flex justify-end mt-4 h-10">
                <Button type="submit" className="rounded-lg">
                  パスワード再登録
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </CardWithShadow>
    </>
  );
};

"use client";

import {
  resetPassWordInputResolver,
  ResetPassWordInputSchema,
} from "@/app/auth/_components/_schema";
import { PageHeader, VerticalLine } from "@/components";
import { SiteLogo } from "@/components/icons";
import { Button, CardWithShadow, Input } from "@/components/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { resetPassWord } from "@/utils/api/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const defaultValues: ResetPassWordInputSchema = {
  email: "",
};

export const ResetPassWordForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const form = useForm<ResetPassWordInputSchema>({
    resolver: resetPassWordInputResolver,
    defaultValues,
  });

  const submitEmailSent = async (values: ResetPassWordInputSchema) => {
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitEmailSent)}
            className="space-y-4 px-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メールアドレス</FormLabel>
                  <FormControl>
                    <Input
                      type="emal"
                      placeholder="example@caloreach.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center gap-2 mt-8 h-10">
              <Button
                type="button"
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
          </form>
        </Form>
      </CardWithShadow>
    </>
  );
};

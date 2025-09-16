"use client";

import { newPassWordSchema } from "@/app/auth/_components/_schema";
import { newPasswordFormInput } from "@/app/auth/_components/_types";
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
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const newPassWordDefaultstValues: {
  password: string;
} = {
  password: "",
};

export const NewPassWordForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<newPasswordFormInput>({
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(UpdateNewPassWord)}
            className="space-y-4 px-6"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>新しいパスワード</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="6字以上を入力してください"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="rounded-lg block mx-auto mt-4 h-10"
            >
              パスワード再登録
            </Button>
          </form>
        </Form>
      </CardWithShadow>
    </>
  );
};

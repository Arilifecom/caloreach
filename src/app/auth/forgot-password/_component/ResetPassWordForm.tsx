"use client";

import {
  resetPassWordInputResolver,
  ResetPassWordInputSchema,
} from "@/app/auth/forgot-password/_schema";
import { Loading, PageHeader, VerticalLine } from "@/components";
import { SiteLogo } from "@/components/icons";
import { Button, CardHeader, CardWithShadow, Input } from "@/components/ui";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { resetPassWord } from "@/utils/db/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const defaultValues: ResetPassWordInputSchema = {
  email: "",
};

export const ResetPassWordForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ResetPassWordInputSchema>({
    resolver: resetPassWordInputResolver,
    defaultValues,
  });

  const submitEmailSent = async (formData: ResetPassWordInputSchema) => {
    try {
      setIsLoading(true);
      await resetPassWord(formData);
      //go to mailnotice UI page
      router.push("/auth/mailnotice?type=reset");
    } catch (error) {
      console.error(error);
      setErrorMessage("送信に失敗しました");
      setIsLoading(false);
    }
  };

  const cancelPasswordReset = () => {
    setIsLoading(true);
    router.push("/auth/login");
    setIsLoading(false);
  };

  return (
    <>
      <SiteLogo className="w-24 md:w-28" />
      <CardWithShadow className="relative px-2 bg-primary-foreground">
        <CardHeader className="text-center">
          <PageHeader
            title="Reset your password"
            description="パスワードをリセットする"
          />
          <p className="text-red-500">{errorMessage}</p>
        </CardHeader>
        <VerticalLine className="px-6" />
        <div className="px-6">
          <p>
            ご登録のメールアドレスを入力してください。パスワードリセット用のリンクをお送りします。
          </p>
        </div>
        <FieldGroup>
          <form
            onSubmit={form.handleSubmit(submitEmailSent)}
            className="space-y-4 px-6"
          >
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>メールアドレス</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="example@caloreach.com"
                    type="emal"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="flex justify-center gap-2 mt-8 h-10">
              <Button
                type="button"
                onClick={cancelPasswordReset}
                className="rounded-lg"
                variant={"outline"}
                disabled={isLoading}
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                className="rounded-lg min-w-36"
                disabled={isLoading}
              >
                {isLoading ? <Loading /> : "送信"}
              </Button>
            </div>
          </form>
        </FieldGroup>
      </CardWithShadow>
    </>
  );
};

"use client";

import {
  loginFormInputResolver,
  LoginFormInputSchema,
} from "@/app/auth/_components/_schema";
import { ButtonWithGooleIcon } from "@/app/auth/_components/ButtonWithGooleIcon";
import { PageHeader, VerticalLine } from "@/components";
import { SiteLogo } from "@/components/icons";
import { Button, CardWithShadow, Input } from "@/components/ui";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { login, loginGoogle } from "@/utils/api/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const loginDefaultValues: LoginFormInputSchema = {
  email: "",
  password: "",
};

export const LogInForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const form = useForm<LoginFormInputSchema>({
    resolver: loginFormInputResolver,
    defaultValues: loginDefaultValues,
  });

  //Login with email and password
  const submitEmailLogin = async (values: LoginFormInputSchema) => {
    try {
      await login(values);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setErrorMessage("ログインに失敗しました");
    }
  };

  //Signin with Google
  const submitGoogle = async () => {
    try {
      await loginGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SiteLogo className="w-28" />
      <CardWithShadow className="relative w-full max-w-sm bg-primary-foreground">
        <div className="text-center px-6">
          <PageHeader title="ログイン" description="Welcome back!" />
          <p className="text-red-500">{errorMessage}</p>
        </div>
        <VerticalLine className="px-6" />
        <FieldGroup>
          <form
            onSubmit={form.handleSubmit(submitEmailLogin)}
            className="space-y-4 px-6"
          >
            <ButtonWithGooleIcon
              text="Googleアカウントでログイン"
              submitGoogle={submitGoogle}
            />
            <VerticalLine text="or" className="px-6" />
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
                    placeholder="example@mail.com"
                    type="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>パスワード</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="パスワードを入力してください"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <p className="text-right">
              <Link
                href="/auth/forgot-password"
                className="text-sm underline text-right"
              >
                パスワードをお忘れの方
              </Link>
            </p>

            <Button type="submit" className="w-full rounded-lg mt-4">
              ログイン
            </Button>
          </form>
        </FieldGroup>

        <div className="grid gap-6 justify-center py-4">
          <p>
            アカウントをお持ちでない方は
            <Link href="/auth/signup" className="font-bold">
              signup
            </Link>
          </p>
        </div>
      </CardWithShadow>
    </>
  );
};

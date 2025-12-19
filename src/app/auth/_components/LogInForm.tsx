"use client";

import {
  loginFormInputResolver,
  LoginFormInputSchema,
} from "@/app/auth/_components/_schema";
import { ButtonWithGooleIcon } from "@/app/auth/_components/ButtonWithGooleIcon";
import { Loading, PageHeader, VerticalLine } from "@/components";
import { SiteLogo } from "@/components/icons";
import { Button, CardWithShadow, Input } from "@/components/ui";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { login, loginGoogle } from "@/utils/db/auth";
import { Eye, EyeOff } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleAuthLoading, setIsGoogleAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormInputSchema>({
    resolver: loginFormInputResolver,
    defaultValues: loginDefaultValues,
  });

  //Login with email and password
  const submitEmailLogin = async (values: LoginFormInputSchema) => {
    try {
      setIsLoading(true);
      await login(values);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setErrorMessage("ログインに失敗しました");
      setIsLoading(false);
    }
  };

  //Signin with Google
  const submitGoogle = async () => {
    try {
      setIsGoogleAuthLoading(true);
      await loginGoogle();
    } catch (error) {
      console.error(error);
      setIsGoogleAuthLoading(false);
    }
  };

  return (
    <>
      <SiteLogo className="w-24 md:w-28" />
      <CardWithShadow className="relative gap-2 max-w-sm bg-primary-foreground">
        <div className="text-center px-6">
          <PageHeader title="ログイン" />
          <p className="text-red-500">{errorMessage}</p>
        </div>
        <FieldGroup>
          <form
            onSubmit={form.handleSubmit(submitEmailLogin)}
            className="space-y-4 px-6"
          >
            <ButtonWithGooleIcon
              text="Googleアカウントでログイン"
              submitGoogle={submitGoogle}
              isLoading={isGoogleAuthLoading}
            />
            <VerticalLine text="or" />
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="gap-0">
                    メールアドレス
                  </FieldLabel>
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

                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="パスワードを入力してください"
                      type={showPassword ? "text" : "password"}
                      className="pr-8"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      style={{ top: "50%", transform: "translateY(-50%)" }}
                      className="absolute right-2 text-gray-800 z-10"
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                  </div>

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

            <Button
              type="submit"
              className="w-full rounded-lg mt-4"
              disabled={isLoading}
            >
              {isLoading ? <Loading /> : "ログイン"}
            </Button>
          </form>
        </FieldGroup>

        <div className="grid gap-4 justify-center py-4">
          <p>
            アカウントをお持ちでない方は
            <Link href="/auth/signup" className="font-bold">
              signup
            </Link>
          </p>
          <p className="mx-auto underline">
            <Link href="/" className="font-bold">
              ホームへもどる
            </Link>
          </p>
        </div>
      </CardWithShadow>
    </>
  );
};

"use client";

import { login, loginGoogle } from "@/actions/auth/login";
import { loginSchema } from "@/app/auth/_components/_schema";
import { loginFormInput } from "@/app/auth/_components/_types";
import { ButtonWithGooleIcon } from "@/app/auth/_components/ButtonWithGooleIcon";
import { PageHeader, VerticalLine, VerticalLineWithText } from "@/components";
import { SiteLogo } from "@/components/icons";
import {
  Button,
  CardContent,
  CardWithShadow,
  Input,
  Label,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const loginDefaultstValues: {
  email: string;
  password: string;
} = {
  email: "",
  password: "",
};

export const LogInForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultstValues,
  });

  //Signin with email and password
  const submitEmailLogin = async (values: loginFormInput) => {
    try {
      await login(values);
      reset();
      router.push("/");
    } catch (error) {
      console.error(error);
      setErrorMessage("ログインに失敗ました");
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
          <PageHeader title="ログイン" description="Welcom back!" />
          <p className="text-red-500">{errorMessage}</p>
        </div>
        <VerticalLine className="px-6" />
        <CardContent>
          <ButtonWithGooleIcon
            text="Googleアカウントでログイン"
            submitGoogle={submitGoogle}
          />
          <VerticalLineWithText text="or" />
          <form onSubmit={handleSubmit(submitEmailLogin)}>
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
              <div className="grid gap-1">
                <Label>パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="6字以上を入力してください"
                  {...register("password")}
                  required
                />
                {errors.password && (
                  <p className="text-destructive">{errors.password.message}</p>
                )}
              </div>
              <p className="text-right">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm underline text-right"
                >
                  パスワードをお忘れの方
                </Link>
              </p>
              <Button type="submit" className="rounded-lg mt-4 h-10">
                ログイン
              </Button>
            </div>
          </form>
        </CardContent>
        <div className="grid gap-6 justify-center">
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

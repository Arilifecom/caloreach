"use client";

import { signup } from "@/actions/auth";
import { loginGoogle } from "@/actions/auth/login";
import { signupDefaultstValues } from "@/app/auth/_components/_constant";
import { signupSchema } from "@/app/auth/_components/_schema";
import { signupFormInput } from "@/app/auth/_components/_types";
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
import { useState } from "react";
import { useForm } from "react-hook-form";

export const SignupForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupFormInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: signupDefaultstValues,
  });

  //Signin with email and password
  const submitEmailLogin = async (values: signupFormInput) => {
    try {
      //Delete confirmPassword from values
      const { confirmPassword: _, ...formData } = values;
      await signup(formData);

      reset();
    } catch (error) {
      console.error(error);
      setErrorMessage("登録に失敗しました");
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
          <PageHeader
            title="サインアップ"
            description="Let's leach your  calorie target!"
          />
          <p className="text-red-500">{errorMessage}</p>
        </div>
        <VerticalLine className="px-6" />
        <CardContent>
          <ButtonWithGooleIcon
            text="Googleアカウントで登録"
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
              <div className="grid gap-1">
                <Label>パスワード再入力</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="再度パスワードを入力してください"
                  {...register("confirmPassword")}
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="rounded-lg mt-4 h-10">
                アカウント登録
              </Button>
            </div>
          </form>
        </CardContent>
        <div className="grid gap-6 justify-center">
          <p>
            アカウントをお持ちの方は
            <Link href="/auth/login" className="font-bold">
              Login
            </Link>
          </p>
        </div>
        <VerticalLine className="px-6" />
        <p className="text-xs text-gray-500 mx-auto">
          © {new Date().getFullYear()} カロリーチ
        </p>
      </CardWithShadow>
    </>
  );
};

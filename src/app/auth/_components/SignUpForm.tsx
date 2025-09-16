"use client";
import { signup } from "@/actions/auth";
import { loginGoogle } from "@/actions/auth/login";
import { signupSchema } from "@/app/auth/_components/_schema";
import { signupFormInput } from "@/app/auth/_components/_types";
import { ButtonWithGooleIcon } from "@/app/auth/_components/ButtonWithGooleIcon";
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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const signupDefaultstValues: {
  email: string;
  password: string;
  confirmPassword: string;
} = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignupForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const form = useForm<signupFormInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: signupDefaultstValues,
  });

  //Signin with email and password
  const submitEmailSignup = async (values: signupFormInput) => {
    try {
      //Delete confirmPassword from values
      const { confirmPassword: _, ...formData } = values;
      await signup(formData);

      //go to mailnotice UI page
      router.push("/auth/mailnotice?type=verify");
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitEmailSignup)}
            className="space-y-4 px-6"
          >
            <ButtonWithGooleIcon
              text="Googleアカウントで登録"
              submitGoogle={submitGoogle}
            />
            <VerticalLine text="or" className="px-6" />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メールアドレス</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@caloreach.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>パスワード</FormLabel>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>パスワード再入力</FormLabel>
                  <FormControl>
                    <Input
                      type="confirmPassword"
                      placeholder="再度パスワードを入力してください"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full rounded-lg mt-4 h-10">
              アカウント登録
            </Button>
          </form>
        </Form>

        <div className="grid gap-6 justify-center">
          <p>
            アカウントをお持ちの方は
            <Link href="/auth/login" className="font-bold">
              Login
            </Link>
          </p>
        </div>
      </CardWithShadow>
    </>
  );
};

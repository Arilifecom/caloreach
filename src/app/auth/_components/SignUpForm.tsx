"use client";
import {
  signupInputSchemaInput,
  signupInputSchemaOutput,
  signupSchemaResolver,
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
import { loginGoogle, signup } from "@/utils/api/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const defaultValues: signupInputSchemaInput = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignupForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const form = useForm<
    signupInputSchemaInput,
    unknown,
    signupInputSchemaOutput
  >({
    resolver: signupSchemaResolver,
    defaultValues: defaultValues,
  });

  //Signin with email and password
  const submitEmailSignup = async (values: signupInputSchemaOutput) => {
    try {
      await signup(values);

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
        <FieldGroup>
          <form
            onSubmit={form.handleSubmit(submitEmailSignup)}
            className="space-y-4 px-6"
          >
            <ButtonWithGooleIcon
              text="Googleアカウントで登録"
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

            <Controller
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>パスワード再入力</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="再度パスワードを入力してください"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit" className="w-full rounded-lg mt-4 h-10">
              アカウント登録
            </Button>
          </form>
        </FieldGroup>

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

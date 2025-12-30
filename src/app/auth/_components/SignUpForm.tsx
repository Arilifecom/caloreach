"use client";
import {
  signupInputSchemaInput,
  signupInputSchemaOutput,
  signupSchemaResolver,
} from "@/app/auth/_components/_schema";
import { ButtonWithGooleIcon } from "@/app/auth/_components/ButtonWithGooleIcon";
import { Loading, PageHeader, VerticalLine } from "@/components";
import { SiteLogo } from "@/components/icons";
import { Button, CardHeader, CardWithShadow, Input } from "@/components/ui";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { loginGoogle, signup } from "@/utils/db/auth";
import { Eye, EyeOff } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleAuthLoading, setIsGoogleAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<
    signupInputSchemaInput,
    unknown,
    signupInputSchemaOutput
  >({
    resolver: signupSchemaResolver,
    defaultValues: defaultValues,
  });

  //Signup with email and password
  const submitEmailSignup = async (values: signupInputSchemaOutput) => {
    try {
      setIsLoading(true);
      await signup(values);
      //Mailnotice page
      router.push("/auth/mailnotice?type=verify");
    } catch (error) {
      console.error(error);
      setErrorMessage("登録に失敗しました");
      setIsLoading(false);
    }
  };

  //Signin with Google
  const submitGoogle = () => {
    try {
      setIsGoogleAuthLoading(true);
      loginGoogle();
    } catch (error) {
      console.error(error);
      setErrorMessage("登録に失敗しました");
      setIsGoogleAuthLoading(false);
    }
  };

  return (
    <>
      <SiteLogo className="w-24 md:w-28" />
      <CardWithShadow className="max-w-96">
        <CardHeader className="text-center">
          <PageHeader title="サインアップ" />
          <p className="text-red-500">{errorMessage}</p>
        </CardHeader>
        <form
          onSubmit={form.handleSubmit(submitEmailSignup)}
          className="space-y-4 px-6"
        >
          <FieldGroup>
            <ButtonWithGooleIcon
              text="Googleアカウントで登録"
              submitGoogle={submitGoogle}
              isLoading={isGoogleAuthLoading}
            />
            <VerticalLine text="or" />

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

            <Controller
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>パスワード再入力</FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="再度パスワードを入力してください"
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

            <Button
              type="submit"
              className="w-full rounded-lg mt-4 h-10"
              disabled={isLoading}
            >
              {isLoading ? <Loading /> : "アカウント登録"}
            </Button>
          </FieldGroup>
        </form>

        <div className="grid gap-4 justify-center">
          <p>
            アカウントをお持ちの方は
            <Link href="/auth/login" className="font-bold">
              Login
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

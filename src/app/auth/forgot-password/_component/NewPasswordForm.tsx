"use client";

import {
  newPassWordInputResolver,
  NewPassWordInputSchema,
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
import { signOut, updateNewPassWord } from "@/utils/db/auth";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const defaultValues: NewPassWordInputSchema = {
  password: "",
};

export const NewPassWordForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<NewPassWordInputSchema>({
    resolver: newPassWordInputResolver,
    defaultValues,
  });

  //Update password
  const submitPasswordSent = async (formData: NewPassWordInputSchema) => {
    try {
      setIsLoading(true);
      await updateNewPassWord(formData);
      await signOut();
      //go to mailnotice UI page
      router.push("/auth/mailnotice?type=reset-success");
    } catch (error) {
      console.error(error);
      setErrorMessage("送信に失敗しました");
      setIsLoading(false);
    }
  };

  return (
    <>
      <SiteLogo className="w-20 md:w-28" />
      <CardWithShadow className="relative px-2 bg-primary-foreground">
        <CardHeader className="text-center">
          <PageHeader
            title="Comfirm your New password"
            description="新しいパスワードの入力"
          />
          <p className="text-red-500">{errorMessage}</p>
        </CardHeader>
        <VerticalLine className="px-6" />

        <form
          onSubmit={form.handleSubmit(submitPasswordSent)}
          className="space-y-4 px-6"
        >
          <FieldGroup>
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>新しいパスワード</FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="6字以上を入力してください"
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
              className="rounded-lg block mx-auto mt-4 h-10 min-w-36"
              disabled={isLoading}
            >
              {isLoading ? <Loading /> : "パスワード再登録"}
            </Button>
          </FieldGroup>
        </form>
      </CardWithShadow>
    </>
  );
};

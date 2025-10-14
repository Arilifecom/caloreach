"use client";

import {
  newPassWordInputResolver,
  NewPassWordInputSchema,
} from "@/app/auth/_components/_schema";
import { PageHeader, VerticalLine } from "@/components";
import { SiteLogo } from "@/components/icons";
import { Button, CardWithShadow, Input } from "@/components/ui";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const defaultValues: NewPassWordInputSchema = {
  password: "",
};

export const NewPassWordForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<NewPassWordInputSchema>({
    resolver: newPassWordInputResolver,
    defaultValues,
  });

  //Update password
  const UpdateNewPassWord = async (data: NewPassWordInputSchema) => {
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
        <FieldGroup>
          <form
            onSubmit={form.handleSubmit(UpdateNewPassWord)}
            className="space-y-4 px-6"
          >
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>新しいパスワード</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="6字以上を入力してください"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button
              type="submit"
              className="rounded-lg block mx-auto mt-4 h-10"
            >
              パスワード再登録
            </Button>
          </form>
        </FieldGroup>
      </CardWithShadow>
    </>
  );
};

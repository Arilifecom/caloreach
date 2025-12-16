"use client";

import {
  userNameInputResolver,
  UserNameInputSchema,
} from "@/app/setup/_components/_schema";
import { PageHeader } from "@/components";
import { Button, CardWithShadow, Input } from "@/components/ui";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { createProfile } from "@/utils/db/setup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface UserNameFormProps {
  userId: string;
}

const defaultValues: UserNameInputSchema = {
  userName: "",
};

export const UserNameForm = ({ userId }: UserNameFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const form = useForm<UserNameInputSchema>({
    resolver: userNameInputResolver,
    defaultValues,
  });

  const submitUserProfileSent = async (values: UserNameInputSchema) => {
    const profileData = {
      userName: values.userName,
      id: userId,
    };
    try {
      await createProfile(profileData);
      //go to next setup
      router.push("/setup/step-2-target-kcal");
    } catch (error) {
      console.error(error);
      setErrorMessage("登録に失敗しました");
    }
  };

  return (
    <>
      <PageHeader
        title="Profile設定"
        description="ユーザー名を登録してください"
      />
      <CardWithShadow className="py-8">
        <p className="absolute -top-7 right-2 font-bold">step 1/2</p>
        <FieldGroup>
          <form
            onSubmit={form.handleSubmit(submitUserProfileSent)}
            className="space-y-4 px-6 w-[80%] mx-auto"
          >
            <Controller
              control={form.control}
              name="userName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="mb-2 mx-auto">
                    ユーザー名
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="名前を入力してください"
                    type="text"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <p className="text-red-500">{errorMessage}</p>

            <div className="flex justify-center gap-2 mt-6 h-10">
              <Button type="submit" className="rounded-lg w-28">
                登録
              </Button>
            </div>
          </form>
        </FieldGroup>
      </CardWithShadow>
    </>
  );
};

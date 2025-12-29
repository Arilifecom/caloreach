"use client";

import {
  TargetKcalInputResolver,
  TargetKcalInputSchemaInput,
  TargetKcalInputSchemaOutput,
} from "@/app/setup/_components/_schema";
import { Loading, PageHeader } from "@/components";
import { Button, CardWithShadow, Input } from "@/components/ui";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { createTargetKcal } from "@/utils/db/setup";
import { formatYYMMDD } from "@/utils/format/date";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { v7 as uuidv7 } from "uuid";

interface UserNameFormProps {
  userId: string;
}

const defaultValues: TargetKcalInputSchemaInput = {
  targetKcal: "",
};

export const TargetKcalForm = ({ userId }: UserNameFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<
    TargetKcalInputSchemaInput,
    unknown,
    TargetKcalInputSchemaOutput
  >({
    resolver: TargetKcalInputResolver,
    defaultValues: defaultValues,
  });

  const submitTargetKcalSent = async (value: TargetKcalInputSchemaOutput) => {
    const today = new Date();
    const effectiveDate = formatYYMMDD(today);

    const targetkcalData = {
      id: uuidv7(),
      userId: userId,
      targetKcal: value.targetKcal,
      effectiveDate: effectiveDate,
    };

    try {
      setIsLoading(true);
      await createTargetKcal(targetkcalData);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setErrorMessage("登録に失敗しました");
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="1日の目標カロリーの設定"
        description="1日のカロリー目標を登録しましょう"
      />
      <CardWithShadow className="py-8">
        <p className="absolute -top-7 right-2 font-bold">step 2/2</p>

        <form
          onSubmit={form.handleSubmit(submitTargetKcalSent)}
          className="space-y-4 px-6 w-full mx-auto"
        >
          <FieldGroup>
            <p className="text-red-500">{errorMessage}</p>
            <Controller
              control={form.control}
              name="targetKcal"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="mb-2 mx-auto">
                    目標摂取カロリー
                  </FieldLabel>
                  <div className="flex items-end justify-center gap-3 w-full">
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="数字を入力してください"
                      type="number"
                      className="w-60"
                    />
                    <p className="font-bold">Kcal</p>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="flex justify-center gap-2 mt-6 h-10">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex flex-col items-center justify-center rounded-lg w-28"
              >
                {isLoading ? <Loading /> : "登録"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardWithShadow>
    </>
  );
};

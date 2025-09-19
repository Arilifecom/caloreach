"use client";

import { createTargetKcal } from "@/actions/setup";
import {
  TargetKcalInputInputResolver,
  TargetKcalInputSchemaInput,
  TargetKcalInputSchemaOutput,
} from "@/app/setup/_components/_schema";
import { PageHeader } from "@/components";
import { Button, CardWithShadow, Input } from "@/components/ui";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { format } from "date-fns";
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
  const router = useRouter();

  const form = useForm<
    TargetKcalInputSchemaInput,
    unknown,
    TargetKcalInputSchemaOutput
  >({
    resolver: TargetKcalInputInputResolver,
    defaultValues: defaultValues,
  });

  const submitTargetKcalSent = async (value: TargetKcalInputSchemaOutput) => {
    const effectiveDate = format(new Date(), "yyyy-MM-dd");

    const targetkcalData = {
      id: uuidv7(),
      userId: userId,
      targetKcal: value.targetKcal,
      effectiveDate: effectiveDate,
    };

    try {
      await createTargetKcal(targetkcalData);
      router.push("/");
    } catch (error) {
      console.error(error);
      setErrorMessage("登録に失敗しました");
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitTargetKcalSent)}
            className="space-y-4 px-6 w-full mx-auto"
          >
            <p className="text-red-500">{errorMessage}</p>
            <Controller
              control={form.control}
              name="targetKcal"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="mb-2 mx-auto">
                    目標摂取カロリー
                  </FormLabel>
                  <div className="flex items-end justify-center gap-3 w-full">
                    <FormControl>
                      <Input
                        className="w-60"
                        placeholder="数字を入力してください"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <p className="font-bold">Kcal</p>
                  </div>
                  {fieldState.error && (
                    <p className="text-red-500 mx-auto">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <div className="flex justify-center gap-2 mt-8 h-10">
              <Button
                type="button"
                onClick={() => form.reset()}
                className="rounded-lg"
                variant={"outline"}
              >
                リセット
              </Button>
              <Button type="submit" className="rounded-lg">
                登録
              </Button>
            </div>
          </form>
        </Form>
      </CardWithShadow>
    </>
  );
};

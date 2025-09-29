"use client";

import {
  mealRecordInputSchemaInput,
  mealRecordInputSchemaOutput,
  mealRecordSchemaResolver,
} from "@/app/dashbord/_components/_schema";
import { Button, CardWithShadow, Input } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { addMealRecord } from "@/utils/api/mealRecords";
import { getNowTime, getTodayYYMMDD } from "@/utils/format";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { v7 as uuidv7 } from "uuid";

type MealRecordFormProps = {
  userId: string;
  inputFormOpen: boolean;
  handleInputFormWindow: () => void;
  handleOptionWindow: () => void;
};

const defaultValues: mealRecordInputSchemaInput = {
  date: "",
  time: "",
  foodName: "",
  gram: "",
  kcal: "",
};

export const MealRecordForm = ({
  userId,
  inputFormOpen,
  handleInputFormWindow,
  handleOptionWindow,
}: MealRecordFormProps) => {
  const form = useForm<
    mealRecordInputSchemaInput,
    unknown,
    mealRecordInputSchemaOutput
  >({
    resolver: mealRecordSchemaResolver,
    defaultValues,
  });

  //update date and time when user open form
  useEffect(() => {
    if (inputFormOpen) {
      form.reset({
        date: getTodayYYMMDD(),
        time: getNowTime(),
        foodName: "",
        gram: "",
        kcal: "",
      });
    }
  }, [inputFormOpen, form]);

  const submitMealRecordSent = async (data: mealRecordInputSchemaOutput) => {
    const InputData = {
      id: uuidv7(),
      userId: userId,
      foodName: data.foodName,
      gram: data.gram,
      kcal: data.kcal,
      eatenAt: data.eatenAt,
    };

    try {
      await addMealRecord(InputData);
      handleInputFormWindow();
      handleOptionWindow();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={inputFormOpen} onOpenChange={handleInputFormWindow}>
      <DialogContent
        style={{ transform: "translate(-50%, -50%)" }}
        className="p-0 bg-transparent border-0"
      >
        <CardWithShadow>
          <DialogHeader className="text-left px-6">
            <DialogTitle>食事を記録</DialogTitle>
            <DialogDescription>食事を追加してください</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitMealRecordSent)}
              className="space-y-4 px-6 w-full"
            >
              <div className="flex gap-4">
                <Controller
                  control={form.control}
                  name="date"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>日付</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      {fieldState.error && (
                        <p className="text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <Controller
                  control={form.control}
                  name="time"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>時間</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      {fieldState.error && (
                        <p className="text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <Controller
                control={form.control}
                name="foodName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>たべたもの</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="食品、料理名を入れてください"
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500">{fieldState.error.message}</p>
                    )}
                  </FormItem>
                )}
              />

              <Controller
                control={form.control}
                name="gram"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>グラム</FormLabel>
                    <div className="flex items-end gap-2 ">
                      <FormControl>
                        <Input
                          placeholder="200"
                          {...field}
                          type="number"
                          className="w-40"
                        />
                      </FormControl>
                      <p className="font-bold">gram</p>
                    </div>
                    {fieldState.error && (
                      <p className="text-red-500">{fieldState.error.message}</p>
                    )}
                  </FormItem>
                )}
              />

              <Controller
                control={form.control}
                name="kcal"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>カロリー</FormLabel>
                    <div className="flex items-end gap-2 ">
                      <FormControl>
                        <Input
                          placeholder="200"
                          {...field}
                          type="number"
                          className="w-40"
                        />
                      </FormControl>
                      <p className="font-bold">kcal</p>
                    </div>
                    {fieldState.error && (
                      <p className="text-red-500">{fieldState.error.message}</p>
                    )}
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 mt-8 h-10">
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => form.reset()}
                  className="rounded-lg w-28"
                >
                  リセット
                </Button>

                <Button type="submit" className="rounded-lg w-28">
                  登録
                </Button>
              </div>
            </form>
          </Form>
        </CardWithShadow>
      </DialogContent>
    </Dialog>
  );
};

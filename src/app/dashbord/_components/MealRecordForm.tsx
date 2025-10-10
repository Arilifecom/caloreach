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
import { InsertMealRecord, SelectMealRecord } from "@/db/schema";
import {
  formatTime,
  formatYYMMDD,
  getCurrentDate,
  getCurrentTime,
} from "@/utils/format";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { v7 as uuidv7 } from "uuid";

type MealRecordFormProps = {
  userId: string;
  mode: "add" | "edit";
  editItem?: SelectMealRecord;
  isFormOpen: boolean;
  handleInputFormWindow: () => void;
  handleOptionWindow: () => void;
  handleCloseAllWindows: () => void;
  onSubmit: (newRecord: InsertMealRecord) => void;
};

export const MealRecordForm = ({
  userId,
  isFormOpen,
  handleInputFormWindow,
  handleOptionWindow,
  handleCloseAllWindows,
  onSubmit,
  mode,
  editItem,
}: MealRecordFormProps) => {
  //set defaultValues each mode "add" or "edit"
  const defaultValues: mealRecordInputSchemaInput =
    mode === "edit" && editItem
      ? {
          date: formatYYMMDD(editItem.eatenAt).toString(),
          time: formatTime(editItem.eatenAt).toString(),
          foodName: editItem.foodName,
          gram: editItem.gram.toString(),
          kcal: editItem.kcal.toString(),
        }
      : { date: "", time: "", foodName: "", gram: "", kcal: "" };

  const form = useForm<
    mealRecordInputSchemaInput,
    unknown,
    mealRecordInputSchemaOutput
  >({
    resolver: mealRecordSchemaResolver,
    defaultValues,
  });

  // set date automaticaly for mode "add"
  useEffect(() => {
    if (mode === "add") {
      form.reset({
        date: getCurrentDate(),
        time: getCurrentTime(),
        foodName: "",
        gram: "",
        kcal: "",
      });
    }
  }, [mode, isFormOpen, form]);

  const submitMealRecordSent = async (data: mealRecordInputSchemaOutput) => {
    const sentDate =
      mode === "edit" && editItem
        ? { ...data, id: editItem.id, userId: editItem.userId }
        : { ...data, id: uuidv7(), userId: userId };

    try {
      await onSubmit(sentDate);
      handleInputFormWindow();
      handleOptionWindow();
    } catch (error) {
      console.error(error);
    }
  };

  const title = useMemo(() => {
    return mode === "add" ? "食事を記録" : "食事記録を編集";
  }, [mode]);

  const dsc = useMemo(() => {
    return mode === "add" ? "食事を追加してください" : "食事を編集してください";
  }, [mode]);

  return (
    <Dialog open={isFormOpen} onOpenChange={handleInputFormWindow}>
      <DialogContent className="p-0 bg-transparent border-0">
        <CardWithShadow>
          <DialogHeader className="text-left px-6">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{dsc}</DialogDescription>
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
                  onClick={handleCloseAllWindows}
                  className="rounded-lg w-28"
                >
                  キャンセル
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

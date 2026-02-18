"use client";

import { useFoodSearch } from "@/app/dashboard/_hooks";
import {
  mealRecordInputSchemaInput,
  mealRecordInputSchemaOutput,
  mealRecordSchemaResolver,
} from "@/app/dashboard/_components/_schema";
import { Button, CardWithShadow, Input } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  formatTime,
  formatUtcToJstTime,
  formatUtcToJstYYMMDD,
} from "@/utils/format/date";
import { historieskeys, mealRecordkeys } from "@/lib/tanstack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { v7 as uuidv7 } from "uuid";
import { toast } from "sonner";
import { Loading } from "@/components";
import { MealRecordResponse } from "@/shared/types/";
import { addMealRecord, updateMealRecord } from "@/services/mealRecords";

type MealRecordFormProps = {
  userId: string;
  mode: "add" | "edit";
  editItem?: MealRecordResponse;
  isFormOpen: boolean;
  handleFormWindow: () => void;
  handleCloseAllWindows: () => void;
  date: string;
};

type selectedFood = {
  id: string;
  foodName: string;
  kcalPer100g: number;
} | null;

const defaultValues: mealRecordInputSchemaInput = {
  date: "",
  time: "",
  foodName: "",
  gram: "",
  kcal: "",
};

export const MealRecordForm = ({
  userId,
  isFormOpen,
  handleFormWindow,
  handleCloseAllWindows,
  mode,
  editItem,
  date,
}: MealRecordFormProps) => {
  const queryClient = useQueryClient();

  //Incremental Search
  const { setQuery, searchResult } = useFoodSearch();
  const [selectedFood, setSelectedFood] = useState<selectedFood>(null);
  const [eatenGrams, setEatenGrams] = useState("");
  const foodNameRef = useRef<HTMLInputElement>(null);

  const form = useForm<
    mealRecordInputSchemaInput,
    unknown,
    mealRecordInputSchemaOutput
  >({
    resolver: mealRecordSchemaResolver,
    defaultValues,
  });

  //set value mode "add" or "edit"
  useEffect(() => {
    if (!isFormOpen) return;
    if (mode === "edit" && editItem) {
      const date = formatUtcToJstYYMMDD(editItem.eatenAt);
      const time = formatUtcToJstTime(editItem.eatenAt);
      form.reset({
        date: date,
        time: time,
        foodName: editItem.foodName,
        gram: editItem.gram.toString(),
        kcal: editItem.kcal.toString(),
      });
    } else
      form.reset({
        date: date,
        time: formatTime(new Date()),
        foodName: "",
        gram: "",
        kcal: "",
      });
  }, [mode, isFormOpen, form, editItem, date]);

  // Auto-Calculation
  useEffect(() => {
    if (!selectedFood?.kcalPer100g) return;

    const eatenGramsToNum = Number(eatenGrams);
    const result = Math.floor(
      (selectedFood.kcalPer100g * eatenGramsToNum) / 100,
    );
    form.setValue("kcal", result.toString());
  }, [selectedFood, form, eatenGrams]);

  //　Reset Auto-Calculation
  const foodName = form.watch("foodName");
  useEffect(() => {
    if (foodName === "") {
      setSelectedFood(null);
      setEatenGrams("");
      form.setValue("gram", "");
      form.setValue("kcal", "");
      setQuery("");
    }
  }, [foodName, form, setQuery]);

  //Mutations
  const addMutation = useMutation({
    mutationFn: addMealRecord,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: mealRecordkeys.dailyList(
          data.userId,
          formatUtcToJstYYMMDD(data.eatenAt),
        ),
      });

      queryClient.invalidateQueries({
        queryKey: historieskeys.list(data.userId),
      });

      handleCloseAllWindows();
    },
    onError: () => {
      console.error("Error creating mealRecord");
      toast.error("追加に失敗しました");
    },
  });

  const editMutation = useMutation({
    mutationFn: updateMealRecord,
    onSuccess: (_, sentDate) => {
      queryClient.invalidateQueries({
        queryKey: mealRecordkeys.all(),
      });

      queryClient.invalidateQueries({
        queryKey: historieskeys.list(sentDate.userId),
      });
      handleCloseAllWindows();
    },
    onError: () => {
      console.error("Error Editing mealRecord");
      toast.error("編集に失敗しました");
    },
  });

  //Submit form
  const submitMealRecordSent = async (data: mealRecordInputSchemaOutput) => {
    const local = new Date(data.eatenAtLocal);
    const utsIso = local.toISOString();

    if (mode === "edit" && editItem) {
      const sentDate = {
        ...data,
        id: editItem.id,
        userId: editItem.userId,
        eatenAt: utsIso,
        foodId: selectedFood?.id,
      };

      if (editMutation.isPending) return;

      editMutation.mutate(sentDate);

      return;
    }

    const sentDate = {
      ...data,
      id: uuidv7(),
      userId: userId,
      eatenAt: utsIso,
      foodId: selectedFood?.id,
    };

    if (addMutation.isPending) return;
    addMutation.mutate(sentDate);
  };

  //Form title and Discription
  const title = mode === "add" ? "食事を記録" : "食事記録を編集";

  const dsc =
    mode === "add" ? "食事を追加してください" : "食事を編集してください";

  return (
    <Dialog open={isFormOpen} onOpenChange={handleFormWindow}>
      <DialogContent
        onOpenAutoFocus={(e) => {
          // Forcus for foodName input
          e.preventDefault();
          foodNameRef.current?.focus();
        }}
        className="p-0 bg-transparent border-0"
      >
        <CardWithShadow>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{dsc}</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(submitMealRecordSent)}
            className="space-y-4 px-6 w-full"
          >
            <FieldGroup>
              <div className="flex gap-4">
                <Controller
                  control={form.control}
                  name="date"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>日付</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        type="date"
                        className="px-0 justify-center"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="time"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>時間</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        type="time"
                        className="px-0 justify-center"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="relative">
                <Controller
                  control={form.control}
                  name="foodName"
                  render={({ field, fieldState }) => (
                    <>
                      <Field data-invalid={fieldState.invalid}>
                        <div className="flex flex-col md:flex-row md:gap-6">
                          <FieldLabel htmlFor={field.name}>
                            たべたもの
                          </FieldLabel>
                          {mode === "edit" && (
                            <p className="text-xs text-foreground/80">
                              ※カロリー自動計算は再度検索が必要です
                            </p>
                          )}
                        </div>
                        <Input
                          {...field}
                          ref={foodNameRef}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="食品、料理名を入れてください"
                          type="text"
                          onChange={(e) => {
                            field.onChange(e);
                            setQuery(e.target.value);
                          }}
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>

                      {searchResult.isError && (
                        <p className="px-4 py-2 text-center text-red-400">
                          検索に失敗しました。手入力してください。
                        </p>
                      )}

                      {searchResult.data && searchResult.data.length > 0 && (
                        <ul className="absolute bg-white mt-0.5 mx-auto w-full z-20 max-h-60 overflow-auto border border-t-0 border-background rounded-b-lg">
                          {searchResult.data.map((item) => (
                            <li
                              key={item.id}
                              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                              onClick={() => {
                                setQuery(item.foodName);
                                field.onChange(item.foodName);
                                setSelectedFood({
                                  id: item.id,
                                  foodName: item.foodName,
                                  kcalPer100g: item.kcalPer100g,
                                });
                              }}
                            >
                              {item.foodName}
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                />
              </div>

              <Controller
                control={form.control}
                name="gram"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>グラム</FieldLabel>
                    <div className="flex items-end gap-2 ">
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="200"
                        type="number"
                        className="w-40"
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val);
                          setEatenGrams(val);
                        }}
                      />
                      <p className="font-bold">gram</p>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="kcal"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>カロリー</FieldLabel>
                    <div className="flex items-end gap-2 ">
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="200"
                        type="number"
                        className="w-40"
                      />
                      <p className="font-bold">kcal</p>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
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

                <Button
                  type="submit"
                  disabled={addMutation.isPending || editMutation.isPending}
                  className="rounded-lg w-28"
                >
                  {addMutation.isPending || editMutation.isPending ? (
                    <Loading />
                  ) : (
                    "登録"
                  )}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardWithShadow>
      </DialogContent>
    </Dialog>
  );
};

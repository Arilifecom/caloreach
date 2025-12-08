"use client";

import { useDebounce } from "@/app/dashboard/_hooks";
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
import { SelectMealRecord } from "@/db/schema";
import {
  addMealRecord,
  editMealRecord,
  fetchFoodsBySearch,
} from "@/utils/api/mealRecords";
import { formatTime, formatYYMMDD, getCurrentTime } from "@/utils/format/date";
import {
  foodskeys,
  historieskeys,
  mealRecordkeys,
  TErrCodes,
} from "@/utils/tanstack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { v7 as uuidv7 } from "uuid";
import { toast } from "sonner";

type MealRecordFormProps = {
  userId: string;
  mode: "add" | "edit";
  editItem?: SelectMealRecord;
  isFormOpen: boolean;
  handleInputFormWindow: () => void;
  handleCloseAllWindows: () => void;
  date?: string;
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
  handleInputFormWindow,
  handleCloseAllWindows,
  mode,
  editItem,
  date,
}: MealRecordFormProps) => {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const debouncedSearch = useDebounce(query, 400);
  const [selectedFood, setSelectedFood] = useState<selectedFood>(null);
  const [eatenGrams, setEatenGrams] = useState("");

  const form = useForm<
    mealRecordInputSchemaInput,
    unknown,
    mealRecordInputSchemaOutput
  >({
    resolver: mealRecordSchemaResolver,
    defaultValues,
  });

  //Auto calculate Kcal when user selected Food by incremental search
  useEffect(() => {
    if (!selectedFood?.kcalPer100g) return;
    const eatenGramsToNum = Number(eatenGrams);
    const result = Math.floor(
      (selectedFood.kcalPer100g * eatenGramsToNum) / 100
    );
    form.setValue("kcal", result.toString());
  }, [selectedFood, form, eatenGrams]);

  //Reset Auto calculate when user changed foodName
  const foodName = form.watch("foodName");
  useEffect(() => {
    if (foodName === "") {
      setSelectedFood(null);
      setEatenGrams("");
      form.setValue("gram", "");
      form.setValue("kcal", "");
    }
  }, [foodName, form]);

  //incremental search
  const searchResult = useQuery({
    queryKey: foodskeys.list(debouncedSearch),
    queryFn: () => fetchFoodsBySearch(debouncedSearch),
    enabled: debouncedSearch !== "",
    meta: { errCode: TErrCodes.FOOD_SEARCH_FAILED },
  });

  //set value mode "add" or "edit"
  useEffect(() => {
    if (!isFormOpen) return;

    if (mode === "edit" && editItem) {
      form.reset({
        date: formatYYMMDD(editItem.eatenAt).toString(),
        time: formatTime(editItem.eatenAt).toString(),
        foodName: editItem.foodName,
        gram: editItem.gram.toString(),
        kcal: editItem.kcal.toString(),
      });
    } else
      form.reset({
        date: date,
        time: getCurrentTime(),
        foodName: "",
        gram: "",
        kcal: "",
      });
    setQuery("");
  }, [mode, isFormOpen, form, editItem, date]);

  //Mutations
  const addMutation = useMutation({
    mutationFn: addMealRecord,
    onSuccess: (_, sentDate) => {
      queryClient.invalidateQueries({
        queryKey: mealRecordkeys.dailyList(
          sentDate.userId,
          formatYYMMDD(sentDate.eatenAt)
        ),
      });

      queryClient.invalidateQueries({
        queryKey: historieskeys.list(sentDate.userId),
      });

      handleCloseAllWindows();
    },
    onError: () => {
      console.error("Error creating mealRecord");
      toast.error("追加に失敗しました");
    },
  });

  const editMutation = useMutation({
    mutationFn: editMealRecord,
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

  const submitMealRecordSent = async (data: mealRecordInputSchemaOutput) => {
    const sentDate =
      mode === "edit" && editItem
        ? {
            ...data,
            id: editItem.id,
            userId: editItem.userId,
            foodId: selectedFood?.id,
          }
        : { ...data, id: uuidv7(), userId: userId, foodId: selectedFood?.id };

    if (mode === "edit" && editItem) {
      if (editMutation.isPending) return;
      editMutation.mutate(sentDate);
      return;
    }

    if (addMutation.isPending) return;
    addMutation.mutate(sentDate);
  };

  const title = useMemo(() => {
    return mode === "add" ? "食事を記録" : "食事記録を編集";
  }, [mode]);

  const dsc = useMemo(() => {
    return mode === "add"
      ? "食事を追加してください"
      : "カロリー自動計算は食品の再検索・再選択時にのみ適用されます";
  }, [mode]);

  return (
    <Dialog open={isFormOpen} onOpenChange={handleInputFormWindow}>
      <DialogContent className="p-0 bg-transparent border-0">
        <CardWithShadow>
          <DialogHeader className="text-left px-6">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{dsc}</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <form
              onSubmit={form.handleSubmit(submitMealRecordSent)}
              className="space-y-4 px-6 w-full"
            >
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
                        <FieldLabel>たべたもの</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="食品、料理名を入れてください"
                          type="text"
                          onChange={(e) => {
                            const val = e.target.value;
                            setQuery(val);
                            field.onChange(val);
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
                        <ul className="absolute bg-white mt-0.5 mx-auto w-full z-20 max-h-60 overflow-auto border-1 border-t-0 border-background rounded-b-lg">
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

                <Button type="submit" className="rounded-lg w-28">
                  登録
                </Button>
              </div>
            </form>
          </FieldGroup>
        </CardWithShadow>
      </DialogContent>
    </Dialog>
  );
};

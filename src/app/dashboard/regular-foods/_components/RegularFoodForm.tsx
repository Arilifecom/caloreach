"use client";

import { useFoodSearch } from "@/app/dashboard/_hooks";
import {
  RegularFoodFormInputSchemaInput,
  RegularFoodFormInputSchemaOutput,
  RegularFoodFormSchemaResolver,
} from "@/app/dashboard/regular-foods/_components/_schema";
import { Loading } from "@/components";
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
import { SelectregularFood } from "@/db/schema";
import { addRegularFood, editRegularFood } from "@/utils/db/regularFoods";
import { RegularFoodskeys } from "@/utils/tanstack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { v7 as uuidv7 } from "uuid";

type RegularFoodFormProps = {
  userId: string;
  mode: "add" | "edit";
  editItem?: SelectregularFood;
  isFormOpen: boolean;
  handleFormWindow: () => void;
  handleCloseAllWindows?: () => void;
};

const defaultValues: RegularFoodFormInputSchemaInput = {
  foodName: "",
  gram: "",
  kcal: "",
};

export const RegularFoodForm = ({
  mode,
  editItem,
  userId,
  isFormOpen,
  handleFormWindow,
  handleCloseAllWindows,
}: RegularFoodFormProps) => {
  const queryClient = useQueryClient();

  //Incremental Search
  const { setQuery, searchResult } = useFoodSearch();
  const [selectedFoodKcal, setSelectedFoodKcal] = useState<number | null>(null);
  const [eatenGrams, setEatenGrams] = useState("");

  const form = useForm<
    RegularFoodFormInputSchemaInput,
    unknown,
    RegularFoodFormInputSchemaOutput
  >({
    resolver: RegularFoodFormSchemaResolver,
    defaultValues,
  });

  //InitialValues "Add or Edit mode"
  useEffect(() => {
    if (!isFormOpen) return;
    if (mode === "edit" && editItem) {
      form.reset({
        foodName: editItem.foodName,
        gram: editItem.gram.toString(),
        kcal: editItem.kcal.toString(),
      });
    } else
      form.reset({
        foodName: "",
        gram: "",
        kcal: "",
      });
  }, [mode, isFormOpen, editItem, form]);

  // Auto-Calculation
  useEffect(() => {
    if (selectedFoodKcal === null) return;
    const eatenGramsToNum = Number(eatenGrams);
    const result = Math.floor((selectedFoodKcal * eatenGramsToNum) / 100);
    form.setValue("kcal", result.toString());
  }, [selectedFoodKcal, form, eatenGrams]);

  //　Reset Auto-Calculation
  const foodName = form.watch("foodName");
  useEffect(() => {
    if (foodName === "") {
      setSelectedFoodKcal(null);
      setEatenGrams("");
      form.setValue("gram", "");
      form.setValue("kcal", "");
    }
  }, [foodName, form]);

  //Mutations
  const addMutation = useMutation({
    mutationFn: addRegularFood,
    onSuccess: (_, sentDate) => {
      queryClient.invalidateQueries({
        queryKey: RegularFoodskeys.list(sentDate.userId),
      });
      handleFormWindow();
    },
    onError: () => {
      console.error("Error creating regularFood");
      toast.error("追加に失敗しました");
    },
  });

  const editMutation = useMutation({
    mutationFn: editRegularFood,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: RegularFoodskeys.all(),
      });
      handleCloseAllWindows?.();
    },
    onError: () => {
      console.error("Error Editing regularFood");
      toast.error("編集に失敗しました");
    },
  });

  //Submit form
  const submitRegularFoodSent = async (
    data: RegularFoodFormInputSchemaOutput
  ) => {
    const sentDate =
      mode === "edit" && editItem
        ? { ...data, id: editItem.id, userId: editItem.userId }
        : { ...data, id: uuidv7(), userId: userId };

    if (mode === "edit" && editItem) {
      if (editMutation.isPending) return;
      editMutation.mutate(sentDate);
      return;
    }

    if (addMutation.isPending) return;
    addMutation.mutate(sentDate);
  };

  //Form title and Discription
  const title =
    mode === "add" ? "レギュラーフードを登録" : "レギュラーフードを編集";

  const dsc =
    mode === "add"
      ? "レギュラーフードを登録してください"
      : "レギュラーフードを編集してください";

  return (
    <Dialog open={isFormOpen} onOpenChange={handleFormWindow}>
      <DialogContent className="p-0 bg-transparent border-0">
        <CardWithShadow>
          <DialogHeader className="text-left px-6">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{dsc}</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <form
              onSubmit={form.handleSubmit(submitRegularFoodSent)}
              className="space-y-4 px-6 w-full"
            >
              <div className="relative">
                <Controller
                  control={form.control}
                  name="foodName"
                  render={({ field, fieldState }) => (
                    <>
                      <Field data-invalid={fieldState.invalid}>
                        <div className="flex flex-col md:flex-row md:gap-6">
                          <FieldLabel htmlFor={field.name}>食品名</FieldLabel>
                          {mode === "edit" && (
                            <p className="text-xs text-foreground/80">
                              ※カロリー自動計算は再度検索が必要です
                            </p>
                          )}
                        </div>
                        <Input
                          {...field}
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
                        <ul className="absolute bg-white mt-0.5 mx-auto w-full z-20 max-h-60 overflow-auto border-1 border-t-0 border-background rounded-b-lg">
                          {searchResult.data.map((item) => (
                            <li
                              key={item.id}
                              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                              onClick={() => {
                                setQuery(item.foodName);
                                field.onChange(item.foodName);
                                setSelectedFoodKcal(item.kcalPer100g);
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
                    <div className="flex items-end gap-2">
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
                  onClick={
                    mode === "edit"
                      ? () => handleCloseAllWindows?.()
                      : handleFormWindow
                  }
                  className="rounded-lg w-28"
                >
                  キャンセル
                </Button>

                <Button
                  type="submit"
                  className="rounded-lg w-28"
                  disabled={addMutation.isPending || editMutation.isPending}
                >
                  {addMutation.isPending || editMutation.isPending ? (
                    <Loading />
                  ) : (
                    "登録"
                  )}
                </Button>
              </div>
            </form>
          </FieldGroup>
        </CardWithShadow>
      </DialogContent>
    </Dialog>
  );
};

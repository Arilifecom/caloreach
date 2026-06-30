"use client";

import {
  TargetKcalPlanInputResolver,
  TargetKcalPlanInputSchemaInput,
  TargetKcalPlanInputSchemaOutput,
} from "@/app/dashboard/target-kcal-plans/_component/schema";
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
import { formattedTomorrow, formatYYMMDD } from "@/utils/format/date";
import { historieskeys, TargetKcalkeys } from "@/lib/tanstack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { TargetKcalPlansResponse } from "@/shared/types";
import { createTargetKcal, updateTargetKcal } from "@/services/targetKcal";

type TargetKcalFormProps = {
  editItem?: TargetKcalPlansResponse;
  userId: string;
  mode: "add" | "edit";
  isFormOpen: boolean;
  handleFormWindow: () => void;
  handleCloseAllWindows?: () => void;
  firstEffectiveDate?: string;
};

const defaultValues: TargetKcalPlanInputSchemaInput = {
  targetKcal: "",
  effectiveDate: formattedTomorrow(),
};

export const TargetKcalPlanForm = ({
  editItem,
  mode,
  userId,
  isFormOpen,
  handleFormWindow,
  handleCloseAllWindows,
  firstEffectiveDate,
}: TargetKcalFormProps) => {
  const queryClient = useQueryClient();
  const [isDateEditable, setIsDateEditable] = useState(true);
  const targetKcalRef = useRef<HTMLInputElement>(null);

  const form = useForm<
    TargetKcalPlanInputSchemaInput,
    unknown,
    TargetKcalPlanInputSchemaOutput
  >({
    resolver: TargetKcalPlanInputResolver,
    defaultValues,
  });

  //InitialValues "Add or Edit mode"
  useEffect(() => {
    if (!isFormOpen) return;
    if (mode === "edit" && editItem) {
      form.reset({
        targetKcal: editItem.targetKcal.toString(),
        effectiveDate: editItem.effectiveDate,
      });
    } else {
      form.reset({
        targetKcal: "",
        effectiveDate: formattedTomorrow(),
      });
    }
  }, [mode, editItem, isFormOpen, form]);

  //Mutations
  const addMutation = useMutation({
    mutationFn: createTargetKcal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TargetKcalkeys.list(userId),
      });

      queryClient.invalidateQueries({
        queryKey: TargetKcalkeys.effective(userId),
      });

      queryClient.invalidateQueries({
        queryKey: historieskeys.list(userId),
      });
      handleFormWindow();
    },
    onError: () => {
      console.error("Error creating regularFood");
      toast.error("追加に失敗しました");
    },
  });

  const editMutation = useMutation({
    mutationFn: updateTargetKcal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TargetKcalkeys.list(userId),
      });

      queryClient.invalidateQueries({
        queryKey: TargetKcalkeys.effective(userId),
      });

      queryClient.invalidateQueries({
        queryKey: historieskeys.list(userId),
      });
      handleCloseAllWindows?.();
    },
    onError: () => {
      console.error("Error Editing regularFood");
      toast.error("編集に失敗しました");
    },
  });

  //Form submit function
  const submitTargetKcalPlanSent = async (
    InputData: TargetKcalPlanInputSchemaOutput,
  ) => {
    const formatDate = formatYYMMDD(InputData.effectiveDate);

    if (mode === "edit" && editItem) {
      if (editMutation.isPending) return;

      editMutation.mutate({
        id: editItem.id,
        targetKcal: InputData.targetKcal,
        effectiveDate: formatDate,
      });

      return;
    }

    addMutation.mutate({
      targetKcal: InputData.targetKcal,
      effectiveDate: formatDate,
    });
  };

  const title = mode === "add" ? "目標カロリーを登録" : "目標カロリーを編集";

  const dsc =
    mode === "add"
      ? "目標カロリーを登録してください"
      : "目標カロリーを編集してください";

  useEffect(() => {
    if (!editItem) {
      setIsDateEditable(false);
    } else if (editItem.effectiveDate === firstEffectiveDate) {
      // FirstRecord is unabled edit date
      setIsDateEditable(true);
    } else {
      // other is abeled date
      setIsDateEditable(false);
    }
  }, [editItem, firstEffectiveDate]);

  return (
    <Dialog open={isFormOpen} onOpenChange={handleFormWindow}>
      <DialogContent
        onOpenAutoFocus={(e) => {
          // デフォルトを無効
          e.preventDefault();
          // refマークした箇所を指定
          targetKcalRef.current?.focus();
        }}
      >
        <CardWithShadow>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{dsc}</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(submitTargetKcalPlanSent)}
            className="space-y-6 px-6 w-full"
          >
            <FieldGroup className="tex-center">
              <Controller
                control={form.control}
                name="effectiveDate"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>開始日</FieldLabel>
                    <div className="flex items-end gap-2">
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        type="date"
                        className={`w-40 px-0 justify-center${
                          isDateEditable
                            ? "disabled:opacity-100 text-muted-foreground cursor-not-allowed"
                            : ""
                        }`}
                        disabled={isDateEditable}
                        min={firstEffectiveDate}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="targetKcal"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      目標摂取カロリー
                    </FieldLabel>
                    <div className="flex items-end gap-2">
                      <Input
                        {...field}
                        ref={targetKcalRef}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="2000"
                        type="number"
                        className="w-40"
                      />
                      <p className="font-bold">Kcal</p>
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
            </FieldGroup>
          </form>
        </CardWithShadow>
      </DialogContent>
    </Dialog>
  );
};

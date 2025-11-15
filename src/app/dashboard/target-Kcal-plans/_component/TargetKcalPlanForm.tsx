"use client";

import {
  TargetKcalPlanInputResolver,
  TargetKcalPlanInputSchemaInput,
  TargetKcalPlanInputSchemaOutput,
} from "@/app/dashboard/target-kcal-plans/_component/schema";
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
import { SelectTargetKcalPlansRecord } from "@/db/schema";
import { createTargetKcal, editTargetKcal } from "@/utils/api/targetKcal";
import { formatYYMMDD } from "@/utils/format";
import { TargetKcalkeys } from "@/utils/tanstack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { v7 as uuidv7 } from "uuid";

type TargetKcalFormProps = {
  editItem?: SelectTargetKcalPlansRecord;
  userId: string;
  mode: "add" | "edit";
  isFormOpen: boolean;
  handleInputFormWindow: () => void;
  handleCloseAllWindows?: () => void;
  firstEffectiveDate?: string;
};

const defaultValues: TargetKcalPlanInputSchemaInput = {
  targetKcal: "",
  effectiveDate: "",
};

export const TargetKcalPlanForm = ({
  editItem,
  mode,
  userId,
  isFormOpen,
  handleInputFormWindow,
  handleCloseAllWindows,
  firstEffectiveDate,
}: TargetKcalFormProps) => {
  const queryClient = useQueryClient();
  const [isDateEditable, setIsDateEditable] = useState(true);

  const form = useForm<
    TargetKcalPlanInputSchemaInput,
    unknown,
    TargetKcalPlanInputSchemaOutput
  >({
    resolver: TargetKcalPlanInputResolver,
    defaultValues: defaultValues,
  });

  //set value mode "add" or "edit"
  useEffect(() => {
    if (!isFormOpen) return;

    if (mode === "edit" && editItem) {
      form.reset({
        targetKcal: editItem.targetKcal.toString(),
        effectiveDate: editItem.effectiveDate,
      });
    } else
      form.reset({
        targetKcal: "",
        effectiveDate: "",
      });
  }, [mode, isFormOpen, form, editItem]);

  //Mutations
  const addMutation = useMutation({
    mutationFn: createTargetKcal,
    onSuccess: (_, sentDate) => {
      queryClient.invalidateQueries({
        queryKey: TargetKcalkeys.list(sentDate.userId),
      });
      handleInputFormWindow();
    },
    onError: () => {
      console.error("Error creating regularFood");
      toast.error("追加に失敗しました");
    },
  });

  const editMutation = useMutation({
    mutationFn: editTargetKcal,
    onSuccess: (_, sentDate) => {
      queryClient.invalidateQueries({
        queryKey: TargetKcalkeys.list(sentDate.userId),
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
    data: TargetKcalPlanInputSchemaOutput
  ) => {
    const formatDate = formatYYMMDD(data.effectiveDate);
    const sentDate =
      mode === "edit" && editItem
        ? {
            id: editItem.id,
            userId: editItem.userId,
            targetKcal: data.targetKcal,
            effectiveDate: formatDate,
          }
        : {
            id: uuidv7(),
            userId: userId,
            targetKcal: data.targetKcal,
            effectiveDate: formatDate,
          };

    if (mode === "edit" && editItem) {
      if (editMutation.isPending) return;
      editMutation.mutate(sentDate);
      return;
    }

    if (addMutation.isPending) return;
    addMutation.mutate(sentDate);
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
    <Dialog open={isFormOpen} onOpenChange={handleInputFormWindow}>
      <DialogContent className="p-0 bg-transparent border-0">
        <CardWithShadow>
          <DialogHeader className="text-left px-6">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{dsc}</DialogDescription>
          </DialogHeader>
          <FieldGroup className="tex-center">
            <form
              onSubmit={form.handleSubmit(submitTargetKcalPlanSent)}
              className="space-y-6 px-6 w-full"
            >
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
                        className={`w-40 ${
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
                      : handleInputFormWindow
                  }
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

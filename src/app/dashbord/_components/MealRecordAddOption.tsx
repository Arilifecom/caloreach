"use client";

import { MealRecordForm } from "@/app/dashbord/_components/MealRecordForm";
import { ButtonWithIconLabel, FormHeader } from "@/components";
import { OnigiriIcon, RegularIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { InsertMealRecord } from "@/db/schema";
import { useWindowControl } from "@/hooks";
import { PlusIcon } from "lucide-react";
import { memo } from "react";

type MealRecordOptionProps = {
  userId: string;
  addRecord: (newRecord: InsertMealRecord) => void;
};

export const Component = ({ userId, addRecord }: MealRecordOptionProps) => {
  const {
    handleOptionWindow,
    isOptionOpen,
    handleRegularMealsWindow,
    handleInputFormWindow,
    isFormOpen,
    handleCloseAllWindows,
  } = useWindowControl();

  return (
    <>
      <Button
        onClick={handleOptionWindow}
        className="w-14 h-14 absolute bottom-8 right-4"
      >
        <PlusIcon />
      </Button>

      {isOptionOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-10"
          onClick={handleOptionWindow}
        />
      )}

      <div
        className={`fixed bottom-0 bg-background w-full rounded-tr-lg rounded-tl-lg max-w-lg z-20 overflow-hidden transition-all duration-300 ease-in-out
      ${
        isOptionOpen
          ? "h-72 pt-8 border-2 border-foreground"
          : "h-0 pt-0 border-0"
      }`}
      >
        <FormHeader
          title="食事を記録"
          description="食事の追加方法を選択してください"
          handleClose={handleOptionWindow}
        />
        <div className="flex gap-4 justify-center">
          <ButtonWithIconLabel
            icon={<RegularIcon className="w-12" />}
            label="レギュラーフード"
            onClick={handleRegularMealsWindow}
          />
          <ButtonWithIconLabel
            icon={<OnigiriIcon className="w-12" />}
            label="検索 or 手入力"
            onClick={handleInputFormWindow}
          />
        </div>
      </div>

      <MealRecordForm
        userId={userId}
        isFormOpen={isFormOpen}
        handleInputFormWindow={handleInputFormWindow}
        handleOptionWindow={handleOptionWindow}
        handleCloseAllWindows={handleCloseAllWindows}
        onSubmit={addRecord}
        mode="add"
      />
    </>
  );
};

const MealRecordAddOption = memo(Component);
export { MealRecordAddOption };

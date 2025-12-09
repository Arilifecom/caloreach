"use client";

import { MealRecordForm } from "@/app/dashboard/_components/MealRecordForm";
import { RegularFoodSelector } from "@/app/dashboard/_components/RegularFoodSelector";
import { ButtonWithIconLabel, FormHeader } from "@/components";
import { OnigiriIcon, RegularIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { useModalControl } from "@/hooks";
import { PlusIcon } from "lucide-react";
import { memo } from "react";

type MealRecordOptionProps = {
  userId: string;
  date: string;
};

export const Component = ({ userId, date }: MealRecordOptionProps) => {
  const {
    handleOpenChange,
    isOpen,
    handleFormOpenChange,
    isFormOpen,
    closeAllWindows,
    isRegularOpen,
    handleRegularOpenChange,
  } = useModalControl();

  return (
    <>
      <Button
        onClick={handleOpenChange}
        className="w-14 h-14 fixed bottom-24 right-4 md:right-[calc(50%-200px)]"
      >
        <PlusIcon />
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-10"
          onClick={handleOpenChange}
        />
      )}

      <div
        className={`fixed bottom-0 bg-background w-full rounded-tr-lg rounded-tl-lg max-w-lg z-20 overflow-hidden transition-all duration-300 ease-in-out
      ${isOpen ? "h-72 pt-8 border-2 border-foreground" : "h-0 pt-0 border-0"}`}
      >
        <FormHeader
          title="食事を記録"
          description="食事の追加方法を選択してください"
          handleClose={handleOpenChange}
        />
        <div className="flex gap-4 justify-center">
          <ButtonWithIconLabel
            icon={<RegularIcon className="w-12" />}
            label="レギュラーフード"
            onClick={handleRegularOpenChange}
          />
          <ButtonWithIconLabel
            icon={<OnigiriIcon className="w-12" />}
            label="検索 or 手入力"
            onClick={handleFormOpenChange}
          />
        </div>
      </div>

      <RegularFoodSelector
        userId={userId}
        isRegularOpen={isRegularOpen}
        handleRegularMealsWindow={handleRegularOpenChange}
        handleCloseAllWindows={closeAllWindows}
        date={date}
      />
      <MealRecordForm
        userId={userId}
        isFormOpen={isFormOpen}
        handleFormWindow={handleFormOpenChange}
        handleCloseAllWindows={closeAllWindows}
        mode="add"
        date={date}
      />
    </>
  );
};

const MealRecordAddOption = memo(Component);
export { MealRecordAddOption };

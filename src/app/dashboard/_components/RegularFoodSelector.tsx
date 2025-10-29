"use client";

import { RegularFoodLsits } from "@/app/dashboard/_components/";
import { FormHeader } from "@/components";
import { memo } from "react";

type RegularFoodSelectorProps = {
  userId: string;
  isRegularOpen: boolean;
  handleRegularMealsWindow: () => void;
  handleCloseAllWindows: () => void;
};

const Component = ({
  userId,
  isRegularOpen,
  handleCloseAllWindows,
  handleRegularMealsWindow,
}: RegularFoodSelectorProps) => {
  return (
    <>
      {isRegularOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-10"
          onClick={handleRegularMealsWindow}
        />
      )}

      <div
        className={`fixed bottom-0 bg-background w-full rounded-tr-lg rounded-tl-lg max-w-lg z-30 overflow-hidden transition-all duration-300 ease-in-out
      ${
        isRegularOpen
          ? "h-[80vh] pt-8 border-2 border-foreground"
          : "h-0 pt-0 border-0"
      }`}
      >
        <FormHeader
          title="レギュラーフードから食事を記録"
          description="食事を追加してください"
          handleClose={handleCloseAllWindows}
        />
        <RegularFoodLsits
          userId={userId}
          isRegularOpen={isRegularOpen}
          handleCloseAllWindows={handleCloseAllWindows}
        />
      </div>
    </>
  );
};

const RegularFoodSelector = memo(Component);
export { RegularFoodSelector };

"use client";

import {
  RegularFoodForm,
  RegularFoodLists,
  RegularFoodListsSkeltone,
} from "@/app/dashboard/regular-foods/_components/";
import { Button } from "@/components/ui";
import { useModalControl } from "@/hooks";
import { PlusIcon } from "lucide-react";
import { memo, Suspense } from "react";

type RegularFoodSectionProps = {
  userId: string;
};

const Component = ({ userId }: RegularFoodSectionProps) => {
  const { isFormOpen, handleFormOpenChange } = useModalControl();
  return (
    <>
      <Suspense fallback={<RegularFoodListsSkeltone />}>
        <RegularFoodLists userId={userId} />
      </Suspense>
      <Button
        onClick={handleFormOpenChange}
        className="w-14 h-14 fixed bottom-24 right-4 md:right-[calc(50%-200px)]"
      >
        <PlusIcon />
      </Button>
      <RegularFoodForm
        userId={userId}
        isFormOpen={isFormOpen}
        handleFormWindow={handleFormOpenChange}
        mode="add"
      />
    </>
  );
};

const RegularFoodSection = memo(Component);
export { RegularFoodSection };

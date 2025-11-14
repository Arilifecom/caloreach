"use client";

import {
  TargetKcalLists,
  TargetKcalPlanForm,
} from "@/app/dashboard/target-Kcal-plans/_component/";
import { Button } from "@/components/ui";
import { useWindowControl } from "@/hooks";
import { PlusIcon } from "lucide-react";
import { memo } from "react";

type TargetKcalSectionProps = {
  userId: string;
};

const Component = ({ userId }: TargetKcalSectionProps) => {
  const { isFormOpen, handleInputFormWindow } = useWindowControl();

  return (
    <>
      <TargetKcalLists userId={userId} />

      <Button
        onClick={handleInputFormWindow}
        className="w-14 h-14 fixed bottom-24 right-4 md:right-[calc(50%-200px)]"
      >
        <PlusIcon />
      </Button>

      <TargetKcalPlanForm
        userId={userId}
        isFormOpen={isFormOpen}
        handleInputFormWindow={handleInputFormWindow}
        mode="add"
      />
    </>
  );
};

const TargetKcalSection = memo(Component);
export { TargetKcalSection };

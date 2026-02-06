"use client";

import { FetchErrorMessage } from "@/app/dashboard/_components";
import {
  TargetKcalLists,
  TargetKcalPlanForm,
} from "@/app/dashboard/target-kcal-plans/_component/";
import { Loading } from "@/components";
import { Button } from "@/components/ui";
import { SelectTargetKcalPlansRecord } from "@/db/schema";
import { useModalControl } from "@/hooks";
import { TargetKcalkeys, TErrCodes } from "@/lib/tanstack";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { memo } from "react";

type TargetKcalSectionProps = {
  userId: string;
};

const Component = ({ userId }: TargetKcalSectionProps) => {
  const { isFormOpen, handleFormOpenChange } = useModalControl();

  const { data, isLoading, isError, refetch } = useSuspenseQuery<
    SelectTargetKcalPlansRecord[]
  >({
    queryKey: TargetKcalkeys.list(userId),
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ORIGIN}/api/target-kcal?userId=${userId}`,
        { cache: "no-store" },
      );
      if (!res.ok) {
        throw new Error("totalKcalLists fetch failed");
      }
      return res.json();
    },
    meta: { errCode: TErrCodes.TARGETKCALL_FETCH_FAILED },
  });

  if (isLoading) return <Loading />;
  if (isError) return <FetchErrorMessage onRetry={refetch} />;

  //get first createdAt date for unebled delete
  const firstEffectiveDate = data?.reduce((oldest, item) =>
    item.createdAt < oldest.createdAt ? item : oldest,
  )?.effectiveDate;

  return (
    <>
      <TargetKcalLists data={data} firstEffectiveDate={firstEffectiveDate} />
      <Button
        onClick={handleFormOpenChange}
        className="w-14 h-14 fixed bottom-24 right-4 md:right-[calc(50%-200px)]"
      >
        <PlusIcon />
      </Button>

      <TargetKcalPlanForm
        userId={userId}
        isFormOpen={isFormOpen}
        handleFormWindow={handleFormOpenChange}
        mode="add"
        firstEffectiveDate={firstEffectiveDate}
      />
    </>
  );
};

const TargetKcalSection = memo(Component);
export { TargetKcalSection };

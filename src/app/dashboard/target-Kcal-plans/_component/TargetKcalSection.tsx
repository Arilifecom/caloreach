"use client";

import { FetchErrorMessage } from "@/app/dashboard/_components";
import {
  TargetKcalLists,
  TargetKcalPlanForm,
} from "@/app/dashboard/target-Kcal-plans/_component/";
import { Loading } from "@/components";
import { Button } from "@/components/ui";
import { useWindowControl } from "@/hooks";
import { fetchUserTargetKcal } from "@/utils/api/targetKcal";
import { TargetKcalkeys, TErrCodes } from "@/utils/tanstack";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { memo } from "react";

type TargetKcalSectionProps = {
  userId: string;
};

const Component = ({ userId }: TargetKcalSectionProps) => {
  const { isFormOpen, handleInputFormWindow } = useWindowControl();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: TargetKcalkeys.list(userId),
    queryFn: () => fetchUserTargetKcal(userId),
    meta: { errCode: TErrCodes.TARGETKCALL_FETCH_FAILED },
  });

  if (isLoading) return <Loading />;
  if (isError) return <FetchErrorMessage onRetry={refetch} />;

  //get first createdAt date for unebled delete
  const firstEffectiveDate = data?.reduce((oldest, item) =>
    item.createdAt < oldest.createdAt ? item : oldest
  )?.effectiveDate;

  return (
    <>
      <TargetKcalLists data={data} firstEffectiveDate={firstEffectiveDate} />

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
        firstEffectiveDate={firstEffectiveDate}
      />
    </>
  );
};

const TargetKcalSection = memo(Component);
export { TargetKcalSection };

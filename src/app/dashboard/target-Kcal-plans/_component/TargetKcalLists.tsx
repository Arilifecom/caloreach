"use client";

import { FetchErrorMessage } from "@/app/dashboard/_components";
import { TargetKcalListItem } from "@/app/dashboard/target-Kcal-plans/_component/";
import { Loading } from "@/components";
import { fetchUserTargetKcal } from "@/utils/api/targetKcal";
import { TargetKcalkeys, TErrCodes } from "@/utils/tanstack";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";

type TargetKcalListsProps = {
  userId: string;
};

const Component = ({ userId }: TargetKcalListsProps) => {
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
      <ul className="w-full">
        {data && data.length > 0 ? (
          data.map((item) => (
            <TargetKcalListItem
              key={item.id}
              data={item}
              firstEffectiveDate={firstEffectiveDate}
            />
          ))
        ) : (
          <p className="font-medium text-center">
            登録されている目標カロリーはありません
          </p>
        )}
      </ul>
    </>
  );
};

const TargetKcalLists = memo(Component);
export { TargetKcalLists };

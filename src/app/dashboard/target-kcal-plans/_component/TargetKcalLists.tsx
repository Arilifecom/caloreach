"use client";

import { TargetKcalListItem } from "@/app/dashboard/target-kcal-plans/_component";
import { TargetKcalPlansResponse } from "@/shared/types";
import { memo } from "react";

type TargetKcalListsProps = {
  data: TargetKcalPlansResponse[];
  firstEffectiveDate?: string;
};

const Component = ({ data, firstEffectiveDate }: TargetKcalListsProps) => {
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

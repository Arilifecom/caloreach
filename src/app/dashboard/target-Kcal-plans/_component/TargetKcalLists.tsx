"use client";

import { TargetKcalListItem } from "@/app/dashboard/target-Kcal-plans/_component/";
import { SelectTargetKcalPlansRecord } from "@/db/schema";
import { memo } from "react";

type TargetKcalListsProps = {
  data?: SelectTargetKcalPlansRecord[];
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

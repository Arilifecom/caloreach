"use client";

import { TargetKcalActionMenu } from "@/app/dashboard/target-Kcal-plans/_component/TargetKcalActionMenu";
import { List } from "@/components";
import { SelectTargetKcalPlansRecord } from "@/db/schema";
import { formatDateWithDay } from "@/utils/format";
import { memo } from "react";

type TargetKcalListItemProps = {
  data: SelectTargetKcalPlansRecord;
  firstEffectiveDate?: string;
};

const Component = ({ data, firstEffectiveDate }: TargetKcalListItemProps) => {
  return (
    <>
      <li key={data.id} className="mb-2">
        <List>
          <div className="flex w-full justify-between min-h-[49.5px]">
            <div className="flex items-center gap-6">
              <h3 className="">
                {formatDateWithDay(new Date(data.effectiveDate))}
              </h3>
              <p className="">開始</p>
              <p className="font-bold text-xl">{data.targetKcal}kcal</p>
            </div>
            <TargetKcalActionMenu
              targetKcal={data}
              firstEffectiveDate={firstEffectiveDate}
            />
          </div>
        </List>
      </li>
    </>
  );
};

const TargetKcalListItem = memo(Component);
export { TargetKcalListItem };

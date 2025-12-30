"use client";

import { TargetKcalActionMenu } from "@/app/dashboard/target-kcal-plans/_component/TargetKcalActionMenu";
import { List } from "@/components";
import { SelectTargetKcalPlansRecord } from "@/db/schema";
import { formatDateWithDay, formatYY } from "@/utils/format/date";
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
          <div className="flex w-full justify-between items-center min-h-[49.5px]">
            <div className="flex items-center gap-3.5">
              <div>
                <h3 className="relative min-w-22.5 pt-2">
                  {formatDateWithDay(new Date(data.effectiveDate))}
                  <span className="absolute -top-1.5 left-0 text-xs text-foreground/70">
                    {formatYY(new Date(data.effectiveDate))}年
                  </span>
                </h3>
              </div>
              <p className="text-sm">開始</p>
              <p className="font-bold text-lg">{data.targetKcal}kcal</p>
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

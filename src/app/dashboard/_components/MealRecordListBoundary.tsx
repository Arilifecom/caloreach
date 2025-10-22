"use client";

import { ErrorFallback, MealRecordLists } from "@/app/dashboard/_components/";
import { Loading } from "@/components";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { memo, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type RegularFoodSelectorProps = {
  userId: string;
};

const Component = ({ userId }: RegularFoodSelectorProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loading />}>
            <MealRecordLists userId={userId} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

const MealRecordListBoundary = memo(Component);
export { MealRecordListBoundary };

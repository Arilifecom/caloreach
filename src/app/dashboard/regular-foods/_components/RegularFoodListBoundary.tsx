"use client";

import { ErrorFallback } from "@/app/dashboard/_components/";
import { RegularFoodLists } from "@/app/dashboard/regular-foods/_components/RegularFoodLists";
import { Loading } from "@/components";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { memo, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type RegularFoodListBoundaryProps = {
  userId: string;
};

const Component = ({ userId }: RegularFoodListBoundaryProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loading />}>
            <RegularFoodLists userId={userId} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

const RegularFoodListBoundary = memo(Component);
export { RegularFoodListBoundary };

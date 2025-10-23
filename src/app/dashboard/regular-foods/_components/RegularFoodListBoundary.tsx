"use client";

import { ErrorFallback } from "@/app/dashboard/_components/";
import { RegularFoodForm } from "@/app/dashboard/regular-foods/_components/RegularFoodForm";
import { RegularFoodLists } from "@/app/dashboard/regular-foods/_components/RegularFoodLists";
import { Loading } from "@/components";
import { Button } from "@/components/ui";
import { useWindowControl } from "@/hooks";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { memo, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type RegularFoodListBoundaryProps = {
  userId: string;
};

const Component = ({ userId }: RegularFoodListBoundaryProps) => {
  const { isFormOpen, handleInputFormWindow } = useWindowControl();
  return (
    <>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Loading />}>
              <RegularFoodLists userId={userId} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <Button
        onClick={handleInputFormWindow}
        className="w-14 h-14 fixed bottom-24 right-4 md:right-[calc(50%-200px)]"
      >
        <PlusIcon />
      </Button>
      <RegularFoodForm
        userId={userId}
        isFormOpen={isFormOpen}
        handleInputFormWindow={handleInputFormWindow}
        mode="add"
      />
    </>
  );
};

const RegularFoodListBoundary = memo(Component);
export { RegularFoodListBoundary };

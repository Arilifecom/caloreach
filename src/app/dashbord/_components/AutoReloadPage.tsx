"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { differenceInMilliseconds, addDays, startOfDay } from "date-fns";

export const AutoReloadPage = () => {
  const router = useRouter();

  useEffect(() => {
    const now = new Date();
    const nextDay = addDays(startOfDay(now), 1);
    const timeUntilTomorrow = differenceInMilliseconds(nextDay, now);

    const timer = setTimeout(() => {
      router.refresh();
    }, timeUntilTomorrow);

    return () => clearTimeout(timer);
  }, [router]);

  return null;
};

import { LoaderIcon } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <LoaderIcon className="animate-spin" />
    </div>
  );
};

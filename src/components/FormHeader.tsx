"use client";

import { CloseIcon } from "@/components/icons";
import {
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { memo } from "react";

interface FormHeaderProps {
  title: string;
  description?: string;
  handleClose: () => void;
}

function Component({ title, description, handleClose }: FormHeaderProps) {
  return (
    <CardHeader className="flex justify-between mb-8">
      <div className="flex flex-col gap-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      <CardAction>
        <button
          onClick={() => handleClose()}
          className="text-black hover:text-red-500"
        >
          <CloseIcon className="w-4 h-4" />
        </button>
      </CardAction>
    </CardHeader>
  );
}

const FormHeader = memo(Component);

export { FormHeader };

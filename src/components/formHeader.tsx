import { CloseiIcon } from "@/components/icons/closeiIcon";
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
  // handleClose: ()=> void;
}
const handleClose = () => {
  console.log("閉じるクリック");
};

function Component({ title, description }: FormHeaderProps) {
  return (
    <CardHeader className="flex justify-between">
      <div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      <CardAction>
        <button
          onClick={() => handleClose()}
          className="text-black hover:text-red-500"
        >
          <CloseiIcon className="w-4 h-4" />
        </button>
      </CardAction>
    </CardHeader>
  );
}

const FormHeader = memo(Component);

export { FormHeader };

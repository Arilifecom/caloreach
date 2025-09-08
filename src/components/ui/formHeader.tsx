import {
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CloseiIcon } from "@/components/ui/icons";

interface FormHeaderProps {
  title: string;
  description?: string;
  // handleClose: ()=> void;
}
const handleClose = () => {
  console.log("閉じるクリック");
};

function FormHeader({ title, description }: FormHeaderProps) {
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

export { FormHeader };

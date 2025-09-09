import { memo } from "react";

interface IconLabelButtonProps {
  icon: React.ReactNode;
  label: string;
  // onClick?: () => void;
}

function Component({
  icon,
  label,
}: // onClick,
IconLabelButtonProps) {
  return (
    <div className="relative grid w-32 h-28 place-items-center bg-background rounded-lg border-2 border-foreground hover:bg-primary-foreground/98">
      <button
        // onClick={onClick}
        className="flex flex-col items-center justify-center space-y-1"
      >
        {icon}
        <span className="text-[12px] font-bold">{label}</span>
      </button>
      <div className="absolute top-1 -right-1.5 -z-10 w-[100%] h-[102%] rounded-lg bg-foreground" />
    </div>
  );
}

const IconLabelButton = memo(Component);

export { IconLabelButton };

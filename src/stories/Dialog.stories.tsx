import { Button, CardWithShadow } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

const meta = {
  title: "Component/ui/Dialog",
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
shadcn ベースのダイアログの基礎コンポーネント

使用箇所
- `DashboardHeader`
- `MealRecordForm`
- `RegularFoodForm`
- `TargetKcalPlanForm`

など、フォームをモーダル化する画面で使用
**/
export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button>開く</Button>
        </DialogTrigger>
        <DialogContent>
          <CardWithShadow>
            <DialogHeader>
              <DialogTitle>タイトル</DialogTitle>
              <DialogDescription>ディスクプリション</DialogDescription>
            </DialogHeader>
            <div className="px-6">ここにフォームやコンテンツが入ります</div>
          </CardWithShadow>
        </DialogContent>
      </Dialog>
    );
  },
};

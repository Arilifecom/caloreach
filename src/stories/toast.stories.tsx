import { Button, Toaster } from "@/components/ui";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { toast } from "sonner";

type ToasterStoryArgs = {
  variant: "success" | "error" | "warning" | "info" | "loading";
  title: string;
};

const meta: Meta<ToasterStoryArgs> = {
  title: "Component/ui/Toaster",
  argTypes: {
    title: { control: "text" },
    variant: {
      control: "radio",
      options: ["success", "error", "warning", "info", "loading"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * グローバル通知レイヤー（`shadcn/ui` の Toaster）。
 * - 内部サーバーエラーや例外発生時の通知表示に利用
 * - `<Layout>` 配下に `<Toaster />` を1度だけ設置
 * - 各コンポーネントから `toast.*()` で発火（現在はerror使用のみ）
 *
 * 想定運用:
 * - API/内部エラーは `toast.error(message)`
 */

export const Playground: Story = {
  args: {
    variant: "success",
    title: "タイトル",
  },
  render: ({ variant, title }) => (
    <>
      <Button onClick={() => toast[variant](title)}>発火</Button>
      <Toaster />
    </>
  ),
};

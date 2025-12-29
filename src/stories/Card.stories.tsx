import {
  Button,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardWithShadow,
} from "@/components/ui";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Component/ui/Card",
  component: CardWithShadow,
  argTypes: {
    className: { control: "text" },
    children: { control: "text" },
  },
} satisfies Meta<typeof CardWithShadow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cardbase: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>タイトル</CardTitle>
          <CardDescription>説明分がここに入ります</CardDescription>
        </CardHeader>
        <CardContent>ここにメインコンテンツを配置します</CardContent>
        <CardFooter>
          <CardAction>
            <Button>ボタンテキスト</Button>
          </CardAction>
        </CardFooter>
      </>
    ),
  },
};

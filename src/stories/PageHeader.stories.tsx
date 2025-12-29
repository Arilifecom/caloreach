import { PageHeader } from "@/components";
import { CardHeader, CardWithShadow } from "@/components/ui";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

/**
`shadcn`の`CardTitle`と`CardDescription`をベースに作られた見出しコンポーネントです。<br>
ページやセクションのタイトルと説明文をまとめて表示できます。<br>

**/
const meta = {
  title: "Component/PageHeader",
  component: PageHeader,
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    variant: {
      control: "radio",
      options: ["default", "small", "large"],
    },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
デフォルトサイズ
**/
export const Default: Story = {
  args: {
    title: "サンプルタイトル",
    description: "サンプル説明文です。改行も可能です。",
    variant: "default",
  },
  render: ({ title, description, variant }) => (
    <CardWithShadow className="w-lg">
      <CardHeader>
        <PageHeader variant={variant} title={title} description={description} />
      </CardHeader>
    </CardWithShadow>
  ),
};

/**
スモールサイズ
**/
export const Small: Story = {
  args: {
    title: "サンプルタイトル",
    description: "サンプル説明文です。改行も可能です。",
    variant: "small",
  },
  render: ({ title, description, variant }) => (
    <CardWithShadow className="w-lg">
      <CardHeader>
        <PageHeader variant={variant} title={title} description={description} />
      </CardHeader>
    </CardWithShadow>
  ),
};

/**
ラージサイズ
**/
export const Large: Story = {
  args: {
    title: "サンプルタイトル",
    description: "サンプル説明文です。改行も可能です。",
    variant: "large",
  },
  render: ({ title, description, variant }) => (
    <CardWithShadow className="w-lg">
      <CardHeader>
        <PageHeader variant={variant} title={title} description={description} />
      </CardHeader>
    </CardWithShadow>
  ),
};

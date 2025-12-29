import { Button } from "@/components/ui";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Component/ui/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "dark", "outline", "destructive", "link"],
    },
    size: { control: "select", options: ["sm", "default", "lg", "icon"] },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
};

export const Dark: Story = {
  args: {
    children: "Button",
    variant: "dark",
    size: "default",
  },
};

export const Outline: Story = {
  args: {
    children: "Button",
    variant: "outline",
    size: "default",
  },
};

export const Link: Story = {
  args: {
    children: "Button",
    variant: "link",
    size: "default",
  },
};

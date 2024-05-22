import type { Meta, StoryObj } from "@storybook/react";
import Button from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: "Main/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: {
      control: "color",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    variant: "primary",
    withBorder: true,
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    small: true,
    children: "Button",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    variant: "error",
  },
};

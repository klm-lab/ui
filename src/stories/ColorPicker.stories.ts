import type { Meta, StoryObj } from "@storybook/react";

import { ColorPicker } from "../components/ColorPicker";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta = {
  title: "UI/ColorPicker",
  component: ColorPicker
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Picker: Story = {
  args: {
    // height: 600,
    // width: 600
  }
};

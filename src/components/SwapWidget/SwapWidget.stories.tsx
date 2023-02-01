import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SwapWidget from "./SwapWidget";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Llamaswap/SwapWidget",
  component: SwapWidget,
} as ComponentMeta<typeof SwapWidget>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SwapWidget> = (args) => (
  <SwapWidget {...args} />
);

export const HelloWorld = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HelloWorld.args = {
  label: "Hello world!",
};

export const ClickMe = Template.bind({});
ClickMe.args = {
  label: "Click me!",
};

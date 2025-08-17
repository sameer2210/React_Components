// src/components/InputField/InputField.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import InputField from "./InputField";

//  Extract props directly from InputField
type InputFieldProps = React.ComponentProps<typeof InputField>;

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],

  argTypes: {
    variant: {
      control: "select",
      options: ["outlined", "filled", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    type: {
      control: "select",
      options: ["text", "password", "email"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof InputField>;

// Controlled wrapper with correct typing
const Controlled = (args: InputFieldProps) => {
  const [value, setValue] = useState("");
  return (
    <InputField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

// ---------- Stories ----------

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Name",
    placeholder: "Enter your name",
    variant: "outlined",
    size: "md",
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <Controlled {...args} label="Outlined" variant="outlined" />
      <Controlled {...args} label="Filled" variant="filled" />
      <Controlled {...args} label="Ghost" variant="ghost" />
    </div>
  ),
  args: { placeholder: "Type here..." },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <Controlled {...args} label="Small" size="sm" />
      <Controlled {...args} label="Medium" size="md" />
      <Controlled {...args} label="Large" size="lg" />
    </div>
  ),
  args: { placeholder: "Type here..." },
};

export const WithHelperAndError: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <Controlled
        {...args}
        label="With helper text"
        helperText="This is helper text"
      />
      <Controlled
        {...args}
        label="With error"
        invalid
        errorMessage="Something went wrong"
      />
    </div>
  ),
  args: { placeholder: "Enter text..." },
};

export const PasswordAndLoading: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <Controlled {...args} label="Password" type="password" clearable />
      <Controlled {...args} label="Loading state" loading />
    </div>
  ),
};

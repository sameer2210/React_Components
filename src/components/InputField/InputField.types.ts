import React from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "outlined" | "filled" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password" | "email";
  loading?: boolean;
  clearable?: boolean;
  required?: boolean;
}

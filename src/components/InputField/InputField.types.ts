
import React from "react";

// Props (what options your component accepts)
export interface InputFieldProps {
  value?: string; // input value
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // when typing
  label?: string; // label text
  placeholder?: string; // placeholder text
  helperText?: string; // small info text
  errorMessage?: string; // show error if invalid
  disabled?: boolean; // disable input
  invalid?: boolean; // mark as invalid
  variant?: "filled" | "outlined" | "ghost"; // input styles
  size?: "sm" | "md" | "lg"; // input size
  type?: "text" | "password"; // normal or password
  loading?: boolean; // show loading spinner
  clearable?: boolean; // show clear button
}

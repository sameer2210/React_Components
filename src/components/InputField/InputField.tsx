// src/components/InputField/InputField.tsx
import React, { useState, useId } from "react";
import { X, Eye, EyeOff, Loader2 } from "lucide-react";
import type { InputFieldProps } from "./InputField.types";

const InputField: React.FC<InputFieldProps> = ({
  value = "",
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
  type = "text",
  loading = false,
  clearable = false,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputId = useId();

  // Size classes
  const sizeStyles = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-base",
    lg: "h-13 px-5 text-lg",
  };

  // Variant styles
  const getVariantStyles = () => {
    const base =
      "w-full rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2";

    if (disabled) {
      return `${base} bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400 cursor-not-allowed`;
    }
    if (invalid) {
      return `${base} bg-red-50 dark:bg-red-900/30 border-red-400 text-red-700 dark:text-red-300 focus:ring-red-500/50`;
    }

    switch (variant) {
      case "filled":
        return `${base} bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-blue-500/30 text-gray-900 dark:text-gray-100`;
      case "ghost":
        return `${base} bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-blue-500/30 text-gray-900 dark:text-gray-100`;
      default: // outlined
        return `${base} bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 focus:ring-blue-500/30 text-gray-900 dark:text-gray-100 ${
          isFocused ? "shadow-md border-blue-500 dark:border-blue-400" : ""
        }`;
    }
  };

  const handleClear = () => {
    onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={`block mb-2 text-sm font-medium ${
            invalid
              ? "text-red-600 dark:text-red-400"
              : "text-gray-800 dark:text-gray-200"
          } ${required ? "after:content-['*'] after:ml-1 after:text-red-500" : ""}`}
        >
          {label}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative">
        <input
          id={inputId}
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled || loading}
          required={required}
          className={`${getVariantStyles()} ${sizeStyles[size]} ${
            (clearable && value) || type === "password" || loading ? "pr-12" : ""
          } placeholder-gray-400 dark:placeholder-gray-500`}
          aria-invalid={invalid}
          aria-describedby={
            invalid && errorMessage
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
        />

        {/* Right side icons */}
        {((clearable && value) || type === "password" || loading) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {loading && <Loader2 className="h-4 w-4 animate-spin text-blue-500" />}

            {clearable && value && !loading && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear input"
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {type === "password" && !loading && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Helper or error message */}
      {invalid && errorMessage ? (
        <p
          id={`${inputId}-error`}
          className="mt-1 text-sm text-red-600 dark:text-red-400"
        >
          {errorMessage}
        </p>
      ) : helperText ? (
        <p
          id={`${inputId}-helper`}
          className="mt-1 text-sm text-gray-500 dark:text-gray-400"
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

export default InputField;

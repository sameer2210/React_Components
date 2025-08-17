import React, { useState } from "react";
import type { InputFieldProps } from "./InputField.types";
import { X, Eye, EyeOff } from "lucide-react";

// Size styles
const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

// Variant styles
const variantClasses = {
  filled: "bg-gray-100 border border-transparent focus:border-blue-500",
  outlined: "border border-gray-300 focus:border-blue-500",
  ghost: "border border-transparent focus:border-blue-500",
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
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
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Generate an id for accessibility
  const inputId = label ? label.replace(/\s+/g, "-").toLowerCase() : undefined;

  return (
    <div className="w-full flex flex-col gap-1">
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium">
          {label}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative flex items-center">
        <input
          id={inputId}
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          aria-invalid={invalid}
          aria-disabled={disabled}
          className={`w-full rounded-lg transition 
            ${sizeClasses[size]} 
            ${variantClasses[variant]} 
            ${invalid ? "border-red-500 focus:border-red-500" : ""} 
            ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
        />

        {/* Right-side controls (loading, clear, password toggle) */}
        <div className="absolute right-2 flex items-center gap-2">
          {/* Loading */}
          {loading && <span className="animate-spin">⏳</span>}

          {/* Clear button */}
          {clearable && value && (
            <button
              type="button"
              aria-label="Clear input"
              onClick={() =>
                onChange?.({
                  target: { value: "" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              className="text-gray-500 hover:text-black"
            >
              <X size={16} />
            </button>
          )}

          {/* Password toggle */}
          {type === "password" && (
            <button
              type="button"
              aria-label="Toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-black"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
      </div>

      {/* Helper & Error text */}
      {!invalid && helperText && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
      {invalid && errorMessage && (
        <p className="text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;

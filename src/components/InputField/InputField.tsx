// src/components/InputField/InputField.tsx
import React, { useState } from 'react';
import { X, Eye, EyeOff, Loader2 } from 'lucide-react';
import type { InputFieldProps } from './InputField.types';

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  loading = false,
  clearable = false,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
  
  // Simple size mapping
  const sizeStyles = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-3 text-base',
    lg: 'h-12 px-4 text-lg'
  };

  // Clean variant styles with dark mode support
  const getVariantStyles = () => {
    const baseStyles = 'w-full rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20';
    
    if (disabled) {
      return `${baseStyles} bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed`;
    }
    
    if (invalid) {
      return `${baseStyles} bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-600 text-red-900 dark:text-red-300 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500/20`;
    }

    switch (variant) {
      case 'filled':
        return `${baseStyles} bg-gray-100 dark:bg-gray-800 border-gray-100 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-900 focus:border-blue-500 text-gray-900 dark:text-gray-100`;
      case 'ghost':
        return `${baseStyles} bg-transparent dark:bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 text-gray-900 dark:text-gray-100`;
      default: // outlined
        return `${baseStyles} bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 focus:border-blue-500 text-gray-900 dark:text-gray-100 ${isFocused ? 'border-blue-500' : ''}`;
    }
  };

  const handleClear = () => {
    if (onChange) {
      onChange({
        target: { value: '' }
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label 
          htmlFor={inputId}
          className={`block mb-1.5 text-sm font-medium ${
            invalid ? 'text-red-700 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
          } ${required ? "after:content-['*'] after:text-red-500 after:ml-1" : ''}`}
        >
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        <input
          id={inputId}
          type={type === 'password' && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled || loading}
          required={required}
          className={`${getVariantStyles()} ${sizeStyles[size]} ${
            (clearable && value) || type === 'password' || loading ? 'pr-10' : ''
          } placeholder-gray-400 dark:placeholder-gray-500`}
          aria-invalid={invalid}
          aria-describedby={
            (invalid && errorMessage) ? `${inputId}-error` : 
            helperText ? `${inputId}-helper` : undefined
          }
        />

        {/* Right Icons */}
        {((clearable && value) || type === 'password' || loading) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {loading && (
              <Loader2 className="h-4 w-4 text-gray-400 dark:text-gray-500 animate-spin" />
            )}
            
            {clearable && value && !loading && (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Clear input"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            
            {type === 'password' && !loading && (
              <button
                type="button"
                onClick={togglePassword}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Helper/Error Text */}
      {invalid && errorMessage ? (
        <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

export default InputField;
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
  
  // Modern size mapping with better spacing
  const sizeStyles = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-4 text-base',
    lg: 'h-13 px-5 text-lg'
  };

  // Clean variant styles with proper dark mode support
  const getVariantStyles = () => {
    const baseStyles = 'w-full rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0';
    
    if (disabled) {
      return `${baseStyles} bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-60`;
    }
    
    if (invalid) {
      return `${baseStyles} bg-red-50 dark:bg-red-950/50 border-red-300 dark:border-red-500 text-red-900 dark:text-red-100 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500/20 shadow-sm`;
    }

    switch (variant) {
      case 'filled':
        return `${baseStyles} bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 focus:bg-white dark:focus:bg-gray-800 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-gray-100 shadow-sm`;
      case 'ghost':
        return `${baseStyles} bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/70 focus:border-gray-300 dark:focus:border-gray-600 focus:bg-white dark:focus:bg-gray-800 text-gray-900 dark:text-gray-100`;
      default: // outlined
        return `${baseStyles} bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-gray-100 shadow-sm hover:shadow-md focus:shadow-lg ${isFocused ? 'border-blue-500 dark:border-blue-400 shadow-lg' : ''}`;
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
          className={`block mb-2 text-sm font-semibold transition-colors ${
            invalid ? 'text-red-700 dark:text-red-400' : 'text-gray-800 dark:text-gray-200'
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
            (clearable && value) || type === 'password' || loading ? 'pr-12' : ''
          } placeholder-gray-500 dark:placeholder-gray-400 font-medium`}
          aria-invalid={invalid}
          aria-describedby={
            (invalid && errorMessage) ? `${inputId}-error` : 
            helperText ? `${inputId}-helper` : undefined
          }
        />

        {/* Right Icons */}
        {((clearable && value) || type === 'password' || loading) && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {loading && (
              <Loader2 className="h-4 w-4 text-blue-500 dark:text-blue-400 animate-spin" />
            )}
            
            {clearable && value && !loading && (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                aria-label="Clear input"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            
            {type === 'password' && !loading && (
              <button
                type="button"
                onClick={togglePassword}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
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
        <p id={`${inputId}-error`} className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full"></span>
          {errorMessage}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-helper`} className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

export default InputField;
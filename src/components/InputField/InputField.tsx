import React, { useState, useRef } from 'react';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Loader2 } from 'lucide-react';
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
  clearable = false,
  togglePassword = false,
  loading = false,
  className = '',
  id,
  name,
  autoComplete,
  autoFocus = false,
  readOnly = false,
  required = false,
  maxLength,
  minLength,
  pattern,
  onFocus,
  onBlur,
  onKeyDown,
  onClear,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputType = togglePassword && type === 'password' 
    ? (showPassword ? 'text' : 'password')
    : type;

  const hasError = invalid || !!errorMessage;
  const hasValue = value.length > 0;
  const showLabel = label && (focused || hasValue || placeholder);

  // Size configurations
  const sizeClasses = {
    sm: {
      input: 'h-9 px-3 text-sm',
      label: 'text-xs px-3',
      icon: 'w-4 h-4',
      text: 'text-xs'
    },
    md: {
      input: 'h-11 px-4 text-sm',
      label: 'text-sm px-4',
      icon: 'w-5 h-5',
      text: 'text-sm'
    },
    lg: {
      input: 'h-12 px-4 text-base',
      label: 'text-sm px-4',
      icon: 'w-5 h-5',
      text: 'text-sm'
    }
  };

  // Variant configurations
  const variantClasses = {
    outlined: {
      container: 'border-2 bg-transparent',
      normal: 'border-gray-300 dark:border-gray-600',
      focused: 'border-blue-500 dark:border-blue-400 ring-4 ring-blue-500/10',
      error: 'border-red-500 dark:border-red-400 ring-4 ring-red-500/10',
      disabled: 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
    },
    filled: {
      container: 'border border-transparent bg-gray-100 dark:bg-gray-800',
      normal: 'hover:bg-gray-150 dark:hover:bg-gray-750',
      focused: 'bg-white dark:bg-gray-900 border-blue-500 dark:border-blue-400 ring-4 ring-blue-500/10',
      error: 'bg-red-50 dark:bg-red-950/50 border-red-500 dark:border-red-400 ring-4 ring-red-500/10',
      disabled: 'bg-gray-100 dark:bg-gray-800 opacity-60'
    },
    ghost: {
      container: 'border-0 bg-transparent',
      normal: 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
      focused: 'bg-white dark:bg-gray-900 ring-2 ring-blue-500/20',
      error: 'bg-red-50 dark:bg-red-950/50 ring-2 ring-red-500/20',
      disabled: 'opacity-60'
    }
  };

  const currentSize = sizeClasses[size];
  const currentVariant = variantClasses[variant];

  // Build input classes
  const inputClasses = [
    'w-full outline-none transition-all duration-200 ease-in-out bg-transparent',
    'placeholder:text-gray-600 dark:placeholder:text-gray-300',
    'text-gray-900 dark:text-gray-100',
    'disabled:cursor-not-allowed disabled:opacity-60',
    currentSize.input
  ].join(' ');

  // Build container classes
  const containerClasses = [
    'relative rounded-lg transition-all duration-200 ease-in-out',
    currentVariant.container,
    disabled 
      ? currentVariant.disabled
      : hasError
      ? currentVariant.error
      : focused
      ? currentVariant.focused
      : currentVariant.normal,
    className
  ].join(' ');

  // Build label classes
  const labelClasses = [
    'absolute left-0 pointer-events-none transition-all duration-200 ease-in-out z-10',
    'text-gray-500 dark:text-gray-400',
    currentSize.label,
    showLabel
      ? 'top-0 -translate-y-1/2 bg-slate-900 px-2 mx-2 text-xs font-medium scale-90'
      : `top-1/2 -translate-y-1/2 ${currentSize.text}`
  ].join(' ');

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  const handleClear = () => {
    if (onChange) {
      onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    }
    onClear?.();
    inputRef.current?.focus();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full space-y-1">
      <div className={containerClasses}>
        {/* Floating Label */}
        {label && (
          <label 
            htmlFor={id}
            className={labelClasses}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Input */}
        <input
          ref={inputRef}
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={onKeyDown}
          placeholder={showLabel ? placeholder : ''}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={inputClasses}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          {...props}
        />

        {/* Right side icons */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {loading && (
            <Loader2 className={`${currentSize.icon} text-gray-400 animate-spin`} />
          )}
          
          {clearable && hasValue && !disabled && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              tabIndex={-1}
            >
              <XMarkIcon className={currentSize.icon} />
            </button>
          )}

          {togglePassword && type === 'password' && !loading && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeSlashIcon className={currentSize.icon} />
              ) : (
                <EyeIcon className={currentSize.icon} />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Helper/Error Text */}
      {(helperText || errorMessage) && (
        <div className="px-1 animate-slide-up">
          {hasError ? (
            <p 
              id={`${id}-error`}
              className={`${currentSize.text} text-red-500 dark:text-red-400 flex items-center gap-1`}
            >
              <span className="inline-block w-1 h-1 bg-current rounded-full"></span>
              {errorMessage}
            </p>
          ) : (
            <p 
              id={`${id}-helper`}
              className={`${currentSize.text} text-gray-500 dark:text-gray-400`}
            >
              {helperText}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default InputField;
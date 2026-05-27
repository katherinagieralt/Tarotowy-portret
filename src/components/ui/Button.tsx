'use client';

import React, { forwardRef } from 'react';

/**
 * Piny-compatible Button component
 * - Uses forwardRef for direct DOM access
 * - Has displayName for Piny recognition
 * - Clean Tailwind classes for Piny tracking
 * - Supports all standard HTML button attributes
 */

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Define variant styles
    const variantStyles = {
      primary:
        'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white border border-blue-600',
      secondary:
        'bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-900 border border-gray-300',
      danger:
        'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white border border-red-600',
      ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200 border border-transparent',
    };

    // Define size styles
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    // Combine all classes
    const baseClasses =
      'font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';

    const finalClassName = [
      baseClasses,
      variantStyles[variant],
      sizeStyles[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={finalClassName}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button'; // Critical for Piny to recognize the component

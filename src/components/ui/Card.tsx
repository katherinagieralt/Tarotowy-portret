'use client';

import React, { forwardRef } from 'react';

/**
 * Piny-compatible Card component
 * - Wrapper component for consistent styling
 * - Fully Tailwind-based
 * - Supports responsive padding and border
 */

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'outlined' | 'ghost';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'elevated', className, children, ...props }, ref) => {
    const variantStyles = {
      elevated: 'bg-white border border-gray-200 shadow-md hover:shadow-lg',
      outlined: 'bg-white border-2 border-gray-300 shadow-none',
      ghost: 'bg-gray-50 border border-gray-200 shadow-none',
    };

    const finalClassName = [
      'rounded-lg p-6 transition-shadow duration-200',
      variantStyles[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={finalClassName} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Card Header - for titles and descriptions
 */
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={['mb-4 pb-4 border-b border-gray-200', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

/**
 * Card Content - main content area
 */
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={['text-gray-700', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';

/**
 * Card Footer - for actions
 */
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={['mt-6 pt-4 border-t border-gray-200 flex gap-2', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';

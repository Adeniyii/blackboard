// button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import React, { ComponentProps } from 'react';

const button = cva('button', {
  variants: {
    intent: {
      primary:
        'bg-gray-700 text-gray-100 hover:bg-gray-600 focus:ring-gray-500',
      secondary:
        'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
      danger: 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500',
    },
    size: {
      sm: 'py-2 px-4 text-sm',
      md: 'py-2 px-6 text-md',
      lg: 'py-3 px-8 text-lg',
    },
  },
  // compoundVariants: [
  //   { intent: 'primary', size: 'medium', className: 'uppercase' },
  // ],
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
});

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  isLoading?: boolean;
}

export const Button = ({
  className,
  intent,
  size,
  children,
  startIcon,
  endIcon,
  isLoading = false,
  ...props
}: ComponentProps<'button'> & ButtonProps & IconProps) => (
  <button
    type="button"
    className={clsx(
      'flex leading-none items-center justify-center border border-transparent font-medium focus:outline-none focus:ring-2 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm',
      button({ intent, size, className })
    )}
    {...props}
  >
    {isLoading && '...'}
    {!isLoading && startIcon}
    <span className="mx-2">{children}</span> {!isLoading && endIcon}
  </button>
);

Button.displayName = 'Button';

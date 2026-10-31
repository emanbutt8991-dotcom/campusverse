import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'highlight' | 'success' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-uni-primary text-uni-onprimary hover:brightness-110 shadow-sm',
  highlight: 'bg-uni-highlight text-uni-onhighlight hover:brightness-105 shadow-sm',
  secondary: 'bg-white text-uni-ink border border-uni-border hover:bg-uni-soft',
  ghost: 'text-uni-ink hover:bg-uni-soft',
  success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
  danger: 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-50',
};
const SIZES: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  block?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', icon, block, className = '', children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`inline-flex select-none items-center justify-center whitespace-nowrap rounded-xl font-semibold transition duration-150 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 ${VARIANTS[variant]} ${SIZES[size]} ${block ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
});

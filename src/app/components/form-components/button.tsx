import * as React from "react";
import Loadingspinner from "../spinners/loadingspinner";

export const variants = {
  'primary': 'primary',
  'default': 'default',
  'success': 'success',
  'outline': 'outline',
  'ghost': 'ghost',
  'danger': 'danger',
};

const sizes = {
  'sm': 'sm',
  'md': 'md',
  'lg': 'lg',
  'xl': 'xl',
  'full': 'full',
  'auto': 'auto',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  children?: React.ReactNode;
  className?: string;
  processing?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = "default", size = "auto", ...props }, ref): React.JSX.Element => {
    return (
      <button
        ref={ref}
        disabled={props.disabled || props.processing}
        {...props}
        className={`button cursor-pointer text-center flex items-center justify-center gap-2 ${variants[variant]} ${sizes[size]} ${className}`}
      >
        {props.processing && <Loadingspinner className="!w-auto text-white !h-[3/4] !aspect-square" />}
        {children}
      </button>
    );
  }
);

export { Button };

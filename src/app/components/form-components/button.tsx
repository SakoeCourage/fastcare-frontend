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



// eslint-disable-next-line react/display-name
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = "default", size = "auto", ...props }, ref): React.JSX.Element => {
    return (
      <button
        ref={ref}
        disabled={props.disabled || props.processing}
        {...props}
        className={`button cursor-pointer min-h-10 text-center flex items-center justify-center gap-2  ${variants[variant]} ${sizes[size]} ${className}`}
      >
        {props.processing && <nav className="button-processingloader"> </nav>}
        {!props.processing && children}
      </button>
    );
  }
);

export { Button };

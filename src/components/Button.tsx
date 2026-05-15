import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import type { AgenticBaseProps } from '../types/agentic';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>,
  AgenticBaseProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      agentContext,
      agentId,
      disabled,
      className,
      children,
      onAgentMutate,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    const variantStyles: Record<string, string> = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400',
      danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
    };

    const sizeStyles: Record<string, string> = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const baseStyles =
      'font-medium rounded transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';

    const disabledStyles = isDisabled
      ? 'opacity-60 grayscale cursor-not-allowed pointer-events-none'
      : 'cursor-pointer';

    const finalClassName = `${baseStyles} ${variantStyles[variant] || ''} ${sizeStyles[size] || ''} ${disabledStyles} ${className || ''}`.trim();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onAgentMutate && agentContext) {
        onAgentMutate(agentContext);
      }
      props.onClick?.(e);
    };

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={finalClassName}
        data-agent-id={agentId}
        data-agent-context={agentContext ? JSON.stringify(agentContext) : undefined}
        onClick={handleClick}
        {...props}
      >
        <div className="flex items-center justify-center gap-2">
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          <span>{children}</span>
        </div>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

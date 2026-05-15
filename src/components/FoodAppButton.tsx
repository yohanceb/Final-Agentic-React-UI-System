import React, { forwardRef } from 'react';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import type { AgenticBaseProps } from '../types/agentic';

export type FoodAppButtonVariant =
  | 'primary' // Green - main actions (Book Order, etc)
  | 'secondary' // Yellow - secondary actions
  | 'agent-thinking' // Animated gradient - thinking state
  | 'error' // Red - error/danger actions
  | 'ghost'; // Transparent - tertiary actions

export interface FoodAppButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>,
  AgenticBaseProps {
  variant?: FoodAppButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  children?: React.ReactNode;
}

const FoodAppButton = forwardRef<HTMLButtonElement, FoodAppButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      isError = false,
      isSuccess = false,
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
    const isDisabled = disabled || isLoading || isError;

    const variantStyles: Record<FoodAppButtonVariant, string> = {
      primary:
        'bg-green-500 text-white hover:bg-green-600 active:bg-green-700 focus:ring-green-300',
      secondary:
        'bg-yellow-400 text-gray-900 hover:bg-yellow-500 active:bg-yellow-600 focus:ring-yellow-200',
      'agent-thinking':
        'bg-gradient-to-r from-green-500 via-green-400 to-green-500 text-white hover:from-green-600 hover:via-green-500 hover:to-green-600 animate-pulse',
      error:
        'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus:ring-red-300',
      ghost:
        'bg-transparent text-gray-700 border-2 border-gray-300 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-200',
    };

    const sizeStyles: Record<string, string> = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const baseStyles =
      'font-semibold rounded-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2';

    const disabledStyles = isDisabled
      ? 'opacity-60 cursor-not-allowed pointer-events-none'
      : 'cursor-pointer';

    const errorStyles = isError ? 'ring-2 ring-red-500 ring-offset-2' : '';

    const successStyles = isSuccess
      ? 'ring-2 ring-green-500 ring-offset-2'
      : '';

    const finalClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${errorStyles} ${successStyles} ${className || ''}`.trim();

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
        data-variant={variant}
        onClick={handleClick}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {isError && <AlertCircle className="h-4 w-4" />}
        {isSuccess && <CheckCircle className="h-4 w-4" />}
        <span>{children}</span>
      </button>
    );
  }
);

FoodAppButton.displayName = 'FoodAppButton';

export default FoodAppButton;

import React, { forwardRef } from 'react';
import type { AgenticBaseProps } from '../types/agentic';

export interface ToppingSelectorProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'onSelect'>,
  AgenticBaseProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isOutOfStock?: boolean;
  autoSelect?: boolean;
  onSelect?: (label: string) => void;
}

const ToppingSelector = forwardRef<HTMLButtonElement, ToppingSelectorProps>(
  (
    {
      icon,
      label,
      isActive = false,
      isOutOfStock = false,
      autoSelect = false,
      agentContext,
      agentId,
      disabled,
      className,
      onSelect,
      onAgentMutate,
      onClick,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isOutOfStock;

    const baseStyles =
      'group relative flex h-28 w-28 flex-col items-center justify-center rounded-3xl border text-center transition-all duration-200';

    const defaultStyles =
      'border-gray-200 bg-white/70 text-gray-700 shadow-sm backdrop-blur-sm hover:border-gray-300 hover:bg-white';

    const activeStyles =
      'border-green-600 bg-green-600 text-white shadow-[0_18px_40px_-20px_rgba(16,185,129,0.9)] transform-gpu hover:-translate-y-0.5';

    const disabledStyles =
      'border-gray-200 bg-slate-100 text-gray-400 opacity-50 cursor-not-allowed';

    const autoSelectStyles =
      'border-yellow-300 ring-2 ring-yellow-200/80 shadow-[0_0_0_8px_rgba(250,204,21,0.18)]';

    const finalStyles = `${baseStyles} ${isDisabled ? disabledStyles : isActive ? activeStyles : defaultStyles} ${autoSelect && !isDisabled ? autoSelectStyles : ''} ${className || ''}`.trim();

    const labelStyles = `mt-3 text-sm transition-all duration-200 ${isDisabled ? 'line-through' : isActive ? 'font-semibold' : 'font-medium'} ${isDisabled ? 'text-slate-400' : isActive ? 'text-white' : 'text-slate-700'}`;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }

      if (onAgentMutate && agentContext) {
        onAgentMutate({
          ...agentContext,
          action: 'topping_selected',
          topping: label,
          autoSelect,
          timestamp: Date.now(),
        });
      }

      if (onSelect) {
        onSelect(label);
      }

      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        className={finalStyles}
        data-agent-id={agentId}
        data-agent-context={agentContext ? JSON.stringify(agentContext) : undefined}
        data-auto-select={autoSelect}
        data-is-active={isActive}
        data-is-out-of-stock={isOutOfStock}
        onClick={handleClick}
        {...props}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl shadow-sm transition-all duration-200 group-hover:shadow-md">
          {icon}
        </div>
        <span className={labelStyles}>{label}</span>
      </button>
    );
  }
);

ToppingSelector.displayName = 'ToppingSelector';

export default ToppingSelector;

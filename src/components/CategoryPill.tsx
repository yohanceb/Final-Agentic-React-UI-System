import React, { forwardRef } from 'react';
import { Sparkles } from 'lucide-react';
import type { AgenticBaseProps } from '../types/agentic';

export interface CategoryPillProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'onSelect'>,
  AgenticBaseProps {
  /**
   * Icon to display in the container
   */
  icon: React.ReactNode;

  /**
   * Label text below the icon
   */
  label: string;

  /**
   * Whether this category is currently selected
   */
  isSelected?: boolean;

  /**
   * Whether this is an AI agent suggestion (shows gold shimmer border)
   */
  isSuggested?: boolean;

  /**
   * Callback when category is selected
   */
  onSelect?: (label: string) => void;

  /**
   * Children to render inside the component
   */
  children?: React.ReactNode;
}

/**
 * CategoryPill - Molecule Component
 * 
 * A vertical stacked category selector with icon and label.
 * Supports three states:
 * 1. Default: White background, gray colors
 * 2. Selected: Green background, bold text
 * 3. Agent-Suggested: Gold shimmering border
 * 
 * Used in food ordering apps for category navigation.
 */
const CategoryPill = forwardRef<HTMLButtonElement, CategoryPillProps>(
  (
    {
      icon,
      label,
      isSelected = false,
      isSuggested = false,
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
    // Icon container styles
    const iconContainerBaseStyles =
      'flex items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 relative';

    let iconContainerStyles = '';
    let labelStyles = '';

    // Default state
    if (!isSelected && !isSuggested) {
      iconContainerStyles =
        'bg-white border-2 border-gray-200 text-gray-600 hover:border-gray-300';
      labelStyles = 'text-gray-600';
    }
    // Selected state
    else if (isSelected) {
      iconContainerStyles =
        'bg-green-500 border-2 border-green-600 text-white shadow-lg hover:bg-green-600';
      labelStyles = 'text-gray-900 font-bold';
    }
    // Agent-Suggested state (with shimmering gold border)
    else if (isSuggested) {
      iconContainerStyles =
        'bg-white border-2 border-yellow-400 text-gray-600 hover:border-yellow-500 animate-pulse shadow-md';
      labelStyles = 'text-gray-600 font-medium';
    }

    const finalIconContainerClass = `${iconContainerBaseStyles} ${iconContainerStyles}`;

    const labelClass = `mt-3 text-center text-sm transition-all duration-300 ${labelStyles} ${
      disabled ? 'opacity-50' : ''
    }`;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      // Trigger agent mutation if available
      if (onAgentMutate && agentContext) {
        onAgentMutate({
          ...agentContext,
          action: 'category_selected',
          categoryLabel: label,
          isSuggested,
          timestamp: Date.now(),
        });
      }

      // Call the select handler
      if (onSelect) {
        onSelect(label);
      }

      // Call the original click handler
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
        } ${className || ''}`}
        data-agent-id={agentId}
        data-category={label}
        data-is-selected={isSelected}
        data-is-suggested={isSuggested}
        data-agent-context={
          agentContext ? JSON.stringify(agentContext) : undefined
        }
        onClick={handleClick}
        {...props}
      >
        {/* Icon Container */}
        <div className={finalIconContainerClass}>
          {/* Shimmering effect for suggested state */}
          {isSuggested && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-200/0 via-yellow-200/40 to-yellow-200/0 animate-shimmer pointer-events-none" />
          )}

          {/* Icon */}
          <span className="text-2xl relative z-10">{icon}</span>

          {/* Suggested badge */}
          {isSuggested && (
            <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
              <Sparkles className="h-3 w-3 text-yellow-900" />
            </div>
          )}
        </div>

        {/* Label */}
        <span className={labelClass}>{label}</span>
      </button>
    );
  }
);

CategoryPill.displayName = 'CategoryPill';

export default CategoryPill;

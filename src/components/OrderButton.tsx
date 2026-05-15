import React, { forwardRef, useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import type { AgenticBaseProps } from '../types/agentic';

export interface OrderButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>,
  AgenticBaseProps {
  /**
   * Callback fired when order is complete and ready for navigation
   * Called after success state is reached
   */
  onIntentComplete?: (context: {
    action: 'order_complete';
    timestamp: number;
    metadata?: Record<string, unknown>;
  }) => void;

  /**
   * Custom label for the button (default: "Book Order")
   */
  label?: string;

  /**
   * Metadata to pass in intent completion
   */
  metadata?: Record<string, unknown>;
}

/**
 * OrderButton - Emotion Design System Button Atom
 * 
 * A sophisticated order button with three distinct states:
 * 1. Default: Static green with "Book Order" label
 * 2. Agent-Loading: Pulse animation + Sparkles icon (agent calculating)
 * 3. Success: Dark green with checkmark + "Order Tracking"
 * 
 * Agentic Integration:
 * - Responds to AI agent actions
 * - Triggers onIntentComplete when order is confirmed
 * - Supports full state mutation via agentContext
 */
const OrderButton = forwardRef<HTMLButtonElement, OrderButtonProps>(
  (
    {
      onIntentComplete,
      agentContext,
      agentId,
      disabled,
      className,
      label = 'Book Order',
      metadata,
      onAgentMutate,
      onClick,
      ...props
    },
    ref
  ) => {
    const [state, setState] = useState<'default' | 'loading' | 'success'>(
      'default'
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      // Trigger agent mutation if available
      if (onAgentMutate && agentContext) {
        onAgentMutate({
          ...agentContext,
          action: 'order_initiated',
          timestamp: Date.now(),
        });
      }

      // Transition to loading state
      setState('loading');

      // Simulate agent processing (in real app, this would be triggered by agent)
      // Call the provided onClick handler first
      onClick?.(e);
    };

    // Base styles - always applied
    const baseStyles =
      'relative px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 flex items-center justify-center gap-3 overflow-hidden';

    // State-specific styles
    let stateStyles = '';
    let contentElement: React.ReactNode = null;

    if (state === 'default') {
      stateStyles =
        'bg-green-500 text-white hover:bg-green-600 active:scale-95 shadow-lg hover:shadow-xl';
      contentElement = (
        <>
          <span>🍕</span>
          <span>{label}</span>
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none rounded-2xl" />
        </>
      );
    } else if (state === 'loading') {
      stateStyles =
        'bg-green-500 text-white shadow-lg animate-pulse cursor-wait pointer-events-none';
      contentElement = (
        <>
          <Sparkles className="h-5 w-5 animate-spin text-white" />
          <span className="animate-pulse">Calculating...</span>
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none rounded-2xl" />
        </>
      );
    } else if (state === 'success') {
      stateStyles =
        'bg-green-700 text-white shadow-lg hover:bg-green-800 active:scale-95';
      contentElement = (
        <>
          <CheckCircle2 className="h-5 w-5 text-white animate-in spin-in duration-300" />
          <span>Order Tracking</span>
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none rounded-2xl" />
        </>
      );
    }

    const finalClassName = `${baseStyles} ${stateStyles} ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    } ${className || ''}`.trim();

    const handleStateTransition = (nextState: 'default' | 'loading' | 'success') => {
      setState(nextState);

      // If transitioning to success, trigger the intent complete callback
      if (nextState === 'success' && onIntentComplete) {
        onIntentComplete({
          action: 'order_complete',
          timestamp: Date.now(),
          metadata,
        });
      }
    };

    // Expose state transition methods via imperative handle
    React.useImperativeHandle(
      ref,
      () => ({
        setLoadingState: () => setState('loading'),
        setSuccessState: () => handleStateTransition('success'),
        setDefaultState: () => setState('default'),
        currentState: state,
      } as any),
      [state]
    );

    return (
      <button
        ref={ref}
        disabled={disabled || state === 'loading'}
        className={finalClassName}
        data-agent-id={agentId}
        data-order-state={state}
        data-agent-context={
          agentContext ? JSON.stringify(agentContext) : undefined
        }
        onClick={handleClick}
        {...props}
      >
        {contentElement}
      </button>
    );
  }
);

OrderButton.displayName = 'OrderButton';

export default OrderButton;

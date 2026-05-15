import React, { useState } from 'react';
import FoodAppButton from '../components/FoodAppButton';
import type { FoodAppButtonVariant } from '../components/FoodAppButton';

/**
 * Showcase component demonstrating all FoodAppButton variants and states
 */
export const FoodAppButtonShowcase: React.FC = () => {
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});
  const [successState, setSuccessState] = useState<Record<string, boolean>>({});

  const toggleLoading = (key: string) => {
    setLoadingState((prev) => ({ ...prev, [key]: !prev[key] }));
    setTimeout(() => {
      setLoadingState((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const toggleSuccess = (key: string) => {
    setSuccessState((prev) => ({ ...prev, [key]: !prev[key] }));
    setTimeout(() => {
      setSuccessState((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const variants: FoodAppButtonVariant[] = [
    'primary',
    'secondary',
    'agent-thinking',
    'error',
    'ghost',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            FoodApp Button Design System
          </h1>
          <p className="text-gray-600">
            Comprehensive showcase of button variants, sizes, and states
          </p>
        </div>

        {/* Variants Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Button Variants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {variants.map((variant) => (
              <div
                key={variant}
                className="bg-white rounded-lg p-8 shadow-md border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-4 capitalize">
                  {variant.replace('-', ' ')}
                </h3>
                <div className="space-y-3">
                  <FoodAppButton variant={variant}>
                    {variant === 'primary' && '🍕 Book Order'}
                    {variant === 'secondary' && '⭐ Rate Item'}
                    {variant === 'agent-thinking' && '🤖 Processing...'}
                    {variant === 'error' && '❌ Delete'}
                    {variant === 'ghost' && '📋 View More'}
                  </FoodAppButton>
                  <FoodAppButton variant={variant} disabled>
                    Disabled State
                  </FoodAppButton>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Size Variants */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Button Sizes
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-md border border-gray-200">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-16 text-sm font-medium text-gray-600">
                  Small
                </span>
                <FoodAppButton size="sm" variant="primary">
                  Book Order
                </FoodAppButton>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-16 text-sm font-medium text-gray-600">
                  Medium
                </span>
                <FoodAppButton size="md" variant="primary">
                  Book Order
                </FoodAppButton>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-16 text-sm font-medium text-gray-600">
                  Large
                </span>
                <FoodAppButton size="lg" variant="primary">
                  Book Order
                </FoodAppButton>
              </div>
            </div>
          </div>
        </section>

        {/* Loading States */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Loading States
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Primary Loading
              </h3>
              <FoodAppButton
                variant="primary"
                isLoading={loadingState['primary-loading']}
                onClick={() => toggleLoading('primary-loading')}
              >
                {loadingState['primary-loading'] ? 'Processing Order...' : 'Book Order'}
              </FoodAppButton>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Secondary Loading
              </h3>
              <FoodAppButton
                variant="secondary"
                isLoading={loadingState['secondary-loading']}
                onClick={() => toggleLoading('secondary-loading')}
              >
                {loadingState['secondary-loading'] ? 'Saving...' : 'Save Rating'}
              </FoodAppButton>
            </div>
          </div>
        </section>

        {/* Success States */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Success States
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Order Confirmed
              </h3>
              <FoodAppButton
                variant="primary"
                isSuccess={successState['order-success']}
                onClick={() => toggleSuccess('order-success')}
              >
                {successState['order-success'] ? 'Order Confirmed!' : 'Confirm Order'}
              </FoodAppButton>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Rating Saved
              </h3>
              <FoodAppButton
                variant="secondary"
                isSuccess={successState['rating-success']}
                onClick={() => toggleSuccess('rating-success')}
              >
                {successState['rating-success'] ? 'Rating Saved!' : 'Submit Rating'}
              </FoodAppButton>
            </div>
          </div>
        </section>

        {/* Error States */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Error States
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Dangerous Action
            </h3>
            <div className="space-y-3">
              <FoodAppButton variant="error">Cancel Order</FoodAppButton>
              <FoodAppButton variant="error" isError>
                Action Failed - Retry?
              </FoodAppButton>
            </div>
          </div>
        </section>

        {/* Agent-Thinking State */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Agent Thinking (Animated)
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-md border border-gray-200">
            <p className="text-gray-600 mb-4">
              This variant uses an animated gradient and pulsing effect to indicate
              AI processing
            </p>
            <div className="space-y-3">
              <FoodAppButton variant="agent-thinking">
                🤖 Finding Best Match...
              </FoodAppButton>
              <FoodAppButton variant="agent-thinking" size="lg">
                🚀 Optimizing Your Order...
              </FoodAppButton>
            </div>
          </div>
        </section>

        {/* Agentic Context Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Agentic Props Example
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-md border border-gray-200">
            <p className="text-gray-600 mb-6">
              Buttons can be configured with agentic properties for AI agent
              manipulation
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <pre className="text-sm text-gray-700 overflow-x-auto font-mono">
{`<FoodAppButton
  variant="primary"
  agentId="book-pizza-order"
  agentContext={{
    action: 'book_order',
    itemId: 'pizza-01',
    quantity: 2
  }}
  onAgentMutate={(ctx) => console.log(ctx)}
>
  Book Pizza
</FoodAppButton>`}
                </pre>
              </div>
              <FoodAppButton
                variant="primary"
                agentId="book-pizza-order"
                agentContext={{
                  action: 'book_order',
                  itemId: 'pizza-01',
                  quantity: 2,
                }}
                onAgentMutate={(ctx) => {
                  console.log('Agent mutation triggered:', ctx);
                }}
              >
                📦 Book Pizza with Agent Context
              </FoodAppButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FoodAppButtonShowcase;

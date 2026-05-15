import React, { useState, useRef } from 'react';
import OrderButton from '../components/OrderButton';
import type OrderButtonType from '../components/OrderButton';

interface OrderButtonHandle {
  setLoadingState: () => void;
  setSuccessState: () => void;
  setDefaultState: () => void;
  currentState: string;
}

/**
 * OrderButton Interactive Showcase
 * Demonstrates the Emotion Design System OrderButton with all states and agentic capabilities
 */
export const OrderButtonShowcase: React.FC = () => {
  const orderButtonRef = useRef<any>(null);
  const [orderState, setOrderState] = useState<'default' | 'loading' | 'success'>(
    'default'
  );
  const [intentLog, setIntentLog] = useState<string[]>([]);

  // Simulated agent flow
  const simulateAgentFlow = async () => {
    setOrderState('loading');
    addLog('🤖 Agent: Processing order...');

    // Simulate calculation time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    addLog('✓ Agent: Calculations complete, delivery confirmed');
    setOrderState('success');
  };

  const addLog = (message: string) => {
    setIntentLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] ${message}`,
    ]);
  };

  const handleIntentComplete = (context: {
    action: string;
    timestamp: number;
    metadata?: Record<string, unknown>;
  }) => {
    addLog(`✓ Intent Complete: ${context.action}`);
    addLog(
      `📍 Timestamp: ${new Date(context.timestamp).toLocaleTimeString()}`
    );
  };

  const resetOrder = () => {
    setOrderState('default');
    setIntentLog([]);
    addLog('🔄 Order reset to default state');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            🍕 OrderButton Component
          </h1>
          <p className="text-xl text-green-200">
            Emotion Design System Integration with Agentic Capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Demo Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-semibold text-white mb-8">
                Interactive Demo
              </h2>

              {/* States Overview */}
              <div className="bg-white/5 rounded-xl p-6 mb-8 border border-white/10">
                <h3 className="text-lg font-semibold text-green-300 mb-4">
                  Button States
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div
                    className={`p-4 rounded-lg transition-all ${
                      orderState === 'default'
                        ? 'bg-green-500 text-white ring-2 ring-green-300'
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    <div className="text-sm font-medium">Default</div>
                    <div className="text-xs mt-1">Static Green</div>
                  </div>
                  <div
                    className={`p-4 rounded-lg transition-all ${
                      orderState === 'loading'
                        ? 'bg-green-500 text-white ring-2 ring-green-300 animate-pulse'
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    <div className="text-sm font-medium">Loading</div>
                    <div className="text-xs mt-1">Agent Calculating</div>
                  </div>
                  <div
                    className={`p-4 rounded-lg transition-all ${
                      orderState === 'success'
                        ? 'bg-green-700 text-white ring-2 ring-green-300'
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    <div className="text-sm font-medium">Success</div>
                    <div className="text-xs mt-1">Order Confirmed</div>
                  </div>
                </div>
              </div>

              {/* Button Preview */}
              <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-xl p-12 mb-8 flex justify-center items-center min-h-32">
                <OrderButton
                  ref={orderButtonRef}
                  agentId="main-order-button"
                  agentContext={{
                    action: 'book_order',
                    itemId: 'pizza-margherita',
                    quantity: 1,
                  }}
                  onIntentComplete={handleIntentComplete}
                  onAgentMutate={(ctx) => {
                    addLog(`🔄 Agent mutation: ${ctx.action}`);
                  }}
                  onClick={() => {
                    addLog('👆 User clicked Order Button');
                  }}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={simulateAgentFlow}
                  disabled={orderState === 'loading'}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  🤖 Simulate Agent Flow
                </button>
                <button
                  onClick={() => {
                    setOrderState('success');
                    addLog('✓ Manually set to Success state');
                  }}
                  disabled={orderState === 'loading'}
                  className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  ✓ Complete Order
                </button>
                <button
                  onClick={resetOrder}
                  className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  🔄 Reset
                </button>
              </div>
            </div>

            {/* Visual Breakdown */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Visual Design Details
              </h3>
              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-bold">📏</span>
                  <div>
                    <strong>Size:</strong> Large with px-8 py-4 padding
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-bold">🎨</span>
                  <div>
                    <strong>Colors:</strong>
                    <br />
                    • Default: #22C55E (Green 500)
                    <br />
                    • Success: #15803D (Green 700)
                    <br />
                    • Text: White
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-bold">✨</span>
                  <div>
                    <strong>Effects:</strong>
                    <br />
                    • Subtle inner glow (gradient overlay)
                    <br />
                    • Rounded-2xl corners
                    <br />
                    • Shadow elevation
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-bold">⚡</span>
                  <div>
                    <strong>Animations:</strong>
                    <br />
                    • Pulse on loading state
                    <br />
                    • Scale on click (active)
                    <br />
                    • Smooth transitions
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Agent Interaction Log */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl h-fit">
            <h3 className="text-xl font-semibold text-white mb-4">
              Agent Interaction Log
            </h3>
            <div className="bg-black/40 rounded-lg p-4 font-mono text-xs text-green-300 space-y-1 max-h-96 overflow-y-auto">
              {intentLog.length === 0 ? (
                <div className="text-gray-500">Awaiting interactions...</div>
              ) : (
                intentLog.map((log, i) => (
                  <div key={i} className="break-words">
                    {log}
                  </div>
                ))
              )}
            </div>

            {/* Code Example */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-white mb-3">
                Implementation
              </h4>
              <pre className="bg-black/40 rounded-lg p-3 text-xs text-gray-300 overflow-x-auto">
{`<OrderButton
  agentId="order-btn"
  agentContext={{
    action: 'book_order',
    itemId: 'pizza-01'
  }}
  onIntentComplete={(ctx) => {
    console.log('Order confirmed!');
    navigate('/tracking');
  }}
  onAgentMutate={(ctx) => {
    console.log('Agent action:', ctx);
  }}
/>`}
              </pre>
            </div>
          </div>
        </div>

        {/* State Flow Documentation */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl mt-8">
          <h2 className="text-2xl font-semibold text-white mb-6">
            State Machine Flow
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-lg p-6 border-l-4 border-green-500">
              <h3 className="font-semibold text-green-300 mb-2">
                1. Default State
              </h3>
              <p className="text-sm text-gray-300 mb-3">
                Initial state with "Book Order" label and static green background.
              </p>
              <code className="text-xs bg-black/30 p-2 rounded block text-green-400">
                #22C55E
              </code>
            </div>

            <div className="bg-white/5 rounded-lg p-6 border-l-4 border-yellow-500">
              <h3 className="font-semibold text-yellow-300 mb-2">
                2. Agent-Loading State
              </h3>
              <p className="text-sm text-gray-300 mb-3">
                Triggered when agent processes order. Shows Sparkles icon + pulse
                animation + "Calculating..." text.
              </p>
              <code className="text-xs bg-black/30 p-2 rounded block text-green-400">
                animate-pulse + Sparkles
              </code>
            </div>

            <div className="bg-white/5 rounded-lg p-6 border-l-4 border-green-700">
              <h3 className="font-semibold text-green-200 mb-2">
                3. Success State
              </h3>
              <p className="text-sm text-gray-300 mb-3">
                After order confirmation. Shows CheckCircle2 icon + "Order
                Tracking" text + dark green background.
              </p>
              <code className="text-xs bg-black/30 p-2 rounded block text-green-400">
                #15803D + CheckCircle2
              </code>
            </div>
          </div>

          {/* Flow Diagram */}
          <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white font-bold mx-auto mb-2">
                1
              </div>
              <div className="text-sm text-gray-400">Default</div>
            </div>

            <div className="text-2xl text-green-400">→</div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white font-bold mx-auto mb-2 animate-pulse">
                2
              </div>
              <div className="text-sm text-gray-400">Loading</div>
            </div>

            <div className="text-2xl text-green-400">→</div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-700 rounded-2xl flex items-center justify-center text-white font-bold mx-auto mb-2">
                3
              </div>
              <div className="text-sm text-gray-400">Success</div>
            </div>
          </div>
        </div>

        {/* Props Documentation */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl mt-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Props</h2>
          <div className="space-y-4 text-sm text-gray-300">
            <div className="bg-black/30 rounded-lg p-4">
              <code className="text-green-400 font-semibold">
                onIntentComplete?:
              </code>
              <p className="mt-2">
                Callback fired when order is complete. Receives action, timestamp,
                and metadata. Perfect for AI agent navigation triggers.
              </p>
            </div>
            <div className="bg-black/30 rounded-lg p-4">
              <code className="text-green-400 font-semibold">label?:</code>
              <p className="mt-2">
                Custom button label (default: "Book Order"). Useful for different
                order types.
              </p>
            </div>
            <div className="bg-black/30 rounded-lg p-4">
              <code className="text-green-400 font-semibold">metadata?:</code>
              <p className="mt-2">
                Custom metadata passed to onIntentComplete. Useful for order data.
              </p>
            </div>
            <div className="bg-black/30 rounded-lg p-4">
              <code className="text-green-400 font-semibold">agentContext?:</code>
              <p className="mt-2">
                AI agent context for tracking and mutation. Includes action,
                itemId, quantity, etc.
              </p>
            </div>
            <div className="bg-black/30 rounded-lg p-4">
              <code className="text-green-400 font-semibold">onAgentMutate?:</code>
              <p className="mt-2">
                Callback when AI agent requests component mutation. Enables
                agent-driven UI updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderButtonShowcase;

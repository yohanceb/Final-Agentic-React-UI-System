import React, { useState } from 'react';
import CategoryPill from '../components/CategoryPill';

/**
 * CategoryPill Interactive Showcase
 * Demonstrates all states and interactions for the CategoryPill molecule
 */
export const CategoryPillShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Pizza');
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([
    'Sushi',
  ]);
  const [interactionLog, setInteractionLog] = useState<string[]>([]);

  const categories = [
    { label: 'Pizza', icon: '🍕' },
    { label: 'Sushi', icon: '🍣' },
    { label: 'Burger', icon: '🍔' },
    { label: 'Tacos', icon: '🌮' },
    { label: 'Pasta', icon: '🍝' },
    { label: 'Salad', icon: '🥗' },
  ];

  const addLog = (message: string) => {
    setInteractionLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] ${message}`,
    ]);
  };

  const handleSelectCategory = (label: string) => {
    setSelectedCategory(label);
    addLog(`👆 Selected category: ${label}`);
  };

  const toggleSuggested = (label: string) => {
    setSuggestedCategories((prev) =>
      prev.includes(label)
        ? prev.filter((c) => c !== label)
        : [...prev, label]
    );
    addLog(
      `${suggestedCategories.includes(label) ? '✗' : '✨'} ${label} ${
        suggestedCategories.includes(label) ? 'unsuggestedby' : 'suggested by'
      } agent`
    );
  };

  const resetState = () => {
    setSelectedCategory('Pizza');
    setSuggestedCategories(['Sushi']);
    setInteractionLog([]);
    addLog('🔄 State reset to defaults');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            🍽️ CategoryPill Component
          </h1>
          <p className="text-lg text-gray-600">
            Molecule component for category selection with agentic AI suggestions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Demo Section */}
          <div className="lg:col-span-3 space-y-8">
            {/* Category Grid */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Category Selection Grid
              </h2>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                {categories.map((category) => (
                  <CategoryPill
                    key={category.label}
                    icon={category.icon}
                    label={category.label}
                    isSelected={selectedCategory === category.label}
                    isSuggested={suggestedCategories.includes(
                      category.label
                    )}
                    agentId={`category-${category.label.toLowerCase()}`}
                    agentContext={{
                      action: 'category_selected',
                      categoryLabel: category.label,
                    }}
                    onSelect={handleSelectCategory}
                    onAgentMutate={(ctx) => {
                      addLog(
                        `🤖 Agent mutation: ${ctx.action} - ${ctx.categoryLabel}`
                      );
                    }}
                  />
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-gray-600">
                  <strong>Selected:</strong> {selectedCategory}
                </p>
              </div>
            </div>

            {/* States Breakdown */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Component States
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Default State */}
                <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Default State
                  </h3>
                  <div className="flex justify-center mb-4">
                    <CategoryPill icon="🥗" label="Salad" />
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• White background</p>
                    <p>• Gray icon & text</p>
                    <p>• Light border</p>
                    <p>• Hover scale effect</p>
                  </div>
                </div>

                {/* Selected State */}
                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Selected State
                  </h3>
                  <div className="flex justify-center mb-4">
                    <CategoryPill
                      icon="🍕"
                      label="Pizza"
                      isSelected={true}
                    />
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Green background</p>
                    <p>• White icon</p>
                    <p>• Bold label text</p>
                    <p>• Shadow elevation</p>
                  </div>
                </div>

                {/* Suggested State */}
                <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Agent-Suggested State
                  </h3>
                  <div className="flex justify-center mb-4">
                    <CategoryPill icon="🍣" label="Sushi" isSuggested={true} />
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Gold shimmer border</p>
                    <p>• Sparkle badge</p>
                    <p>• Pulsing animation</p>
                    <p>• Agent recommendation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Controls */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Interactive Controls
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Toggle Agent Suggestions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.label}
                        onClick={() => toggleSuggested(cat.label)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                          suggestedCategories.includes(cat.label)
                            ? 'bg-yellow-400 text-yellow-900'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {cat.icon} {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Current Suggestions
                  </p>
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    {suggestedCategories.length > 0 ? (
                      <p className="text-sm text-gray-700">
                        ✨ {suggestedCategories.join(', ')}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No suggested categories
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={resetState}
                  className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
                >
                  🔄 Reset State
                </button>
              </div>
            </div>
          </div>

          {/* Interaction Log */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 h-full sticky top-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Interaction Log
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-xs text-gray-700 space-y-1 max-h-96 overflow-y-auto">
                {interactionLog.length === 0 ? (
                  <div className="text-gray-500">Awaiting interactions...</div>
                ) : (
                  interactionLog.map((log, i) => (
                    <div key={i} className="break-words">
                      {log}
                    </div>
                  ))
                )}
              </div>

              {/* Code Example */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">
                  Implementation
                </h4>
                <pre className="bg-gray-900 text-green-400 rounded-lg p-3 text-xs overflow-x-auto">
{`<CategoryPill
  icon="🍕"
  label="Pizza"
  isSelected={true}
  isSuggested={false}
  agentId="cat-pizza"
  onSelect={(label) => {
    setCategory(label);
  }}
/>`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Props Documentation */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Props</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <code className="text-green-600 font-semibold">
                  icon: ReactNode
                </code>
                <p className="text-sm text-gray-600 mt-1">
                  Icon displayed in the container (emoji or SVG)
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <code className="text-blue-600 font-semibold">
                  label: string
                </code>
                <p className="text-sm text-gray-600 mt-1">
                  Text label displayed below the icon
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <code className="text-purple-600 font-semibold">
                  isSelected?: boolean
                </code>
                <p className="text-sm text-gray-600 mt-1">
                  Whether the category is currently selected (default: false)
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-yellow-500 pl-4">
                <code className="text-yellow-600 font-semibold">
                  isSuggested?: boolean
                </code>
                <p className="text-sm text-gray-600 mt-1">
                  Whether AI agent suggests this category (default: false)
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <code className="text-red-600 font-semibold">
                  onSelect?: (label: string) =&gt; void
                </code>
                <p className="text-sm text-gray-600 mt-1">
                  Callback fired when category is selected
                </p>
              </div>

              <div className="border-l-4 border-indigo-500 pl-4">
                <code className="text-indigo-600 font-semibold">
                  agentContext?: AgentContext
                </code>
                <p className="text-sm text-gray-600 mt-1">
                  AI agent context for tracking and mutations
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Integration Info */}
        <div className="bg-gradient-to-r from-yellow-50 to-green-50 rounded-2xl p-8 border border-green-200 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🤖 Agent Integration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">
                AI Agent Detection
              </h3>
              <p className="text-sm text-gray-600">
                Agents can find CategoryPill components using{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  data-agent-id
                </code>{' '}
                attribute and query the current state.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">
                Smart Suggestions
              </h3>
              <p className="text-sm text-gray-600">
                AI agents analyze user history to suggest relevant categories
                with the gold shimmer effect for personalized UX.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">
                onAgentMutate Callback
              </h3>
              <p className="text-sm text-gray-600">
                Fired when user interacts, allowing agents to react to category
                selections and update recommendations in real-time.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">
                Context Serialization
              </h3>
              <p className="text-sm text-gray-600">
                Component state is serialized in{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  data-agent-context
                </code>{' '}
                for agents to inspect and respond to.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPillShowcase;

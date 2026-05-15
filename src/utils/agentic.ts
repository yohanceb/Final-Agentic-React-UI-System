/**
 * Utility for merging Tailwind classes while removing conflicts
 * Simple implementation without external dependencies
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes
    .filter((cls): cls is string => typeof cls === 'string' && cls.length > 0)
    .join(' ');
};

/**
 * Serialize component state for agent consumption
 */
export const serializeComponentState = (
  state: Record<string, unknown>
): string => {
  try {
    return JSON.stringify(state);
  } catch {
    return '';
  }
};

/**
 * Deserialize agent context from string
 */
export const deserializeAgentContext = (
  contextStr?: string
): Record<string, unknown> | undefined => {
  if (!contextStr) return undefined;
  try {
    return JSON.parse(contextStr);
  } catch {
    return undefined;
  }
};

/**
 * Generate unique agent ID
 */
export const generateAgentId = (componentName: string): string => {
  return `${componentName}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Create agentic data attributes for component
 */
export const createAgentAttributes = (
  agentId: string,
  context?: Record<string, unknown>
): Record<string, string | undefined> => {
  return {
    'data-agent-id': agentId,
    'data-agent-context': context ? JSON.stringify(context) : undefined,
  };
};

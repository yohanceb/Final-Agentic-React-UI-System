/**
 * Core Agentic Props Interface
 * Every component must accept these props to enable AI agent manipulation
 */
export interface AgentContext {
  agentId?: string;
  action?: string;
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface AgenticBaseProps {
  /**
   * Agent context data - allows AI agents to track and manipulate component state
   */
  agentContext?: AgentContext;

  /**
   * Unique identifier for agent targeting
   */
  agentId?: string;

  /**
   * Callback fired when agent requests mutation
   */
  onAgentMutate?: (context: AgentContext) => void;

  /**
   * Custom CSS class name
   */
  className?: string;

  /**
   * Whether component is in disabled state
   */
  disabled?: boolean;
}

export interface ComponentState {
  isLoading: boolean;
  isError: boolean;
  isDirty: boolean;
  validationErrors?: Record<string, string>;
}

export interface ComponentMetadata {
  componentName: string;
  version: string;
  capabilities: string[];
}

import { useState, useCallback } from 'react';
import type { AgentContext, ComponentState } from '../types/agentic';

/**
 * Hook for managing agentic component state
 * Provides state tracking and agent mutation callbacks
 */
export const useAgenticState = (initialState: Partial<ComponentState> = {}) => {
  const [state, setState] = useState<ComponentState>({
    isLoading: false,
    isError: false,
    isDirty: false,
    ...initialState,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, isLoading: loading }));
  }, []);

  const setError = useCallback((error: boolean) => {
    setState((prev) => ({ ...prev, isError: error }));
  }, []);

  const setDirty = useCallback((dirty: boolean) => {
    setState((prev) => ({ ...prev, isDirty: dirty }));
  }, []);

  const setValidationErrors = useCallback((errors?: Record<string, string>) => {
    setState((prev) => ({ ...prev, validationErrors: errors }));
  }, []);

  const handleAgentMutate = useCallback(
    (context: AgentContext) => {
      // This can be extended to handle specific agent actions
      if (context.action === 'reset') {
        setState({
          isLoading: false,
          isError: false,
          isDirty: false,
        });
      }
    },
    []
  );

  return {
    state,
    setState,
    setLoading,
    setError,
    setDirty,
    setValidationErrors,
    handleAgentMutate,
  };
};

/**
 * Hook for tracking component state changes for agents
 */
export const useAgentTracking = (componentId: string) => {
  const [context, setContext] = useState<AgentContext>({
    agentId: componentId,
  });

  const updateContext = useCallback(
    (updates: Partial<AgentContext>) => {
      setContext((prev) => ({
        ...prev,
        ...updates,
      }));
    },
    []
  );

  return {
    context,
    updateContext,
  };
};

"use client";

import { useEffect, useState } from "react";

interface UseAsyncDataResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

interface AsyncState<T> {
  deps: unknown[];
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

function depsChanged(prev: unknown[], next: unknown[]): boolean {
  return (
    prev.length !== next.length ||
    prev.some((value, index) => !Object.is(value, next[index]))
  );
}

/**
 * Runs an awaitable fetcher on mount and reports whether the data has
 * finished loading. Client Components use this to know when it's safe to
 * swap a skeleton for the real content:
 *
 *   const { data, isLoading } = useAsyncData(fetchConversations);
 *   if (isLoading || !data) return <Skeleton />;
 *   return <List items={data} />;
 */
export function useAsyncData<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = []
): UseAsyncDataResult<T> {
  const [state, setState] = useState<AsyncState<T>>(() => ({
    deps,
    data: null,
    error: null,
    isLoading: true,
  }));

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((result) => {
        if (!cancelled) setState({ deps, data: result, error: null, isLoading: false });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            deps,
            data: null,
            error: err instanceof Error ? err : new Error(String(err)),
            isLoading: false,
          });
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  // The committed state may still belong to a previous set of deps while
  // the effect above is in flight for the new ones — derived during render
  // (no ref, no effect-body setState) rather than tracked as extra state.
  const isStale = depsChanged(state.deps, deps);

  return {
    data: isStale ? null : state.data,
    error: isStale ? null : state.error,
    isLoading: isStale || state.isLoading,
  };
}

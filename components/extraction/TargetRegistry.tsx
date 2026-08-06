"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

import type { SectionId } from "@/components/extraction/Types";

interface TargetRegistryValue {
  register: (id: SectionId, el: HTMLElement | null) => void;
  get: (id: SectionId) => HTMLElement | null;
}

const TargetRegistryContext = createContext<TargetRegistryValue | null>(null);

export function TargetRegistryProvider({ children }: { children: ReactNode }) {
  // Kept in a ref, not state — registration must never trigger a re-render.
  const nodes = useRef(new Map<SectionId, HTMLElement>());

  const register = useCallback((id: SectionId, el: HTMLElement | null) => {
    if (el) {
      nodes.current.set(id, el);
    } else {
      nodes.current.delete(id);
    }
  }, []);

  const get = useCallback((id: SectionId) => nodes.current.get(id) ?? null, []);

  const value = useMemo(() => ({ register, get }), [register, get]);

  return (
    <TargetRegistryContext.Provider value={value}>
      {children}
    </TargetRegistryContext.Provider>
  );
}

/** Returns null when rendered outside a provider (e.g. the standalone /dashboard route). */
export function useTargetRegistry() {
  return useContext(TargetRegistryContext);
}

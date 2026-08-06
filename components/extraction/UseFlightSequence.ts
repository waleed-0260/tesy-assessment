"use client";

import { useCallback, useEffect, useReducer } from "react";
import { useReducedMotion } from "motion/react";

import type { Honeycomb, Phase } from "@/components/extraction/Types";

/** Purely cosmetic — swap this timer for a real promise later without touching callers. */
export const LOADING_DURATION = 900;
export const FLIGHT_DURATION = 650;
export const NAV_PULSE_DURATION = 300;

interface FlightState {
  phase: Phase;
  honeycomb: Honeycomb | null;
  hexEl: HTMLElement | null;
  /** Bumped on every selection so effects can key off "this is a fresh cycle". */
  requestId: number;
}

type Action =
  | { type: "SELECT"; honeycomb: Honeycomb; hexEl: HTMLElement }
  | { type: "BEGIN_LOADING" }
  | { type: "START_FLIGHT" }
  | { type: "SKIP_TO_READY" }
  | { type: "LAND" }
  | { type: "COMPLETE" };

const initialState: FlightState = {
  phase: "idle",
  honeycomb: null,
  hexEl: null,
  requestId: 0,
};

function reducer(state: FlightState, action: Action): FlightState {
  switch (action.type) {
    case "SELECT":
      // Only one flight in progress at a time — ignore clicks mid-flight.
      if (state.phase === "flying" || state.phase === "landing") return state;
      return {
        phase: "selected",
        honeycomb: action.honeycomb,
        hexEl: action.hexEl,
        requestId: state.requestId + 1,
      };
    case "BEGIN_LOADING":
      if (state.phase !== "selected") return state;
      return { ...state, phase: "loading" };
    case "START_FLIGHT":
      if (state.phase !== "loading") return state;
      return { ...state, phase: "flying" };
    case "SKIP_TO_READY":
      if (state.phase !== "loading") return state;
      return { ...state, phase: "ready" };
    case "LAND":
      if (state.phase !== "flying") return state;
      return { ...state, phase: "landing" };
    case "COMPLETE":
      if (state.phase !== "landing") return state;
      return { ...state, phase: "ready" };
    default:
      return state;
  }
}

export function useFlightSequence() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const reducedMotion = useReducedMotion();

  // selected -> loading happens on the next tick: the hex keeps its
  // "selected" look for the whole cycle (driven by honeycomb id, not phase),
  // this just starts the skeleton/timer half of the sequence immediately.
  useEffect(() => {
    if (state.phase !== "selected") return;
    dispatch({ type: "BEGIN_LOADING" });
  }, [state.phase, state.requestId]);

  useEffect(() => {
    if (state.phase !== "loading") return;
    const timer = setTimeout(() => {
      dispatch({ type: reducedMotion ? "SKIP_TO_READY" : "START_FLIGHT" });
    }, LOADING_DURATION);
    return () => clearTimeout(timer);
  }, [state.phase, state.requestId, reducedMotion]);

  useEffect(() => {
    if (state.phase !== "landing") return;
    const timer = setTimeout(() => dispatch({ type: "COMPLETE" }), NAV_PULSE_DURATION);
    return () => clearTimeout(timer);
  }, [state.phase, state.requestId]);

  // No client-side guard needed here: the reducer's SELECT case already
  // ignores clicks while phase is 'flying' or 'landing'.
  const select = useCallback((honeycomb: Honeycomb, hexEl: HTMLElement) => {
    dispatch({ type: "SELECT", honeycomb, hexEl });
  }, []);

  const reportFlightLanded = useCallback(() => {
    dispatch({ type: "LAND" });
  }, []);

  return {
    phase: state.phase,
    honeycomb: state.honeycomb,
    hexEl: state.hexEl,
    requestId: state.requestId,
    activeSectionId: state.honeycomb?.sectionId ?? null,
    reducedMotion: Boolean(reducedMotion),
    select,
    reportFlightLanded,
  };
}

export type FlightSequence = ReturnType<typeof useFlightSequence>;

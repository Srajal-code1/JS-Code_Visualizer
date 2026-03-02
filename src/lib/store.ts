'use client'

import { create } from 'zustand'
import { VisualizerState, ExecutionStep } from './types'

interface VisualizerStore extends VisualizerState {
  setCode: (code: string) => void
  setSteps: (steps: ExecutionStep[]) => void
  setCurrentStep: (index: number) => void
  setIsPlaying: (playing: boolean) => void
  setSpeed: (speed: number) => void
  setError: (error: string | null) => void
  nextStep: () => void
  prevStep: () => void
  reset: () => void
}

const initialState: VisualizerState = {
  code: '',
  steps: [],
  currentStepIndex: 0,
  isPlaying: false,
  speed: 1,
  error: null,
}

export const useVisualizerStore = create<VisualizerStore>((set) => ({
  ...initialState,

  setCode: (code) => set({ code }),

  setSteps: (steps) => set({ steps, currentStepIndex: 0 }),

  setCurrentStep: (index) =>
    set((state) => ({
      currentStepIndex: Math.min(Math.max(0, index), state.steps.length - 1),
    })),

  setIsPlaying: (playing) => set({ isPlaying: playing }),

  setSpeed: (speed) => set({ speed: Math.max(0.5, Math.min(2, speed)) }),

  setError: (error) => set({ error }),

  nextStep: () =>
    set((state) => ({
      currentStepIndex: Math.min(state.currentStepIndex + 1, state.steps.length - 1),
    })),

  prevStep: () =>
    set((state) => ({
      currentStepIndex: Math.max(state.currentStepIndex - 1, 0),
    })),

  reset: () => set(initialState),
}))

'use client'

import { useVisualizerStore } from '../lib/store'
import { useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react'

export function Controls() {
  const { steps, currentStepIndex, isPlaying, speed, setCurrentStep, setIsPlaying, setSpeed, nextStep, prevStep, reset } =
    useVisualizerStore()

  // Auto-advance when playing
  useEffect(() => {
    if (!isPlaying || steps.length === 0) return

    const interval = setInterval(() => {
      if (currentStepIndex < steps.length - 1) {
        nextStep()
      } else {
        setIsPlaying(false)
      }
    }, 1000 / speed)

    return () => clearInterval(interval)
  }, [isPlaying, currentStepIndex, steps.length, speed, nextStep, setIsPlaying])

  const hasSteps = steps.length > 0

  return (
    <div className="flex flex-col gap-4 p-3 bg-dark-800 border border-dark-700 rounded">
      <h3 className="font-semibold text-sm">Playback</h3>

      {/* Main Controls */}
      <div className="flex gap-2">
        <button
          onClick={() => prevStep()}
          disabled={!hasSteps || currentStepIndex === 0}
          className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed flex-1 text-xs py-1"
        >
          <SkipBack size={14} />
          Prev
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={!hasSteps}
          className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed flex-1 text-xs py-1"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <button
          onClick={() => nextStep()}
          disabled={!hasSteps || currentStepIndex === steps.length - 1}
          className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed flex-1 text-xs py-1"
        >
          Next
          <SkipForward size={14} />
        </button>
      </div>

      {/* Speed Control */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">Speed</span>
          <span className="text-blue-400 font-semibold">{speed.toFixed(1)}x</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full h-2 bg-dark-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      {/* Step Indicator */}
      {hasSteps && (
        <div className="flex flex-col gap-2">
          <div className="text-xs text-gray-400">
            Step {currentStepIndex + 1} / {steps.length}
          </div>
          <input
            type="range"
            min="0"
            max={steps.length - 1}
            value={currentStepIndex}
            onChange={(e) => setCurrentStep(parseInt(e.target.value))}
            className="w-full h-2 bg-dark-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={reset}
        className="btn-secondary flex items-center gap-2 w-full justify-center text-xs py-1"
      >
        <RotateCcw size={14} />
        Reset All
      </button>
    </div>
  )
}

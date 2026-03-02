'use client'

import { useVisualizerStore } from '../lib/store'
import { motion } from 'framer-motion'

export function CurrentCodeLine() {
  const { steps, currentStepIndex, code } = useVisualizerStore()

  const currentStep = steps[currentStepIndex]
  const lines = code.split('\n')

  return (
    <div className="flex flex-col gap-3 h-full">
      <h3 className="font-semibold text-sm text-yellow-400">Current Execution</h3>

      <div className="flex-1 flex flex-col gap-2 overflow-auto">
        {currentStep ? (
          <>
            {/* Current Line */}
            <div className="space-y-2">
              <motion.div
                key={currentStep.stepId}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-100 font-mono text-sm break-words p-2 rounded"
              >
                {currentStep.code}
              </motion.div>
            </div>

            {/* Step Info */}
            <div className="text-xs text-gray-400 border-t border-dark-700 pt-2">
              <div>Step: {currentStep.stepId}</div>
              <div>Line: {currentStep.lineNumber}</div>
              <div>Scope: {currentStep.executionContext.scope}</div>
            </div>

            {/* Source Code Preview */}
            <div className="text-xs font-mono text-gray-500 mt-2">
              <div className="text-gray-400 mb-2">Code Preview:</div>
              <div className="bg-dark-800 rounded p-2 max-h-32 overflow-auto">
                {lines.map((line, index) => (
                  <div
                    key={index}
                    className={`${
                      index + 1 === currentStep.lineNumber
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'text-gray-500'
                    }`}
                  >
                    <span className="inline-block w-6 text-right mr-2">
                      {index + 1}
                    </span>
                    {line || ' '}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 text-sm py-8">
            <p>Run code to visualize execution</p>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useVisualizerStore } from '../lib/store'
import { motion, AnimatePresence } from 'framer-motion'

export function Variables() {
  const { steps, currentStepIndex } = useVisualizerStore()

  const currentStep = steps[currentStepIndex]
  const variables = currentStep?.variables || {}

  const entries = Object.entries(variables)

  return (
    <div className="flex flex-col gap-3 h-full">
      <h3 className="font-semibold text-sm text-cyan-400">Variables</h3>

      <div className="flex-1 flex flex-col gap-2 overflow-auto font-mono text-xs">
        <AnimatePresence mode="popLayout">
          {entries.length === 0 ? (
            <div className="text-center text-gray-500 text-sm py-4">
              <p>No variables declared</p>
            </div>
          ) : (
            entries.map(([name, value]) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-dark-800 border border-cyan-500/30 rounded p-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-cyan-400">{name}</span>
                  <span className="text-gray-300 truncate max-w-[150px]">
                    {typeof value === 'string' ? `"${value}"` : String(value)}
                  </span>
                </div>
                <div className="text-gray-500 text-xs mt-1">
                  {typeof value}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="text-xs text-gray-500 border-t border-dark-700 pt-2">
        Total: {entries.length}
      </div>
    </div>
  )
}

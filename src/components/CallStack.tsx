'use client'

import { useVisualizerStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'

export function CallStack() {
  const { steps, currentStepIndex } = useVisualizerStore()

  const currentStep = steps[currentStepIndex]
  const callStack = currentStep?.callStack || []

  return (
    <div className="card flex flex-col gap-3 h-full">
      <h3 className="font-semibold text-sm text-blue-400">Call Stack</h3>

      <div className="flex-1 flex flex-col gap-2 overflow-auto">
        <AnimatePresence mode="popLayout">
          {callStack.length === 0 ? (
            <div className="text-center text-gray-500 text-sm py-4">
              <div className="text-6xl font-light mb-2">∅</div>
              <p>Call stack is empty</p>
            </div>
          ) : (
            callStack.map((frame, index) => (
              <motion.div
                key={frame.id}
                initial={{ opacity: 0, x: -10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-dark-800 border border-blue-500/30 rounded p-2 text-xs"
              >
                <div className="font-mono text-blue-400 mb-1">
                  {index === callStack.length - 1 && <span className="text-yellow-400">▶ </span>}
                  {frame.functionName}
                </div>
                {frame.lineNumber && (
                  <div className="text-gray-400 text-xs">
                    Line: {frame.lineNumber}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="text-xs text-gray-500 border-t border-dark-700 pt-2">
        Depth: {callStack.length}
      </div>
    </div>
  )
}

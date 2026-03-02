'use client'

import { useVisualizerStore } from '../lib/store'
import { motion } from 'framer-motion'

export function EventLoop() {
  const { steps, currentStepIndex } = useVisualizerStore()

  const currentStep = steps[currentStepIndex]

  return (
    <div className="flex flex-col gap-3 h-full">
      <h3 className="font-semibold text-sm text-indigo-400">Event Loop</h3>

      <div className="flex-1 flex flex-col gap-2 overflow-auto">
        {!currentStep ? (
          <div className="text-center text-gray-500 text-sm py-4">
            <p>Run code to see event loop</p>
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-dark-800 border border-indigo-500/30 rounded p-3 text-xs space-y-2"
            >
              <div className="font-semibold text-indigo-300">Call Stack</div>
              <div className="text-gray-300">
                {currentStep.callStack.length > 0 ? `${currentStep.callStack.length} function(s)` : 'Empty'}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-dark-800 border border-purple-500/30 rounded p-3 text-xs space-y-2"
            >
              <div className="font-semibold text-purple-300">Microtask Queue</div>
              <div className="text-gray-300">
                {currentStep.microTaskQueue.length > 0 ? `${currentStep.microTaskQueue.length} task(s)` : 'Empty'}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-800 border border-orange-500/30 rounded p-3 text-xs space-y-2"
            >
              <div className="font-semibold text-orange-300">Macrotask Queue</div>
              <div className="text-gray-300">
                {currentStep.taskQueue.length > 0 ? `${currentStep.taskQueue.length} task(s)` : 'Empty'}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

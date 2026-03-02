'use client'

import { useVisualizerStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import { Radio } from 'lucide-react'

export function WebAPIs() {
  const { steps, currentStepIndex } = useVisualizerStore()

  const currentStep = steps[currentStepIndex]
  const webApis = currentStep?.webApis || []

  return (
    <div className="card flex flex-col gap-3 h-full">
      <h3 className="font-semibold text-sm text-green-400 flex items-center gap-2">
        <Radio size={16} />
        Web APIs
      </h3>

      <div className="flex-1 flex flex-col gap-2 overflow-auto">
        <AnimatePresence mode="popLayout">
          {webApis.length === 0 ? (
            <div className="text-center text-gray-500 text-sm py-4">
              <div className="text-3xl font-light">○</div>
              <p className="text-xs">No active Web APIs</p>
            </div>
          ) : (
            webApis.map((api) => (
              <motion.div
                key={api.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className={`bg-dark-800 border rounded p-2 text-xs ${
                  api.status === 'pending'
                    ? 'border-green-500/30 animate-pulse'
                    : 'border-green-500/10'
                }`}
              >
                <div className="font-mono text-green-400 mb-1">
                  {api.type}
                </div>
                <div className="text-gray-400 text-xs">
                  {api.status === 'pending' ? (
                    <span className="flex items-center gap-1">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      Pending...
                    </span>
                  ) : (
                    <span>Completed</span>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="text-xs text-gray-500 border-t border-dark-700 pt-2">
        Active: {webApis.filter((api) => api.status === 'pending').length}
      </div>
    </div>
  )
}

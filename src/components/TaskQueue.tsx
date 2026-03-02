'use client'

import { useVisualizerStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock } from 'lucide-react'

export function TaskQueue() {
  const { steps, currentStepIndex } = useVisualizerStore()

  const currentStep = steps[currentStepIndex]
  const taskQueue = currentStep?.taskQueue || []

  return (
    <div className="card flex flex-col gap-3 h-full">
      <h3 className="font-semibold text-sm text-orange-400 flex items-center gap-2">
        <Clock size={16} />
        Task Queue (Macrotasks)
      </h3>

      <div className="flex-1 flex flex-col gap-2 overflow-auto">
        <AnimatePresence mode="popLayout">
          {taskQueue.length === 0 ? (
            <div className="text-center text-gray-500 text-sm py-4">
              <div className="text-3xl font-light">→</div>
              <p className="text-xs">No pending tasks</p>
            </div>
          ) : (
            taskQueue.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-dark-800 border border-orange-500/30 rounded p-2 text-xs"
              >
                <div className="font-mono text-orange-400 mb-1 break-words">
                  {index === 0 && <span className="text-yellow-400">▶ </span>}
                  {task.callback}
                </div>
                {task.delay && (
                  <div className="text-gray-400 text-xs">
                    Delay: {task.delay}ms
                  </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="text-xs text-gray-500 border-t border-dark-700 pt-2">
        Pending: {taskQueue.length}
      </div>
    </div>
  )
}

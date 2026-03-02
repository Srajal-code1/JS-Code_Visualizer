'use client'

import { useVisualizerStore } from '@/lib/store'
import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'

export function EventLoop() {
  const { steps, currentStepIndex } = useVisualizerStore()

  const currentStep = steps[currentStepIndex]
  const callStack = currentStep?.callStack || []
  const taskQueue = currentStep?.taskQueue || []
  const microTaskQueue = currentStep?.microTaskQueue || []

  const eventLoopState = {
    callingStackEmpty: callStack.length === 0,
    microTasksWaiting: microTaskQueue.length > 0,
    macroTasksWaiting: taskQueue.length > 0,
  }

  return (
    <div className="card flex flex-col gap-4 h-full">
      <h3 className="font-semibold text-sm text-yellow-400 flex items-center gap-2">
        <Activity size={16} />
        Event Loop Status
      </h3>

      <div className="flex-1 flex flex-col gap-4">
        {/* Event Loop Flow Diagram */}
        <div className="space-y-3">
          {/* Call Stack */}
          <motion.div
            animate={{
              scale: eventLoopState.callingStackEmpty ? 0.95 : 1.05,
            }}
            transition={{ duration: 0.3 }}
            className="p-3 bg-dark-800 border border-blue-500/30 rounded-lg"
          >
            <div className="text-xs text-blue-400 font-semibold mb-2">Call Stack</div>
            <div className="text-xs text-gray-400">
              {eventLoopState.callingStackEmpty ? 'Empty ✓' : `${callStack.length} frame(s)`}
            </div>
          </motion.div>

          {/* Arrow Down */}
          {eventLoopState.callingStackEmpty && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-xl text-yellow-400"
            >
              ↓
            </motion.div>
          )}

          {/* Microtask Queue */}
          <motion.div
            animate={{
              scale: eventLoopState.microTasksWaiting ? 1.05 : 0.95,
              borderColor: eventLoopState.microTasksWaiting
                ? 'rgb(192, 132, 250)'
                : 'rgb(88, 86, 214, 0.3)',
            }}
            transition={{ duration: 0.3 }}
            className="p-3 bg-dark-800 border rounded-lg"
          >
            <div className="text-xs text-purple-400 font-semibold mb-2">Microtask Queue</div>
            <div className="text-xs text-gray-400">
              {eventLoopState.microTasksWaiting
                ? `${microTaskQueue.length} task(s) - Processing...`
                : 'Empty'}
            </div>
          </motion.div>

          {/* Arrow Down */}
          {!eventLoopState.microTasksWaiting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-xl text-yellow-400"
            >
              ↓
            </motion.div>
          )}

          {/* Macro Task Queue */}
          <motion.div
            animate={{
              scale: eventLoopState.macroTasksWaiting ? 1.05 : 0.95,
              borderColor: eventLoopState.macroTasksWaiting
                ? 'rgb(249, 115, 22)'
                : 'rgb(249, 115, 22, 0.3)',
            }}
            transition={{ duration: 0.3 }}
            className="p-3 bg-dark-800 border rounded-lg"
          >
            <div className="text-xs text-orange-400 font-semibold mb-2">Macro Task Queue</div>
            <div className="text-xs text-gray-400">
              {eventLoopState.macroTasksWaiting
                ? `${taskQueue.length} task(s) - Waiting...`
                : 'Empty'}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="border-t border-dark-700 pt-3 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <div
            className={
              eventLoopState.callingStackEmpty
                ? 'w-2 h-2 bg-green-500 rounded-full'
                : 'w-2 h-2 bg-red-500 rounded-full animate-pulse'
            }
          ></div>
          {eventLoopState.callingStackEmpty ? 'Event loop can run' : 'Call stack busy'}
        </div>
      </div>
    </div>
  )
}

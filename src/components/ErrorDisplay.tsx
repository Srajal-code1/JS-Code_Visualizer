'use client'

import { useVisualizerStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, X } from 'lucide-react'

export function ErrorDisplay() {
  const { error, setError } = useVisualizerStore()

  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed top-4 right-4 max-w-md bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3 z-50"
        >
          <AlertCircle className="text-red-400 flex-shrink-0 mt-1" size={20} />
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm">Error</p>
            <p className="text-red-200 text-sm mt-1 whitespace-pre-wrap break-words">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-300 flex-shrink-0"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

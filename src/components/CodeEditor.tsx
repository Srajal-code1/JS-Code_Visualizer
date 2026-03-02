'use client'

import { useVisualizerStore } from '../lib/store'
import { executeCode } from '../lib/executor'
import { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'

export function CodeEditor() {
  const { code, setCode, setSteps, setError, steps, currentStepIndex } = useVisualizerStore()
  const [isLoading, setIsLoading] = useState(false)

  const handleRun = async () => {
    if (!code.trim()) {
      setError('Please enter some code to visualize')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const executionSteps = await executeCode(code)
      setSteps(executionSteps)
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An error occurred while executing the code'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setCode('')
    setSteps([])
    setError(null)
  }

  return (
    <div className="flex flex-col h-full gap-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold">Code Editor</h2>
        <div className="flex gap-1">
          <button
            onClick={handleRun}
            disabled={isLoading || !code.trim()}
            className="btn-primary flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed text-xs py-1 px-2"
          >
            <Play size={14} />
            Run
          </button>
          <button onClick={handleReset} className="btn-secondary flex items-center gap-1 text-xs py-1 px-2">
            <RotateCcw size={14} />
            Reset
          </button>
        </div>
      </div>

      <div className="flex-1 relative border border-dark-700 rounded">
        <CodeMirror
          value={code}
          height="100%"
          width="100%"
          placeholder="Paste your JavaScript code here... (supports async/await, promises, setTimeout, etc.)"
          extensions={[javascript({ jsx: true })]}
          onChange={(value) => setCode(value)}
          theme="dark"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: true,
            defaultKeymap: true,
          }}
          className="text-xs"
        />
      </div>

      {steps.length > 0 && (
        <div className="text-xs text-gray-400">
          Steps: {currentStepIndex + 1} / {steps.length}
        </div>
      )}
    </div>
  )
}

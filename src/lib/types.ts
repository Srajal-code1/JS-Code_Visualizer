export interface ExecutionFrame {
  id: string
  functionName: string
  variables: Record<string, unknown>
  lineNumber?: number
}

export interface ExecutionStep {
  stepId: number
  lineNumber: number
  code: string
  callStack: ExecutionFrame[]
  taskQueue: ExecutionEvent[]
  microTaskQueue: ExecutionEvent[]
  webApis: WebAPI[]
  variables: Record<string, unknown>
  executionContext: ExecutionContext
  timestamp: number
}

export interface ExecutionEvent {
  id: string
  type: 'macro' | 'micro'
  callback: string
  delay?: number
  timestamp: number
}

export interface WebAPI {
  id: string
  type: 'setTimeout' | 'fetch' | 'addEventListener' | 'Promise'
  status: 'pending' | 'completed'
  timestamp: number
  duration?: number
}

export interface ExecutionContext {
  scope: 'global' | 'function' | 'block'
  variables: Record<string, unknown>
  this?: unknown
}

export interface VisualizerState {
  code: string
  steps: ExecutionStep[]
  currentStepIndex: number
  isPlaying: boolean
  speed: number
  error: string | null
}

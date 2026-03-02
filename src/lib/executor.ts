import { ExecutionStep, ExecutionFrame, ExecutionEvent, WebAPI } from './types'

export class JavaScriptExecutor {
  private code: string
  private steps: ExecutionStep[] = []
  private currentStep: ExecutionStep | null = null
  private callStack: ExecutionFrame[] = []
  private taskQueue: ExecutionEvent[] = []
  private microTaskQueue: ExecutionEvent[] = []
  private webApis: WebAPI[] = []
  private globalVariables: Record<string, unknown> = {}
  private stepCounter: number = 0
  private eventLoop: EventLoopSimulator

  constructor(code: string) {
    this.code = code
    this.eventLoop = new EventLoopSimulator()
  }

  async execute(): Promise<ExecutionStep[]> {
    try {
      this.parseAndExecute()
      return this.steps
    } catch (error) {
      console.error('Execution error:', error)
      throw error
    }
  }

  private parseAndExecute(): void {
    // Split code into lines
    const lines = this.code.split('\n')

    // Track setTimeout calls
    const timeoutCallbacks: { delay: number; callback: string; id: string }[] = []
    const promiseCallbacks: { callback: string; id: string }[] = []

    // Simple line-by-line execution tracking
    lines.forEach((line, index) => {
      const trimmedLine = line.trim()
      if (!trimmedLine || trimmedLine.startsWith('//')) return

      this.createStep(index + 1, trimmedLine)

      // Detect setTimeout
      if (trimmedLine.includes('setTimeout')) {
        const match = trimmedLine.match(/setTimeout\(\s*(?:function|\(\)|=>\s*\()?([^,)]+),\s*(\d+)/)
        if (match && match[1] && match[2]) {
          const callbackStr = match[1].trim()
          const delay = parseInt(match[2])
          const id = `timeout-${timeoutCallbacks.length}`
          timeoutCallbacks.push({ delay, callback: callbackStr, id })

          const event: ExecutionEvent = {
            id,
            type: 'macro',
            callback: `setTimeout(${callbackStr}, ${delay})`,
            delay,
            timestamp: Date.now(),
          }
          this.taskQueue.push(event)
          this.updateStep()
        }
      }

      // Detect Promise
      if (trimmedLine.includes('Promise') || (trimmedLine.includes('[') && trimmedLine.includes(']'))) {
        const id = `promise-${promiseCallbacks.length}`
        promiseCallbacks.push({ callback: trimmedLine, id })

        const event: ExecutionEvent = {
          id,
          type: 'micro',
          callback: trimmedLine,
          timestamp: Date.now(),
        }
        this.microTaskQueue.push(event)
        this.updateStep()
      }

      // Track variable assignments
      const assignMatch = trimmedLine.match(/^(?:const|let|var)\s+(\w+)\s*=\s*(.+)/)
      if (assignMatch && assignMatch[1] && assignMatch[2]) {
        this.globalVariables[assignMatch[1]] = this.evaluateExpression(assignMatch[2])
        this.updateStep()
      }

      // Track console.log
      if (trimmedLine.includes('console.log')) {
        this.createStep(index + 1, trimmedLine)
      }

      // Track function calls
      if (trimmedLine.includes('(') && !trimmedLine.includes('function')) {
        const funcMatch = trimmedLine.match(/^(\w+)\s*\(/)
        if (funcMatch && funcMatch[1]) {
          const frame: ExecutionFrame = {
            id: `frame-${this.callStack.length}`,
            functionName: funcMatch[1],
            variables: { ...this.globalVariables },
            lineNumber: index + 1,
          }
          this.callStack.push(frame)
          this.updateStep()

          // Pop after function execution (simplified)
          setTimeout(() => {
            this.callStack.pop()
            this.updateStep()
          }, 100)
        }
      }
    })

    // Simulate event loop processing
    this.simulateEventLoop()
  }

  private createStep(lineNumber: number, code: string): void {
    const step: ExecutionStep = {
      stepId: this.stepCounter++,
      lineNumber,
      code,
      callStack: JSON.parse(JSON.stringify(this.callStack)),
      taskQueue: [...this.taskQueue],
      microTaskQueue: [...this.microTaskQueue],
      webApis: [...this.webApis],
      variables: { ...this.globalVariables },
      executionContext: {
        scope: this.callStack.length > 0 ? 'function' : 'global',
        variables: { ...this.globalVariables },
      },
      timestamp: Date.now(),
    }
    this.steps.push(step)
  }

  private updateStep(): void {
    const lastStep = this.steps[this.steps.length - 1]
    if (lastStep) {
      lastStep.callStack = JSON.parse(JSON.stringify(this.callStack))
      lastStep.taskQueue = [...this.taskQueue]
      lastStep.microTaskQueue = [...this.microTaskQueue]
      lastStep.webApis = [...this.webApis]
      lastStep.variables = { ...this.globalVariables }
    }
  }

  private simulateEventLoop(): void {
    // Process micro tasks first (Promises, queueMicrotask)
    while (this.microTaskQueue.length > 0) {
      const task = this.microTaskQueue.shift()
      if (task) {
        const step: ExecutionStep = {
          stepId: this.stepCounter++,
          lineNumber: 0,
          code: `[Micro Task] ${task.callback}`,
          callStack: [...this.callStack],
          taskQueue: [...this.taskQueue],
          microTaskQueue: [...this.microTaskQueue],
          webApis: [...this.webApis],
          variables: { ...this.globalVariables },
          executionContext: {
            scope: 'global',
            variables: { ...this.globalVariables },
          },
          timestamp: Date.now(),
        }
        this.steps.push(step)
      }
    }

    // Then process macro tasks (setTimeout, setInterval)
    while (this.taskQueue.length > 0) {
      const task = this.taskQueue.shift()
      if (task) {
        const step: ExecutionStep = {
          stepId: this.stepCounter++,
          lineNumber: 0,
          code: `[Macro Task] ${task.callback}`,
          callStack: [...this.callStack],
          taskQueue: [...this.taskQueue],
          microTaskQueue: [...this.microTaskQueue],
          webApis: [...this.webApis],
          variables: { ...this.globalVariables },
          executionContext: {
            scope: 'global',
            variables: { ...this.globalVariables },
          },
          timestamp: Date.now(),
        }
        this.steps.push(step)
      }
    }
  }

  private evaluateExpression(expr: string): unknown {
    const expr_trimmed = expr.trim()

    // Simple number evaluation
    if (/^\d+(\.\d+)?$/.test(expr_trimmed)) {
      return parseFloat(expr_trimmed)
    }

    // Simple string evaluation
    if ((expr_trimmed.startsWith('"') && expr_trimmed.endsWith('"')) ||
        (expr_trimmed.startsWith("'") && expr_trimmed.endsWith("'"))) {
      return expr_trimmed.slice(1, -1)
    }

    // Array literal
    if (expr_trimmed.startsWith('[') && expr_trimmed.endsWith(']')) {
      return []
    }

    // Object literal
    if (expr_trimmed.startsWith('{') && expr_trimmed.endsWith('}')) {
      return {}
    }

    return undefined
  }
}

class EventLoopSimulator {
  private callStack: ExecutionFrame[] = []
  private taskQueue: ExecutionEvent[] = []
  private microTaskQueue: ExecutionEvent[] = []

  processEventLoop(steps: ExecutionStep[]): ExecutionStep[] {
    return steps
  }
}

export async function executeCode(code: string): Promise<ExecutionStep[]> {
  const executor = new JavaScriptExecutor(code)
  return executor.execute()
}

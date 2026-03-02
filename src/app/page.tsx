'use client'

import { CodeEditor } from '@/components/CodeEditor'
import { CallStack } from '@/components/CallStack'
import { TaskQueue } from '@/components/TaskQueue'
import { MicroTaskQueue } from '@/components/MicroTaskQueue'
import { WebAPIs } from '@/components/WebAPIs'
import { Variables } from '@/components/Variables'
import { EventLoop } from '@/components/EventLoop'
import { CurrentCodeLine } from '@/components/CurrentCodeLine'
import { Controls } from '@/components/Controls'
import { ErrorDisplay } from '@/components/ErrorDisplay'
// Note: showing all panels at once per user request

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-dark-950 text-white p-4">
      <ErrorDisplay />

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          JS Code Visualizer
        </h1>
        <p className="text-gray-400">
          Visualize JavaScript execution with event loop, call stack, and async operations
        </p>
      </div>

      {/* Content container: show all panels simultaneously */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="grid grid-cols-12 gap-4 h-full">
          {/* Editor */}
          <div className="col-span-12 lg:col-span-4 flex flex-col min-h-0">
            <div className="flex-1 card overflow-auto">
              <h3 className="text-sm font-semibold mb-2">Editor</h3>
              <div className="h-[calc(100%-1.25rem)]">
                <CodeEditor />
              </div>
            </div>
            <div className="mt-2">
              <Controls />
            </div>
          </div>

          {/* Main: current line + event loop */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-4 min-h-0">
            <div className="flex-1 card overflow-auto">
              <CurrentCodeLine />
            </div>
            <div className="flex-1 card overflow-auto">
              <EventLoop />
            </div>
          </div>

          {/* Right: call stack + variables */}
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 min-h-0">
            <div className="flex-1 card overflow-auto">
              <CallStack />
            </div>
            <div className="flex-1 card overflow-auto">
              <Variables />
            </div>
          </div>
        </div>

        {/* Queues row */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4 card overflow-auto">
            <TaskQueue />
          </div>
          <div className="col-span-12 md:col-span-4 card overflow-auto">
            <MicroTaskQueue />
          </div>
          <div className="col-span-12 md:col-span-4 card overflow-auto">
            <WebAPIs />
          </div>
        </div>
      </div>

      <div className="mt-2 pt-4 border-t border-dark-700 text-center text-xs text-gray-500">
        <p>
          JavaScript Visualizer • Built with React, Next.js & Framer Motion • Visualize your code execution
        </p>
      </div>
    </div>
  )
}

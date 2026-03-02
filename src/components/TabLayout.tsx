'use client'

import { useState } from 'react'
import { CurrentCodeLine } from './CurrentCodeLine'
import { EventLoop } from './EventLoop'
import { CallStack } from './CallStack'
import { Variables } from './Variables'
import { TaskQueue } from './TaskQueue'
import { MicroTaskQueue } from './MicroTaskQueue'
import { WebAPIs } from './WebAPIs'

// TabLayout provides simple tabs to switch between visualizer panels
export function TabLayout() {
  const panels = [
    { name: 'Code', component: <CurrentCodeLine /> },
    { name: 'Event Loop', component: <EventLoop /> },
    { name: 'Call Stack', component: <CallStack /> },
    { name: 'Variables', component: <Variables /> },
    { name: 'Tasks', component: <TaskQueue /> },
    { name: 'Microtasks', component: <MicroTaskQueue /> },
    { name: 'Web APIs', component: <WebAPIs /> },
  ]

  const [active, setActive] = useState(panels[0]!.name)
  const currentPanel = panels.find((p) => p.name === active) || panels[0]!

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-dark-700 p-2 flex space-x-2">
        {panels.map((p) => (
          <button
            key={p.name}
            onClick={() => setActive(p.name)}
            className={`px-3 py-1 rounded-md text-sm font-medium focus:outline-none transition-colors ${
              active === p.name
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-dark-700'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-4">
        {currentPanel.component}
      </div>
    </div>
  )
}

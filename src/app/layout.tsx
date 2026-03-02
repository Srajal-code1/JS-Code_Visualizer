import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JS Visualizer - Code Execution Visualizer',
  description: 'Beautiful visualization of JavaScript code execution with event loop, call stack, and async operations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-dark-950 text-white dark">
        {children}
      </body>
    </html>
  )
}

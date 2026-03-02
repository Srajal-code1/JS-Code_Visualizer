# JS Code Visualizer - Copilot Instructions

## Project Overview
A production-ready JavaScript code visualizer built with Next.js, React, and TypeScript. Visualizes JavaScript execution with call stack, event loop, task queues, and variable tracking.

## Project Setup Status
- [x] Project structure created
- [x] package.json configured with all dependencies
- [x] TypeScript configuration set up
- [x] Tailwind CSS configured for dark mode
- [x] Next.js App Router initialized
- [x] Core components created
- [x] Execution engine implemented
- [x] State management with Zustand set up
- [x] README and documentation complete

## Key Features Implemented
1. Code editor with execution capability
2. Call stack visualization with animations
3. Task queue (macro tasks) display
4. Microtask queue (Promise handling)
5. Web APIs tracker
6. Variable inspector
7. Event loop status monitor
8. Playback controls (Play, Pause, Next, Prev)
9. Speed adjustment
10. Error handling and display
11. Dark mode optimization
12. Responsive design

## Development Guidelines
- Use React hooks and functional components
- Type all components with TypeScript
- Use Zustand for state management
- Framer Motion for animations
- Tailwind CSS for styling
- Keep components modular and reusable

## Execution Engine
The `src/lib/executor.ts` file implements the code execution engine:
- Parses JavaScript code line by line
- Tracks call stack operations
- Identifies setTimeout/Promise calls
- Records execution steps
- Simulates event loop processing

## Component Structure
- **CodeEditor**: Input for JavaScript code
- **CallStack**: Shows function call stack
- **TaskQueue**: Displays macro tasks
- **MicroTaskQueue**: Shows promise callbacks
- **WebAPIs**: Tracks active web APIs
- **Variables**: Displays current variables
- **EventLoop**: Visualizes event loop state
- **CurrentCodeLine**: Shows executing line
- **Controls**: Playback navigation
- **ErrorDisplay**: Error notifications

## Build & Run
```bash
npm install
npm run dev      # Development server
npm run build    # Production build
npm run lint     # ESLint check
npm run type-check  # TypeScript check
```

## Next Steps for Enhancement
1. Implement WASM-based execution engine for accuracy
2. Add breakpoints and debugging features
3. Support for more async patterns
4. Performance metrics display
5. Code sharing functionality
6. Multi-threaded execution visualization
7. Custom visualization themes
8. Export execution traces

## Important Files
- `src/app/page.tsx` - Main page layout
- `src/lib/executor.ts` - Code execution engine
- `src/lib/store.ts` - Zustand state store
- `src/lib/types.ts` - TypeScript definitions
- `tailwind.config.ts` - Tailwind configuration
- `package.json` - Dependencies and scripts

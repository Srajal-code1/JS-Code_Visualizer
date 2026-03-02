# JS Code Visualizer

A beautiful, production-ready JavaScript code visualizer built with React, Next.js, and Framer Motion. Watch how your code executes line-by-line with real-time visualization of the call stack, event loop, task queues, and web APIs.

## Features

✨ **Beautiful Dark Mode Design** - Modern, sleek interface optimized for code visualization

🎬 **Execution Visualization** - Watch code execute step-by-step with animations

📚 **Call Stack Tracking** - See your function calls stack up and resolve

⏰ **Event Loop Visualization** - Understand how the JavaScript event loop processes tasks

🔄 **Task Queue Management** - Visual representation of macro tasks (setTimeout, setInterval)

⚡ **Microtask Queue** - Track micro tasks (Promise.then, queueMicrotask)

🌐 **Web APIs Simulation** - See active Web API calls (fetch, setTimeout, etc.)

📊 **Variable Inspector** - Track variable values throughout execution

⏯️ **Playback Controls** - Play, pause, next, previous with adjustable speed

## Supported Features

- ✅ Promises and async/await
- ✅ setTimeout & setInterval
- ✅ Fetch API simulation
- ✅ Event listeners
- ✅ Variable assignment and tracking
- ✅ Function calls and returns
- ✅ Complex async flows

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Language**: TypeScript
- **Code Highlighting**: Highlight.js

## Installation

```bash
# Clone or download the project
cd js-visualizer

# Install dependencies
npm install

# Run development server
npm run dev
```

The application will start at `http://localhost:3000`

## Usage

1. **Paste Code**: Enter your JavaScript code in the left editor panel
2. **Run**: Click the "Run" button to execute and visualize
3. **Navigate**: Use Play/Pause and Next/Prev buttons to step through execution
4. **Adjust Speed**: Use the speed slider to control playback speed
5. **Inspect**: Watch the call stack, queues, and variables in real-time

## Example Code

```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 100);
📊 **Variable Inspector** - Track variable values throughout execution
🧩 **Tabbed Visualization Panel** - Switch between call stack, event loop, queues, etc., one view at a time for cleaner focus
↔️ **Resizable Sidebar** - Drag to adjust editor/control panel width for your comfort
⏯️ **Playback Controls** - Play, pause, next, previous with adjustable speed
  .then(() => {
    console.log('Promise');
  });

console.log('End');
```

This example demonstrates:
- Synchronous execution (console.log statements)
- Macro tasks (setTimeout)
- Microtasks (Promise.then)
- Correct event loop ordering

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page component
│   └── globals.css      # Global styles
├── components/
│   ├── CodeEditor.tsx   # Code input component
│   ├── CallStack.tsx    # Call stack visualizer
│   ├── TaskQueue.tsx    # Macro task queue
│   ├── MicroTaskQueue.tsx # Micro task queue
│   ├── WebAPIs.tsx      # Web APIs display
│   ├── Variables.tsx    # Variable inspector
│   ├── EventLoop.tsx    # Event loop visualizer
│   ├── CurrentCodeLine.tsx # Current execution line
│   ├── Controls.tsx     # Playback controls
│   └── ErrorDisplay.tsx # Error messages
└── lib/
    ├── types.ts         # TypeScript types
    ├── store.ts         # Zustand store
    └── executor.ts      # Code execution engine
```

## Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## Features Coming Soon

- WASM-based execution engine for accurate JavaScript interpreter
- Support for more complex async patterns
- Breakpoints and conditional execution
- Performance metrics and timing analysis
- Code sharing and saved visualizations
- Multiple execution thread visualization
- Advanced async/await state machine visualization

## Configuration

### Environment Variables

Create a `.env.local` file if needed:

```env
# Example configurations
NEXT_PUBLIC_APP_NAME=JS Visualizer
```

### Tailwind Customization

Edit `tailwind.config.ts` to customize colors, spacing, and animations.

## Performance

The visualizer is optimized for:
- Smooth 60fps animations
- Efficient state management with Zustand
- Lazy loading of components
- Memoization of expensive computations

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (responsive design)

## Contributing

This is a personal project, but feel free to fork and customize for your needs.

## License

MIT License - Feel free to use this project as a learning resource or basis for your own work.

## Troubleshooting

### Code Not Running
- Check for syntax errors in your JavaScript code
- Ensure proper function syntax
- Check the error message at the top right

### Animations Slow
- Reduce the speed slider
- Close other applications consuming CPU
- Try a different browser

### Variables Not Showing
- Ensure variables are declared with `const`, `let`, or `var`
- Simple value assignments are supported
- Complex object manipulation may need manual tracking

## Learning Resources

Understanding the concepts visualized:
- [JavaScript Event Loop - JavaScript.info](https://javascript.info/event-loop)
- [Promises and Async/Await](https://javascript.info/promise-basics)
- [Task Queues and Microtasks](https://javascript.info/microtask-queue)
- [Call Stack and Execution Context](https://javascript.info/execution-context)

## Feedback & Support

For issues, feature requests, or improvements, please refer to the project documentation.

---

**Happy Visualizing!** 🚀

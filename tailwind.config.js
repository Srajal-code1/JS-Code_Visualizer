/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'dark-950': '#0b0b0d',
        'dark-900': '#0f1113',
        'dark-800': '#15171a',
        'dark-700': '#1b1d20',
        'dark-600': '#26292c',
        'blue-600': '#2563eb',
        'blue-700': '#1d4ed8',
      },
    },
  },
  plugins: [],
}

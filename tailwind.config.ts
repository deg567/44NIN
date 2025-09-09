import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E20021',
          dark: '#111111',
        },
      },
    },
  },
  plugins: [],
}

export default config


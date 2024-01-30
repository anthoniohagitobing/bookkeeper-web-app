import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
      colors: {
        customBlue: {
          light:'#1f26c1',
          mid:'#0d104f',
          dark:'#04051c',
        },
        customGray: {
          light: '#d1d5db',
          mid: '#a0a3a7',
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}
export default config

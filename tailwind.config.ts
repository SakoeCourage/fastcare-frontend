import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors:{
      'primary-deep-blue': '#031346',
      'primary-deep-orange': '#FFC03E',
      'primary-light-orange': '#F1EDCB',
      'primary-desktop-color': '#F8FFF8',
      'primary-light-dark': '#2C2C2C',
      'alternative-light-dark': '#1B1B1B',
      'primary-light-gray': '#707070',
      'primary-deep-dark': '#141414',
      'primary-light-white': '#FEFEFE',
      'body-backdground': '#F8FFF8',
      'primary-medium-green': '#00873C',
    }
   
  },
  plugins: [],
}
export default config

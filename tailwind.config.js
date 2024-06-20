/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./.vitepress/**/*.{ts,scss,vue}"],
  theme: {
    extend: {
      colors: {
        palette: {
          accent: '#ED9A63',
          'dark-accent': '#141943',
          text: '#252525',
          'light-text': '#ffffff',
          'light-background': '#ffffff',
          muted: '#25252550',
        },
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '960px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
}

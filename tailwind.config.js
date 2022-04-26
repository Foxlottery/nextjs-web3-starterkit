const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  // important: '#__next',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  },
  variants: {
  },
  plugins: [
    require('tailwindcss-border-gradient-radius'),
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.2xl') },
        'h2': { fontSize: theme('fontSize.xl') },
        'h3': { fontSize: theme('fontSize.lg') },
      })
    })
  ],
}

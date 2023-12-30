const plugin = require('tailwindcss/plugin')
const {nextui} = require("@nextui-org/react");
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: "class",
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      mono: ['JetBrains Mono Web', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      boxShadow: {
        highlight: 'inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
      },
      screens: {
        narrow: { raw: '(max-aspect-ratio: 3 / 2)' },
        wide: { raw: '(min-aspect-ratio: 3 / 2)' },
        'taller-than-854': { raw: '(min-height: 854px)' },

        // mobile
        'mobile':{'max': '767px'},

        // iPhoneX: 375x812
        'sm': {'min': '376px'},

        // iPad Mini: 768
        'md': {'min': '768px'},

        // iPad Pro: 1024
        'lg': {'min': '1024px'},

        'xl': {'min': '1280px'},

        '2xl': {'min': '1536px'},
      },
      keyframes: {
        scx: {
          '0%': { transform: 'translate(0px, 0%)' },
          '100%': { transform: 'translate(0px, -50%)' },
        },
        scy: {
          '0%': {
          transform: 'translate(0%, 0px)'
        },
          '100%': {
              transform: 'translate(-50%, 0px)'
          }
        }
      },
    },
  },
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            danger:{
              DEFAULT:"#eb1b2e"
            }
            // ... rest of the colors
          },
        },
        dark: {
          colors: {
            danger:{
              DEFAULT:"#eb1b2e"
            }
          },
          // ... rest of the colors
        },
    }}),
  ],
}

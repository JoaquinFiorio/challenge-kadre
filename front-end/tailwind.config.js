const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#131A20",
              foreground: "rgba(255, 255, 255, 1)",
            },
            secondary: {
              DEFAULT: "rgba(12, 10, 25, 1)",
              foreground: "rgba(255, 255, 255, 1)",
            },
            success: {
              foreground: "rgba(255, 255, 255, 1)",
            }
          },
        },
      },
    })
  ]
}

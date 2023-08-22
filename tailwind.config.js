/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./build/*.html","./build/js/*.js"],
  darkMode : "class",
  theme: {
    extend: {
      fontFamily : {
        spaceMono : "'Space Mono', monospace"
      },
      colors : {
        normalBlue : 'hsl(212, 100%, 50%)',
        lightBlue : 'hsl(217, 20%, 51%)',
        darkBlue : 'hsl(217, 35%, 45%)',
        darkerBlue : 'hsl(222, 41%, 20%)',
        veryDarkBlue : 'hsl(217, 21%, 21%)',
        veryDarkerBlue : 'hsl(220, 40%, 13%)',
        veryLightBlue : 'hsl(227, 100%, 98%)',
        normalWhite : 'hsl(0, 0%, 100%)'
      }
    },
  },
  plugins: [],
}


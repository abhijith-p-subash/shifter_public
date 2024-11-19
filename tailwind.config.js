const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Use Poppins as the default sans-serif font
      },
      colors: {
        darkBlue: {
          100: '#CCE0F4',
          200: '#99C1E9',
          300: '#66A3DD',
          400: '#3384D2',
          500: '#004C98', // base color
          600: '#003E7C',
          700: '#003060',
          800: '#002344',
          900: '#001528',
        },
        brightBlue: {
          100: '#CCEAFF',
          200: '#99D5FF',
          300: '#66C1FF',
          400: '#33ACFF',
          500: '#0692FD', // base color
          600: '#0574CB',
          700: '#045699',
          800: '#033966',
          900: '#021B34',
        },
        softYellow: {
          100: '#FFF4D1',
          200: '#FFEAA4',
          300: '#FFDF76',
          400: '#FFD549',
          500: '#FFCF54', // base color
          600: '#E6B746',
          700: '#B38F37',
          800: '#806628',
          900: '#4C3E19',
        },
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};

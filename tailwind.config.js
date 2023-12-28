/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./component/**/*.{js,ts,jsx,tsx,mdx}",
    

    // if using src directory
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontSize: {
        normal: "16px"
      },
      width: {
        button: 'calc(100% - 20px)',
      },
      backgroundImage: {
        thumbnail: "url('/images/hero.jpg')"
      }
    },
  },
  plugins: [],
}


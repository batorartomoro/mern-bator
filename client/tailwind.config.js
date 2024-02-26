/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily:{
        primary:'poppins'
      },
      
    },
    container:{
      center:true,
      padding:{
        Default: "20px",
        md:"40px",
      },
    }
    
  },
  
  plugins: [require('flowbite/plugin'),require('tailwind-scrollbar')],
};
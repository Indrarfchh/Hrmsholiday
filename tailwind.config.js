/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Ensure Tailwind scans all relevant files
  ],
  theme: {
    extend: {
      maxHeight: {
        'popup': '500px',  // Define a custom max-height for the popup
      },
    },
  },
  plugins: [],
}

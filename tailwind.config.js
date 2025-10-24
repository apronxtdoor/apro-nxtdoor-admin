/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: { apnd: { indigo: "#667eea", purple: "#764ba2" } },
      boxShadow: { card: "0 20px 40px rgba(0,0,0,0.08)" },
      borderRadius: { "2xl": "1rem" },
    },
  },
  plugins: [],
};

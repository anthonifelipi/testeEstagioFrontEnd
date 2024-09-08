export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Roboto Mono"', "monospace"],
      },
      keyframes: {
        slideIn: {
          from: {
            opacity: "0",
            transform: "translateX(-50px)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        slideIn: "slideIn 1s ease-in-out",
      },
    },
  },
  plugins: [],
};

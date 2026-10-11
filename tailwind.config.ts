import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F6F4EB",
        "blue-soft": "#91C8E4",
        "blue-mid": "#749BC2",
        "blue-deep": "#4682A9",
        "blue-tint": "#DCECF1",
      },
      fontFamily: {
        head: ["Poppins", "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

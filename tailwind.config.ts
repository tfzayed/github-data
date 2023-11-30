import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("tailwind-bootstrap-grid")({
            generateContainer: false,
            gridGutterWidth: "2rem",
            gridGutters: {
                1: "0.25rem",
                2: "0.5rem",
                3: "1rem",
                4: "1.5rem",
                5: "3rem",
            },
        }),
    ],
};
export default config;

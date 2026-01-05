/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#030305",
                surface: "#0A0A12",
                primary: "#00F0FF", // Cyberpunk Cyan
                secondary: "#BD00FF", // Electric Purple
                accent: "#00FF94", // Neon Green
                danger: "#FF0055", // Neon Red
                muted: "#8888AA",
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #00F0FF33 0deg, #BD00FF33 180deg, #00F0FF33 360deg)',
            },
            animation: {
                'scan': 'scan 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                scan: {
                    '0%, 100%': { transform: 'translateY(-10%)', opacity: '0' },
                    '50%': { transform: 'translateY(100%)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}

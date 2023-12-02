/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "teamosis-sg.vercel.app",
                port: "",
            },
        ],
    },
};

module.exports = nextConfig;

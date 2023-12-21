/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "teamosis-sg.vercel.app",
                port: "",
            },
            {
                protocol: "https",
                hostname: "demo.themefisher.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "demo.gethugothemes.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "themefisher.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "statichunt.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "https://statichunt-images.netlify.app/",
                port: "",
            },
            {
                protocol: "https",
                hostname: "camo.githubusercontent.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "placehold.co",
                port: "",
            },
        ],
    },
};

module.exports = nextConfig;

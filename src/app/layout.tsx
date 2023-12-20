import Navbar from "@/components/nav/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "GitHub Data",
    description: "Show GitHub repository data from github api",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    toastOptions={{ duration: 3000 }}
                />
                <Navbar />
                <main className="pb-24">{children}</main>
            </body>
        </html>
    );
}

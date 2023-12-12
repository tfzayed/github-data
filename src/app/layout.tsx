import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
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
                <div className="flex justify-end sticky top-0">
                    <Link
                        href={"/"}
                        className="bg-[#536271] rounded-lg text-center px-10 py-3 mx-5 my-10"
                    >
                        Home
                    </Link>
                    <Link
                        href={"/add-repo"}
                        className="bg-[#536271] rounded-lg text-center px-10 py-3 mx-5 my-10"
                    >
                        Add
                    </Link>
                </div>
                <main className="pb-24">{children}</main>
            </body>
        </html>
    );
}

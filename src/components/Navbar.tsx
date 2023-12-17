"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    return (
        <header className="bg-[#3e4c5e] py-5 mb-10 rounded-b-lg">
            <nav className="flex justify-between px-4 mx-auto max-w-[1320px]">
                <div>
                    <h1 className="text-3xl font-bold">GitHub Data</h1>
                </div>
                <div>
                    <Link
                        href={"/"}
                        className={`text-xl mx-2 lg:mx-6 hover: ${
                            pathname === "/" && "underline font-semibold"
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        href={"/add-repo"}
                        className={`text-xl mx-2 lg:mx-6 hover: ${
                            pathname === "/add-repo" && "underline font-semibold"
                        }`}
                    >
                        Add
                    </Link>
                    <Link
                        href={"/dashboard"}
                        className={`text-xl mx-2 lg:mx-6 hover: ${
                            pathname === "/dashboard" && "underline font-semibold"
                        }`}
                    >
                        Dashboard
                    </Link>
                </div>
            </nav>
        </header>
    );
}

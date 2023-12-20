"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Close from "../svg/Close";
import Open from "../svg/Open";
import NavItems from "./NavItems";

export default function Navbar() {
    const pathname = usePathname();
    const [toggle, setToggle] = useState(false);
    return (
        <header className=" shadow-lg py-5 mb-10 rounded-b-lg">
            <nav>
                <div className="flex justify-between items-center px-4 mx-auto max-w-[1320px]">
                    <div>
                        <Link href={"/"} className="text-3xl font-bold">
                            GitHub Data
                        </Link>
                    </div>
                    <button
                        onClick={() => setToggle(!toggle)}
                        className="md:hidden"
                    >
                        {toggle ? <Open /> : <Close />}
                    </button>
                    <div className="hidden md:flex items-center">
                        <NavItems pathname={pathname} />
                    </div>
                </div>
                <div
                    className={`${
                        toggle ? "flex" : "hidden"
                    } flex-col mt-5 gap-2 items-center md:hidden`}
                >
                    <NavItems pathname={pathname} />
                </div>
            </nav>
        </header>
    );
}

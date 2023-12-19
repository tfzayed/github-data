import Link from "next/link";
import Plus from "../svg/Plus";

export default function NavItems({ pathname }: { pathname: string }) {
    return (
        <>
            <Link
                href={"/"}
                className={`text-xl md:mr-6 ${
                    pathname === "/" && "underline font-semibold"
                }`}
            >
                Home
            </Link>
            <Link
                href={"/dashboard"}
                className={`text-xl md:mr-6 ${
                    pathname === "/dashboard" && "underline font-semibold"
                }`}
            >
                Dashboard
            </Link>
            <Link
                href={"/add-repo"}
                className="text-xl text-white bg-[#505f75] rounded-lg"
            >
                <button className="flex items-center px-6 py-2">
                    <Plus />
                    Add
                </button>
            </Link>
        </>
    );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Github from "./Github";
import Skeleton from "./Skeleton";

interface IRepositoryInfo {
    name: string;
    org: string;
    image: string;
}
[];

export default function GetRepo({ token }: { token: string }) {
    const [reposiotryInfo, setReposiotryInfo] = useState([]);

    useEffect(() => {
        const getReposiotryInfo = async () => {
            const res = await fetch("http://localhost:3000/api/");
            const allRepoInfo = await res.json();
            setReposiotryInfo(allRepoInfo.reposiotryInfo);
        };
        getReposiotryInfo();
    }, []);

    if (reposiotryInfo.length === 0) {
        return (
            <div className="row g-5">
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </div>
        );
    }

    return (
        <div className="row g-5">
            {reposiotryInfo &&
                reposiotryInfo.map((repository: any, i) => (
                    <div key={i} className="col-4">
                        <div className="bg-[#3e4c5e] p-10 mx-auto rounded-lg min-w-full min-h-full">
                            <div className="">
                                <div>
                                    {repository.image !== null && (
                                        <Image
                                            src={repository.image}
                                            className="mb-2 mx-auto"
                                            width={300}
                                            height={255}
                                            alt="repo img"
                                            placeholder="blur"
                                            blurDataURL="/images/placeholder.png"
                                        />
                                    )}
                                </div>
                                <div>
                                    <div className="my-6">
                                        <h1 className="mb-2 font-bold text-xl">
                                            {repository.name}
                                        </h1>
                                        <h2 className="mb-4 font-bold text-xl">
                                            <span className="font-normal">
                                                Org: {repository.org}
                                            </span>
                                        </h2>
                                        <Github
                                            key={i}
                                            name={repository.name}
                                            org={repository.org}
                                            token={token}
                                        />
                                    </div>
                                    <div>
                                        <div className="row justify-center">
                                            <div className="col-6">
                                                {repository.name && (
                                                    <Link
                                                        href={`https://github.com/${repository.org}/${repository.name}/blob/master/README.md`}
                                                        target="_blank"
                                                        className="bg-[#536271] rounded-lg text-center py-3 block"
                                                    >
                                                        Readme
                                                    </Link>
                                                )}
                                            </div>
                                            <div className="col-6">
                                                {repository.name && (
                                                    <Link
                                                        href={`https://github.com/${repository.org}/${repository.name}`}
                                                        target="_blank"
                                                        className="bg-[#536271] rounded-lg text-center py-3 block"
                                                    >
                                                        Github
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}

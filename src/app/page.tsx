"use client";

import Skeleton from "@/components/Skeleton";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

async function getData() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/get`,
            {
                cache: "no-store",
                next: { revalidate: 10 },
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        return res.json();
    } catch (error) {
        console.error("Initail Data fetching error:", error);
    }
}

export default function Home() {
    const [reposiotryInfo, setReposiotryInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const updateInfo = async () => {
        setUpdating(true),
            await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api`),
            setUpdating(false),
            window.location.reload();
    };

    useEffect(() => {
        getData()
            .then((res) => {
                setReposiotryInfo(res.repositoryInfo), setLoading(false);
            })
            .catch((error) => console.log("error:", error));
    }, []);

    return (
        <>
            <div className="flex justify-center items-center mb-10">
                <h1 className="font-bold text-5xl mr-10">Repositories</h1>
                <button
                    className="bg-[#536271] rounded-lg text-center px-10 py-3"
                    onClick={updateInfo}
                    disabled={updating}
                >
                    {updating ? "updating...." : "update info"}
                </button>
            </div>
            <div className="mx-auto max-w-[1320px] px-4">
                {loading && (
                    <div className="row g-5">
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </div>
                )}
                <div className="row g-5">
                    {reposiotryInfo.map((repository: any, i: number) => (
                        <div key={i} className="col-4">
                            <div className="bg-[#3e4c5e] p-10 mx-auto rounded-lg min-h-full">
                                {repository.image !== null && (
                                    <div className="h-fit">
                                        <Image
                                            src={repository.image}
                                            className="mb-2 mx-auto"
                                            width={300}
                                            height={255}
                                            alt="repo img"
                                            placeholder="blur"
                                            blurDataURL="/images/placeholder.png"
                                        />
                                    </div>
                                )}

                                <div className="my-6">
                                    <h1 className="mb-2 font-bold text-xl">
                                        {repository.name}
                                    </h1>

                                    <h2 className="mb-4 font-bold text-xl">
                                        <span className="font-normal">
                                            Org: {repository.org}
                                        </span>
                                    </h2>
                                    <div className="flex">
                                        <p className="mb-2 font-bold">
                                            Forks:{" "}
                                            {repository?.forks && (
                                                <span className="font-normal">
                                                    {
                                                        repository?.forks[
                                                            repository?.forks
                                                                .length - 1
                                                        ].forks
                                                    }
                                                </span>
                                            )}
                                        </p>
                                        <p className="mx-5">-</p>
                                        <p className="mb-2 font-bold">
                                            Stars:{" "}
                                            <span className="font-normal">
                                                {
                                                    repository?.stars[
                                                        repository?.stars
                                                            .length - 1
                                                    ].stars
                                                }
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <p className="mb-4 font-bold">
                                            Issues:{" "}
                                            <span className="font-normal">
                                                {repository?.issues}
                                            </span>{" "}
                                        </p>
                                        <p className="mx-5">-</p>
                                        <p className="mb-4 font-bold">
                                            PR:{" "}
                                            <span className="font-normal">
                                                {repository?.pr}
                                            </span>
                                        </p>
                                    </div>

                                    <p className="mb-2 font-bold">
                                        Last Commit:{" "}
                                        <span className="font-normal">
                                            {repository?.commit}
                                        </span>
                                    </p>
                                    <p className="mb-2 font-bold">
                                        Created Data:{" "}
                                        <span className="font-normal">
                                            {repository?.create}
                                        </span>
                                    </p>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        {repository.name && (
                                            <Link
                                                href={`https://github.com/${repository.org}/${repository.name}/blob/master/README.md`}
                                                target="_blank"
                                                className="bg-[#536271] rounded-lg text-center block py-3 "
                                            >
                                                Readme
                                            </Link>
                                        )}
                                    </div>
                                    <div className="col">
                                        {repository.name && (
                                            <Link
                                                href={`https://github.com/${repository.org}/${repository.name}`}
                                                target="_blank"
                                                className="bg-[#536271] rounded-lg text-center block py-3 "
                                            >
                                                Github
                                            </Link>
                                        )}
                                    </div>
                                    <div className="col">
                                        {repository._id && (
                                            <Link
                                                href={`${repository._id}`}
                                                className="bg-[#536271] rounded-lg text-center block py-3 "
                                            >
                                                Details
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

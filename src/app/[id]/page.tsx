"use client";

import { Repository } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

async function getDetails(id: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/get/${id}`,
            {
                cache: "no-store",
                next: { revalidate: 10 },
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch details");
        }

        return res.json();
    } catch (error) {
        console.error("Details fetching error:", error);
    }
}

export default function Page({ params }: { params: any }) {
    const [reposiotryDetails, setReposiotryDetails] = useState<Repository>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDetails(params.id)
            .then((res) => {
                setReposiotryDetails(res.repositoryInfo);
                setLoading(false);
            })
            .catch((error) => console.log("error:", error));
    }, [params.id]);

    return (
        <div className="mx-auto max-w-[1320px] px-4">
            <div>
                <div className="flex flex-col items-center mb-6">
                    <h1 className="font-bold text-5xl mb-4">
                        {reposiotryDetails?.name}
                    </h1>
                    <h2 className="font-bold text-2xl">
                        {reposiotryDetails?.org}
                    </h2>
                </div>

                {reposiotryDetails?.image && (
                    <div className="row">
                        <Image
                            className="mb-10 col"
                            src={reposiotryDetails?.image}
                            width={1000}
                            height={250}
                            alt="repo img"
                            placeholder="blur"
                            blurDataURL="/images/placeholder.png"
                        />
                    </div>
                )}

                <div className="bg-[#3e4c5e] rounded-lg px-5 py-3">
                    <div className="row">
                        <div className="col-3">
                            <div className="text-center">
                                <h3 className="text-xl mb-2">Issues</h3>
                                <p>{reposiotryDetails?.issues}</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="text-center">
                                <h3 className="text-xl mb-2">Pull Requests</h3>
                                <p>{reposiotryDetails?.pr}</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="text-center">
                                <h3 className="text-xl mb-2">Last Commit</h3>
                                <p>{reposiotryDetails?.commit}</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="text-center">
                                <h3 className="text-xl mb-2">Created At</h3>
                                <p>{reposiotryDetails?.create}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <p>
                        {
                            reposiotryDetails?.forks[
                                reposiotryDetails?.forks.length - 1
                            ].forks
                        }
                    </p>
                    <p>
                        {
                            reposiotryDetails?.stars[
                                reposiotryDetails?.stars.length - 1
                            ].stars
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}

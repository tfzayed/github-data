"use client";

import { Repository } from "@/types";
import Image from "next/image";
import { useEffect, useId, useState } from "react";
import {
    CartesianGrid,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

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
    const chartId = useId();

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
                    <div className="row justify-center">
                        <Image
                            className="mb-6 col-8"
                            src={reposiotryDetails?.image}
                            width={700}
                            height={500}
                            alt="repo img"
                            placeholder="blur"
                            blurDataURL="/images/placeholder.png"
                        />
                    </div>
                )}

                <div className="bg-[#3e4c5e] rounded-lg px-5 py-3 mb-6">
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

                <div className="row justify-center">
                    <div className="col-10">
                        <div className="mb-6">
                            <h3 className="text-center text-2xl">Forks</h3>
                            <LineChart
                                id={chartId}
                                width={1000}
                                height={400}
                                data={reposiotryDetails?.forks}
                            >
                                <Line
                                    type="monotone"
                                    dataKey="forks"
                                    stroke="#8884d8"
                                />
                                <CartesianGrid stroke="#3e4c5e" />
                                <XAxis dataKey="date" stroke="#f0f8ff" />
                                <YAxis dataKey="forks" stroke="#f0f8ff" />
                                <Tooltip
                                    contentStyle={{
                                        color: "#8884d8",
                                    }}
                                />
                            </LineChart>
                        </div>
                    </div>
                    <div className="col-10">
                        <div className="mb-6">
                            <h3 className="text-center text-2xl">Stars</h3>
                            <LineChart
                                id={chartId}
                                width={1000}
                                height={400}
                                data={reposiotryDetails?.stars}
                            >
                                <Line
                                    type="monotone"
                                    dataKey="forks"
                                    stroke="#8884d8"
                                />
                                <CartesianGrid stroke="#3e4c5e" />
                                <XAxis dataKey="date" stroke="#f0f8ff" />
                                <YAxis dataKey="stars" stroke="#f0f8ff" />
                                <Tooltip
                                    contentStyle={{
                                        color: "#8884d8",
                                    }}
                                />
                            </LineChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

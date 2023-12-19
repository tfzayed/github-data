"use client";

import DetailSkeleton from "@/components/skeleton/DetailSkeleton";
import { Repository } from "@/types";
import { format, isValid } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

async function getDetails(id: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/get/${id}`
        );

        if (!res.ok) {
            throw new Error("Failed to fetch details");
        }

        return res.json();
    } catch (error) {
        console.error("Details fetching error:", error);
    }
}

export default function Page({ params }: { params: { id: string } }) {
    const chartId = useId();
    const [reposiotryDetails, setReposiotryDetails] = useState<Repository>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            getDetails(params.id)
                .then((res) => {
                    setReposiotryDetails(res.repositoryInfo);
                    setLoading(false);
                })
                .catch((error) => console.log("error:", error));
        }, 5000);
    }, [params.id]);

    const formatedForks = reposiotryDetails?.forks.map((entry) => ({
        forks: entry.forks,
        date: format(new Date(entry.date), "dd-MM-yyyy"),
    }));
    const formatedstars = reposiotryDetails?.stars.map((entry) => ({
        stars: entry.stars,
        date: format(new Date(entry.date), "dd-MM-yyyy"),
    }));

    return (
        <>
            <div className="mx-auto max-w-[1320px] px-4">
                {loading ? (
                    <DetailSkeleton />
                ) : (
                    <>
                        {/* for smaller device */}
                        <div className="lg:hidden flex flex-col items-center mb-6">
                            <Link
                                href={`https://github.com/${reposiotryDetails?.org}/${reposiotryDetails?.name}`}
                                target="_blank"
                            >
                                <h1 className="font-bold text-5xl mb-4">
                                    {reposiotryDetails?.name}
                                </h1>
                            </Link>
                            <h2 className="font-bold text-2xl">
                                {reposiotryDetails?.org}
                            </h2>
                        </div>

                        <div className="row justify-center items-center mb-6">
                            {reposiotryDetails?.image && (
                                <Image
                                    className="mb-6 lg:col-6 col-10 shadow-lg"
                                    src={reposiotryDetails?.image}
                                    width={800}
                                    height={500}
                                    alt="repo img"
                                    placeholder="blur"
                                    blurDataURL="/images/placeholder.png"
                                    priority
                                />
                            )}

                            {/* for large device */}
                            <div className="lg:col-6 col-10">
                                <div className="row justify-center">
                                    <div className="lg:block hidden mb-4 lg:col-10">
                                        <div className="flex flex-col items-center mb-6">
                                            <Link
                                                href={`https://github.com/${reposiotryDetails?.org}/${reposiotryDetails?.name}`}
                                                target="_blank"
                                            >
                                                <h1 className="font-bold text-5xl mb-4">
                                                    {reposiotryDetails?.name}
                                                </h1>
                                            </Link>
                                            <h2 className="font-bold text-2xl">
                                                {reposiotryDetails?.org}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="mb-4 lg:col-6">
                                        <div className="text-center bg-[#3e4c5e] text-white rounded-lg px-5 py-3">
                                            <h3 className="text-xl mb-2">
                                                Issues
                                            </h3>
                                            <p>{reposiotryDetails?.issues}</p>
                                        </div>
                                    </div>
                                    <div className="mb-4 lg:col-6">
                                        <div className="text-center bg-[#3e4c5e] text-white rounded-lg px-5 py-3">
                                            <h3 className="text-xl mb-2">
                                                Pull Requests
                                            </h3>
                                            <p>{reposiotryDetails?.pr}</p>
                                        </div>
                                    </div>
                                    <div className="mb-4 lg:col-6">
                                        <div className="text-center bg-[#3e4c5e] text-white rounded-lg px-5 py-3">
                                            <h3 className="text-xl mb-2">
                                                Last Commit
                                            </h3>
                                            <p>
                                                {isValid(
                                                    new Date(
                                                        reposiotryDetails?.commit!
                                                    )
                                                )
                                                    ? format(
                                                          new Date(
                                                              reposiotryDetails?.commit!
                                                          ),
                                                          "dd-MM-yyyy"
                                                      )
                                                    : "Invalid date"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mb-4 lg:col-6">
                                        <div className="text-center bg-[#3e4c5e] text-white rounded-lg px-5 py-3">
                                            <h3 className="text-xl mb-2">
                                                Released At
                                            </h3>
                                            <p>
                                                {isValid(
                                                    new Date(
                                                        reposiotryDetails?.create!
                                                    )
                                                )
                                                    ? format(
                                                          new Date(
                                                              reposiotryDetails?.create!
                                                          ),
                                                          "dd-MM-yyyy"
                                                      )
                                                    : "Invalid date"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mb-4 lg:col-6">
                                        <div className="text-center bg-[#3e4c5e] text-white rounded-lg px-5 py-3">
                                            <h3 className="text-xl mb-2">
                                                Fork
                                            </h3>
                                            <p>
                                                {
                                                    formatedForks![
                                                        formatedForks!.length -
                                                            1
                                                    ].forks
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mb-4 lg:col-6">
                                        <div className="text-center bg-[#3e4c5e] text-white rounded-lg px-5 py-3">
                                            <h3 className="text-xl mb-2">
                                                Stars
                                            </h3>
                                            <p>
                                                {
                                                    formatedstars![
                                                        formatedstars!.length -
                                                            1
                                                    ].stars
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-center text-2xl">Forks</h3>
                        <div className="responsiveChart">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    id={chartId}
                                    width={1100}
                                    height={400}
                                    data={formatedForks?.slice(-30)}
                                    margin={{
                                        top: 5,
                                        right: 50,
                                        left: 10,
                                        bottom: 5,
                                    }}
                                >
                                    <Line
                                        type="monotone"
                                        dataKey="forks"
                                        stroke="#8884d8"
                                    />
                                    <CartesianGrid stroke="#3e4c5e" />
                                    <XAxis dataKey="date" stroke="#3e4c5e" />
                                    <YAxis dataKey="forks" stroke="#3e4c5e" />
                                    <Tooltip
                                        contentStyle={{
                                            color: "#8884d8",
                                        }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <h3 className="text-center text-2xl">Stars</h3>
                        <div className="responsiveChart">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    id={chartId}
                                    width={1000}
                                    height={400}
                                    data={formatedstars?.slice(0, 30)}
                                    margin={{
                                        top: 5,
                                        right: 50,
                                        left: 10,
                                        bottom: 5,
                                    }}
                                >
                                    <Line
                                        type="monotone"
                                        dataKey="forks"
                                        stroke="#8884d8"
                                    />
                                    <CartesianGrid stroke="#3e4c5e" />
                                    <XAxis dataKey="date" />
                                    <YAxis dataKey="stars" stroke="#3e4c5e" />
                                    <Tooltip
                                        contentStyle={{
                                            color: "#8884d8",
                                        }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

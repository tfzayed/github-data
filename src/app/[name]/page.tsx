"use client";

import DetailSkeleton from "@/components/skeleton/DetailSkeleton";
import Delete from "@/components/svg/Delete";
import Pen from "@/components/svg/Pen";
import { Repository } from "@/types";
import { getDetails } from "@/utils/get";
import { titleify } from "@/utils/textConverter";
import { format, formatDistance, isValid } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import toast from "react-hot-toast";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function Page({ params }: { params: { name: string } }) {
    const { push } = useRouter();
    const chartId = useId();
    const [reposiotryDetails, setReposiotryDetails] = useState<Repository>();
    const [loading, setLoading] = useState(true);

    const deleteRepo = async (id: string) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/delete/${id}`,
                {
                    method: "DELETE",
                    body: JSON.stringify(id),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const response = await res.json();
            const statusCode = res.status;
            if (statusCode === 200) {
                push("/");
                toast.success(response.success);
            } else {
                toast.error(response.error);
            }
        } catch (error) {
            toast.error("Delete Failed");
        }
    };

    useEffect(() => {
        getDetails(params.name)
            .then((res) => {
                setReposiotryDetails(res.repositoryInfo);
                setLoading(false);
            })
            .catch((error) => console.log("error:", error));
    }, [params.name]);

    return (
        <>
            <div className="mx-auto max-w-[1320px] px-4">
                {loading ? (
                    <DetailSkeleton />
                ) : (
                    <>
                        {/* for smaller device */}
                        <div className="lg:hidden flex flex-col items-center">
                            <Link
                                href={`https://github.com/${reposiotryDetails?.org}/${reposiotryDetails?.name}`}
                                target="_blank"
                            >
                                {reposiotryDetails?.name && (
                                    <h1 className="font-bold text-5xl mb-2">
                                        {titleify(reposiotryDetails?.name)}
                                    </h1>
                                )}
                            </Link>
                            <h2 className="font-bold text-2xl">
                                {reposiotryDetails?.org}
                            </h2>
                        </div>
                        <div className="row justify-center items-center mb-6">
                            {reposiotryDetails?.image && (
                                <Image
                                    className="mb-6 p-5 rounded-lg lg:col-6 col-10 shadow-lg"
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
                                <div className="lg:block hidden mb-4 lg:col-12">
                                    <div className="flex items-center">
                                        <Link
                                            href={`https://github.com/${reposiotryDetails?.org}/${reposiotryDetails?.name}`}
                                            target="_blank"
                                        >
                                            <h1 className="font-bold text-5xl mb-2 mr-4">
                                                {titleify(
                                                    reposiotryDetails?.name!
                                                )}
                                            </h1>
                                        </Link>
                                        <Link
                                            href={`update/${reposiotryDetails?.name}`}
                                            className="font-bold text-4xl mr-2"
                                        >
                                            <Pen />
                                        </Link>
                                    </div>
                                    <h2 className="font-bold text-2xl mb-2">
                                        {reposiotryDetails?.org}
                                    </h2>
                                </div>
                                <div className="row justify-center">
                                    {/* info */}
                                    <div className="mb-4 col-6">
                                        <div className="flex justify-center items-center text-center bg-info rounded-lg px-5 py-5">
                                            <h3 className="text-xl">
                                                Stars:{" "}
                                                {
                                                    reposiotryDetails?.stars![
                                                        reposiotryDetails?.stars!
                                                            .length - 1
                                                    ].stars
                                                }
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="mb-4 col-6">
                                        <div className="flex justify-center items-center text-center bg-info rounded-lg px-5 py-5">
                                            <h3 className="text-xl">
                                                Fork:{" "}
                                                {
                                                    reposiotryDetails?.forks![
                                                        reposiotryDetails?.forks!
                                                            .length - 1
                                                    ].forks
                                                }
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="mb-4 col-6">
                                        <div className="flex justify-center items-center text-center bg-info rounded-lg px-5 py-5">
                                            <h3 className="text-xl">
                                                Issues:{" "}
                                                {reposiotryDetails?.issues}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="mb-4 col-6">
                                        <div className="flex justify-center items-center text-center bg-info rounded-lg px-5 py-5">
                                            <h3 className="text-xl">
                                                Pull Requests:{" "}
                                                {reposiotryDetails?.pr}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="mb-4 col-12">
                                        <div className="flex justify-center items-center text-center bg-info rounded-lg px-5 py-5">
                                            <h3 className="text-xl">
                                                Last Commit:{" "}
                                                {formatDistance(
                                                    new Date(
                                                        reposiotryDetails?.commit!
                                                    ),
                                                    new Date(),
                                                    { addSuffix: true }
                                                )}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="mb-4 col-12">
                                        <div className="flex justify-center items-center text-center bg-info rounded-lg px-5 py-5">
                                            <h3 className="text-xl">
                                                Released At:{" "}
                                                {isValid(
                                                    new Date(
                                                        reposiotryDetails?.create!
                                                    )
                                                )
                                                    ? format(
                                                          new Date(
                                                              reposiotryDetails?.create!
                                                          ),
                                                          "do MMMM, yyyy"
                                                      )
                                                    : "Invalid date"}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 lg:col-6">
                                <h3 className="text-center text-2xl">Stars</h3>
                                <div className="responsiveChart">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <LineChart
                                            id={chartId}
                                            width={1000}
                                            height={400}
                                            data={reposiotryDetails?.stars?.slice(
                                                -30
                                            )}
                                            margin={{
                                                top: 5,
                                                right: 50,
                                                left: 10,
                                                bottom: 5,
                                            }}
                                        >
                                            <Line
                                                type="monotone"
                                                dataKey="stars"
                                                stroke="#8884d8"
                                            />
                                            <CartesianGrid stroke="#3e4c5e" />
                                            <XAxis dataKey="date" />
                                            <YAxis
                                                dataKey="stars"
                                                stroke="#3e4c5e"
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    color: "#8884d8",
                                                }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="col-12 lg:col-6">
                                <h3 className="text-center text-2xl">Forks</h3>
                                <div className="responsiveChart">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <LineChart
                                            id={chartId}
                                            width={1100}
                                            height={400}
                                            data={reposiotryDetails?.forks?.slice(
                                                -30
                                            )}
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
                                            <XAxis
                                                dataKey="date"
                                                stroke="#3e4c5e"
                                            />
                                            <YAxis
                                                dataKey="forks"
                                                stroke="#3e4c5e"
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    color: "#8884d8",
                                                }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            {reposiotryDetails?._id && (
                                <div className="flex justify-center mt-10">
                                    <button
                                        onClick={() =>
                                            deleteRepo(reposiotryDetails?._id)
                                        }
                                        className="text-white bg-red-500 rounded-lg text-center px-20 py-3 w-fit flex items-center"
                                    >
                                        <span className="mr-2">Delete</span>{" "}
                                        <Delete />
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Github({
    name,
    org,
    image,
    token,
}: {
    name: any;
    org: any;
    image: any;
    token: any;
}) {
    const [repositoryData, setRepositoryData]: [
        repositoryData: any,
        setRepositoryData: any
    ] = useState([]);

    // get from gitapi
    useEffect(() => {
        const getRepository = async () => {
            try {
                const [res, prRes] = await Promise.all([
                    fetch(`https://api.github.com/repos/${org}/${name}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    fetch(`https://api.github.com/repos/${org}/${name}/pulls`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                ]);

                const getRepositoryInfo = await res.json();
                const prData = await prRes.json();
                const updatedRepositoryData = {
                    ...getRepositoryInfo,
                    pull: prData.length,
                };

                setRepositoryData(updatedRepositoryData);
            } catch (error) {
                console.error("Error fetching GitHub repo data", error);
            }
        };
        getRepository();
    }, [name, org, token]);

    // post to mongodb
    useEffect(() => {
        const postRepositoryData = async () => {
            try {
                const repository = {
                    name: name,
                    org: org,
                    forks: repositoryData.forks,
                    stars: repositoryData.stargazers_count,
                    commit: new Date(
                        repositoryData?.pushed_at
                    ).toLocaleDateString(),
                    create: new Date(
                        repositoryData?.created_at
                    ).toLocaleDateString(),
                };
                const res = await fetch("http://localhost:3000/api/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(repository),
                });
            } catch (error) {
                console.error("Error posting repositoryData to server", error);
            }
        };

        if (repositoryData.name) {
            postRepositoryData();
        }
    }, [name, org, repositoryData]);

    return (
        <div className="col-4">
            <div className="bg-[#3e4c5e] p-10 mx-auto rounded-lg min-w-full min-h-full">
                <div className="">
                    <div>
                        {image !== null && (
                            <Image
                                src={image}
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
                            <h1 className="mb-2 font-bold text-xl">{name}</h1>
                            <h2 className="mb-4 font-bold text-xl">
                                <span className="font-normal">Org: {org}</span>
                            </h2>
                            <div className="flex">
                                <p className="mb-2 font-bold">
                                    Forks:{" "}
                                    <span className="font-normal">
                                        {repositoryData?.forks}
                                    </span>
                                </p>
                                <p className="mx-5">-</p>
                                <p className="mb-2 font-bold">
                                    Stars:{" "}
                                    <span className="font-normal">
                                        {repositoryData?.stargazers_count}
                                    </span>
                                </p>
                            </div>
                            <div className="flex">
                                <p className="mb-4 font-bold">
                                    Issues:{" "}
                                    <span className="font-normal">
                                        {repositoryData?.open_issues}
                                    </span>{" "}
                                </p>
                                <p className="mx-5">-</p>
                                <p className="mb-4 font-bold">
                                    PR:{" "}
                                    <span className="font-normal">
                                        {repositoryData?.pull}
                                    </span>
                                </p>
                            </div>

                            <p className="mb-2 font-bold">
                                Last Commit:{" "}
                                <span className="font-normal">
                                    {new Date(
                                        repositoryData?.pushed_at
                                    ).toLocaleDateString()}
                                </span>
                            </p>
                            <p className="mb-2 font-bold">
                                Created Data:{" "}
                                <span className="font-normal">
                                    {new Date(
                                        repositoryData?.created_at
                                    ).toLocaleDateString()}
                                </span>
                            </p>
                        </div>
                        <div>
                            <div className="row justify-center">
                                <div className="col-6">
                                    {repositoryData?.html_url && (
                                        <Link
                                            href={`${repositoryData?.html_url}/blob/master/README.md`}
                                            target="_blank"
                                            className="bg-[#536271] rounded-lg text-center py-3 block"
                                        >
                                            Readme
                                        </Link>
                                    )}
                                </div>
                                <div className="col-6">
                                    {repositoryData?.html_url && (
                                        <Link
                                            href={repositoryData?.html_url}
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
    );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Github({
    gitRepo,
    token,
}: {
    gitRepo: any;
    token: any;
}) {
    const [repoData, setRepoData]: [repoData: any, setRepoData: any] = useState(
        []
    );

    // get from gitapi
    useEffect(() => {
        const getRepo = async () => {
            try {
                const res = await fetch(
                    `https://api.github.com/repos/${gitRepo}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const repoInfo = await res.json();

                const prRes = await fetch(
                    `https://api.github.com/repos/${gitRepo}/pulls`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const prData = await prRes.json();
                const updatedRepoData = {
                    ...repoInfo,
                    pull: prData.length,
                };

                setRepoData(updatedRepoData);
            } catch (error) {
                console.error("Error fetching GitHub repo data", error);
            }
        };
        getRepo();
    }, [gitRepo, token]);

    // post to mongodb
    useEffect(() => {
        const postRepo = async () => {
            try {
                const repo = {
                    name: repoData.name,
                    forks: repoData.forks,
                    stars: repoData.stargazers_count,
                    commit: new Date(repoData?.pushed_at).toLocaleDateString(),
                    create: new Date(repoData?.created_at).toLocaleDateString(),
                };
                const res = await fetch("http://localhost:3000/api/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(repo),
                });
            } catch (error) {
                console.error("Error posting repoData to server", error);
            }
        };

        if (repoData.name) {
            postRepo();
        }
    }, [repoData]);

    return (
        <div className="col-3">
            <div className="bg-[#3e4c5e] p-6 mx-auto rounded-lg w-fit">
                {repoData?.name && (
                    <Image
                        src={`/images/${repoData?.name}.jpg`}
                        className="mb-2 mx-auto"
                        width={250}
                        height={188}
                        alt="repo img"
                        placeholder="blur"
                        blurDataURL="/images/placeholder.png"
                        priority
                    />
                )}

                <div className="my-6">
                    <h1 className="mb-4 font-bold text-xl">{repoData?.name}</h1>
                    <p className="mb-2 font-bold">
                        Forks:{" "}
                        <span className="font-normal">{repoData?.forks}</span> -
                        Stars:{" "}
                        <span className="font-normal">
                            {repoData?.stargazers_count}
                        </span>
                    </p>
                    <p className="mb-4 font-bold">
                        Issues:{" "}
                        <span className="font-normal">
                            {repoData?.open_issues}
                        </span>{" "}
                        - PR:{" "}
                        <span className="font-normal">{repoData?.pull}</span>
                    </p>
                    <p className="mb-2 font-bold">
                        Last Commit:{" "}
                        <span className="font-normal">
                            {new Date(repoData?.pushed_at).toLocaleDateString()}
                        </span>
                    </p>
                    <p className="mb-2 font-bold">
                        Created Data:{" "}
                        <span className="font-normal">
                            {new Date(
                                repoData?.created_at
                            ).toLocaleDateString()}
                        </span>
                    </p>
                </div>
                <div>
                    <div className="row justify-evenly">
                        <div className="col-6">
                            <div className="">
                                <Link
                                    href={`https://github.com/${gitRepo}/blob/master/README.md`}
                                    target="_blank"
                                    className="bg-[#536271] rounded-lg px-6 py-2 "
                                >
                                    Readme
                                </Link>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="">
                                <Link
                                    href={`https://github.com/${gitRepo}`}
                                    className="bg-[#536271] rounded-lg px-6 py-2"
                                >
                                    Github
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

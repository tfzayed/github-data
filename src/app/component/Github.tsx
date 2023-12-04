"use client";

import { useEffect, useState } from "react";

export default function Github({
    name,
    org,
    token,
}: {
    name: any;
    org: any;
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
                if (name && org) {
                    const [res, prRes] = await Promise.all([
                        fetch(`https://api.github.com/repos/${org}/${name}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }),
                        fetch(
                            `https://api.github.com/repos/${org}/${name}/pulls`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        ),
                    ]);

                    const getRepositoryInfo = await res.json();
                    const prData = await prRes.json();
                    const updatedRepositoryData = {
                        ...getRepositoryInfo,
                        pull: prData.length,
                    };

                    setRepositoryData(updatedRepositoryData);
                }
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
        <>
            <div className="flex">
                <p className="mb-2 font-bold">
                    Forks:{" "}
                    <span className="font-normal">{repositoryData?.forks}</span>
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
                    <span className="font-normal">{repositoryData?.pull}</span>
                </p>
            </div>

            <p className="mb-2 font-bold">
                Last Commit:{" "}
                <span className="font-normal">
                    {new Date(repositoryData?.pushed_at).toLocaleDateString()}
                </span>
            </p>
            <p className="mb-2 font-bold">
                Created Data:{" "}
                <span className="font-normal">
                    {new Date(repositoryData?.created_at).toLocaleDateString()}
                </span>
            </p>
        </>
    );
}

"use client";

import { Repository, RepositoryInfo } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
    const { push } = useRouter();
    const [loading, setLoading] = useState(false);
    const [reposiotryDetails, setReposiotryDetails] = useState<Repository>();

    let updatedRepositoryInfo: RepositoryInfo;
    const onSubmit = (e: any) => {
        e.preventDefault();
        updatedRepositoryInfo = {
            id: params.id,
            name: e.target.name.value,
            org: e.target.org.value,
            image: e.target.img.value,
        };
        if (updatedRepositoryInfo) updateRepositoryInfo(updatedRepositoryInfo);
    };

    const updateRepositoryInfo = async (repositoryInfo: RepositoryInfo) => {
        try {
            setLoading(true);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/update`,
                {
                    method: "POST",
                    body: JSON.stringify(repositoryInfo),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const response = await res.json();
            const statusCode = res.status;
            if (statusCode === 200) {
                toast.success(response.success);
                push("/");
            } else {
                toast.error(response.error);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("Error updating repositoryInfo to server");
        }
    };

    useEffect(() => {
        getDetails(params.id)
            .then((res) => {
                setReposiotryDetails(res.repositoryInfo);
            })
            .catch((error) => console.log("error:", error));
    }, [params.id]);

    return (
        <>
            <h1 className="text-center font-bold text-5xl mb-10">
                Update Repository Info
            </h1>
            <div className="mx-auto max-w-[1320px] px-4">
                <div className="row justify-center">
                    <div className="col-10">
                        <form className="" onSubmit={onSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="text-lg">
                                    Name
                                </label>
                                <input
                                    defaultValue={reposiotryDetails?.name}
                                    id="name"
                                    name="name"
                                    className="h-14 my-2 p-2 border border-[#5b6a7e] focus:outline-none  w-full rounded "
                                    placeholder="statichunt"
                                    type="text"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="org" className="text-lg">
                                    Org
                                </label>
                                <input
                                    defaultValue={reposiotryDetails?.org}
                                    id="org"
                                    name="org"
                                    className="h-14 my-2 p-2 border border-[#5b6a7e] focus:outline-none  w-full rounded "
                                    placeholder="statichunt"
                                    type="text"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="img" className="text-lg">
                                    Image Url{" "}
                                </label>
                                <input
                                    defaultValue={reposiotryDetails?.image}
                                    id="img"
                                    name="img"
                                    className="h-14 my-2 p-2 border border-[#5b6a7e] focus:outline-none  w-full rounded "
                                    placeholder="https://placehold.co/1500x1000/png?text=Statichunt"
                                    type="text"
                                />
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-[#505f75] rounded-lg text-center px-10 py-3"
                            >
                                {loading ? "Updating..." : "Update"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

"use client";

import { Repository, RepositoryInfo } from "@/types";
import { getDetails } from "@/utils/get";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page({ params }: { params: { name: string } }) {
    const { back } = useRouter();
    const [loading, setLoading] = useState(false);
    const [reposiotryDetails, setReposiotryDetails] = useState<Repository>();

    let updatedRepositoryInfo: RepositoryInfo;
    const onSubmit = (e: any) => {
        e.preventDefault();
        updatedRepositoryInfo = {
            id: reposiotryDetails?.id,
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
                back();
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
        getDetails(params.name)
            .then((res) => {
                setReposiotryDetails(res.repositoryInfo);
            })
            .catch((error) => console.log("error:", error));
    }, [params.name]);

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
                                    Repository Name
                                </label>
                                <input
                                    defaultValue={reposiotryDetails?.name}
                                    id="name"
                                    name="name"
                                    className="h-14 my-2 p-2 border border-border focus:outline-none  w-full rounded "
                                    type="text"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="org" className="text-lg">
                                    Organization
                                </label>
                                <input
                                    defaultValue={reposiotryDetails?.org}
                                    id="org"
                                    name="org"
                                    className="h-14 my-2 p-2 border border-border focus:outline-none  w-full rounded "
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
                                    className="h-14 my-2 p-2 border border-border focus:outline-none  w-full rounded "
                                    type="text"
                                />
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-accent rounded-lg text-center px-10 py-3"
                                disabled={loading}
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

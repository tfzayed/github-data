"use client";

import { RepositoryInfo } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Add() {
    const [loading, setLoading] = useState(false);
    const { push } = useRouter();
    let repositoryInfo: RepositoryInfo;

    const onSubmit = (e: any) => {
        e.preventDefault();

        repositoryInfo = {
            name: e.target.name.value,
            org: e.target.org.value,
            image: e.target.img.value,
        };

        if (repositoryInfo) postRepositoryInfo(repositoryInfo);
    };

    const postRepositoryInfo = async (repositoryInfo: RepositoryInfo) => {
        try {
            setLoading(true);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/add`,
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
            toast.error("Error posting repositoryData to server");
        }
    };

    return (
        <>
            <h1 className="text-center font-bold text-5xl mb-10">
                Add New Repository
            </h1>
            <div className="mx-auto max-w-[1320px] px-4">
                <div className="row justify-center">
                    <div className="col-10">
                        <form className="" onSubmit={onSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="text-lg">
                                    Repository Name{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    className="h-14 my-2 p-2 border border-border focus:outline-none  w-full rounded "
                                    placeholder="statichunt"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="org" className="text-lg">
                                    Organization{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="org"
                                    name="org"
                                    className="h-14 my-2 p-2 border border-border focus:outline-none  w-full rounded "
                                    placeholder="statichunt"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="img" className="text-lg">
                                    Image Url{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="img"
                                    name="img"
                                    className="h-14 my-2 p-2 border border-border focus:outline-none  w-full rounded "
                                    placeholder="https://placehold.co/1500x1000/png?text=Statichunt"
                                    type="text"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-accent rounded-lg text-center px-10 py-3"
                                disabled={loading}
                            >
                                {loading ? "Adding..." : "Add"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

"use client";

import RepoCard from "@/components/home/RepoCard";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import { Repository } from "@/types";
import { useEffect, useId, useState } from "react";
import ReactSelect, { MultiValue } from "react-select";

async function getData() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/get`
        );

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        return res.json();
    } catch (error) {
        console.error("Initail Data fetching error:", error);
    }
}

export default function Home() {
    const uid = useId();
    const [reposiotryInfo, setReposiotryInfo] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // update repository info from github api
    const updateInfo = async () => {
        setUpdating(true),
            await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api`),
            setUpdating(false),
            window.location.reload();
    };

    // filter repository
    const [filterValue, setFilterValue] = useState<
        MultiValue<
            | {
                  value: string;
                  label: string;
              }
            | undefined
        >
    >();
    const filterOptions = [
        { value: "themefisher", label: "Themefisher" },
        { value: "statichunt", label: "Statichunt" },
        { value: "gethugothemes", label: "Gethugothemes" },
    ];

    // sorting reposiotry
    const [selectedValue, setSelectedValue] = useState<{
        value: string;
        label: string;
    }>({ value: "stars", label: "Stars" });
    const sortOptions = [
        { value: "all", label: "A-Z" },
        { value: "stars", label: "Stars" },
        { value: "forks", label: "Forks" },
        { value: "commit", label: "Update" },
    ];
    switch (selectedValue.value) {
        case "all":
            reposiotryInfo.sort((a, b) => a.name.localeCompare(b.name));
            break;

        case "commit":
            reposiotryInfo.sort(
                (a, b) =>
                    (new Date(b.commit) as any) - (new Date(a.commit) as any)
            );
            break;

        case "forks":
            reposiotryInfo.sort(
                (a: Repository, b: Repository) =>
                    b.forks[b.forks.length - 1].forks -
                    a.forks[a.forks.length - 1].forks
            );
            break;

        case "stars":
            reposiotryInfo.sort(
                (a: Repository, b: Repository) =>
                    b.stars[b.stars.length - 1].stars -
                    a.stars[a.stars.length - 1].stars
            );
            break;
    }

    // get repository info from mongodb
    useEffect(() => {
        getData()
            .then((res: { repositoryInfo: Repository[] }) => {
                setReposiotryInfo(res.repositoryInfo);
                setLoading(false);
            })
            .catch((error) => console.log("error:", error));
    }, []);

    return (
        <>
            <div className="flex flex-col lg:flex-row justify-center items-center mb-10">
                <h1 className="font-bold text-5xl lg:mr-10 mb-2 lg:mb-0">
                    Repositories
                </h1>
                <button
                    className="text-white bg-[#505f75] rounded-lg text-center px-10 py-3"
                    onClick={updateInfo}
                    disabled={updating}
                >
                    {updating ? "updating...." : "update info"}
                </button>
            </div>
            <div className="mx-auto max-w-[1320px] px-2 md:px-4">
                <div className="flex justify-end items-center mb-2">
                    <ReactSelect
                        className="mr-2"
                        isMulti
                        instanceId={uid}
                        closeMenuOnSelect={false}
                        options={filterOptions}
                        value={filterValue}
                        onChange={(value) => {
                            setFilterValue(value);
                        }}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary25: "white",
                                primary: "#3e4c5e",
                                neutral0: "white",
                            },
                        })}
                        styles={{
                            control: (styles) => ({
                                ...styles,
                                backgroundColor: "white",
                            }),
                            multiValue: (styles) => {
                                return {
                                    ...styles,
                                    alignItems: "center",
                                    backgroundColor: "#4d5f75",
                                };
                            },
                            multiValueLabel: (styles) => {
                                return {
                                    ...styles,
                                    color: "#fff",
                                };
                            },
                            multiValueRemove: (styles) => {
                                return {
                                    ...styles,
                                    color: "#2f3a47",
                                    cursor: "pointer",
                                    ":hover": {
                                        color: "red",
                                    },
                                };
                            },
                        }}
                    />
                    <ReactSelect
                        className=""
                        instanceId={uid}
                        options={sortOptions}
                        value={selectedValue}
                        onChange={(value) => {
                            setSelectedValue(value!);
                        }}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary25: "white",
                                primary: "#3e4c5e",
                                neutral0: "white",
                            },
                        })}
                        styles={{
                            control: (styles) => ({
                                ...styles,
                                backgroundColor: "white",
                            }),
                            container: (styles) => ({
                                ...styles,
                                width: "10%",
                            }),
                        }}
                    />
                </div>

                {loading && (
                    <div className="row g-5">
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                    </div>
                )}
                <div className="row justify-center g-5">
                    {reposiotryInfo.map((repository: Repository, i: number) => (
                        <RepoCard key={i} repository={repository} />
                    ))}
                </div>
            </div>
        </>
    );
}

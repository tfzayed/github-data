"use client";

import RepoCard from "@/components/home/RepoCard";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import { Repository } from "@/types";
import { getData } from "@/utils/get";
import { useEffect, useId, useState } from "react";
import ReactSelect, { MultiValue } from "react-select";

export default function Home() {
    const uid = useId();
    const [reposiotryInfo, setReposiotryInfo] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // update repository info from github api
    const updateInfo = async () => {
        setUpdating(true),
            await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/db-sync`),
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
    const selectedOrg = filterValue?.map((item) => item?.value);
    const filteredRepos =
        selectedOrg && selectedOrg.length > 0
            ? reposiotryInfo.filter((item) => selectedOrg.includes(item.org))
            : reposiotryInfo;

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
            filteredRepos.sort((a, b) => a.name.localeCompare(b.name));
            break;

        case "commit":
            filteredRepos.sort(
                (a, b) =>
                    (new Date(b.commit) as any) - (new Date(a.commit) as any)
            );
            break;

        case "forks":
            filteredRepos.sort(
                (a: Repository, b: Repository) =>
                    b.forks[b.forks.length - 1].forks -
                    a.forks[a.forks.length - 1].forks
            );
            break;

        case "stars":
            filteredRepos.sort(
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
                <h1 className="font-bold text-5xl lg:mr-6 mb-2 lg:mb-0">
                    Repositories
                </h1>
                <button
                    className="text-white bg-accent rounded-lg text-center px-10 py-3"
                    onClick={updateInfo}
                    disabled={updating}
                >
                    {updating ? "updating...." : "update info"}
                </button>
            </div>
            <div className="mx-auto max-w-[1320px] px-2 md:px-4">
                <div className="row justify-end g-2 mb-2">
                    <div className="col-auto">
                        {/* org select */}
                        <ReactSelect
                            isMulti
                            instanceId={uid}
                            placeholder="Organizations"
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
                                container: (styles) => ({
                                    ...styles,
                                    alignItems: "center",
                                    fontSize: "1.3rem",
                                    minWidth: "20%",
                                    minHeight: "30px",
                                }),
                                control: (styles) => ({
                                    ...styles,
                                    backgroundColor: "white",
                                }),
                                multiValue: (styles) => {
                                    return {
                                        ...styles,
                                        fontSize: "1.5rem",
                                        alignItems: "center",
                                        height: "30px",
                                        backgroundColor: "#a4b0bf",
                                    };
                                },
                                multiValueLabel: (styles) => {
                                    return {
                                        ...styles,
                                        color: "#2c3d55",
                                    };
                                },
                                multiValueRemove: (styles) => {
                                    return {
                                        ...styles,
                                        color: "#000",
                                        cursor: "pointer",
                                        ":hover": {
                                            color: "red",
                                        },
                                    };
                                },
                            }}
                        />
                    </div>
                    <div className="col-auto">
                        {/* sort select */}
                        <ReactSelect
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
                                container: (styles) => ({
                                    ...styles,
                                    alignItems: "center",
                                    fontSize: "1.3rem",
                                    minWidth: "15%",
                                    minHeight: "30px",
                                }),
                                control: (styles) => ({
                                    ...styles,
                                    backgroundColor: "white",
                                }),
                            }}
                        />
                    </div>
                </div>

                {loading && (
                    <div className="row justify-center g-5">
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                    </div>
                )}
                <div className="row justify-center g-5">
                    {filteredRepos.map((repository: Repository, i: number) => (
                        <RepoCard key={i} repository={repository} />
                    ))}
                </div>
            </div>
        </>
    );
}

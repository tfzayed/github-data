"use client";

import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import reactSelectAnimated from "react-select/animated";
("react-select/animated");

async function getData() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/get`,
            {
                cache: "no-store",
                next: { revalidate: 10 },
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        return res.json();
    } catch (error) {
        console.error("Initail Data fetching error:", error);
    }
}

export default function Page() {
    const [reposiotryInfo, setReposiotryInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const animatedComponents = reactSelectAnimated();

    useEffect(() => {
        getData()
            .then((res) => {
                setReposiotryInfo(res.repositoryInfo), setLoading(false);
            })
            .catch((error) => console.log("error:", error));
    }, []);

    const data = [
        { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
        { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
        { value: "purple", label: "Purple", color: "#5243AA" },
        { value: "red", label: "Red", color: "#FF5630", isFixed: true },
        { value: "orange", label: "Orange", color: "#FF8B00" },
        { value: "yellow", label: "Yellow", color: "#FFC400" },
        { value: "green", label: "Green", color: "#36B37E" },
        { value: "forest", label: "Forest", color: "#00875A" },
        { value: "slate", label: "Slate", color: "#253858" },
        { value: "silver", label: "Silver", color: "#666666" },
    ];

    return (
        <div>
            <ReactSelect
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={data}
            />
        </div>
    );
}

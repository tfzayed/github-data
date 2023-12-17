"use client";

import { Repository } from "@/types";
import { useState } from "react";
import AsyncSelect from "react-select/async";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

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
        return [];
    }
}

export default function Page() {
    const [inputValue, setValue] = useState();
    const [selectedValue, setSelectedValue] = useState<Repository[]>([]);

    const fetchData = async (inputValue: string) => {
        const res = await getData();
        if (res && res.repositoryInfo) {
            const datas = res.repositoryInfo;
            const filteredValues = datas
                .sort(
                    (a: any, b: any) =>
                        b.forks[b.forks.length - 1].forks -
                        a.forks[a.forks.length - 1].forks
                )
                .filter((data: any) => data.name.includes(inputValue));

            setSelectedValue(filteredValues.slice(0, 5));
            return filteredValues;
        }
        return [];
    };

    const formattedData = selectedValue.map((dataSet, index) => ({
        id: index,
        name: dataSet.name,
        forks: dataSet.forks.map((entry) => ({
            date: entry.date,
            forks: entry.forks,
        })),
        stars: dataSet.stars.map((entry) => ({
            date: entry.date,
            stars: entry.stars,
        })),
    }));

    return (
        <div className="mx-auto max-w-[1320px] px-4">
            <div className="row justify-center">
                <div className="col-10 mb-16">
                    <AsyncSelect
                        cacheOptions
                        defaultOptions
                        isMulti
                        closeMenuOnSelect={false}
                        loadOptions={fetchData}
                        getOptionLabel={(e: any) => e.name}
                        getOptionValue={(e: any) => e.name}
                        value={selectedValue}
                        instanceId="select-box"
                        onInputChange={(value: any) => {
                            setValue(value);
                        }}
                        onChange={(value: any) => {
                            setSelectedValue(value);
                        }}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                                ...theme.colors,
                                primary25: "#536271",
                                primary: "black",
                                neutral0: "#3e4c5e",
                                primary75: "red",
                            },
                        })}
                    />
                </div>

                <div className="col-10">
                    <div className="mb-8">
                        <h3 className="text-center text-2xl">Forks</h3>
                        <LineChart width={1000} height={400} id="linechart">
                            <XAxis
                                dataKey="date"
                                stroke="#f0f8ff"
                                allowDuplicatedCategory={false}
                            />
                            <YAxis dataKey="forks" stroke="#f0f8ff" />
                            <CartesianGrid stroke="#3e4c5e" />
                            <Tooltip contentStyle={{ color: "#8884d8" }} />
                            <Legend />
                            {formattedData.map((dataSet) => (
                                <Line
                                    key={dataSet.id}
                                    type="monotone"
                                    dataKey="forks"
                                    data={dataSet.forks.slice(0, 30)}
                                    name={dataSet.name}
                                    stroke={`#${Math.floor(
                                        Math.random() * 16777215
                                    ).toString(16)}`}
                                />
                            ))}
                        </LineChart>
                    </div>

                    <div>
                        <h3 className="text-center text-2xl">Stars</h3>
                        <LineChart width={1000} height={400} id="linechart">
                            <XAxis
                                dataKey="date"
                                stroke="#f0f8ff"
                                allowDuplicatedCategory={false}
                            />
                            <YAxis dataKey="stars" stroke="#f0f8ff" />
                            <CartesianGrid stroke="#3e4c5e" />
                            <Tooltip contentStyle={{ color: "#8884d8" }} />
                            <Legend />
                            {formattedData.map((dataSet) => (
                                <Line
                                    key={dataSet.id}
                                    type="monotone"
                                    dataKey="stars"
                                    data={dataSet.stars}
                                    name={dataSet.name}
                                    stroke={`#${Math.floor(
                                        Math.random() * 16777215
                                    ).toString(16)}`}
                                />
                            ))}
                        </LineChart>
                    </div>
                </div>
            </div>
        </div>
    );
}

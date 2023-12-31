"use client";

import { Repository } from "@/types";
import { getData } from "@/utils/get";
import { useId, useState } from "react";
import { MultiValue } from "react-select";
import AsyncSelect from "react-select/async";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function Page() {
    const uid = useId();
    const [inputValue, setValue] = useState<string>();
    const [selectedValue, setSelectedValue] = useState<MultiValue<Repository>>(
        []
    );

    const fetchData = async (inputValue: string) => {
        const res = await getData();
        if (res && res.repositoryInfo) {
            const datas = res.repositoryInfo;
            const filteredValues = datas
                .sort(
                    (a: Repository, b: Repository) =>
                        b.stars[b.stars.length - 1].stars -
                        a.stars[a.stars.length - 1].stars
                )
                .filter((data: Repository) => data.name.includes(inputValue));

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
            <AsyncSelect
                cacheOptions
                defaultOptions
                isMulti
                closeMenuOnSelect={false}
                loadOptions={fetchData}
                getOptionLabel={(event: Repository) => event.name}
                getOptionValue={(event: Repository) => event.name}
                value={selectedValue}
                instanceId={uid}
                onInputChange={(value) => {
                    setValue(value);
                }}
                onChange={(value) => {
                    setSelectedValue(value);
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

            <h3 className="text-center text-2xl mt-10">Stars</h3>
            <div className="responsiveChart-lg">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart width={1000} height={400} id={uid}>
                        <XAxis
                            dataKey="date"
                            stroke="#3e4c5e"
                            allowDuplicatedCategory={false}
                        />
                        <YAxis dataKey="stars" stroke="#3e4c5e" />
                        <CartesianGrid stroke="#3e4c5e" />
                        <Tooltip contentStyle={{ color: "#8884d8" }} />
                        <Legend />
                        {formattedData.map((dataSet) => (
                            <Line
                                key={dataSet.id}
                                type="monotone"
                                dataKey="stars"
                                data={dataSet.stars.slice(-30)}
                                name={dataSet.name}
                                stroke={`#${Math.floor(
                                    Math.random() * 16777215
                                ).toString(16)}`}
                                strokeWidth={3}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <h3 className="text-center text-2xl mt-10">Forks</h3>
            <div className="responsiveChart-lg">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart width={1000} height={400}>
                        <XAxis
                            dataKey="date"
                            stroke="#3e4c5e"
                            allowDuplicatedCategory={false}
                        />
                        <YAxis dataKey="forks" stroke="#3e4c5e" />
                        <CartesianGrid stroke="#3e4c5e" />
                        <Tooltip contentStyle={{ color: "#8884d8" }} />
                        <Legend />
                        {formattedData.map((dataSet) => (
                            <Line
                                key={dataSet.id}
                                type="monotone"
                                dataKey="forks"
                                data={dataSet.forks.slice(-30)}
                                name={dataSet.name}
                                stroke={`#${Math.floor(
                                    Math.random() * 16777215
                                ).toString(16)}`}
                                strokeWidth={3}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

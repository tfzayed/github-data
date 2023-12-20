import connectDB from "@/lib/db";
import RepositoryModel from "@/model/RepoModel";
import { fetchRepositoryData } from "@/utils/fetch";
import { NextRequest, NextResponse } from "next/server";

const getCorsHeaders = (origin: string) => {
    const headers = {
        "Access-Control-Allow-Methods": `${process.env.ALLOWED_METHODS}`,
        "Access-Control-Allow-Headers": `${process.env.ALLOWED_HEADERS}`,
        "Access-Control-Allow-Origin": `${process.env.DOMAIN_URL}`,
    };

    if (!process.env.ALLOWED_ORIGIN || !origin) return headers;

    const allowedOrigins = process.env.ALLOWED_ORIGIN.split(",");

    if (allowedOrigins.includes("*")) {
        headers["Access-Control-Allow-Origin"] = "*";
    } else if (allowedOrigins.includes(origin)) {
        headers["Access-Control-Allow-Origin"] = origin;
    }

    return headers;
};
export const OPTIONS = async (request: NextRequest) => {
    return NextResponse.json(
        {},
        {
            status: 200,
            headers: getCorsHeaders(request.headers.get("origin") || ""),
        }
    );
};

export async function POST(req: Request) {
    const body = await req.json();

    await connectDB();

    try {
        const existingRepositoryInfo = await RepositoryModel.findOne({
            name: body.name,
            org: body.org,
        });

        if (existingRepositoryInfo && existingRepositoryInfo.name) {
            return NextResponse.json(
                {
                    error: "Repository already exists",
                },
                {
                    status: 550,
                    headers: getCorsHeaders(req.headers.get("origin") || ""),
                }
            );
        } else {
            const info = await fetchRepositoryData(body);

            if (info?.create !== undefined) {
                const repositoryInfo = await new RepositoryModel(info);

                await repositoryInfo.save();

                return NextResponse.json(
                    {
                        success: "Repository Added",
                        repositoryInfo: info,
                    },
                    {
                        status: 200,
                        headers: getCorsHeaders(
                            req.headers.get("origin") || ""
                        ),
                    }
                );
            } else {
                return NextResponse.json(
                    {
                        error: "Invalid Info",
                        repositoryInfo: info,
                    },
                    {
                        status: 422,
                        headers: getCorsHeaders(
                            req.headers.get("origin") || ""
                        ),
                    }
                );
            }
        }
    } catch (error) {
        return NextResponse.json(
            {
                error: "Error creating github info",
            },
            {
                status: 550,
                headers: getCorsHeaders(req.headers.get("origin") || ""),
            }
        );
    }
}

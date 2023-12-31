import connectDB from "@/lib/db";
import RepositoryModel from "@/model/RepoModel";
import { getCorsHeaders } from "@/utils/cors";
import { fetchRepositoryData } from "@/utils/fetch";
import { NextResponse } from "next/server";

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
                    status: 500,
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

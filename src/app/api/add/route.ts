import connectDB from "@/lib/db";
import RepositoryModel from "@/model/RepoModel";
import { fetchRepositoryData } from "@/utils/fetch";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
    const body = await req.json();

    await connectDB();

    try {
        const existingRepositoryInfo = await RepositoryModel.findOne({
            name: body.name,
            org: body.org,
        });

        if (existingRepositoryInfo && existingRepositoryInfo.name) {
            return NextResponse.json({
                repository: {
                    failed: "repository already exists",
                },
            });
        } else {
            const info = await fetchRepositoryData(body);

            const repositoryInfo = await RepositoryModel.create({
                ...info,
            });

            return NextResponse.json({
                repositoryInfo: {
                    repositoryInfo,
                },
            });
        }
    } catch (error) {
        return NextResponse.json(
            {
                error: "Error creating github info",
            },
            { status: 550 }
        );
    }
};

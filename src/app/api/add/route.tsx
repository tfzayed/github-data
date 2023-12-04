import connectDB from "@/lib/db";
import RepositoryInfoModel from "@/model/RepoInfoModel";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
    const body = await req.json();

    await connectDB();

    try {
        const existingRepositoryInfo = await RepositoryInfoModel.findOne({
            name: body.name,
            org: body.org,
        });
        if (existingRepositoryInfo) {
            return NextResponse.json({
                reposiotry: {
                    not_possible: "repository exist",
                },
            });
        } else {
            const reposiotryInfo = await RepositoryInfoModel.create({
                ...body,
            });
            return NextResponse.json({
                reposiotryInfo: {
                    name: reposiotryInfo.name,
                    org: reposiotryInfo.org,
                    image: reposiotryInfo.image,
                },
            });
        }
    } catch (error) {
        return NextResponse.json(
            {
                error: "Error creating github info",
            },
            { status: 500 }
        );
    }
};

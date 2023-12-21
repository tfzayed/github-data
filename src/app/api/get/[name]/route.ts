import connectDB from "@/lib/db";
import RepositoryModel from "@/model/RepoModel";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { name: string } }
) {
    await connectDB();
    const repositoryInfo = await RepositoryModel.findOne({
        name: params.name,
    });

    return NextResponse.json({
        repositoryInfo,
    });
}

import connectDB from "@/lib/db";
import RepositoryModel from "@/model/RepoModel";
import { updateRepositoryData } from "@/utils/fetch";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();

    const repositoryInfo = await RepositoryModel.find({});

    const updatedRepositoryData = await updateRepositoryData(
        repositoryInfo.slice(-3)
    );

    return NextResponse.json({
        repositoryInfo: updatedRepositoryData,
    });
}

export const dynamic = "force-dynamic";

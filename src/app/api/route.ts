import connectDB from "@/lib/db";
import RepositoryModel from "@/model/RepoModel";
import { updateRepositoryData } from "@/utils/fetch";
import { NextResponse } from "next/server";
import cors from "cors"

export async function GET() {
    await connectDB();

    const repositoryInfo = await RepositoryModel.find({});

    const updatedRepositoryData = await updateRepositoryData(repositoryInfo);

    const response = NextResponse.json({
        repositoryInfo: updatedRepositoryData,
    });

    response.headers.set("Cache-Control", "no-store");

    return response;
}

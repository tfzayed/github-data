import connectDB from "@/lib/db";
import RepositoryModel from "@/model/RepoModel";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    const repositoryInfo = await RepositoryModel.find({});

    return NextResponse.json({
        repositoryInfo,
    });
}

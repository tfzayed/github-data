import connectDB from "@/lib/db";
import RepositoryModel from "@/model/RepoModel";
import { NextResponse } from "next/server";

export const GET = async () => {
    await connectDB();
    const repositoryInfo = await RepositoryModel.find({});
    return NextResponse.json({
        repositoryInfo,
    });
};

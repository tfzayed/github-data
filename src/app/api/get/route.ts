import connectDB from "@/lib/db";
import RepositoryModel from "@/model/RepoModel";
import { NextResponse } from "next/server";

export const GET = async () => {
    await connectDB();
    const repositoryInfo = await RepositoryModel.find({});

    console.log("-------", repositoryInfo.slice(0, 2));
    return NextResponse.json({
        repositoryInfo,
    });
};

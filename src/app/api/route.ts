import connectDB from "@/lib/db";
import RepositoryModel from "@/model/RepoModel";
import { updateRepositoryData } from "@/utils/fetch";
import { NextResponse } from "next/server";

export const GET = async () => {
    await connectDB();

    const repositoryInfo = await RepositoryModel.find({});

    const updatedRepositoryData = await updateRepositoryData(repositoryInfo);

    return NextResponse.json({
        repositoryInfo: updatedRepositoryData,
    });
};

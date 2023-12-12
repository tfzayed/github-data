import connectDB from "@/lib/db";
import RepositoryModel from "@/model/RepoModel";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    await connectDB();
    const repositoryInfo = await RepositoryModel.findById(params.id);

    return NextResponse.json({
        repositoryInfo,
    });
}

export const dynamic = "force-dynamic";

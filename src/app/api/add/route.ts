import connectDB from "@/lib/db";
import RepositoryModel from "@/model/RepoModel";
import { fetchRepositoryData } from "@/utils/fetch";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    const body = await req.json();

    await connectDB();

    try {
        const existingRepositoryInfo = await RepositoryModel.findOne({
            name: body.name,
            org: body.org,
        });

        if (existingRepositoryInfo && existingRepositoryInfo.name) {
            return NextResponse.json(
                {
                    error: "Repository already exists",
                },
                {
                    status: 550,
                }
            );
        } else {
            const info = await fetchRepositoryData(body);

            const repositoryInfo = await new RepositoryModel(info);

            await repositoryInfo.save();
            // const repositoryInfo = await RepositoryModel.create({
            //     ...info,
            // });

            revalidatePath("/");
            return NextResponse.json(
                {
                    success: "Repository Added",
                    repositoryInfo: info,
                },
                { status: 200 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            {
                error: "Error creating github info",
            },
            { status: 550 }
        );
    }
}

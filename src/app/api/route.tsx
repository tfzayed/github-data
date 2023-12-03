import connectDB from "@/lib/db";
import RepositoryModel from "@/model/RepoModel";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
    const body = await req.json();

    await connectDB();

    try {
        const existingRepository = await RepositoryModel.findOne({
            name: body.name, org: body.org
        });
        if (existingRepository) {
            const filter = { name: body.name};
            const update = { $set: body };
            const options = { upsert: true };
            const updatedReposiotry = await RepositoryModel.findOneAndUpdate(
                filter,
                update,
                options
            );

            return NextResponse.json({
                reposiotry: {
                    name: updatedReposiotry.name,
                    org: updatedReposiotry.org,
                    forks: updatedReposiotry.forks,
                    stars: updatedReposiotry.stars,
                    commit: updatedReposiotry.commit,
                    create: updatedReposiotry.create,
                },
            });
        } else {
            const reposiotry = await RepositoryModel.create({ ...body });
            return NextResponse.json({
                reposiotry: {
                    name: reposiotry.name,
                    org: reposiotry.org,
                    forks: reposiotry.forks,
                    stars: reposiotry.stars,
                    commit: reposiotry.commit,
                    create: reposiotry.create,
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

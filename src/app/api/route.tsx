import startDB from "@/lib/db";
import RepoModel from "@/model/RepoModel";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
    const body = await req.json();

    await startDB();

    try {
        const existingRepo = await RepoModel.findOne({ name: body.name });
        if (existingRepo) {
            const filter = { name: body.name };
            const update = { $set: body };
            const options = { upsert: true };

            const updatedRepo = await RepoModel.findOneAndUpdate(
                filter,
                update,
                options
            );

            return NextResponse.json({
                repo: {
                    name: updatedRepo.name,
                    forks: updatedRepo.forks,
                    stars: updatedRepo.stars,
                    commit: updatedRepo.commit,
                    create: updatedRepo.create,
                },
            });
        } else {
            const repo = await RepoModel.create({ ...body });
            return NextResponse.json({
                repo: {
                    name: repo.name,
                    forks: repo.forks,
                    stars: repo.stars,
                    commit: repo.commit,
                    create: repo.create,
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

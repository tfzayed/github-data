import connectDB from "@/lib/db";
import RepositoryModel from "@/model/RepoModel";
import { getCorsHeaders } from "@/utils/cors";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    await connectDB();

    try {
        const filter = { name: body.name };
        const update = {
            $set: {
                name: body.name,
                org: body.org,
                image: body.image,
            },
        };

        const existingRepositoryInfo = await RepositoryModel.findOneAndUpdate(
            filter,
            update
        );

        if (existingRepositoryInfo !== null) {
            return NextResponse.json(
                {
                    success: "Repository Updated",
                },
                {
                    status: 200,
                    headers: getCorsHeaders(req.headers.get("origin") || ""),
                }
            );
        } else {
            return NextResponse.json(
                {
                    error: "Repository Update Failed",
                },
                {
                    status: 550,
                    headers: getCorsHeaders(req.headers.get("origin") || ""),
                }
            );
        }
    } catch (error) {
        return NextResponse.json(
            {
                error: "Error updating github info",
            },
            {
                status: 550,
                headers: getCorsHeaders(req.headers.get("origin") || ""),
            }
        );
    }
}

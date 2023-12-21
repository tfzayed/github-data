import connectDB from "@/lib/db";
import RepositoryModel from "@/model/RepoModel";
import { getCorsHeaders } from "@/utils/cors";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    const body = await req.json();

    await connectDB();

    try {
        const filter = { _id: body };

        const deletedRepositoryInfo = await RepositoryModel.findByIdAndDelete(
            filter
        );

        if (deletedRepositoryInfo !== null) {
            return NextResponse.json(
                {
                    success: "Repository Deleted",
                },
                {
                    status: 200,
                    headers: getCorsHeaders(req.headers.get("origin") || ""),
                }
            );
        } else {
            return NextResponse.json(
                {
                    error: "Repository Delete Failed",
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
                error: "Error deleting repository",
            },
            {
                status: 550,
                headers: getCorsHeaders(req.headers.get("origin") || ""),
            }
        );
    }
}

import connectDB from "@/lib/db";
import RepositoryModel from "@/model/RepoModel";
import { NextRequest, NextResponse } from "next/server";

const getCorsHeaders = (origin: string) => {
    const headers = {
        "Access-Control-Allow-Methods": `${process.env.ALLOWED_METHODS}`,
        "Access-Control-Allow-Headers": `${process.env.ALLOWED_HEADERS}`,
        "Access-Control-Allow-Origin": `${process.env.DOMAIN_URL}`,
    };

    if (!process.env.ALLOWED_ORIGIN || !origin) return headers;

    const allowedOrigins = process.env.ALLOWED_ORIGIN.split(",");

    if (allowedOrigins.includes("*")) {
        headers["Access-Control-Allow-Origin"] = "*";
    } else if (allowedOrigins.includes(origin)) {
        headers["Access-Control-Allow-Origin"] = origin;
    }

    return headers;
};
export const OPTIONS = async (request: NextRequest) => {
    return NextResponse.json(
        {},
        {
            status: 200,
            headers: getCorsHeaders(request.headers.get("origin") || ""),
        }
    );
};

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

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
    try {
        const body = await request.json();

        if (!body || !body.email) {
            return NextResponse.json(
                { error: "Email is required in the request body" },
                { status: 400 }
            );
        }

        const { email } = body;

        const userList = await prisma.remainder.findMany({
            where: { email },
        });

        return NextResponse.json({ list: userList }, { status: 200 });
    } catch (error) {
        console.error("Error fetching list:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching the list" },
            { status: 500 }
        );
    }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
    try {
        const body = await request.json();
        if (!body || !body.email || !body.item || !body.group) {
            return NextResponse.json(
                { error: "Email, list and team are required in the request body" },
                { status: 400 }
            );
        }
        const { email, item, group } = body;
        const newList = await prisma.list.create({
            data: {
                email,
                list: item,
                group: group,
                status: false,
            },
        });
        return NextResponse.json({ success: true, item: newList }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "An error occurred while adding the item" },
            { status: 500 }
        );
    }
}
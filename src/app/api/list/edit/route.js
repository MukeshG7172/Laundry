import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, list, group, status } = body;

        if (!id || !list || !group ||!status) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const updatedItem = await prisma.list.update({
            where: {
                id: id
            },
            data: {
                list: list,
                group: group,
                status: status,
            }
        });

        if (!updatedItem) {
            return NextResponse.json(
                { error: 'Item not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                item: updatedItem
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating list item:', error);
        return NextResponse.json(
            { error: 'Failed to update list item' },
            { status: 500 }
        );
    }
}
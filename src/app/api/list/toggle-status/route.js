import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function PUT(request) {
  try {
    const { id, status } = await request.json();

    const updatedItem = await prisma.list.update({
      where: { id },
      data: { status: status },
    });

    return NextResponse.json({ success: true, data: updatedItem });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    );
  }
}
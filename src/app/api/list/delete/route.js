import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request) {
  try {
    const body = await request.json();

    if (!body || !body.id) {
      return NextResponse.json(
        { error: "Id is required in the request body" },
        { status: 400 }
      );
    }

    const { id } = body;

    const deletedList = await prisma.list.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { success: true, message: "Item deleted successfully", deletedList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting the item:", error.message);
    return NextResponse.json(
      { error: "An error occurred while deleting the item" },
      { status: 500 }
    );
  }
}

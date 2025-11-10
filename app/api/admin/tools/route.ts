import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST - Create a new tool
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, type, skillFileUrl, promptContent } = body;

    if (!name || !description || price === undefined || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const tool = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        type,
        skillFileUrl: skillFileUrl || null,
        promptContent: promptContent || null,
      },
    });

    return NextResponse.json(tool, { status: 201 });
  } catch (error) {
    console.error("Error creating tool:", error);
    return NextResponse.json(
      { error: "Failed to create tool" },
      { status: 500 }
    );
  }
}

// PUT - Update an existing tool
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, price, type, skillFileUrl, promptContent } =
      body;

    if (!id) {
      return NextResponse.json(
        { error: "Tool ID is required" },
        { status: 400 }
      );
    }

    const tool = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(type && { type }),
        ...(skillFileUrl !== undefined && { skillFileUrl }),
        ...(promptContent !== undefined && { promptContent }),
      },
    });

    return NextResponse.json(tool);
  } catch (error) {
    console.error("Error updating tool:", error);
    return NextResponse.json(
      { error: "Failed to update tool" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a tool
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Tool ID is required" },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting tool:", error);
    return NextResponse.json(
      { error: "Failed to delete tool" },
      { status: 500 }
    );
  }
}

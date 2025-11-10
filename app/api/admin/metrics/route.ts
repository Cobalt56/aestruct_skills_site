import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST - Create a new metric
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { metricName, metricValue, displayOrder } = body;

    if (!metricName || !metricValue || displayOrder === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const metric = await prisma.successMetric.create({
      data: {
        metricName,
        metricValue,
        displayOrder: parseInt(displayOrder),
      },
    });

    return NextResponse.json(metric, { status: 201 });
  } catch (error) {
    console.error("Error creating metric:", error);
    return NextResponse.json(
      { error: "Failed to create metric" },
      { status: 500 }
    );
  }
}

// PUT - Update an existing metric
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, metricName, metricValue, displayOrder } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Metric ID is required" },
        { status: 400 }
      );
    }

    const metric = await prisma.successMetric.update({
      where: { id },
      data: {
        metricName,
        metricValue,
        displayOrder: displayOrder !== undefined ? parseInt(displayOrder) : undefined,
      },
    });

    return NextResponse.json(metric);
  } catch (error) {
    console.error("Error updating metric:", error);
    return NextResponse.json(
      { error: "Failed to update metric" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a metric
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Metric ID is required" },
        { status: 400 }
      );
    }

    await prisma.successMetric.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting metric:", error);
    return NextResponse.json(
      { error: "Failed to delete metric" },
      { status: 500 }
    );
  }
}

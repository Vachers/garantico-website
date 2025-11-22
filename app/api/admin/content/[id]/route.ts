import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { pageContents } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = parseInt(params.id);

    await db
      .update(pageContents)
      .set({
        contentTr: body.contentTr,
        contentEn: body.contentEn,
      })
      .where(eq(pageContents.id, id));

    return NextResponse.json({ success: true, message: "Content updated" });
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = parseInt(params.id);
    await db.delete(pageContents).where(eq(pageContents.id, id));
    return NextResponse.json({ success: true, message: "Content deleted" });
  } catch (error) {
    console.error("Error deleting content:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { pageContents } from "@/lib/db/schema";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const contents = await db.select().from(pageContents).orderBy(pageContents.page, pageContents.order);
    return NextResponse.json({ success: true, data: contents });
  } catch (error) {
    console.error("Error fetching contents:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = await db.insert(pageContents).values(body).returning();
    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error("Error creating content:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}


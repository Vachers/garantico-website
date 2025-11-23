import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { navigationItems } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const items = await db
      .select()
      .from(navigationItems)
      .orderBy(asc(navigationItems.order));

    const topMenu = items.filter((item) => item.menuType === "top");
    const mainMenu = items.filter((item) => item.menuType === "main");

    return NextResponse.json({
      success: true,
      topMenu,
      mainMenu,
    });
  } catch (error) {
    console.error("Error fetching menu items:", error);
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
    const result = await db.insert(navigationItems).values(body).returning();
    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error("Error creating menu item:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}


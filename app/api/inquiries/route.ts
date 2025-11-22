import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { productInquiries } from "@/lib/db/schema";
import { z } from "zod";

const inquirySchema = z.object({
  productId: z.number().optional(),
  customerName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  quantity: z.string().optional(),
  deliveryLocation: z.string().optional(),
  message: z.string().optional(),
  language: z.string().default("tr"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = inquirySchema.parse(body);

    // Insert into database
    const result = await db.insert(productInquiries).values({
      productId: validatedData.productId || null,
      customerName: validatedData.customerName,
      email: validatedData.email,
      phone: validatedData.phone || null,
      company: validatedData.company || null,
      quantity: validatedData.quantity || null,
      deliveryLocation: validatedData.deliveryLocation || null,
      message: validatedData.message || null,
      language: validatedData.language,
      status: "pending",
    }).returning();

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry submitted successfully",
        id: result[0]?.id,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    console.error("Error submitting inquiry:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const inquiries = await db.select().from(productInquiries).orderBy(productInquiries.createdAt);
    
    return NextResponse.json({
      success: true,
      data: inquiries,
    });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}


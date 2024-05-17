import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all properties from the database
    const approvers = await prisma.user.findMany({
          select: {
            id: true,
            firstName: true,
            lastName: true
          },
          where: { role: 'Approver' }
    });

    // Return the fetched properties
    return NextResponse.json({
      status: 'success',
      approvers,
    });
  } catch (error) {
    console.error("Error during properties fetching:", error);
    return NextResponse.json({
      status: 'error',
      message: 'An error occurred while fetching properties',
    }, { status: 500 });
  }
}
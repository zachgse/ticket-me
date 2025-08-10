import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({exists: false},{status:400});
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    return NextResponse.json({exists: !!user},{status: 200});
  } catch (err) {
    console.error(err);
    return NextResponse.json({exists: false},{status: 500});
  }
}

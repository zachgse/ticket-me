import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

interface LoginPayload {
    email: string;
    password: string;
}

export async function POST(req: NextRequest) {
    const body: LoginPayload = await req.json();
    const { email, password } = body;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
        return NextResponse.json(
            { message: "Credentials error" },
            { status: 401 }
        );
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return NextResponse.json(
            { message: "Credentials error" },
            { status: 401 }
        );
    }

    return NextResponse.json(
        { message: "Login successful", user: { id: user.id, email: user.email, name: user.name } },
        { status: 200 }
    );
}

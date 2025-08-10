import { NextRequest,NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from "bcryptjs"

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export async function POST(req:NextRequest) {
    const body: RegisterPayload = await req.json();
    const { name,email,password } = body;
 
    const exist = await prisma.user.findUnique({
      where: { email },
    });

    if (exist){
        return NextResponse.json({exist},{status:200}); //change status to error
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    return NextResponse.json({user},{status:200}); //remove user 
}
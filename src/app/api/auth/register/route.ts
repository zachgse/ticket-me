import { NextRequest,NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    provider: string;
}

export async function POST(req:NextRequest) {
    const body: RegisterPayload = await req.json();
    const { name,email,password,provider } = body;
 
    const exist = await prisma.user.findUnique({
      where: { email },
    });
    if (exist){
        return NextResponse.json({exist},{status:200}); //change status to error
    }

    const user = await prisma.user.create({
        data: { name,email,password,provider }
    });

    return NextResponse.json({user},{status:200});    
}
import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface CheckUserPayload{
    email: string;
}

export async function POST(req:NextRequest){
    const body : CheckUserPayload = await req.json();

    const { email } = body;

    if (!email){
        return NextResponse.json({message:"Email not found"},{status:400});
    }

    const user = await prisma.user.findUnique({where:{email}});

    if (!user){
        return NextResponse.json({message:"User not found"},{status:401});
    }

    return NextResponse.json({user},{status:200});
}
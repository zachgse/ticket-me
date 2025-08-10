import { NextRequest, NextResponse } from "next/server"
import { auth } from "../../../../auth"
import { prisma } from "@/lib/prisma"

interface TicketPayload{
    title: string;
    category: string;
    content: string;
}

export async function POST(req:NextRequest){
    const session = await auth();
    if (!session){
        return NextResponse.json({message:"Unauthorized"},{status:401});
    }

    const  body : TicketPayload = await req.json();

    const { title,category,content } = body;

    const ticket = await prisma.ticket.create({
        data:{
            title,category,content,
            creatorId: Number(session?.user?.id)
        }
    });

    return NextResponse.json({message:"Successfully filed a ticket"},{status:201});
}
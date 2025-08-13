// interface for patch
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface TicketParams {
    params: {
        id: string,
        type?: string
    }
}

interface TicketPayload{
    conversation?: {
        userId: number
        message: string
        time: Date
    }
    status?: "pending" | "processing" | "completed"
}

export const GET = async(req:NextRequest,{params}: TicketParams) => {
    const id = params.id;
    const ticket = await prisma.ticket.findUnique({
        where: { id },
        include: {
            creator: {
                select: {
                    name: true,
                    email: true,
                }
            }
        }
    });

    if (!ticket){
        return NextResponse.json({message:"Ticket not found"},{status:404});
    }

    return NextResponse.json({data:ticket},{status:200});
}

export const PATCH = async(req:NextRequest, {params} : TicketParams) => {
    const ticket = await prisma.ticket.findUnique({
        where: {id:params.id}
    });

    if (!ticket){
        return NextResponse.json({message:"Ticket not found"},{status:404});
    }

    if (params.type == 'conversation'){
        const { conversation } : TicketPayload = await req.json();
        await prisma.ticket.update({
            where: {id:params.id},
            data:{conversation}
        })
    } else { 
        const { status } : TicketPayload = await req.json();
        await prisma.ticket.update({
            where: {id:params.id},
            data: {status}
        });
    }

    return NextResponse.json({message:"Ticket has been updated"},{status:200});
}
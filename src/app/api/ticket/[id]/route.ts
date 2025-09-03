import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "../../../../../auth";

export default interface TicketParams {
    params: {
        id: string;
    }
}

interface TicketPayload{
    type: "status" | "remarks";
    remarks?: string
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
    const session = await auth();
    const ticket = await prisma.ticket.findUnique({
        where: {id:params.id}
    });

    if (!ticket){
        return NextResponse.json({message:"Ticket not found"},{status:404});
    }

    const body : TicketPayload = await req.json();
    const { type } = body;

    if (type == 'status'){
        await prisma.ticket.update({
            where: {id:params.id},
            data:{
                status: "completed"
            }
        });
    } else {
        const {remarks} = body; 
        const existingConversation = Array.isArray(ticket?.conversation) ? ticket.conversation : [];
        const newConversation = {
            id: session?.user?.id,
            message: remarks,
            date: new Date().toISOString()  
        }
        await prisma.ticket.update({
            where: {id:params.id},
            data:{
                conversation: [...existingConversation,newConversation],
                status: 'processing',
            }
        });
    }

    return NextResponse.json({data:ticket,message:"Ticket has been updated"},{status:200});
}
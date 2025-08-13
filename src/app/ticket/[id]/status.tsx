"use client"

import React from 'react'
import { Button } from '@/components/ui/button'

interface TicketProps {
    id: string;
}

const Status = ({id}:TicketProps) => {
    const processTicket = async() => {
        const type = "status";
        const payload = {type};
        const response = await fetch(`/api/ticket/${id}`, {
            method: 'PATCH',
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(payload)
        });
        console.log("Response is: ", response);
    }

    return (
        <Button className="cursor-pointer" onClick={processTicket}>Complete Ticket</Button>
    )
}

export default Status
"use client"

import React from 'react'
import { Button } from '@/components/ui/button'

type TicketProps = {
    id: string;
}

const Status = ({id}:TicketProps) => {
    if (!id) return null;

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
        <Button className="cursor-pointer w-32" onClick={processTicket}>Complete Ticket</Button>
    )
}

export default Status
"use client"

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useMutation,useQueryClient } from '@tanstack/react-query'
import { Ticket } from '@/utils/types'

interface FormProps {
    id: string;
}

type RemarksForm = {
    id: String,
    remarks: String,
}

const Remarks = ({id}:FormProps) => {
    const queryClient = useQueryClient();
    const [remarks,setRemarks] = useState('');

    async function submitRemarks({id,remarks}:RemarksForm):Promise<Ticket>{
        const type = "remarks";
        const payload = {remarks,type};
        
        const response = await fetch(`/api/ticket/${id}`, {
            method: 'PATCH',
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(payload)
        });

        const ticket = await response.json();
        return ticket.data;
    }

    const mutation = useMutation({
        // can do (form: RemarksForm) => submitRemarks(form) instead of manually passing the parameters
        // then on handleSubmit, thats where i have to pass the id and remarks (or which variables and parameters i need)
        mutationFn: () => submitRemarks({id,remarks}),
        onSuccess: () => {
            setRemarks('');
            queryClient.invalidateQueries({queryKey:["ticket",id]});
        }
    });

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(); //add remarks / do i not need to specify the remarks anymore here?
    }

    return (
        <Card className="w-full p-8 my-8">
            <form className='space-y-4' onSubmit={handleSubmit}>
                <Textarea placeholder="Ticket Remarks here ..." id="content" 
                    value={remarks} onChange={(e)=>setRemarks(e.target.value)}/>
                <Button type="submit" className='float-right cursor-pointer'>Create</Button>
            </form>
        </Card>
    )
}

export default Remarks
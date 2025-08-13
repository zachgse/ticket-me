"use client"

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface FormProps {
    id: string;
}

const Form = ({id}:FormProps) => {
    const [remarks,setRemarks] = useState('');
    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault();
        
        const type = "remarks";
        const payload = {remarks,type};
        
        const response = await fetch(`/api/ticket/${id}`, {
            method: 'PATCH',
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(payload)
        });

        console.log("Respone is: ", response);
    }

    return (
    <Card className='md:w-2/5 w-4/5 p-8 mx-auto'>
        <p className="font-bold text-3xl">Remarks</p>

        <form className='space-y-4' onSubmit={handleSubmit}>
            <div className="space-y-2">
                <Label htmlFor="content">Remarks</Label>
                <Textarea placeholder="Ticket Remarks here ..." id="content" 
                    value={remarks} onChange={(e)=>setRemarks(e.target.value)}/>
            </div>
            <Button type="submit" className='float-right cursor-pointer'>Create</Button>
        </form>
    </Card>
    )
}

export default Form
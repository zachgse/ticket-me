"use client" 

import React, {useState} from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'

const TicketForm = () => {
    const [title,setTitle] = useState('');
    const [category,setCategory] = useState('');
    const [content,setContent] = useState('');

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            title,category,content
        }

        const response = await fetch(`/api/ticket`, {
            method: 'POST',
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(payload)
        });
        
        console.log("Response", response);
    }
    
    return (
    <Card className='md:w-2/5 w-4/5 p-8 mx-auto'>
        <p className="font-bold text-3xl">File a ticket</p>

        <form className='space-y-4' onSubmit={handleSubmit}>
            <div className="space-y-2">
                <Label htmlFor='title'>Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category" className="w-full">
                        <SelectValue placeholder="-- SELECT YOUR ISSUE --" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Hardware">Hardware</SelectItem>
                        <SelectItem value="Software">Software</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="content">Description</Label>
                <Textarea placeholder="Ticket description here ..." id="content" value={content} onChange={(e)=>setContent(e.target.value)}/>
            </div>

            <Button type="submit" className='float-right cursor-pointer'>Create</Button>
        </form>        
    </Card>
    )
}

export default TicketForm
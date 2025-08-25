"use client" 

import React, {Dispatch, SetStateAction, useState} from 'react'
import { useMutation,useQueryClient } from '@tanstack/react-query'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import Loading from './loading'
import toast, { Toaster } from 'react-hot-toast'

interface TicketFormProps {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const TicketForm = ({setIsModalOpen}:TicketFormProps) => {
    const queryClient = useQueryClient();
    const [title,setTitle] = useState('');
    const [category,setCategory] = useState('');
    const [content,setContent] = useState('');

    async function createTicket(ticketData: any){
        await new Promise(resolve => setTimeout(resolve,2000));

        const response = await fetch(`/api/ticket`, {
            method: 'POST',
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(ticketData)
        });

        return response.json();
    }

    const mutation = useMutation({
        mutationFn: createTicket,
        onSuccess: () => {
            toast.success('Ticket has been created');
            setTitle('');
            setCategory('');
            setContent('');
            setTimeout(() => setIsModalOpen(false), 1000);
            queryClient.invalidateQueries({queryKey:["tickets"]});
        }
    })

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault(); 
        mutation.mutate({title,category,content});
    }

    
    return (
    <>
        {mutation.isPending && (<Loading/>)}
        <Toaster/>
        <form className='space-y-8' onSubmit={handleSubmit}>
            <div className="space-y-4">
                <Label htmlFor='title'>Subject</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Ticket subject here ...'/>
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

            <Button type="submit" className='float-right cursor-pointer mt-auto'>Create</Button>
        </form>   
    </>
    )
}

export default TicketForm
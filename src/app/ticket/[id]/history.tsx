"use client"

import React from 'react'
import { useSession } from 'next-auth/react';
import { Card } from '@/components/ui/card';
import { Ticket } from '@/utils/types';

type HistoryProps = {
  ticket: Ticket;
}

const History = ({ticket}:HistoryProps) => {
  const { data:session } = useSession();

  return (
       <Card className="w-full p-8">
        <p className="text-gray-700 font-bold">Ticket History</p>

        <div className="flex flex-col gap-12 px-12">
        {ticket.conversation && Array.isArray(ticket.conversation) && ticket.conversation.length > 0 
          ? ticket.conversation.map((conversation:any,index:number) => (
            <div key={index} 
              className={`flex flex-col gap-2 ` 
              + (conversation.id == session?.user?.id ? 'ml-auto' : '')}>
              <div className={`flex items-center gap-4 ` 
                 + (conversation.id == session?.user?.id ? 'flex-row-reverse' : 'flex-row')}>
                <p className='text-gray-700 font-bold'>{conversation.id != 2 ? ticket.creator.name : 'Master Admin'}</p>
                <span className='text-gray-500 text-sm'>{conversation.date}</span>
              </div>
              <p className={conversation.id == session?.user?.id ? 'text-right' : ''}>
                {conversation.message}
              </p>
            </div>  
          )) : (
          <p className="text-center text-gray-500">
            No ticket remarks yet
          </p>
          )}
        </div>
      </Card>
  )
}

export default History
"use client"

import React, { useState } from 'react'
import Modal   from './modal';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ButtonCreate = () => {
  const [isModalOpen,setIsModalOpen] = useState(false);

  return (
    <div className='mb-24'>
    <Button className="float-right flex items-center cursor-pointer gap-1" onClick={() => setIsModalOpen(true)}>
        <Plus className="w-4 h-4"/>
        Create Ticket
    </Button>

    {isModalOpen && <Modal setIsModalOpen={setIsModalOpen}/>}
    </div>
  )
}

export default ButtonCreate
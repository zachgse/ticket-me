"use client"

import React, {Dispatch, SetStateAction} from 'react'
import { Card } from '@/components/ui/card'
import { CircleX } from 'lucide-react'
import TicketForm from './form'

interface ModalProps {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({setIsModalOpen}:ModalProps) => {
  return (
    <>
        <div className="fixed inset-0 bg-black opacity-70 z-20"></div>
        <div className="fixed inset-0 flex justify-center items-center z-30"
          onClick={(e) => {
            if (e.target === e.currentTarget){
              setIsModalOpen(false);
            }
          }}
        >
            <Card className="md:w-2/5 w-11/12 p-6 rounded-lg shadow-lg flex flex-col gap-12">
                <div className="flex space-between">
                  <p className="font-bold text-3xl">File a ticket</p>
                  <CircleX className='w-5 h-5 cursor-pointer ml-auto' onClick={() => setIsModalOpen(false)}/> 
                </div>
                <TicketForm setIsModalOpen={setIsModalOpen}/>
            </Card>
        </div>
    </>
  )
}

export default Modal
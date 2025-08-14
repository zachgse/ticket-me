"use client"

import React from 'react'
import { useSession,signOut } from 'next-auth/react'
import Link from 'next/link';

const Navbar = () => {
    const {  data:session } = useSession();
  return (
    <div className='bg-white border-b border-gray-300 w-full flex items-center py-4 px-12'>
        <Link href="/" className="text-4xl font-bold tracking-wide text-[#A1E8AF] uppercase">
            Ticket - Me
        </Link>
        <div className="text-blue-500 flex gap-4">
          <Link href="/ticket" className='ml-auto'>
            Tickets
          </Link>
            {session 
                ? <p className="cursor-pointer" onClick={() => signOut()}>Logout</p> 
                : <Link href="/login">Login</Link>}
        </div>
    </div>
  )
}

export default Navbar
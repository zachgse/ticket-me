"use client"

import React from 'react'
import { useSession,signOut } from 'next-auth/react'

const Trial = () => {
  const { data: session } = useSession();

  return (
    <>   
      {session ? (
      <div className='text-blue-500 text-3xl'>
        You are logged in! <br/>
        Your name is {session.user?.name}
        <button className='bg-black w-24 h-full' onClick={()=>signOut()}>Sign out</button>
      </div>
    ) : "You are not logged in" 
    }
    </>

    // <div>You are logged in!</div>
  )
}

export default Trial
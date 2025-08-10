import React from 'react'
import { SessionProvider } from 'next-auth/react'
import Trial from './trial'

const TrialPage = () => {
  return (
    <SessionProvider>
        <Trial/>
    </SessionProvider>
  )
}

export default TrialPage
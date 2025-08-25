import React from 'react'
import { Spinner } from '@/components/ui/shadcn-io/spinner'

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black opacity-70 z-40 flex items-center justify-center">
        <Spinner className="text-blue-500" size={32} />
    </div>
  )
}

export default Loading
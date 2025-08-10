"use client"

import React, { Dispatch, SetStateAction } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface LoginFormProps {
  setIsLogin: Dispatch<SetStateAction<boolean>>
}

const LoginForm = ({setIsLogin} : LoginFormProps) => {
  return (
    <form className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
        </div>

        <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
        </div>

        <p className="text-gray-500 text-xs">
          Dont have an account yet? 
          Click <span onClick={() => setIsLogin(false)}className='text-blue-500 cursor-pointer'>here</span> to register
        </p>

        <Button type="submit" className="w-full cursor-pointer">
            Login
        </Button>
    </form>
  )
}

export default LoginForm
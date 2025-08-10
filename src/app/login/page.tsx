"use client";

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import LoginForm from "@/components/auth/LoginForm"
import RegisterForm from "@/components/auth/RegisterForm"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaGoogle } from "react-icons/fa"

export default function Login() {
  const params = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (params.get("new") === "true") {
      setIsLogin(false);
    }
  }, [params]);

  const name = params.get("name") || "";
  const email = params.get("email") || "";

  return (
    <div className="flex items-center justify-center h-full bg-[#A1E8AF]">
      <Card className="w-96 mx-auto p-8 shadow-lg">
        <p className="font-bold text-3xl">{isLogin ? 'Login' : 'Register'}</p>
        <p className="text-gray-500">
          {isLogin 
            ? 'Enter your credentials'
            : 'Fill up the required fields below'}
        </p>
        <Button onClick={() => signIn("google", { callbackUrl: "/" })} variant="outline" className="w-full cursor-pointer">
          <FaGoogle className="mr-2 h-4 w-4" />
          Google
        </Button>

        <div className="flex items-center gap-2 my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="text-gray-500 whitespace-nowrap">or continue with</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {isLogin ? (
          <LoginForm setIsLogin={setIsLogin} />
        ) : (
          <RegisterForm setIsLogin={setIsLogin} defaultName={name} defaultEmail={email} />
      )}
      </Card>
    </div>
  );
}

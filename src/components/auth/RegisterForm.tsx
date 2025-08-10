"use client";

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface RegisterFormProps {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  defaultName?: string;
  defaultEmail?: string;
}

const RegisterForm = ({
  setIsLogin,
  defaultName = "",
  defaultEmail = "",
}: RegisterFormProps) => {
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  useEffect(() => {
    setName(defaultName);
    setEmail(defaultEmail);
  }, [defaultName, defaultEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      password,
      confirmPassword: passwordConfirmation,
      provider: "credentials",
    };

    try {
      const res = await fetch(`http://localhost:3000/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Registration failed:", errorData);
        return;
      }

      const data = await res.json();
      console.log("Registration success:", data);

      setIsLogin(true);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
        <Input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
        <Input
          id="email"
          type="email"
          name="email"
          value={email}
          readOnly={!!defaultEmail}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
        <Input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password_confirmation">Confirm Password <span className="text-red-500">*</span></Label>
        <Input
          id="password_confirmation"
          type="password"
          name="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>

      <p className="text-gray-500 text-xs">
        Already have an account?{" "}
        <span
          onClick={() => setIsLogin(true)}
          className="text-blue-500 cursor-pointer"
        >
          Click here
        </span>{" "}
        to login
      </p>

      <Button type="submit" className="w-full cursor-pointer">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;

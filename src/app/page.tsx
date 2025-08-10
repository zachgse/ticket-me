"use client"

import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data:session } = useSession();
  console.log("session user: ", session?.user);

  return (
    <>
      <Navbar/>
      <div className="flex items-center justify-center mt-24">
        {session 
          ? `Hello there ${session?.user?.name}` : "You are not logged in yet"}
      </div>
    </>
  );
}

"use client"

import { useQuery } from "@tanstack/react-query" 
import { columns, Ticket } from "./columns"
import { DataTable } from "../../components/data-table"
import ButtonCreate from "./create/button";

async function getData(): Promise<Ticket[]> {
  const response = await fetch('http://localhost:3000/api/ticket', {
    method: 'GET',
    headers: { "Content-Type":"application/json" }
  });

  const tickets = await response.json();
  return tickets.data;
}

export default function TicketPage() {
  const { data: tickets = [] } = useQuery({
    queryKey: ["tickets"],
    queryFn: getData,
  });

  return (
    <div className="container mx-auto py-10 px-12">
      <ButtonCreate/>
      <DataTable columns={columns} data={tickets} />
    </div>
  )
}
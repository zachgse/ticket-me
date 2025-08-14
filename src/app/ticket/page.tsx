import { columns, Ticket } from "./columns"
import { DataTable } from "../../components/data-table"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

async function getData(): Promise<Ticket[]> {
  const response = await fetch('http://localhost:3000/api/ticket', {
    method: 'GET',
    headers: { "Content-Type":"application/json" }
  });

  const tickets = await response.json();
  return tickets.data;
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10 px-12 space-y-4">
      <Link className="space-y-2" href="/ticket/create">
        <Button className="float-right flex items-center gap-1">
          <Plus className="w-4 h-4"/>
          Create Ticket
        </Button>
      </Link>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
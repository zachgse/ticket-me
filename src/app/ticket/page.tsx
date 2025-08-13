import { columns, Ticket } from "./columns"
import { DataTable } from "../../components/data-table"

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
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
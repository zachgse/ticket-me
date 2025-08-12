import { columns, Payment } from "./columns"
import { DataTable } from "../../components/data-table"

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125.5,
      status: "processing",
      email: "alice@example.com",
    },
    {
      id: "a3c4b7f9",
      amount: 250,
      status: "success",
      email: "bob@example.org",
    },
    {
      id: "5d1e2f33",
      amount: 75,
      status: "failed",
      email: "charlie@example.net",
    },
    {
      id: "9f7a123c",
      amount: 430.99,
      status: "pending",
      email: "danielle@example.com",
    },
    {
      id: "e8c324a0",
      amount: 19.99,
      status: "success",
      email: "eric@example.com",
    },
    {
      id: "72b45d11",
      amount: 300,
      status: "processing",
      email: "fiona@example.org",
    },
    {
      id: "f0a9b8d4",
      amount: 1200,
      status: "success",
      email: "george@example.net",
    },
    {
      id: "b4d76e22",
      amount: 55,
      status: "failed",
      email: "harry@example.com",
    },
    {
      id: "d3f8c9b7",
      amount: 89.5,
      status: "pending",
      email: "ivy@example.com",
    },
  ];
}


export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
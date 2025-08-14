import React from "react";
import Status from "./status";
import Form from "./form";

interface Ticket {
  id: string;
  title: string;
  category: string;
  content: string;
  status: string;
  conversation: string;
  creator: {
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const getData = async (id: string): Promise<Ticket> => {
  const response = await fetch(`http://localhost:3000/api/ticket/${id}`, {
    cache: "no-store",
  });
  const data = await response.json();
  return data.data;
};

const Show = async({params}:{params:{id:string}}) => {
  const {id} = await params;
  const ticket = await getData(id);

  return (
    <div className="px-12">
      <p>Ticket ID: {ticket.id}</p>
      <p>Created by: {ticket.creator.name}</p>
      <br/><br/><br/>
      {ticket.status == 'processing' && (
        <Status id={ticket.id}/>
      )}

      <br/><br/><br/>
      <Form id={ticket.id}/>
    </div>
  );
}

export default Show;
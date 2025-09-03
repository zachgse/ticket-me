"use client"

import React, {use} from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { statusBadge } from "@/utils/styleHelpers";
import Status from "./status";
import History from "./history";
import Remarks from "./remarks";
import {Ticket} from "@/utils/types";


async function getData(id:string): Promise<Ticket> {
  const response = await fetch(`http://localhost:3000/api/ticket/${id}`, { 
    cache: "no-store",
  });
  const data = await response.json();
  return data.data;
}

const Show = ({params}:{params:Promise<{id:string}>}) => {
  const {id} = use(params);

  const {data:ticket,isLoading,error} = useQuery<Ticket>({
    queryKey: ['ticket',id],
    queryFn: () => getData(id),
    enabled: !!id
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading ticket</p>;
  if (!ticket) return <p>No ticket found</p>; // fallback

  return (
    <div className="px-12">
      {/* i can make this separate component too */}
      <Card className="w-full p-8 my-8">
        <div className="flex justify-between">
          <Link href="/ticket">
            <FaArrowAltCircleLeft className="w-6 h-6 cursor-pointer"/>
          </Link>
          <div className={`px-4 ` + statusBadge(ticket?.status)}>{ticket?.status}</div>
        </div>

        <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-3 w-full px-12">
          <div className="contents">
            <span className="text-gray-700 font-bold">Title</span>
            <p>
              {ticket?.title}
            </p>
          </div>
          <div className="contents">
            <span className="text-gray-700 font-bold">Category</span>
            <p>
              {ticket?.category}
            </p>
          </div>
          <div className="contents">
            <span className="text-gray-700 font-bold">Description</span>
            <p>
              {ticket?.content}
            </p>
          </div>
          <div className="contents">
            <span className="text-gray-700 font-bold">Customer</span>
            <p>
              {ticket?.creator.name}
            </p>
          </div>
          <div className="contents">
            <span className="text-gray-700 font-bold">Date filed</span>
            <p>
              Lorem ipsum dolor
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          {/* {ticket &&  */}
            <Status id={ticket?.id}/>
          {/* } */}
        </div>
      </Card>


      <History ticket={ticket} />


      <Remarks id={ticket?.id}/>
      <br/><br/><br/>
    </div>
  );
}

export default Show;
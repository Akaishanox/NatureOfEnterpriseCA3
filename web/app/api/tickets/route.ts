import { NextResponse } from "next/server";
import ticketsData from "@/data/tickets.json";

let tickets: any[] = [...ticketsData];

export async function GET() {
  return NextResponse.json(tickets);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newTicket = {
    id: Date.now(),
    ...body,
    status: "Open",
    priority: "Medium",
  };

  tickets = [newTicket, ...tickets];

  return NextResponse.json(newTicket);
}

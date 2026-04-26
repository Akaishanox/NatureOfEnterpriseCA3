import { NextResponse } from "next/server";

let tickets: any[] = [];

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

  tickets.push(newTicket);

  return NextResponse.json(newTicket);
}

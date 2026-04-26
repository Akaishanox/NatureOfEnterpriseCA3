import { NextResponse } from "next/server";
import ticketsData from "@/data/tickets.json";

type Ticket = {
  id: number;
  name: string;
  student_id: string;
  email: string;
  subject: any;
  status: "Open" | "In Progress" | "Closed";
  priority: "High" | "Medium" | "Low";
};

let tickets: Ticket[] = ticketsData as Ticket[];

export async function GET() {
  return NextResponse.json(tickets);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newTicket: Ticket = {
      id: Date.now(),
      name: body.name || "Student",
      student_id: body.student_id || "TUD000",
      email: body.email || "student@email.com",
      subject: body.subject || "New request",
      status: "Open",
      priority: "Medium",
    };

    tickets = [newTicket, ...tickets];

    return NextResponse.json(newTicket);
  } catch {
    return NextResponse.json(
      { error: "Could not create ticket" },
      { status: 500 }
    );
  }
}

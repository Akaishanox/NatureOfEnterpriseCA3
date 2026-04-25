"use client";

import { useState } from "react";
import ticketsData from "@/data/tickets.json";
import { translations } from "@/app/lib/translations";
import { useLang } from "@/app/lib/useLang";

type Status = "Open" | "In Progress" | "Closed";
type Priority = "High" | "Medium" | "Low";

interface Ticket {
  id: number;
  name: string;
  student_id: string;
  email: string;
  subject: any;
  status: Status;
  priority: Priority;
}

interface FormState {
  name: string;
  studentId: string;
  email: string;
  phone: string;
  subject: string;
  description: string;
}

const EMPTY: FormState = {
  name: "",
  studentId: "",
  email: "",
  phone: "",
  subject: "",
  description: "",
};

const STATUS_COL: Record<Status, string> = {
  Open: "badge-blue",
  "In Progress": "badge-amber",
  Closed: "badge-green",
};

const PRIORITY_COL: Record<Priority, string> = {
  High: "badge-red",
  Medium: "badge-amber",
  Low: "badge-grey",
};

export default function HelpdeskPage() {
  const lang = useLang();
  const t = translations[lang];

  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  function setField(key: keyof FormState, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate() {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.studentId.trim()) e.studentId = "Required";
    if (!form.email.trim()) e.email = "Required";
    if (!form.subject.trim()) e.subject = "Required";
    if (!form.description.trim()) e.description = "Required";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setSubmitted(true);
    setForm(EMPTY);
    setErrors({});
    setTimeout(() => setSubmitted(false), 4000);
  }

  const tickets = ticketsData as Ticket[];

  return (
    <div className="page">

      <section style={{ marginBottom: "2rem" }}>
        <p className="section-label">{t.currentTickets}</p>

        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {tickets.map((ticket) => (
            <li key={ticket.id} className="card" style={{ display: "flex", justifyContent: "space-between", padding: "0.85rem 1.1rem" }}>
              <div>
                <div style={{ fontWeight: 600 }}>
                  {typeof ticket.subject === "object" ? ticket.subject[lang] : ticket.subject}
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  {ticket.name} · {ticket.student_id}
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.4rem" }}>
                <span className={`badge ${PRIORITY_COL[ticket.priority]}`}>
                  {ticket.priority}
                </span>
                <span className={`badge ${STATUS_COL[ticket.status]}`}>
                  {ticket.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div style={{ maxWidth: 540 }}>
        <h1 className="page-title">{t.helpdesk}</h1>

        <p className="section-subtitle">
          {t.helpdeskDesc}
        </p>

        {submitted && (
          <div style={{ background: "#d1fae5", color: "#065f46", padding: "0.75rem", borderRadius: "6px", marginBottom: "1rem", fontWeight: 600 }}>
            Submitted
          </div>
        )}

        <div className="card" style={{ padding: "1.5rem" }}>

          {([
            { id: "name", label: "Name", type: "text" },
            { id: "studentId", label: "Student ID Number", type: "text" },
            { id: "email", label: "Email", type: "email" },
            { id: "phone", label: "Phone Number", type: "tel" },
            { id: "subject", label: "Subject", type: "text" },
          ] as { id: keyof FormState; label: string; type: string }[]).map(({ id, label, type }) => (
            <div key={id} className="form-group">
              <label className="form-label">{label}</label>

              <input
                className="form-input"
                type={type}
                value={form[id]}
                onChange={(e) => setField(id, e.target.value)}
              />

              {errors[id] && (
                <span style={{ color: "#ef4444", fontSize: "0.78rem" }}>
                  {errors[id]}
                </span>
              )}
            </div>
          ))}

          <div className="form-group">
            <label className="form-label">Description</label>

            <textarea
              className="form-textarea"
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
            />

            {errors.description && (
              <span style={{ color: "#ef4444", fontSize: "0.78rem" }}>
                {errors.description}
              </span>
            )}
          </div>

          <button className="btn-primary" onClick={handleSubmit}>
            {t.submitRequest}
          </button>

        </div>
      </div>

    </div>
  );
}

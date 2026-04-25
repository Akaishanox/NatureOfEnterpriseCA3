"use client";
import { useState } from "react";
import ticketsData from "@/data/tickets.json";
import { translations } from "@/app/lib/translations";

type Status   = "Open" | "In Progress" | "Closed";
type Priority = "High" | "Medium" | "Low";
interface Ticket { id: number; name: string; student_id: string; email: string; subject: string; status: Status; priority: Priority; }
interface FormState { name: string; studentId: string; email: string; phone: string; subject: string; description: string; }

const EMPTY: FormState = { name: "", studentId: "", email: "", phone: "", subject: "", description: "" };
const STATUS_COL:   Record<Status,   string> = { Open: "badge-blue", "In Progress": "badge-amber", Closed: "badge-green" };
const PRIORITY_COL: Record<Priority, string> = { High: "badge-red",  Medium: "badge-amber",        Low: "badge-grey"     };

export default function HelpdeskPage() {
  const lang =
    typeof window !== "undefined"
      ? localStorage.getItem("language") || "en"
      : "en";

  const t = translations[lang];
  const [form, setForm]           = useState<FormState>(EMPTY);
  const [errors, setErrors]       = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  function set(key: keyof FormState, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate() {
    const e: Partial<FormState> = {};
    if (!form.name.trim())        e.name        = "Name is required.";
    if (!form.studentId.trim())   e.studentId   = "Student ID is required.";
    if (!form.email.trim())       e.email       = "Email is required.";
    if (!form.subject.trim())     e.subject     = "Subject is required.";
    if (!form.description.trim()) e.description = "Description is required.";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
    setForm(EMPTY);
    setErrors({});
    setTimeout(() => setSubmitted(false), 4000);
  }

  const tickets = ticketsData as Ticket[];

  return (
    <div className="page">
      <section style={{ marginBottom: "2rem" }} aria-label="Existing tickets">
        <p style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "0.75rem" }}>Current Tickets</p>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {tickets.map((t) => (
            <li key={t.id} className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.85rem 1.1rem" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{t.subject}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{t.name} · {t.student_id}</div>
              </div>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <span className={`badge ${PRIORITY_COL[t.priority]}`}>{t.priority}</span>
                <span className={`badge ${STATUS_COL[t.status]}`}>{t.status}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div style={{ maxWidth: 540 }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.3rem" }}>{t.helpdesk}</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
          {t.helpdeskDesc}
        </p>

        {submitted && (
          <div role="alert" style={{ background: "#d1fae5", color: "#065f46", borderRadius: "6px", padding: "0.75rem 1rem", marginBottom: "1rem", fontWeight: 600, fontSize: "0.875rem" }}>
            ✅ Request submitted! We'll get back to you within 24 hours.
          </div>
        )}

        <div className="card" style={{ padding: "1.5rem" }}>
          {([
            { id: "name",      label: "Name",              placeholder: "Enter your name",         type: "text"  },
            { id: "studentId", label: "Student ID Number", placeholder: "Enter your student ID",   type: "text"  },
            { id: "email",     label: "Email",             placeholder: "Enter your email",        type: "email" },
            { id: "phone",     label: "Phone Number",      placeholder: "Enter your phone number", type: "tel"   },
            { id: "subject",   label: "Subject",           placeholder: "Enter subject",           type: "text"  },
          ] as { id: keyof FormState; label: string; placeholder: string; type: string }[]).map(({ id, label, placeholder, type }) => (
            <div key={id} className="form-group">
              <label className="form-label" htmlFor={id}>{label}</label>
              <input id={id} className="form-input" type={type} placeholder={placeholder}
                value={form[id]} onChange={(e) => set(id, e.target.value)} />
              {(errors as Record<string,string>)[id] && (
                <span role="alert" style={{ color: "#ef4444", fontSize: "0.78rem" }}>{(errors as Record<string,string>)[id]}</span>
              )}
            </div>
          ))}

          <div className="form-group">
            <label className="form-label" htmlFor="description">Description</label>
            <textarea id="description" className="form-textarea" placeholder="Enter description"
              value={form.description} onChange={(e) => set("description", e.target.value)} />
            {errors.description && <span role="alert" style={{ color: "#ef4444", fontSize: "0.78rem" }}>{errors.description}</span>}
          </div>

          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "1rem" }}>Please provide as much detail as possible.</p>
          <button className="btn-primary" onClick={handleSubmit}>Submit Request</button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
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

  const [tickets, setTickets] = useState<Ticket[]>([]); // ✅ now dynamic

  function setField(key: keyof FormState, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate() {
    const e: Partial<FormState> = {};

    if (!form.name.trim()) e.name = "Name is required";
    if (!form.studentId.trim()) e.studentId = "Student ID is required";

    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";

    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.description.trim()) e.description = "Enter details";

    return e;
  }

  // ✅ FETCH TICKETS FROM BACKEND
  async function loadTickets() {
    const res = await fetch("/api/tickets");
    const data = await res.json();
    setTickets(data);
  }

  useEffect(() => {
    loadTickets();
  }, []);

  // ✅ SUBMIT TO BACKEND
  async function handleSubmit() {
    const e = validate();

    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        student_id: form.studentId,
        email: form.email,
        subject: form.subject,
      }),
    });

    setSubmitted(true);
    setForm(EMPTY);
    setErrors({});
    loadTickets(); // 🔥 refresh tickets

    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <main className="helpdesk-page">
      <div className="helpdesk-container">
        <section className="tickets-section">
          <ul className="tickets-list">
            {tickets.map((ticket) => (
              <li key={ticket.id} className="ticket-card">
                <div>
                  <div className="ticket-title">
                    {typeof ticket.subject === "object"
                      ? ticket.subject[lang]
                      : ticket.subject}
                  </div>

                  <div className="ticket-student">
                    {ticket.name} · {ticket.student_id}
                  </div>
                </div>

                <div className="ticket-badges">
                  <span className={`badge ${PRIORITY_COL[ticket.priority]}`}>
                    {t.priority[ticket.priority]}
                  </span>

                  <span className={`badge ${STATUS_COL[ticket.status]}`}>
                    {t.status[ticket.status]}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="helpdesk-form-card">
          <h1 className="helpdesk-title">{t.helpdesk}</h1>
          <p className="helpdesk-description">{t.helpdeskDesc}</p>
          <div className="helpdesk-line"></div>

          {submitted && <div className="submitted-box">Submitted</div>}

          <div className="form-group">
            <label className="form-label">{t.formName}</label>
            <input
              className={`form-input ${errors.name ? "input-error" : ""}`}
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t.formStudentId}</label>
            <input
              className={`form-input ${errors.studentId ? "input-error" : ""}`}
              value={form.studentId}
              onChange={(e) => setField("studentId", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t.formEmail}</label>
            <input
              className={`form-input ${errors.email ? "input-error" : ""}`}
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t.formPhone}</label>
            <input
              className={`form-input ${errors.phone ? "input-error" : ""}`}
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t.formSubject}</label>
            <input
              className={`form-input ${errors.subject ? "input-error" : ""}`}
              value={form.subject}
              onChange={(e) => setField("subject", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t.formDescription}</label>
            <textarea
              className={`form-textarea ${errors.description ? "input-error" : ""}`}
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
            />
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            {t.submitRequest}
          </button>
        </section>
      </div>
    </main>
  );
}

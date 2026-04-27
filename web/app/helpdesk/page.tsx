"use client";

import { useState, useEffect } from "react";
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
  const [tickets, setTickets] = useState<Ticket[]>(ticketsData as Ticket[]);

  function setField(key: keyof FormState, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate() {
    const e: Partial<FormState> = {};

    if (!form.name.trim()) e.name = t.errors.nameRequired;
    if (!form.studentId.trim()) e.studentId = t.errors.studentIdRequired;

    if (!form.email.trim()) {
      e.email = t.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = t.errors.emailInvalid;
    }

    if (!form.phone.trim()) {
      e.phone = t.errors.phoneRequired;
    } else if (!/^[0-9+\s()-]{7,15}$/.test(form.phone)) {
      e.phone = t.errors.phoneInvalid;
    }

    if (!form.subject.trim()) e.subject = t.errors.subjectRequired;
    if (!form.description.trim()) e.description = t.errors.descriptionRequired;

    return e;
  }

  async function loadTickets() {
    try {
      const res = await fetch("/api/tickets", { cache: "no-store" });
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setTickets(data);
      }
    } catch {
      setTickets(ticketsData as Ticket[]);
    }
  }

  useEffect(() => {
    loadTickets();
  }, []);

  async function handleSubmit() {
    const e = validate();

    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    const newTicket = {
      name: form.name,
      student_id: form.studentId,
      email: form.email,
      subject: form.subject,
      status: "Open" as Status,
      priority: "Medium" as Priority,
    };

    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTicket),
      });

      const savedTicket = await res.json();

      setTickets((oldTickets) => [savedTicket, ...oldTickets]);
    } catch {
      setTickets((oldTickets) => [
        {
          id: Date.now(),
          ...newTicket,
        },
        ...oldTickets,
      ]);
    }

    setSubmitted(true);
    setForm(EMPTY);
    setErrors({});
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <main className="helpdesk-page">
      <div className="helpdesk-container">

        <section className="tickets-section" aria-label="Existing tickets">
          <ul className="tickets-list">
            {tickets.map((ticket) => (
              <li key={ticket.id} className="ticket-card">
                <div>
                  <div className="ticket-title">
                    {typeof ticket.subject === "object"
                      ? ticket.subject[lang] || ticket.subject.en
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
              type="text"
              placeholder={t.formNamePlaceholder}
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">{t.formStudentId}</label>
            <input
              className={`form-input ${errors.studentId ? "input-error" : ""}`}
              type="text"
              placeholder={t.formStudentIdPlaceholder}
              value={form.studentId}
              onChange={(e) => setField("studentId", e.target.value)}
            />
            {errors.studentId && <p className="error-text">{errors.studentId}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">{t.formEmail}</label>
            <input
              className={`form-input ${errors.email ? "input-error" : ""}`}
              type="email"
              placeholder={t.formEmailPlaceholder}
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">{t.formPhone}</label>
            <input
              className={`form-input ${errors.phone ? "input-error" : ""}`}
              type="tel"
              placeholder={t.formPhonePlaceholder}
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">{t.formSubject}</label>
            <input
              className={`form-input ${errors.subject ? "input-error" : ""}`}
              type="text"
              placeholder={t.formSubjectPlaceholder}
              value={form.subject}
              onChange={(e) => setField("subject", e.target.value)}
            />
            {errors.subject && <p className="error-text">{errors.subject}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">{t.formDescription}</label>
            <textarea
              className={`form-textarea ${errors.description ? "input-error" : ""}`}
              placeholder={t.formDescriptionPlaceholder}
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
            />
            {errors.description && <p className="error-text">{errors.description}</p>}
          </div>

          <p className="detail-note">{t.errors.descriptionRequired}</p>

          <button className="submit-btn" onClick={handleSubmit}>
            {t.submitRequest}
          </button>
        </section>
      </div>
    </main>
  );
}

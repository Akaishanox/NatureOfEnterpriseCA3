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
              className="form-input"
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
              className="form-input"
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
              className="form-input"
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
              className="form-input"
              type="tel"
              placeholder={t.formPhonePlaceholder}
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t.formSubject}</label>
            <input
              className="form-input"
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
              className="form-textarea"
              placeholder={t.formDescriptionPlaceholder}
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
            />
            {errors.description && (
              <p className="error-text">{errors.description}</p>
            )}
          </div>

          <p className="detail-note">Please provide as much detail as possible</p>

          <button className="submit-btn" onClick={handleSubmit}>
            {t.submitRequest}
          </button>
        </section>
      </div>

      <style>{`
        .helpdesk-page {
          padding: 6rem 4rem 3rem;
          background: var(--background);
          min-height: 100vh;
        }

        .helpdesk-container {
          max-width: 700px;
          margin: 0 auto;
        }

        .tickets-section {
          margin-bottom: 2rem;
        }

        .tickets-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          padding: 0;
          margin: 0;
        }

        .ticket-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 0.85rem 1.1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: var(--shadow);
        }

        .ticket-title {
          font-weight: 700;
          color: var(--text);
        }

        .ticket-student {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 0.2rem;
        }

        .ticket-badges {
          display: flex;
          gap: 0.4rem;
        }

        .helpdesk-form-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 2rem;
          box-shadow: var(--shadow);
        }

        .helpdesk-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 1rem;
        }

        .helpdesk-description {
          font-size: 1rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .helpdesk-line {
          height: 1px;
          background: var(--border);
          margin-bottom: 1.5rem;
        }

        .submitted-box {
          background: #d1fae5;
          color: #065f46;
          padding: 0.75rem;
          border-radius: 6px;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .form-group {
          margin-bottom: 1.4rem;
        }

        .form-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0.6rem;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 0.9rem;
          font-size: 1rem;
          background: var(--surface);
          color: var(--text);
          outline: none;
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: var(--text-muted);
        }

        .form-textarea {
          min-height: 160px;
          resize: vertical;
        }

        .detail-note {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .submit-btn {
          width: 100%;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.9rem 1rem;
          font-size: 1rem;
          cursor: pointer;
        }

        .submit-btn:hover {
          background: var(--primary-dark);
        }

        .error-text {
          color: #dc2626;
          font-size: 0.8rem;
          margin-top: 0.3rem;
        }

        @media (max-width: 900px) {
          .helpdesk-page {
            padding: 5rem 1.5rem 2rem;
          }

          .helpdesk-container {
            max-width: 100%;
          }

          .ticket-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.6rem;
          }
        }
      `}</style>
    </main>
  );
}

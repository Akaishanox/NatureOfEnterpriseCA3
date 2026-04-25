"use client";

import { translations } from "@/app/lib/translations";
import events from "@/data/events.json";

export default function EventsPage() {

  const lang =
    typeof window !== "undefined"
      ? localStorage.getItem("language") || "en"
      : "en";

  const t = translations[lang];

  return (
    <main className="events-page">

      <h1 className="page-title">{t.events}</h1>
      <div className="page-line"></div>

      <h2 className="section-title">{t.upcomingEvents}</h2>
      <p className="section-subtitle">
        {t.browseEvents}
      </p>

      <div className="events-grid">
        {events.map((event: any) => (
          <div className="event-card" key={event.id}>
            <div className="event-icon">📅</div>

            <h3>{event.title}</h3>

            <p>🗓️ Date: {event.date}</p>
            <p>🕘 Time: {event.time}</p>
            <p>📍 Location: {event.location}</p>

            <p className="event-description">
              {event.description}
            </p>

            <button className="register-btn">
              {t.submitRequest}
            </button>
          </div>
        ))}
      </div>

    </main>
  );
}

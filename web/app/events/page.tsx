"use client";

import events from "@/data/events.json";
import { translations } from "../lib/translations";
import { useLang } from "../lib/useLang";

export default function EventsPage() {

  const lang = useLang();
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

            <p>🗓️ {t.date}: {event.date}</p>
            <p>🕘 {t.time}: {event.time}</p>
            <p>📍 {t.location}: {event.location}</p>

            <p className="event-description">
              {event.description}
            </p>

            <button className="register-btn">
              {t.registerNow}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

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

            <h3>
              {typeof event.title === "object"
                ? event.title[lang]
                : event.title}
            </h3>

            <p>
              🗓️ {event.date}
            </p>

            <p>
              🕘 {event.time}
            </p>

            <p>
              📍 {typeof event.location === "object"
                ? event.location[lang]
                : event.location}
            </p>

            <p className="event-description">
              {typeof event.description === "object"
                ? event.description[lang]
                : event.description}
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

"use client";

import events from "@/data/events.json";
import { translations } from "@/app/lib/translations";
import { useLang } from "@/app/lib/useLang";

function getText(value: any, lang: string) {
  if (typeof value === "object") {
    return value[lang] || value.en;
  }
  return value;
}

export default function EventsPage() {
  const lang = useLang();
  const t = translations[lang];

  return (
    <main className="events-page-fixed">
      <h1 className="events-title">{t.events}</h1>
      <div className="events-line"></div>

      <h2 className="events-subtitle">{t.upcomingEvents}</h2>
      <p className="events-description">{t.browseEvents}</p>

      <div className="events-grid-fixed">
        {events.map((event: any) => (
          <div className="event-card-fixed" key={event.id}>
            <div className="event-icon-fixed">📅</div>

            <h3>{getText(event.title, lang)}</h3>

            <div className="event-info">
              <p>🗓️ {t.date}: {event.date}</p>
              <p>🕘 {t.time}: {event.time}</p>
              <p>📍 {t.location}: {getText(event.location, lang)}</p>
            </div>

            <p className="event-description-text">
              {getText(event.description, lang)}
            </p>

            <button className="register-btn-fixed">
              {t.registerNow}
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .events-page-fixed {
          padding: 3rem 4rem;
          background: var(--background);
          min-height: 100vh;
        }

        .events-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 0.8rem;
        }

        .events-line {
          width: 70px;
          height: 8px;
          background: var(--primary);
          border-radius: 999px;
          margin-bottom: 2.8rem;
        }

        .events-subtitle {
          font-size: 1.55rem;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 0.6rem;
        }

        .events-description {
          font-size: 1rem;
          color: var(--text-muted);
          margin-bottom: 2.6rem;
        }

        .events-grid-fixed {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.4rem 8rem;
          max-width: 1450px;
          margin: 0 auto;
        }

        .event-card-fixed {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 2rem 1.7rem 1.7rem;
          min-height: 300px;
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
        }

        .event-icon-fixed {
          font-size: 2.3rem;
          text-align: center;
          margin-bottom: 1.2rem;
        }

        .event-card-fixed h3 {
          text-align: center;
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 1.6rem;
        }

        .event-info {
          margin-bottom: 1rem;
        }

        .event-info p {
          font-size: 0.95rem;
          color: var(--text);
          margin-bottom: 0.7rem;
        }

        .event-description-text {
          font-size: 0.95rem;
          color: var(--text);
          line-height: 1.5;
          margin-bottom: 1.4rem;
          flex: 1;
        }

        .register-btn-fixed {
          width: 100%;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.8rem 1rem;
          font-size: 1rem;
          cursor: pointer;
        }

        .register-btn-fixed:hover {
          background: var(--primary-dark);
        }

        @media (max-width: 900px) {
          .events-page-fixed {
            padding: 2rem 1.5rem;
          }

          .events-grid-fixed {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </main>
  );
}

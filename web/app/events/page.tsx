"use client";

import { useState } from "react";
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
  const [popup, setPopup] = useState("");

  const ICONS: Record<string, string> = {
    Technology: "💻",
    Sports: "🏅",
    Careers: "👤",
    Social: "👥",
    Academic: "📘",
  };

  const popupMessages: Record<string, { title: string; message: string; ok: string }> = {
    en: {
      title: "Registered",
      message: "You have now been registered for",
      ok: "OK",
    },
    ga: {
      title: "Cláraithe",
      message: "Tá tú cláraithe anois do",
      ok: "Ceart go leor",
    },
    es: {
      title: "Registrado",
      message: "Ahora estás registrado para",
      ok: "OK",
    },
    fr: {
      title: "Inscrit",
      message: "Vous êtes maintenant inscrit à",
      ok: "OK",
    },
  };

  const pop = popupMessages[lang] || popupMessages.en;

  function handleRegister(title: string) {
    setPopup(title);
  }

  return (
    <main className="events-page-fixed">
      <h1 className="events-title">{t.events}</h1>
      <div className="events-line"></div>

      <h2 className="events-subtitle">{t.upcomingEvents}</h2>
      <p className="events-description">{t.browseEvents}</p>

      <div className="events-grid-fixed">
        {events.map((event: any) => {
          const eventTitle = getText(event.title, lang);

          return (
            <div className="event-card-fixed" key={event.id}>
              <div className="event-icon-fixed">
                {ICONS[event.category] || "📅"}
              </div>

              <h3>{eventTitle}</h3>

              <div className="event-info">
                <p>🗓️ {t.date}: {event.date}</p>
                <p>🕘 {t.time}: {event.time}</p>
                <p>📍 {t.location}: {getText(event.location, lang)}</p>
              </div>

              <p className="event-description-text">
                {getText(event.description, lang)}
              </p>

              <button
                className="register-btn-fixed"
                onClick={() => handleRegister(eventTitle)}
              >
                {t.registerNow}
              </button>
            </div>
          );
        })}
      </div>

      {popup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>{pop.title}</h2>
            <p>
              {pop.message} {popup}.
            </p>
            <button onClick={() => setPopup("")}>{pop.ok}</button>
          </div>
        </div>
      )}

      <style>{`
        .events-page-fixed {
          padding: 6rem 4rem 3rem;
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
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 1rem;
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

        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .popup-box {
          background: var(--surface);
          color: var(--text);
          width: 360px;
          max-width: 90%;
          padding: 2rem;
          border-radius: 14px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
          text-align: center;
          border: 1px solid var(--border);
        }

        .popup-box h2 {
          margin-bottom: 0.8rem;
          color: var(--primary);
        }

        .popup-box p {
          margin-bottom: 1.4rem;
          color: var(--text);
        }

        .popup-box button {
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.7rem 1.5rem;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .events-page-fixed {
            padding: 5rem 1.5rem 2rem;
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

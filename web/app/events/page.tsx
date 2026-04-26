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

  const popupMessages = {
    en: { title: "Registered", message: "You have now been registered for", ok: "OK" },
    ga: { title: "Cláraithe", message: "Tá tú cláraithe anois do", ok: "Ceart go leor" },
    es: { title: "Registrado", message: "Ahora estás registrado para", ok: "OK" },
    fr: { title: "Inscrit", message: "Vous êtes maintenant inscrit à", ok: "OK" },
  };

  const pop = popupMessages[lang] || popupMessages.en;

  async function handleRegister(title: string) {
    try {
      await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Student",
          student_id: "TUD000",
          email: "student@email.com",
          subject: `Event Registration: ${title}`,
        }),
      });
    } catch {
      console.log("Backend failed");
    }

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
            <p>{pop.message} {popup}.</p>
            <button onClick={() => setPopup("")}>{pop.ok}</button>
          </div>
        </div>
      )}

      <style>{`
        .events-page-fixed {
          padding: 6rem 4rem 3rem;
          background: var(--bg); /* FIXED */
          min-height: 100vh;
        }
        /* KEEP REST SAME */
      `}</style>
    </main>
  );
}

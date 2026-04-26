"use client";

import { useState } from "react";
import events from "@/data/events.json";
import { useLang } from "@/app/lib/useLang";
import { translations } from "@/app/lib/translations";

function getText(value: any, lang: string) {
  if (typeof value === "object") {
    return value[lang] || value.en;
  }
  return value;
}

export default function RecommenderPage() {
  const lang = useLang();
  const t = translations[lang];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [popup, setPopup] = useState("");

  const categories = ["Technology", "Sports", "Careers", "Social", "Academic"];

  const ICONS: Record<string, string> = {
    Technology: "💻",
    Sports: "🏅",
    Careers: "👤",
    Social: "👥",
    Academic: "📘",
  };

  const popupMessages: Record<string, any> = {
    en: { title: "Registered", message: "You have now been registered for", ok: "OK" },
    ga: { title: "Cláraithe", message: "Tá tú cláraithe anois do", ok: "Ceart go leor" },
    es: { title: "Registrado", message: "Ahora estás registrado para", ok: "OK" },
    fr: { title: "Inscrit", message: "Vous êtes maintenant inscrit à", ok: "OK" },
  };

  const pop = popupMessages[lang] || popupMessages.en;

  function getRecommendations() {
    const filtered = events.filter(
      (event: any) => event.category === selectedCategory
    );
    setRecommendations(filtered);
  }

  function handleRegister(title: string) {
    setPopup(title);
  }

  return (
    <main className="recommender-page">
      <div className="recommender-container">
        <h1 className="recommender-title">{t.events} Recommender</h1>
        <div className="recommender-line"></div>

        <h2 className="recommender-subtitle">Choose your interest</h2>
        <p className="recommender-description">
          Get recommended events based on your selected category.
        </p>

        {/* CONTROLS */}
        <div className="recommender-controls">
          <div className="control-header">
            <div className="control-icon">✨</div>
            <div>
              <h3>Find events for you</h3>
              <p>Select a category and get matching campus events.</p>
            </div>
          </div>

          <label className="select-label">Interest category</label>

          <select
            className="recommender-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button className="recommend-btn" onClick={getRecommendations}>
            Get Recommendations
          </button>
        </div>

        {/* RESULTS */}
        <div className="recommender-grid">
          {recommendations.map((event: any) => {
            const eventTitle = getText(event.title, lang);

            return (
              <div className="recommender-card" key={event.id}>
                <div className="recommender-icon">
                  {ICONS[event.category] || "📅"}
                </div>

                <h3>{eventTitle}</h3>

                <div className="recommender-info">
                  <p>🗓️ {t.date}: {event.date}</p>
                  <p>🕘 {t.time}: {event.time}</p>
                  <p>📍 {t.location}: {getText(event.location, lang)}</p>
                </div>

                <p className="recommender-card-text">
                  {getText(event.description, lang)}
                </p>

                <p className="reason-text">
                  Recommended because it matches your interest in <b>{selectedCategory}</b>
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
      </div>

      {/* POPUP */}
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
        .recommender-page {
          padding: 6rem 4rem 3rem;
          background: var(--background);
          min-height: 100vh;
        }

        .recommender-container {
          max-width: 1450px;
          margin: 0 auto;
        }

        .recommender-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--primary);
        }

        .recommender-line {
          width: 70px;
          height: 8px;
          background: var(--primary);
          border-radius: 999px;
          margin: 1rem 0 2rem;
        }

        .recommender-subtitle {
          font-size: 1.5rem;
          font-weight: 800;
        }

        .recommender-description {
          color: var(--text-muted);
          margin-bottom: 2rem;
        }

        .recommender-controls {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto 2.6rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 2rem;
          box-shadow: var(--shadow);
        }

        .control-header {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.4rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 1rem;
        }

        .control-icon {
          width: 48px;
          height: 48px;
          background: var(--primary);
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .select-label {
          font-weight: 700;
          margin-bottom: 0.5rem;
          display: block;
        }

        .recommender-select {
          width: 100%;
          padding: 0.8rem;
          border-radius: 6px;
          border: 1px solid var(--border);
          margin-bottom: 1rem;
        }

        .recommend-btn,
        .register-btn-fixed {
          width: 100%;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.8rem;
          cursor: pointer;
        }

        .recommender-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .recommender-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
        }

        .recommender-icon {
          text-align: center;
          font-size: 2rem;
        }

        .reason-text {
          margin: 1rem 0;
          color: var(--text-muted);
        }

        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .popup-box {
          background: var(--surface);
          padding: 2rem;
          border-radius: 12px;
        }

        @media (max-width: 900px) {
          .recommender-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}

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

  const popupMessages: Record<
    string,
    { title: string; message: string; ok: string }
  > = {
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
                  Recommended because it matches your interest in{" "}
                  <b>{selectedCategory}</b>
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
          margin-bottom: 0.8rem;
        }

        .recommender-line {
          width: 70px;
          height: 8px;
          background: var(--primary);
          border-radius: 999px;
          margin-bottom: 2.8rem;
        }

        .recommender-subtitle {
          font-size: 1.55rem;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 0.6rem;
        }

        .recommender-description {
          font-size: 1rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }

        .recommender-controls {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 1.6rem;
          box-shadow: var(--shadow);
          margin: 0 auto 2.6rem;
          max-width: 520px;
        }

        .control-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.4rem;
          padding-bottom: 1.2rem;
          border-bottom: 1px solid var(--border);
        }

        .control-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .control-header h3 {
          color: var(--text);
          font-size: 1.15rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }

        .control-header p {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .select-label {
          display: block;
          color: var(--text);
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 0.6rem;
        }

        .recommender-select {
          width: 100%;
          padding: 0.85rem;
          border: 1px solid var(--border);
          border-radius: 7px;
          background: var(--surface);
          color: var(--text);
          font-size: 1rem;
          margin-bottom: 1rem;
          outline: none;
        }

        .recommender-select:focus {
          border-color: var(--primary);
        }

        .recommend-btn,
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

        .recommend-btn:hover,
        .register-btn-fixed:hover {
          background: var(--primary-dark);
        }

        .recommender-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.4rem 8rem;
        }

        .recommender-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 2rem 1.7rem 1.7rem;
          min-height: 300px;
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
        }

        .recommender-icon {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 1rem;
        }

        .recommender-card h3 {
          text-align: center;
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 1.6rem;
        }

        .recommender-info {
          margin-bottom: 1rem;
        }

        .recommender-info p {
          font-size: 0.95rem;
          color: var(--text);
          margin-bottom: 0.7rem;
        }

        .recommender-card-text {
          font-size: 0.95rem;
          color: var(--text);
          line-height: 1.5;
          margin-bottom: 1.4rem;
          flex: 1;
        }

        .reason-text {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
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
          .recommender-page {
            padding: 5rem 1.5rem 2rem;
          }

          .recommender-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .recommender-controls {
            max-width: 100%;
          }
        }
      `}</style>
    </main>
  );
}

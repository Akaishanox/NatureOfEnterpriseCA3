"use client";

import { useState } from "react";
import events from "@/data/events.json";
import { useLang } from "@/app/lib/useLang";
import { translations } from "@/app/lib/translations";
import usersData from "@/data/users.json";

function getText(value: any, lang: string) {
  if (typeof value === "object") {
    return value[lang] || value.en;
  }
  return value;
}

const currentUser = usersData[0];

export default function RecommenderPage() {
  const lang = useLang();
  const t = translations[lang] || translations.en;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [popup, setPopup] = useState("");
  const [appliedCategory, setAppliedCategory] = useState("");

  const categories = Object.keys(t.categories);

  const ICONS: Record<string, string> = {
    Technology: "💻",
    Sports: "🏅",
    Careers: "👤",
    Social: "👥",
    Academic: "📘",
  };

  function getRecommendations() {
    if (!selectedCategory) return;

    setAppliedCategory(selectedCategory);

    const today = new Date();
    const userPreference = currentUser?.preferred_category || "";
    const savedPrefs = JSON.parse(localStorage.getItem("userPrefs") || "[]");

    const scored = events.map((event: any) => {
      let score = 0;
      let reasons: string[] = [];

      if (event.category === selectedCategory) {
        score += 5;
        reasons.push("category");
      }

      if (event.category === userPreference) {
        score += 3;
        reasons.push("preference");
      }

      if (savedPrefs.includes(event.category)) {
        score += 2;
        reasons.push("history");
      }

      const eventDate = new Date(event.date);
      const diffDays = Math.abs(
        (eventDate.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
      );

      if (diffDays < 7) {
        score += 2;
        reasons.push("soon");
      } else if (diffDays < 14) {
        score += 1;
      }

      if (event.time.includes("-")) score += 1;

      return { ...event, score, reasons };
    });

    const sorted = scored
      .filter((e) => e.score > 0)
      .sort((a, b) => b.score - a.score);

    setRecommendations(sorted.slice(0, 4));
  }

  function handleRegister(title: string, category: string) {
    setPopup(title);

    const prev = JSON.parse(localStorage.getItem("userPrefs") || "[]");
    const updated = [...prev, category].slice(-10);

    localStorage.setItem("userPrefs", JSON.stringify(updated));
  }

  return (
    <main className="events-page-fixed">
      <h1 className="events-title">{t.recommenderTitle}</h1>
      <div className="events-line"></div>

      <h2 className="events-subtitle">{t.chooseInterest}</h2>

      <p className="events-description">{t.recommenderDesc}</p>

      <div className="recommender-controls">
        <div className="control-header">
          <div className="control-icon">✨</div>
          <div className="control-text">
            <h3>{t.findEvents}</h3>
            <p>{t.findEventsDesc}</p>
          </div>
        </div>

        <label className="select-label">{t.interestCategory}</label>

        <select
          className="recommender-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">{t.selectCategory}</option>

          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {t.categories[cat]}
            </option>
          ))}
        </select>

        <button className="recommend-btn" onClick={getRecommendations}>
          {t.getRecommendations}
        </button>
      </div>

      <div className="events-grid-fixed">
        {recommendations.map((event: any, index) => {
          const eventTitle = getText(event.title, lang);

          return (
            <div className="event-card-fixed" key={event.id}>
              {index === 0 && (
                <div className="top-pick">⭐ Top Match</div>
              )}

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

              <p className="reason-text">
                {t.recommendedBecause}{" "}
                <b>{t.categories[appliedCategory]}</b>
              </p>

              <button
                className="register-btn-fixed"
                onClick={() => handleRegister(eventTitle, event.category)}
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
            <h2>{t.registered}</h2>
            <p>{t.registerMessage} {popup}.</p>
            <button onClick={() => setPopup("")}>{t.ok}</button>
          </div>
        </div>
      )}

      <style>{`
        /* 🔥 YOUR ORIGINAL CSS (UNCHANGED) */

        .events-page-fixed {
          padding: 6rem 4rem 3rem;
          background: var(--bg);
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
          margin-bottom: 0.6rem;
        }

        .events-description {
          font-size: 1rem;
          margin-bottom: 2rem;
        }

        .recommender-controls {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 2rem;
          border-radius: 12px;
          max-width: 1450px;
          margin: 0 auto 2.5rem;
          box-shadow: var(--shadow);
        }

        .control-header {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.2rem;
        }

        .control-icon {
          font-size: 1.6rem;
          background: var(--primary-light);
          padding: 0.6rem;
          border-radius: 8px;
        }

        .select-label {
          display: block;
          font-weight: 600;
          margin-top: 1rem;
        }

        .recommender-select {
          width: 100%;
          padding: 0.85rem;
          margin: 0.7rem 0 1rem;
          border-radius: 8px;
          border: 1px solid var(--border);
        }

        .recommend-btn {
          width: 100%;
          background: var(--primary);
          color: white;
          border-radius: 8px;
          padding: 0.95rem;
        }

        .events-grid-fixed {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.4rem;
          max-width: 1450px;
          margin: 0 auto;
        }

        .event-card-fixed {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 2rem;
          box-shadow: var(--shadow);
        }

        .top-pick {
          background: #facc15;
          color: #111;
          padding: 0.3rem 0.6rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 800;
          margin-bottom: 0.8rem;
        }

        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .popup-box {
          background: var(--surface);
          padding: 2rem;
          border-radius: 12px;
        }
      `}</style>
    </main>
  );
}

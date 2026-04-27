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

      if (event.category === selectedCategory) score += 5;
      if (event.category === userPreference) score += 3;
      if (savedPrefs.includes(event.category)) score += 2;

      const eventDate = new Date(event.date);
      const diffDays = Math.abs(
        (eventDate.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
      );

      if (diffDays < 7) score += 2;
      else if (diffDays < 14) score += 1;

      if (event.time.includes("-")) score += 1;

      return { ...event, score };
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

  function getConfidence(score: number) {
    const max = 13;
    return Math.min(100, Math.round((score / max) * 100));
  }

  const topMatchText: Record<string, string> = {
    en: "Top Match",
    ga: "An Rogha is Fearr",
    es: "Mejor Opción",
    fr: "Meilleur Choix",
  };

  return (
    <main className="events-page-fixed">
      <h1 className="events-title">
        {t.recommenderTitle || "Campus Events Recommender"}
      </h1>
      <div className="events-line"></div>

      <h2 className="events-subtitle">
        {t.chooseInterest || "Choose your interest"}
      </h2>

      <p className="events-description">
        {t.recommenderDesc || "Get recommended events based on your selected category."}
      </p>

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
          const confidence = getConfidence(event.score);

          return (
            <div className="event-card-fixed" key={event.id}>

              {index === 0 && (
                <div className="top-match-badge glow">
                  ⭐ {topMatchText[lang] || topMatchText.en}
                </div>
              )}

              {index === 0 && (
                <div className="confidence-badge">
                  {confidence}%
                </div>
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
        .event-card-fixed {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 2rem 1.7rem;
          min-height: 300px;
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
        }

        .top-match-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: linear-gradient(135deg, #ffd700, #ffcc00);
          color: #000;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 999px;
        }

        .confidence-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: var(--primary);
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 6px;
        }

        .glow {
          animation: glowPulse 2s infinite ease-in-out;
        }

        @keyframes glowPulse {
          0% { box-shadow: 0 0 6px rgba(255, 215, 0, 0.5); }
          50% { box-shadow: 0 0 14px rgba(255, 215, 0, 1); }
          100% { box-shadow: 0 0 6px rgba(255, 215, 0, 0.5); }
        }

        html.dark-mode .top-match-badge {
          background: linear-gradient(135deg, #ffcc00, #ffaa00);
          color: #000;
        }

      `}</style>
    </main>
  );
}

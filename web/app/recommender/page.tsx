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

    const userPrefs = JSON.parse(localStorage.getItem("userPrefs") || "[]");

    const scored = events.map((event: any) => {
      let score = 0;

      if (event.category === selectedCategory) score += 5;

      if (userPrefs.includes(event.category)) score += 3;

      const today = new Date();
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
    const updated = [...prev, category];
    localStorage.setItem("userPrefs", JSON.stringify(updated));
  }

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
            <h3>{t.findEvents || "Find events for you"}</h3>
            <p>
              {t.findEventsDesc || "Select a category and get matching campus events."}
            </p>
          </div>
        </div>

        <label className="select-label">
          {t.interestCategory || "Interest category"}
        </label>

        <select
          className="recommender-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">
            {t.selectCategory || "Select category"}
          </option>

          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {t.categories[cat]}
            </option>
          ))}
        </select>

        <button className="recommend-btn" onClick={getRecommendations}>
          {t.getRecommendations || "Get Recommendations"}
        </button>
      </div>

      <div className="events-grid-fixed">
        {recommendations.map((event: any) => {
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

              <p className="reason-text">
                {t.recommendedBecause || "Recommended because it matches your interest in"}{" "}
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
            <h2>{t.registered || "Registered"}</h2>
            <p>
              {t.registerMessage || "You have now been registered for"} {popup}.
            </p>
            <button onClick={() => setPopup("")}>
              {t.ok || "OK"}
            </button>
          </div>
        </div>
      )}

      <style>{`
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
          width: 100%;
          margin: 0 auto 2.5rem;
          box-shadow: var(--shadow);
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
          padding: 2rem 1.7rem;
          min-height: 300px;
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
        }

        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .popup-box {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 2rem 2.5rem;
          border-radius: 16px;
          text-align: center;
          box-shadow: var(--shadow);
          max-width: 400px;
          width: 90%;
        }
      `}</style>
    </main>
  );
}

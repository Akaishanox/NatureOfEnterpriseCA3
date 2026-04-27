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

  const pageText: Record<string, any> = {
    en: {
      title: "Campus Events Recommender",
      subtitle: "Choose your interest",
      desc: "Get recommended events based on your selected category.",
      findTitle: "Find events for you",
      findDesc: "Select a category and get matching campus events.",
      interest: "Interest category",
      select: "Select category",
      button: "Get Recommendations",
      reason: "Recommended because it matches your interest in",
      categories: {
        Technology: "Technology",
        Sports: "Sports",
        Careers: "Careers",
        Social: "Social",
        Academic: "Academic",
      },
    },
  };

  const x = pageText[lang] || pageText.en;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [popup, setPopup] = useState("");
  const [appliedCategory, setAppliedCategory] = useState("");

  const categories = ["Technology", "Sports", "Careers", "Social", "Academic"];

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

    const scored = events.map((event: any) => {
      let score = 0;

      if (event.category === selectedCategory) score += 5;

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

  function handleRegister(title: string) {
    setPopup(title);
  }

  return (
    <main className="recommender-page">
      <div className="recommender-container">
        <h1 className="recommender-title">{x.title}</h1>
        <div className="recommender-line"></div>

        <h2 className="recommender-subtitle">{x.subtitle}</h2>
        <p className="recommender-description">{x.desc}</p>

        <div className="recommender-controls">
          <div className="control-header">
            <span className="sparkle">✨</span>
            <div>
              <h3>{x.findTitle}</h3>
              <p>{x.findDesc}</p>
            </div>
          </div>

          <label className="select-label">{x.interest}</label>

          <select
            className="recommender-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">{x.select}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {x.categories[cat]}
              </option>
            ))}
          </select>

          <button
            className="recommend-btn"
            onClick={getRecommendations}
            disabled={!selectedCategory}
          >
            {x.button}
          </button>
        </div>

        <div className="recommender-grid">
          {recommendations.map((event: any) => {
            const eventTitle = getText(event.title, lang);

            return (
              <div className="recommender-card" key={event.id}>
                <div className="card-icon">
                  {ICONS[event.category] || "📅"}
                </div>

                <h3 className="card-title">{eventTitle}</h3>

                <div className="card-info">
                  <p>🗓️ {event.date}</p>
                  <p>🕘 {event.time}</p>
                  <p>📍 {getText(event.location, lang)}</p>
                </div>

                <p className="card-desc">
                  {getText(event.description, lang)}
                </p>

                <p className="reason-text">
                  {x.reason} <b>{x.categories[appliedCategory]}</b>
                </p>

                <button
                  className="register-btn"
                  onClick={() => handleRegister(eventTitle)}
                >
                  Register Now
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {popup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Registered</h2>
            <p>
              You have now been registered for <b>{popup}</b>.
            </p>
            <button
              className="popup-close-btn"
              onClick={() => setPopup("")}
            >
              OK
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .recommender-page {
          padding: 6rem 3rem;
          background: #f5f7fb;
          min-height: 100vh;
        }

        .recommender-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .recommender-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1d4ed8;
        }

        .recommender-line {
          width: 60px;
          height: 4px;
          background: #3b82f6;
          margin: 10px 0 25px;
          border-radius: 2px;
        }

        .recommender-subtitle {
          font-size: 1.4rem;
          font-weight: 700;
        }

        .recommender-description {
          color: #555;
          margin-bottom: 2rem;
        }

        .recommender-controls {
          background: white;
          padding: 2rem;
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          margin-bottom: 3rem;
        }

        .control-header {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 1rem;
        }

        .sparkle {
          font-size: 1.5rem;
        }

        .recommender-select {
          width: 100%;
          padding: 0.9rem;
          margin: 1rem 0;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        .recommend-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(90deg, #3b82f6, #2563eb);
          color: white;
          border-radius: 8px;
          font-weight: 600;
          border: none;
        }

        .recommender-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .recommender-card {
          background: white;
          padding: 1.8rem;
          border-radius: 14px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
          text-align: center;
        }

        .card-icon {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .card-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .card-info {
          font-size: 0.9rem;
          color: #444;
          margin-bottom: 10px;
        }

        .card-desc {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 10px;
        }

        .reason-text {
          background: #eef5ff;
          padding: 8px;
          border-radius: 6px;
          font-size: 0.8rem;
          margin-bottom: 12px;
        }

        .register-btn {
          width: 100%;
          padding: 0.7rem;
          background: linear-gradient(90deg, #3b82f6, #2563eb);
          color: white;
          border-radius: 6px;
          border: none;
        }

        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popup-box {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
        }
      `}</style>
    </main>
  );
}

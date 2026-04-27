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
  const [loading, setLoading] = useState(false);

  const categories = ["Technology", "Sports", "Careers", "Social", "Academic"];

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
  };

  const pop = popupMessages[lang] || popupMessages.en;

  function getRecommendations() {
    setLoading(true);

    setTimeout(() => {
      setAppliedCategory(selectedCategory);

      const scored = events.map((event: any) => {
        let score = 0;

        if (event.category === selectedCategory) {
          score += 5;
        }

        const today = new Date();
        const eventDate = new Date(event.date);
        const diffDays = Math.abs(
          (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffDays < 7) score += 2;
        else if (diffDays < 14) score += 1;

        if (event.time.includes("-")) {
          score += 1;
        }

        return { ...event, score };
      });

      const sorted = scored
        .filter((e) => e.score > 0)
        .sort((a, b) => b.score - a.score);

      setRecommendations(sorted.slice(0, 4));
      setLoading(false);
    }, 500);
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
            <div className="control-icon">✨</div>
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

        {loading && (
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            Loading recommendations...
          </p>
        )}

        {!loading && recommendations.length === 0 && appliedCategory && (
          <p style={{ textAlign: "center", marginTop: "2rem", color: "var(--text-muted)" }}>
            No events found for this category.
          </p>
        )}

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
                  {x.reason} <b>{x.categories[appliedCategory]}</b>
                </p>

                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  Score: {event.score}
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
    </main>
  );
}

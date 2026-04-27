"use client";

import { useState } from "react";
import events from "@/data/events.json";
import usersData from "@/data/users.json";
import { useLang } from "@/app/lib/useLang";
import { translations } from "@/app/lib/translations";

const currentUser = (usersData as { id: number; name: string; preferred_category: string }[])[0];

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

    const today = new Date();
    const userPreference = currentUser?.preferred_category || "";
    const savedPrefs = JSON.parse(localStorage.getItem("userPrefs") || "[]");

    const scored = events.map((event: any) => {
      let score = 0;
      let reasons: string[] = [];

      // Category match
      if (event.category === selectedCategory) {
        score += 5;
        reasons.push("category match");
      }

      // User preference
      if (event.category === userPreference) {
        score += 3;
        reasons.push("your preference");
      }

      // Past behaviour
      if (savedPrefs.includes(event.category)) {
        score += 2;
        reasons.push("your activity");
      }

      // Date proximity
      const eventDate = new Date(event.date);
      const diffDays = Math.abs(
        (eventDate.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
      );

      if (diffDays < 7) {
        score += 2;
        reasons.push("happening soon");
      } else if (diffDays < 14) {
        score += 1;
      }

      // Time quality
      if (event.time.includes("-")) {
        score += 1;
      }

      // Time preference (daytime bias)
      const hour = Number(event.time.split(":")[0]);
      if (hour >= 9 && hour <= 17) {
        score += 1;
        reasons.push("good timing");
      }

      // Location relevance
      const locationText = getText(event.location, "en");
      if (locationText.toLowerCase().includes("hall")) {
        score += 1;
      }

      // Confidence level
      let confidence = "Low";
      if (score >= 8) confidence = "High";
      else if (score >= 5) confidence = "Medium";

      return { ...event, score, reasons, confidence };
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
        {recommendations.map((event: any) => {
          const eventTitle = getText(event.title, lang);

          return (
            <div className="event-card-fixed" key={event.id}>
              {event.confidence === "High" && (
                <span className="top-pick">⭐ Top Pick</span>
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
                {t.recommendedBecause} <b>{t.categories[appliedCategory]}</b>
                <br />
                Score: {event.score} • {event.confidence}
                <br />
                {event.reasons.join(", ")}
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
        .top-pick {
          align-self: flex-start;
          background: #facc15;
          color: #111827;
          padding: 0.3rem 0.6rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 800;
          margin-bottom: 0.8rem;
        }
      `}</style>
    </main>
  );
}

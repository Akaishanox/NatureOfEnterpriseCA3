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

  const categories = ["Technology", "Sports", "Careers", "Social", "Academic"];

  function getRecommendations() {
    const filtered = events.filter(
      (event: any) => event.category === selectedCategory
    );

    setRecommendations(filtered);
  }

  return (
    <main className="events-page-fixed">
      <h1 className="events-title">🎯 {t.events} Recommender</h1>
      <div className="events-line"></div>

      <h2 className="events-subtitle">Choose your interest</h2>
      <p className="events-description">
        Get recommended events based on your selected category.
      </p>

      <div style={{ maxWidth: "400px", marginBottom: "2rem" }}>
        <select
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

        <button
          className="register-btn-fixed"
          style={{ marginTop: "1rem" }}
          onClick={getRecommendations}
        >
          Get Recommendations
        </button>
      </div>

      <div className="events-grid-fixed">
        {recommendations.map((event: any) => {
          const eventTitle = getText(event.title, lang);

          return (
            <div className="event-card-fixed" key={event.id}>
              <h3>{eventTitle}</h3>

              <div className="event-info">
                <p>🗓 {event.date}</p>
                <p>🕘 {event.time}</p>
                <p>📍 {getText(event.location, lang)}</p>
              </div>

              <p className="event-description-text">
                {getText(event.description, lang)}
              </p>

              <p style={{ marginTop: "auto", fontSize: "0.9rem" }}>
                Recommended because it matches your interest in{" "}
                <b>{selectedCategory}</b>
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}

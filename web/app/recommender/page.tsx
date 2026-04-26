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
          subject: `Recommended Event: ${title}`,
        }),
      });
    } catch {}

    setPopup(title);
  }

  function getRecommendations() {
    const scored = events.map((event: any) => {
      let score = 0;

      if (event.category === selectedCategory) score += 5;

      const today = new Date();
      const eventDate = new Date(event.date);
      const diffDays = Math.abs(
        (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays < 7) score += 2;
      else if (diffDays < 14) score += 1;

      if (event.time.includes("-")) score += 1;

      return { ...event, score };
    });

    const sorted = scored
      .filter((e) => e.score > 0)
      .sort((a, b) => b.score - a.score);

    setRecommendations(sorted);
  }

  return (
    <main className="recommender-page">
      <h1>Campus Events Recommender</h1>

      <p>
        Recommendations are generated using a scoring model based on user interest and event features.
      </p>

      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">Select category</option>
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <button onClick={getRecommendations}>Get Recommendations</button>

      <div>
        {recommendations.map((event: any) => (
          <div key={event.id}>
            <h3>{getText(event.title, lang)}</h3>
            <button onClick={() => handleRegister(getText(event.title, lang))}>
              {t.registerNow}
            </button>
          </div>
        ))}
      </div>

      {popup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Registered</h2>
            <p>You registered for {popup}</p>
            <button onClick={() => setPopup("")}>OK</button>
          </div>
        </div>
      )}

      <style>{`
        .recommender-page {
          padding: 6rem 4rem 3rem;
          background: var(--bg); /* FIXED */
        }
      `}</style>
    </main>
  );
}

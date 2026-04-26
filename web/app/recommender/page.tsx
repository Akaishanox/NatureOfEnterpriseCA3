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

  const categories = ["Technology", "Sports", "Careers", "Social", "Academic"];

  const ICONS: Record<string, string> = {
    Technology: "💻",
    Sports: "🏅",
    Careers: "👤",
    Social: "👥",
    Academic: "📘",
  };

  const pop = {
    title: "Registered",
    message: "You have now been registered for",
    ok: "OK",
  };

  function getRecommendations() {
    const filtered = events.filter(
      (event: any) => event.category === selectedCategory
    );
    setRecommendations(filtered);
  }

  // ✅ backend added (SAFE)
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
          subject: `Event Registration: ${title}`,
        }),
      });
    } catch (err) {
      console.log("Backend failed");
    }

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

          <button className="recommend-btn" onClick={getRecommendations}>
            {x.button}
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
                  {x.reason} <b>{x.categories[selectedCategory]}</b>
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
            <p>{pop.message} {popup}.</p>
            <button onClick={() => setPopup("")}>{pop.ok}</button>
          </div>
        </div>
      )}

      <style>{`
        .recommender-page {
          padding: 6rem 4rem 3rem;
          background: var(--bg);
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
          max-width: 900px;
          margin: 2rem auto;
          background: var(--surface);
          padding: 2rem;
          border-radius: 10px;
          border: 1px solid var(--border);
        }

        .recommender-select {
          width: 100%;
          padding: 0.8rem;
          margin-bottom: 1rem;
        }

        .recommend-btn {
          width: 100%;
          padding: 0.8rem;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 6px;
        }

        .recommender-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .recommender-card {
          background: var(--surface);
          padding: 1.5rem;
          border-radius: 10px;
          border: 1px solid var(--border);
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

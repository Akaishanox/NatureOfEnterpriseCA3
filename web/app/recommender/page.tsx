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
      interest: "Interest category",
      select: "Select category",
      button: "Get Recommendations",
      categories: {
        Technology: "Technology",
        Sports: "Sports",
        Careers: "Careers",
        Social: "Social",
        Academic: "Academic",
      },
    },
    // ... ga, es, fr as before
  };

  const x = pageText[lang] || pageText.en;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [popup, setPopup] = useState("");

  const categories = ["Technology", "Sports", "Careers", "Social", "Academic"];

  const ICONS: Record<string, string> = {
    Technology: "⌨️",
    Sports: "🗳️",
    Careers: "👤",
    Social: "👥",
    Academic: "📘",
  };

  function getRecommendations() {
    if (!selectedCategory) return;
    const scored = events
      .map((event: any) => ({
        ...event,
        score: event.category === selectedCategory ? 5 : 0
      }))
      .filter((e) => e.score > 0);
    setRecommendations(scored);
  }

  return (
    <div className="page-wrapper">
      {/* Top Navigation Bar */}
      <header className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">🎓</span> Campus Companion
          </div>
          <nav className="nav-links">
            <a href="#">Home</a>
            <a href="#">Campus Events</a>
            <a href="#">Helpdesk</a>
            <a href="#">Canteen</a>
            <a href="#" className="active">Recommender</a>
            <a href="#">Settings</a>
          </nav>
        </div>
      </header>

      <main className="recommender-content">
        <h1 className="main-title">{x.title}</h1>
        <h2 className="section-subtitle">{x.subtitle}</h2>
        <p className="description">{x.desc}</p>

        {/* Input Card */}
        <div className="control-card">
          <label className="input-label">{x.interest}</label>
          <select
            className="styled-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">{x.select}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{x.categories[cat]}</option>
            ))}
          </select>
          <button className="primary-btn" onClick={getRecommendations}>
            {x.button}
          </button>
        </div>

        {/* Recommendation Grid */}
        <div className="events-grid">
          {recommendations.map((event: any) => (
            <div className="event-card" key={event.id}>
              <div className="event-icon-box">
                {ICONS[event.category] || "📅"}
              </div>
              <h3 className="event-title">{getText(event.title, lang)}</h3>
              
              <div className="event-details">
                <p><span>📅</span> Date: {event.date}</p>
                <p><span>🕒</span> Time: {event.time}</p>
                <p><span>📍</span> Location: {getText(event.location, lang)}</p>
              </div>

              <p className="event-desc">{getText(event.description, lang)}</p>
              
              <button 
                className="register-btn"
                onClick={() => setPopup(getText(event.title, lang))}
              >
                Register Now
              </button>
            </div>
          ))}
        </div>
      </main>

      {popup && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Registered</h3>
            <p>You are now signed up for: {popup}</p>
            <button onClick={() => setPopup("")}>Close</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .page-wrapper {
          background-color: #f8fafc;
          min-height: 100vh;
          font-family: system-ui, sans-serif;
        }

        .navbar {
          background-color: #3b82f6;
          color: white;
          padding: 1rem 2rem;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo { font-weight: bold; font-size: 1.2rem; }

        .nav-links a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          margin-left: 1.5rem;
          font-size: 0.9rem;
        }

        .nav-links a.active { color: white; border-bottom: 2px solid white; }

        .recommender-content {
          max-width: 1000px;
          margin: 3rem auto;
          padding: 0 1rem;
        }

        .main-title { color: #1e3a8a; font-size: 2rem; margin-bottom: 1.5rem; }
        .section-subtitle { font-size: 1.2rem; margin-top: 2rem; }
        .description { color: #64748b; margin-bottom: 2rem; }

        .control-card {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .input-label { display: block; font-weight: 600; margin-bottom: 0.5rem; }

        .styled-select {
          width: 100%;
          padding: 0.75rem;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          margin-bottom: 1.5rem;
        }

        .primary-btn {
          width: 100%;
          background-color: #3b82f6;
          color: white;
          padding: 0.75rem;
          border-radius: 6px;
          font-weight: bold;
        }

        .events-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 3rem;
        }

        .event-card {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          text-align: center;
        }

        .event-icon-box { font-size: 2.5rem; margin-bottom: 1rem; color: #3b82f6; }
        .event-title { font-weight: bold; margin-bottom: 1rem; }
        
        .event-details { text-align: left; font-size: 0.9rem; color: #475569; margin-bottom: 1rem; }
        .event-details p { margin: 0.3rem 0; }

        .event-desc { font-size: 0.85rem; color: #64748b; margin-bottom: 1.5rem; }

        .register-btn {
          width: 100%;
          background-color: #3b82f6;
          color: white;
          padding: 0.6rem;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}

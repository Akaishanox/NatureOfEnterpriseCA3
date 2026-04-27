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
    ga: {
      title: "Moltóir Imeachtaí Campais",
      subtitle: "Roghnaigh do spéis",
      desc: "Faigh imeachtaí molta bunaithe ar do chatagóir roghnaithe.",
      findTitle: "Aimsigh imeachtaí duit",
      findDesc: "Roghnaigh catagóir agus faigh imeachtaí campais oiriúnacha.",
      interest: "Catagóir spéise",
      select: "Roghnaigh catagóir",
      button: "Faigh Moltaí",
      reason: "Moltar é seo mar go bhfuil sé ag teacht le do spéis i",
      categories: {
        Technology: "Teicneolaíocht",
        Sports: "Spóirt",
        Careers: "Gairmeacha",
        Social: "Sóisialta",
        Academic: "Acadúil",
      },
    },
    es: {
      title: "Recomendador de Eventos del Campus",
      subtitle: "Elige tu interés",
      desc: "Recibe eventos recomendados según la categoría seleccionada.",
      findTitle: "Encuentra eventos para ti",
      findDesc: "Selecciona una categoría y recibe eventos del campus relacionados.",
      interest: "Categoría de interés",
      select: "Selecciona una categoría",
      button: "Obtener recomendaciones",
      reason: "Recomendado porque coincide con tu interés en",
      categories: {
        Technology: "Tecnología",
        Sports: "Deportes",
        Careers: "Carreras",
        Social: "Social",
        Academic: "Académico",
      },
    },
    fr: {
      title: "Recommandateur d’Événements du Campus",
      subtitle: "Choisissez votre intérêt",
      desc: "Recevez des événements recommandés selon la catégorie choisie.",
      findTitle: "Trouvez des événements pour vous",
      findDesc: "Sélectionnez une catégorie et obtenez des événements du campus.",
      interest: "Catégorie d’intérêt",
      select: "Sélectionnez une catégorie",
      button: "Obtenir des recommandations",
      reason: "Recommandé car cela correspond à votre intérêt pour",
      categories: {
        Technology: "Technologie",
        Sports: "Sport",
        Careers: "Carrières",
        Social: "Social",
        Academic: "Académique",
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

  const popupMessages: Record<string, { title: string; message: string; ok: string }> = {
    en: { title: "Registered", message: "You have now been registered for", ok: "OK" },
    ga: { title: "Cláraithe", message: "Tá tú cláraithe anois do", ok: "Ceart go leor" },
    es: { title: "Registrado", message: "Ahora estás registrado para", ok: "OK" },
    fr: { title: "Inscrit", message: "Vous êtes maintenant inscrit à", ok: "OK" },
  };

  const pop = popupMessages[lang] || popupMessages.en;

  function getRecommendations() {
    if (!selectedCategory) return;
    
    setAppliedCategory(selectedCategory);

    const scored = events.map((event: any) => {
      let score = 0;

      // Category match
      if (event.category === selectedCategory) {
        score += 5;
      }

      // Date proximity
      const today = new Date();
      const eventDate = new Date(event.date);
      const diffDays = Math.abs((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays < 7) score += 2;
      else if (diffDays < 14) score += 1;

      // Duration (time interval present)
      if (event.time.includes("-")) {
        score += 1;
      }

      return { ...event, score };
    });

    const sorted = scored
      .filter((e) => e.score > 0)
      .sort((a, b) => b.score - a.score);

    setRecommendations(sorted.slice(0, 4)); // Show top 4
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

        {!recommendations.length && appliedCategory && (
            <p className="no-results">No matching events found.</p>
        )}
      </div>

      {popup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>{pop.title}</h2>
            <p>
              {pop.message} <b>{popup}</b>.
            </p>
            <button className="popup-close-btn" onClick={() => setPopup("")}>{pop.ok}</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .recommender-page {
          padding: 6rem 4rem 3rem;
          background: var(--background);
          min-height: 100vh;
        }

        .recommender-container {
          max-width: 1450px;
          margin: 0 auto;
        }

        .recommender-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }

        .recommender-line {
          height: 4px;
          width: 60px;
          background: var(--accent);
          margin-bottom: 2rem;
        }

        .recommender-controls {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          margin-bottom: 3rem;
          max-width: 500px;
        }

        .recommender-select {
          width: 100%;
          padding: 0.8rem;
          margin: 1rem 0;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        .recommend-btn {
          width: 100%;
          padding: 1rem;
          background: var(--primary);
          color: white;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .recommender-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        .recommender-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          border-left: 5px solid var(--accent);
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .reason-text {
          font-size: 0.85rem;
          color: #666;
          margin: 1rem 0;
          padding: 0.5rem;
          background: #f0f7ff;
          border-radius: 4px;
        }

        .register-btn-fixed {
          width: 100%;
          padding: 0.7rem;
          background: var(--primary);
          color: white;
          border-radius: 6px;
        }

        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .popup-box {
          background: white;
          padding: 2.5rem;
          border-radius: 15px;
          text-align: center;
          max-width: 400px;
        }
          
        .no-results {
          text-align: center;
          color: #666;
          margin-top: 2rem;
        }
      `}</style>
    </main>
  );
}

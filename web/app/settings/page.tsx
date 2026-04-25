"use client";

import { useState, useEffect } from "react";
import { translations } from "@/app/lib/translations";
import { useLang } from "@/app/lib/useLang";

export default function SettingsPage() {
  const lang = useLang();
  const t = translations[lang];

  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState(lang);

  const extraText: Record<string, any> = {
    en: {
      appearance: "Appearance",
      fontDesc: "Adjust text size for better readability",
      themes: "Themes",
      themeDesc: "Choose your preferred color scheme",
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      preferences: "Preferences",
      preferencesDesc: "Manage your app preferences",
      languageDesc: "Select your preferred language",
      notifications: "Notifications",
      notificationsDesc: "Manage how you receive updates",
      emailNotifications: "Email Notifications",
    },
    ga: {
      appearance: "Cuma",
      fontDesc: "Coigeartaigh méid an téacs le léamh níos fearr",
      themes: "Téamaí",
      themeDesc: "Roghnaigh do scéim dathanna",
      lightMode: "Mód Geal",
      darkMode: "Mód Dorcha",
      preferences: "Sainroghanna",
      preferencesDesc: "Bainistigh sainroghanna na haipe",
      languageDesc: "Roghnaigh do theanga",
      notifications: "Fógraí",
      notificationsDesc: "Bainistigh conas a fhaigheann tú nuashonruithe",
      emailNotifications: "Fógraí Ríomhphoist",
    },
    es: {
      appearance: "Apariencia",
      fontDesc: "Ajusta el tamaño del texto para leer mejor",
      themes: "Temas",
      themeDesc: "Elige tu esquema de color preferido",
      lightMode: "Modo Claro",
      darkMode: "Modo Oscuro",
      preferences: "Preferencias",
      preferencesDesc: "Gestiona tus preferencias",
      languageDesc: "Selecciona tu idioma preferido",
      notifications: "Notificaciones",
      notificationsDesc: "Gestiona cómo recibes actualizaciones",
      emailNotifications: "Notificaciones por Email",
    },
    fr: {
      appearance: "Apparence",
      fontDesc: "Ajustez la taille du texte pour une meilleure lisibilité",
      themes: "Thèmes",
      themeDesc: "Choisissez votre thème préféré",
      lightMode: "Mode Clair",
      darkMode: "Mode Sombre",
      preferences: "Préférences",
      preferencesDesc: "Gérez vos préférences",
      languageDesc: "Sélectionnez votre langue préférée",
      notifications: "Notifications",
      notificationsDesc: "Gérez la réception des mises à jour",
      emailNotifications: "Notifications par Email",
    },
  };

  const x = extraText[language] || extraText.en;
  const liveT = translations[language] || translations.en;

  useEffect(() => {
    const savedFont = localStorage.getItem("fontSize");
    const savedTheme = localStorage.getItem("theme");
    const savedLang = localStorage.getItem("language");

    if (savedFont) setFontSize(Number(savedFont));
    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLanguage(savedLang);
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = fontSize + "px";
    document.documentElement.classList.toggle("dark-mode", theme === "dark");
    document.documentElement.setAttribute("lang", language);
  }, [fontSize, theme, language]);

  const handleSave = () => {
  localStorage.setItem("fontSize", fontSize.toString());
  localStorage.setItem("theme", theme);
  localStorage.setItem("language", language);

  window.dispatchEvent(new Event("languageChanged"));
};

  return (
    <div className="settings-page">
      <p className="top-label">{liveT.accessibility}</p>

      <section className="settings-section">
        <h1 className="main-heading">🎨 {x.appearance}</h1>

        <div className="settings-card">
          <h2>↕ {liveT.fontSize}</h2>
          <p>{x.fontDesc}</p>

          <div className="font-row">
            <span>A</span>
            <input
              type="range"
              min="14"
              max="20"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
            />
            <span className="big-a">A</span>
          </div>
        </div>

        <div className="settings-card">
          <h2>◐ {x.themes}</h2>
          <p>{x.themeDesc}</p>

          <label className="radio-row">
            <input
              type="radio"
              value="light"
              checked={theme === "light"}
              onChange={() => setTheme("light")}
            />
            <span>{x.lightMode}</span>
          </label>

          <label className="radio-row">
            <input
              type="radio"
              value="dark"
              checked={theme === "dark"}
              onChange={() => setTheme("dark")}
            />
            <span>{x.darkMode}</span>
          </label>
        </div>
      </section>

      <section className="settings-section">
        <h1 className="main-heading">☷ {x.preferences}</h1>
        <p className="section-desc">{x.preferencesDesc}</p>

        <div className="settings-card">
          <h2>🌐 {liveT.language}</h2>
          <p>{x.languageDesc}</p>

          <select 
            value={language}
            onChange={(e) => {
              const newLang = e.target.value;
              setLanguage(newLang);
              localStorage.setItem("language", newLang);
              window.dispatchEvent(new Event("languageChanged"));
            }}
          >
            <option value="en">English</option>
            <option value="ga">Irish</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className="settings-card">
          <h2>♧ {x.notifications}</h2>
          <p>{x.notificationsDesc}</p>

          <div className="notification-row">
            <span>{x.emailNotifications}</span>
            <input type="checkbox" defaultChecked />
          </div>
        </div>
      </section>

      <button className="submit-settings" onClick={handleSave}>
        {liveT.submitChanges}
      </button>

      <style>{`
        .settings-page {
          max-width: 760px;
          margin: 0 auto;
          padding: 5.5rem 1.5rem 3rem;
        }

        .top-label {
          font-size: 0.95rem;
          color: var(--text);
          margin-bottom: 3rem;
        }

        .settings-section {
          margin-bottom: 1.6rem;
        }

        .main-heading {
          font-size: 1.65rem;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 0.8rem;
        }

        .section-desc {
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .settings-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 1.8rem;
          margin-bottom: 1.4rem;
          box-shadow: var(--shadow);
        }

        .settings-card h2 {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 0.55rem;
        }

        .settings-card p {
          color: var(--text-muted);
          font-size: 0.92rem;
          margin-bottom: 1.4rem;
        }

        .font-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 1.2rem;
        }

        .font-row span {
          font-weight: 700;
          color: var(--text-muted);
        }

        .big-a {
          font-size: 1.45rem;
          color: var(--text) !important;
        }

        .font-row input {
          width: 100%;
        }

        .radio-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin: 0.85rem 0;
          color: var(--text);
          font-size: 1rem;
        }

        .radio-row input {
          margin: 0;
        }

        select {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid var(--border);
          border-radius: 7px;
          background: var(--surface);
          color: var(--text);
          font-size: 1rem;
          text-align: center;
          text-align-last: center;
        }

        .notification-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--text);
          font-size: 1rem;
          gap: 2rem;
        }

        .notification-row input {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .submit-settings {
          display: block;
          width: 260px;
          margin: 1.8rem auto 0;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 9px;
          padding: 1rem;
          font-size: 1rem;
          cursor: pointer;
        }

        .submit-settings:hover {
          background: var(--primary-dark);
        }

        @media (max-width: 700px) {
          .settings-page {
            padding: 5rem 1rem 2rem;
          }

          .submit-settings {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

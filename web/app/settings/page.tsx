"use client";

import { useState, useEffect } from "react";
import { translations } from "@/app/lib/translations";
import { useLang } from "@/app/lib/useLang";

export default function SettingsPage() {
  const currentLang = useLang();

  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState(currentLang);
  const [saved, setSaved] = useState(false);

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
      saved: "Settings have been changed.",
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
      saved: "Athraíodh na socruithe.",
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
      saved: "La configuración ha sido cambiada.",
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
      saved: "Les paramètres ont été modifiés.",
    },
  };

  const x = extraText[language] || extraText.en;
  const liveT = translations[language] || translations.en;

  useEffect(() => {
    const savedFont = localStorage.getItem("fontSize") || "16";
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedLang = localStorage.getItem("language") || "en";

    setFontSize(Number(savedFont));
    setTheme(savedTheme);
    setLanguage(savedLang);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", theme === "dark");
    document.documentElement.setAttribute("lang", language);

    localStorage.setItem("previewLanguage", language);
    window.dispatchEvent(new Event("languageChanged"));
  }, [theme, language]);

  useEffect(() => {
    document.documentElement.style.setProperty("--app-font", fontSize + "px");
  }, [fontSize]);

  const handleSave = () => {
    localStorage.setItem("fontSize", fontSize.toString());
    localStorage.setItem("theme", theme);
    localStorage.setItem("language", language);

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="settings-page">

      <h1 className="top-title">{liveT.accessibility}</h1>
      <div className="top-line"></div>
      <p className="top-desc">Adjust how the app looks and feels</p>

      <section className="settings-section">
        <h2 className="section-heading">🎨 {x.appearance}</h2>

        <div className="settings-card">
          <h3>↕ {liveT.fontSize}</h3>
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
          <h3>◐ {x.themes}</h3>
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
        <h2 className="section-heading">☷ {x.preferences}</h2>
        <p className="section-desc">{x.preferencesDesc}</p>

        <div className="settings-card">
          <h3>🌐 {liveT.language}</h3>
          <p>{x.languageDesc}</p>

          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="ga">Irish</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className="settings-card">
          <h3>♧ {x.notifications}</h3>
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

      {saved && <p className="saved-message">{x.saved}</p>}

      <style>{`
        :root {
          --app-font: 16px;
        }

        .settings-page {
          max-width: 760px;
          margin: 0 auto;
          padding: 7rem 1.5rem 3rem;
          font-size: var(--app-font);
        }

        .top-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--primary);
        }

        .top-line {
          width: 60px;
          height: 6px;
          background: var(--primary);
          border-radius: 999px;
          margin: 0.6rem 0 1rem;
        }

        .top-desc {
          color: var(--text-muted);
          margin-bottom: 2rem;
        }

        .section-heading {
          font-size: 1.3rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .settings-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 1.8rem;
          margin-bottom: 1.4rem;
        }

        .font-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 1rem;
          align-items: center;
        }

        .notification-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .notification-row input {
          margin-left: auto;
          width: 20px;
          height: 20px;
        }

        .submit-settings {
          width: 260px;
          margin: 2rem auto 0;
          display: block;
        }
      `}</style>
    </div>
  );
}

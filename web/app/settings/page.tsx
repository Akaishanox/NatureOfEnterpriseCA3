"use client";

import { useState, useEffect, useLayoutEffect } from "react";
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
      accessibilityTitle: "Accessibility Options",
      accessibilityDesc: "Adjust how the app looks and feels",
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
      accessibilityTitle: "Roghanna Inrochtaineachta",
      accessibilityDesc: "Coigeartaigh cuma na haipe",
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
      accessibilityTitle: "Opciones de Accesibilidad",
      accessibilityDesc: "Ajusta cómo se ve la app",
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
      accessibilityTitle: "Options d'accessibilité",
      accessibilityDesc: "Ajustez l'apparence de l'application",
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

  useLayoutEffect(() => {
    const savedFont = localStorage.getItem("fontSize") || "16";
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedLang = localStorage.getItem("language") || "en";

    document.documentElement.style.fontSize = savedFont + "px";
    document.documentElement.classList.toggle("dark-mode", savedTheme === "dark");
    document.documentElement.setAttribute("lang", savedLang);

    setFontSize(Number(savedFont));
    setTheme(savedTheme);
    setLanguage(savedLang);
  }, []);

  useEffect(() => {
    return () => {
      const realFont = localStorage.getItem("fontSize") || "16";
      const realTheme = localStorage.getItem("theme") || "light";
      const realLang = localStorage.getItem("language") || "en";

      document.documentElement.style.fontSize = realFont + "px";
      document.documentElement.classList.toggle("dark-mode", realTheme === "dark");
      document.documentElement.setAttribute("lang", realLang);

      localStorage.removeItem("previewLanguage");
      window.dispatchEvent(new Event("languageChanged"));
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = fontSize + "px";
    document.documentElement.classList.toggle("dark-mode", theme === "dark");
    document.documentElement.setAttribute("lang", language);

    localStorage.setItem("previewLanguage", language);
    window.dispatchEvent(new Event("languageChanged"));
  }, [fontSize, theme, language]);

  const handleSave = () => {
    localStorage.setItem("fontSize", fontSize.toString());
    localStorage.setItem("theme", theme);
    localStorage.setItem("language", language);

    localStorage.removeItem("previewLanguage");
    window.dispatchEvent(new Event("languageChanged"));

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="settings-page">
      <section className="settings-section">
        <h1 className="main-heading">{x.accessibilityTitle}</h1>
        <div className="heading-line"></div>
        <p className="section-desc">{x.accessibilityDesc}</p>

        <h2 className="sub-heading">🎨 {x.appearance}</h2>

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

          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
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

      {saved && <p className="saved-message">{x.saved}</p>}

      <style>{`
        .settings-page {
          max-width: 760px;
          margin: 0 auto;
          padding: 5.5rem 1.5rem 3rem;
          background: var(--bg);
          min-height: 100vh;
        }

        .main-heading {
          font-size: 2rem;
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }

        .heading-line {
          width: 70px;
          height: 6px;
          background: var(--primary);
          border-radius: 999px;
          margin-bottom: 1rem;
        }

        .sub-heading {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 1rem;
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
          gap: 1.2rem;
        }

        .big-a {
          font-size: 1.45rem;
        }

        .radio-row {
          display: flex;
          gap: 0.65rem;
          margin: 0.85rem 0;
        }

        .submit-settings {
          width: 260px;
          margin: 1.8rem auto 0;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 9px;
          padding: 1rem;
        }

        .saved-message {
          text-align: center;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}

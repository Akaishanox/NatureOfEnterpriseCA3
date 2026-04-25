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
  const [saved, setSaved] = useState(false);

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

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="page" style={{ maxWidth: 700, margin: "0 auto" }}>
      
      <p style={{ textAlign: "center", color: "#777", marginBottom: "0.5rem" }}>
        {t.accessibility}
      </p>

      <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        🎨 Appearance
      </h2>

      {/* FONT SIZE */}
      <div className="card">
        <h3>🔠 {t.fontSize}</h3>
        <p style={{ color: "#777", fontSize: "0.9rem" }}>
          Adjust text size for better readability
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span>A</span>
          <input
            type="range"
            min="14"
            max="20"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            style={{ width: "100%" }}
          />
          <span style={{ fontSize: "1.5rem" }}>A</span>
        </div>
      </div>

      {/* THEME */}
      <div className="card">
        <h3>🌗 {t.theme}</h3>
        <p style={{ color: "#777", fontSize: "0.9rem" }}>
          Choose your preferred color scheme
        </p>

        <label>
          <input
            type="radio"
            value="light"
            checked={theme === "light"}
            onChange={() => setTheme("light")}
          />
          Light Mode
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="dark"
            checked={theme === "dark"}
            onChange={() => setTheme("dark")}
          />
          Dark Mode
        </label>
      </div>

      {/* PREFERENCES */}
      <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "2rem" }}>
        ⚙️ Preferences
      </h2>

      {/* LANGUAGE */}
      <div className="card">
        <h3>🌍 {t.language}</h3>
        <p style={{ color: "#777", fontSize: "0.9rem" }}>
          Select your preferred language
        </p>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ width: "100%", padding: "0.5rem" }}
        >
          <option value="en">English</option>
          <option value="ga">Irish</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>

      {/* NOTIFICATIONS */}
      <div className="card">
        <h3>🔔 Notifications</h3>
        <p style={{ color: "#777", fontSize: "0.9rem" }}>
          Manage how you receive updates
        </p>

        <label>
          Email Notifications
          <input type="checkbox" style={{ marginLeft: "1rem" }} />
        </label>
      </div>

      {/* BUTTON */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button className="btn-primary" onClick={handleSave}>
          {t.submitChanges}
        </button>
      </div>

      {saved && (
        <p style={{ textAlign: "center", color: "green", marginTop: "1rem" }}>
          Saved!
        </p>
      )}
    </div>
  );
}

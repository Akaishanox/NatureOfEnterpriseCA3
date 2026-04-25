"use client";

import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");

  // LOAD SAVED SETTINGS
  useEffect(() => {
    const savedFont = localStorage.getItem("fontSize");
    const savedTheme = localStorage.getItem("theme");
    const savedLang = localStorage.getItem("language");

    if (savedFont) setFontSize(Number(savedFont));
    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLanguage(savedLang);
  }, []);

  // APPLY SETTINGS LIVE
  useEffect(() => {
    document.documentElement.style.fontSize = fontSize + "px";

    document.documentElement.classList.toggle(
      "dark-mode",
      theme === "dark"
    );

    document.documentElement.setAttribute("lang", language);
  }, [fontSize, theme, language]);

  const handleSave = () => {
    localStorage.setItem("fontSize", fontSize.toString());
    localStorage.setItem("theme", theme);
    localStorage.setItem("language", language);
    alert("Settings saved");
  };

  return (
    <div className="page">
      <h1 className="page-title">Accessibility Options</h1>
      <div className="page-line"></div>

      <div className="card">
        <h2 className="section-title">Font Size</h2>
        <input
          type="range"
          min="14"
          max="20"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>

      <div className="card">
        <h2 className="section-title">Theme</h2>
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

      <div className="card">
        <h2 className="section-title">Language</h2>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="ga">Irish</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>

      <button className="btn-primary" onClick={handleSave}>
        Submit Changes
      </button>
    </div>
  );
}

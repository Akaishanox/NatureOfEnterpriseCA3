"use client";

import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("English");

  // Load saved settings
  useEffect(() => {
    const savedFont = localStorage.getItem("fontSize");
    const savedTheme = localStorage.getItem("theme");
    const savedLang = localStorage.getItem("language");

    if (savedFont) setFontSize(Number(savedFont));
    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLanguage(savedLang);
  }, []);

  // Apply settings live
  useEffect(() => {
    document.documentElement.style.fontSize = fontSize + "px";

    if (theme === "dark") {
      document.body.style.background = "#111827";
      document.body.style.color = "#f9fafb";
    } else {
      document.body.style.background = "#f3f4f6";
      document.body.style.color = "#111827";
    }
  }, [fontSize, theme]);

  const handleSave = () => {
    localStorage.setItem("fontSize", fontSize.toString());
    localStorage.setItem("theme", theme);
    localStorage.setItem("language", language);

    alert("Settings saved!");
  };

  return (
    <div className="page">
      <h1 className="page-title">Accessibility Options</h1>
      <div className="page-line"></div>

      {/* FONT SIZE */}
      <div className="card">
        <h3>Font Size</h3>
        <p>Adjust text size</p>

        <input
          type="range"
          min="12"
          max="22"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          style={{ width: "100%", marginTop: "10px" }}
        />

        <p style={{ marginTop: "5px" }}>{fontSize}px</p>
      </div>

      {/* THEME */}
      <div className="card" style={{ marginTop: "20px" }}>
        <h3>Theme</h3>

        <label>
          <input
            type="radio"
            value="light"
            checked={theme === "light"}
            onChange={(e) => setTheme(e.target.value)}
          />
          Light Mode
        </label>

        <br />

        <label>
          <input
            type="radio"
            value="dark"
            checked={theme === "dark"}
            onChange={(e) => setTheme(e.target.value)}
          />
          Dark Mode
        </label>
      </div>

      {/* LANGUAGE */}
      <div className="card" style={{ marginTop: "20px" }}>
        <h3>Language</h3>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="form-input"
        >
          <option>English</option>
          <option>Irish</option>
        </select>
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSave}
        className="btn-primary"
        style={{ marginTop: "30px" }}
      >
        Submit Changes
      </button>
    </div>
  );
}

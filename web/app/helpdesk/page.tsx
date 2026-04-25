"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [fontSize, setFontSize] = useState("medium");
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("English");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("fontSize");
    const savedTheme = localStorage.getItem("theme");
    const savedLanguage = localStorage.getItem("language");
    const savedNotifications = localStorage.getItem("emailNotifications");

    if (savedFontSize) setFontSize(savedFontSize);
    if (savedTheme) setTheme(savedTheme);
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedNotifications) setEmailNotifications(savedNotifications === "true");
  }, []);

  const saveSettings = () => {
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("theme", theme);
    localStorage.setItem("language", language);
    localStorage.setItem("emailNotifications", String(emailNotifications));

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <main className="page">
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <h1 className="page-title">Accessibility Options</h1>
        <div className="page-line"></div>

        <h2 className="section-title">🎨 Appearance</h2>
        <p className="section-subtitle">Change how the app looks and feels</p>

        <section className="card" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ color: "var(--primary)", marginBottom: "0.4rem" }}>
            ↕ Font Size
          </h3>
          <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>
            Adjust text size for better readability
          </p>

          <select
            className="form-input"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </section>

        <section className="card" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ color: "var(--primary)", marginBottom: "0.4rem" }}>
            ◐ Theme
          </h3>
          <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>
            Choose your preferred colour scheme
          </p>

          <label style={{ display: "block", marginBottom: "0.75rem" }}>
            <input
              type="radio"
              name="theme"
              value="light"
              checked={theme === "light"}
              onChange={(e) => setTheme(e.target.value)}
              style={{ marginRight: "0.5rem" }}
            />
            Light Mode
          </label>

          <label>
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === "dark"}
              onChange={(e) => setTheme(e.target.value)}
              style={{ marginRight: "0.5rem" }}
            />
            Dark Mode
          </label>
        </section>

        <h2 className="section-title">⚙ Preferences</h2>
        <p className="section-subtitle">Manage your app preferences</p>

        <section className="card" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ color: "var(--primary)", marginBottom: "0.4rem" }}>
            🌐 Language
          </h3>
          <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>
            Select your preferred language
          </p>

          <select
            className="form-input"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Irish</option>
            <option>French</option>
            <option>Spanish</option>
          </select>
        </section>

        <section className="card" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ color: "var(--primary)", marginBottom: "0.4rem" }}>
            🔔 Notifications
          </h3>
          <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>
            Manage how you receive updates
          </p>

          <label style={{ display: "flex", justifyContent: "space-between" }}>
            Email Notifications
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
          </label>
        </section>

        <button className="btn-primary" onClick={saveSettings}>
          Submit Changes
        </button>

        {saved && (
          <p
            style={{
              marginTop: "1rem",
              textAlign: "center",
              color: "green",
              fontWeight: 600,
            }}
          >
            Settings saved successfully.
          </p>
        )}
      </div>
    </main>
  );
}

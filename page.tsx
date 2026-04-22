"use client";
import { useState } from "react";

export default function SettingsPage() {
  const [fontSize, setFontSize]               = useState(16);
  const [theme, setTheme]                     = useState<"light" | "dark">("light");
  const [language, setLanguage]               = useState("English");
  const [emailNotifications, setEmailNotif]   = useState(false);
  const [saved, setSaved]                     = useState(false);

  function handleSubmit() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="page">
      <p style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
        Accessibility Options
      </p>

      {/* Appearance */}
      <section aria-labelledby="appearance-heading" style={{ marginBottom: "1.25rem" }}>
        <h2 id="appearance-heading" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--primary)", marginBottom: "0.75rem" }}>
          ⚙️ Appearance
        </h2>

        {/* Font Size */}
        <div className="card" style={{ maxWidth: 520, marginBottom: "0.75rem" }}>
          <div style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}>
            <span style={{ fontSize: "1rem", fontWeight: 700 }}>TI</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--primary)" }}>Font Size</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Adjust text size for better readability</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.75rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)" }}>A</span>
            <input type="range" min={12} max={24} value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              style={{ flex: 1, accentColor: "var(--primary)", cursor: "pointer" }}
              aria-label={`Font size: ${fontSize}px`} />
            <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-muted)" }}>A</span>
          </div>
        </div>

        {/* Themes */}
        <div className="card" style={{ maxWidth: 520 }}>
          <div style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}>
            <span>🌓</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--primary)" }}>Themes</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Choose your preferred color scheme</div>
            </div>
          </div>
          <fieldset style={{ border: "none", padding: 0, marginTop: "0.75rem" }}>
            <legend style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }}>Theme</legend>
            {(["light", "dark"] as const).map((t) => (
              <label key={t} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem", cursor: "pointer", marginBottom: "0.4rem" }}>
                <input type="radio" name="theme" value={t} checked={theme === t} onChange={() => setTheme(t)}
                  style={{ accentColor: "var(--primary)" }} />
                {t === "light" ? "Light Mode" : "Dark Mode"}
              </label>
            ))}
          </fieldset>
        </div>
      </section>

      {/* Preferences */}
      <section aria-labelledby="prefs-heading" style={{ marginBottom: "1.5rem" }}>
        <h2 id="prefs-heading" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--primary)", marginBottom: "0.25rem" }}>
          ☰ Preferences
        </h2>
        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>Manage your app preferences</p>

        {/* Language */}
        <div className="card" style={{ maxWidth: 520, marginBottom: "0.75rem" }}>
          <div style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}>
            <span>🌐</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--primary)" }}>Language</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Select your preferred language</div>
            </div>
          </div>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}
            style={{ marginTop: "0.75rem", width: "100%", padding: "0.5rem 0.75rem", border: "1px solid var(--border)", borderRadius: "6px", fontFamily: "var(--font)", fontSize: "0.88rem", cursor: "pointer" }}
            aria-label="Language">
            {["English", "Irish", "French", "Spanish", "Mandarin"].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Notifications */}
        <div className="card" style={{ maxWidth: 520 }}>
          <div style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}>
            <span>🔔</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--primary)" }}>Notifications</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Manage how you receive updates</div>
            </div>
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.75rem", fontSize: "0.88rem", cursor: "pointer" }}>
            <input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotif(e.target.checked)}
              style={{ accentColor: "var(--primary)", width: 16, height: 16 }} />
            Email Notifications
          </label>
        </div>
      </section>

      {saved && (
        <div role="alert" style={{ background: "#d1fae5", color: "#065f46", borderRadius: "6px", padding: "0.65rem 1rem", marginBottom: "1rem", fontWeight: 600, fontSize: "0.875rem", maxWidth: 520 }}>
          ✅ Settings saved!
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center", maxWidth: 520 }}>
        <button onClick={handleSubmit}
          style={{ background: "var(--primary)", color: "#fff", border: "none", borderRadius: "6px", padding: "0.65rem 2.5rem", fontFamily: "var(--font)", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}>
          Submit Changes
        </button>
      </div>
    </div>
  );
}

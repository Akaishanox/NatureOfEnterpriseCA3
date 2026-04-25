"use client";

import Link from "next/link";
import usersData from "@/data/users.json";
import eventsData from "@/data/events.json";
import menuData from "@/data/menu.json";
import { translations } from "@/app/lib/translations";
import { useLang } from "@/app/lib/useLang";

const currentUser = (usersData as { id: number; name: string; preferred_category: string }[])[0];

const nextEvent = (eventsData as {
  id: number;
  title: { en: string; es: string; fr: string; ga: string };
  date: string;
  location: string;
}[])[0];

const todaysSpecial = (menuData as {
  id: number;
  name: { en: string; es: string; fr: string; ga: string };
  price: number;
  diet: any;
}[])[0];

const navCards = [
  { href: "/events", icon: "📅", key: "events" },
  { href: "/helpdesk", icon: "🎫", key: "helpdesk" },
  { href: "/canteen", icon: "🍽️", key: "canteen" },
  { href: "/settings", icon: "⚙️", key: "settings" },
];

function getGreeting(lang: string) {
  const hour = new Date().getHours();

  if (lang === "ga") {
    if (hour < 12) return "Maidin mhaith";
    if (hour < 18) return "Tráthnóna maith";
    return "Oíche mhaith";
  }

  if (lang === "es") {
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  }

  if (lang === "fr") {
    if (hour < 12) return "Bonjour";
    if (hour < 18) return "Bon après-midi";
    return "Bonsoir";
  }

  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

export default function HomePage() {
  const lang = useLang();
  const t = translations[lang];

  return (
    <div className="page">

      <div className="banner">
        <div>
          <h1 className="banner-title">
            {getGreeting(lang)}, {currentUser.name} 👋
          </h1>
          <p className="banner-sub">
            {t.browseEvents}
          </p>
        </div>
      </div>

      <div className="info-row">
        <div className="info-box card">
          <span className="info-icon">📅</span>
          <div>
            <div className="info-label">{t.events}</div>
            <div className="info-val">
              {nextEvent.title[lang]}
            </div>
          </div>
        </div>

        <div className="info-box card">
          <span className="info-icon">🍽️</span>
          <div>
            <div className="info-label">{t.menu}</div>
            <div className="info-val">
              {todaysSpecial.name[lang]} — €{todaysSpecial.price.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <h2 className="section-label">
        {t.events}
      </h2>

      <div className="nav-grid">
        {navCards.map((card) => (
          <Link key={card.href} href={card.href} className="nav-card">
            <span className="nav-icon">{card.icon}</span>
            <span className="nav-label">
              {t[card.key as keyof typeof t]}
            </span>
          </Link>
        ))}
      </div>

      <style>{`
        .banner {
          background: var(--primary);
          border-radius: var(--radius);
          padding: 1.5rem 1.75rem;
          margin-bottom: 1.25rem;
          color: #fff;
        }
        .banner-title { font-size: 1.6rem; font-weight: 800; margin-bottom: 0.2rem; }
        .banner-sub   { font-size: 0.88rem; opacity: 0.8; }

        .info-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.75rem; }
        .info-box { display: flex; align-items: center; gap: 0.85rem; padding: 1rem 1.25rem; }
        .info-icon { font-size: 1.6rem; }
        .info-label { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); }
        .info-val   { font-size: 0.88rem; font-weight: 600; margin-top: 0.1rem; }

        .section-label {
          font-size: 0.75rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.07em;
          color: var(--text-muted); margin-bottom: 0.75rem;
        }

        .nav-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .nav-card {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 0.6rem; padding: 1.75rem 1rem;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); box-shadow: var(--shadow);
          text-decoration: none; color: var(--text);
        }

        .nav-icon  { font-size: 2rem; }
        .nav-label { font-size: 0.95rem; font-weight: 700; }

        @media (max-width: 480px) {
          .info-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

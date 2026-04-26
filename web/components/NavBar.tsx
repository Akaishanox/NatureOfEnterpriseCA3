"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { translations } from "@/app/lib/translations";
import { useLang } from "@/app/lib/useLang";

export default function NavBar() {
  const pathname = usePathname();
  const lang = useLang();
  const t = translations[lang];

  const recommenderText: Record<string, string> = {
    en: "Recommender",
    ga: "Moltóir",
    es: "Recomendador",
    fr: "Recommandations",
  };

  const navItems = [
    { href: "/", label: t.home || "Home" },
    { href: "/events", label: t.events },
    { href: "/helpdesk", label: t.helpdesk },
    { href: "/canteen", label: t.canteen },
    { href: "/recommender", label: recommenderText[lang] || recommenderText.en },
    { href: "/settings", label: t.settings },
  ];

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-brand">
        <span aria-hidden="true">✦</span>
        <span className="brand-name" style={{ marginLeft: "0.4rem" }}>
          Campus Companion
        </span>
      </div>

      <ul className="nav-links" role="list">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`nav-link ${isActive ? "active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

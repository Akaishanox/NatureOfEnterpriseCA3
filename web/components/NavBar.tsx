"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { translations } from "@/app/lib/translations";
import { useLang } from "@/app/lib/useLang";

export default function NavBar() {
  const pathname = usePathname();
  const lang = useLang();
  const t = translations[lang];

  const navItems = [
    { href: "/",         label: t.home || "Home" },
    { href: "/events",   label: t.events },
    { href: "/helpdesk", label: t.helpdesk },
    { href: "/canteen",  label: t.canteen },
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
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`nav-link ${pathname === item.href ? "active" : ""}`}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

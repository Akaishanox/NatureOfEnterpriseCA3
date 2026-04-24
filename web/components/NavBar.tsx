"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/",         label: "Home"          },
  { href: "/events",   label: "Events" },
  { href: "/helpdesk", label: "Helpdesk"      },
  { href: "/canteen",  label: "Canteen"       },
  { href: "/settings", label: "Settings"      },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-brand">
        <span aria-hidden="true">✦</span>
        <span className="brand-name" style={{ marginLeft: "0.4rem" }}>Campus Companion</span>
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

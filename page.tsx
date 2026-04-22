import Link from "next/link";
import usersData from "@/data/users.json";

const currentUser = (usersData as { id: number; name: string; preferred_category: string }[])[0];

const options = [
  { href: "/events",   icon: "📅", label: "Events"   },
  { href: "/helpdesk", icon: "❓", label: "Helpdesk"  },
  { href: "/canteen",  icon: "🍴", label: "Canteen"   },
  { href: "/settings", icon: "⚙️", label: "Settings"  },
];

export default function HomePage() {
  return (
    <div className="page">
      <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>
        Good Morning, {currentUser.name}
      </h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "0.95rem" }}>
        All Options
      </p>

      <div className="options-grid" role="list" aria-label="Navigation options">
        {options.map((opt) => (
          <Link key={opt.href} href={opt.href} className="option-card" role="listitem" aria-label={opt.label}>
            <span className="option-icon" aria-hidden="true">{opt.icon}</span>
            <span className="option-label">{opt.label}</span>
          </Link>
        ))}
      </div>

      <style>{`
        .options-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1.25rem; max-width: 560px;
        }
        .option-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); box-shadow: var(--shadow);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 0.75rem; padding: 2.5rem 1.5rem;
          text-decoration: none; color: var(--text);
          transition: box-shadow 0.15s, transform 0.15s;
        }
        .option-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.12); transform: translateY(-2px); }
        .option-card:focus-visible { outline: 3px solid var(--primary); outline-offset: 2px; }
        .option-icon { font-size: 2.2rem; color: var(--primary); }
        .option-label { font-size: 1rem; font-weight: 600; }
      `}</style>
    </div>
  );
}

"use client";
import { useState } from "react";
import menuData from "@/data/menu.json";
import { translations } from "@/app/lib/translations";

interface MenuItem { id: number; name: string; category: string; price: number; diet: string; }

const menu = menuData as MenuItem[];

const ICONS: Record<string, string> = {
  "Grilled Salmon": "🐟", "Margherita Pizza": "🍕",
  "Coffee": "☕", "Chicken Caesar Salad": "🥗",
};
const DESCRIPTIONS: Record<string, string> = {
  "Grilled Salmon":       "Delicious grilled salmon prepared with fresh herbs and lemon butter",
  "Margherita Pizza":     "Traditional Margherita pizza prepared with fresh mozzarella and basil",
  "Coffee":               "Freshly brewed coffee prepared with premium Arabica beans",
  "Chicken Caesar Salad": "Classic Caesar salad prepared with grilled chicken, romaine lettuce and parmesan",
};
const DIET_BADGE: Record<string, string> = {
  "Gluten-Free": "badge-blue", "Vegetarian": "badge-green",
  "Vegan": "badge-green", "Contains Meat": "badge-amber",
};

export default function CanteenPage() {
  const lang =
    typeof window !== "undefined"
      ? localStorage.getItem("language") || "en"
      : "en";

  const t = translations[lang];
  const [cart, setCart] = useState<number[]>([]);

  const addToOrder = (id: number) => setCart((prev) => [...prev, id]);
  const total = menu
    .filter((m) => cart.includes(m.id))
    .reduce((sum, m) => sum + m.price * cart.filter((id) => id === m.id).length, 0);

  return (
    <main className="events-page">
      <h1 className="page-title">{t.canteen}</h1>
<div className="page-line"></div>

<h2 className="section-title">{t.menu}</h2>
<p className="section-subtitle">{t.chooseMenu}</p>
      <ul className="menu-grid" role="list" aria-label="Today's menu items">
        {menu.map((item) => {
          const count = cart.filter((id) => id === item.id).length;
          return (
            <li key={item.id} className="menu-card card">
              <div style={{ fontSize: "2rem", textAlign: "center" }} aria-hidden="true">{ICONS[item.name] ?? "🍽️"}</div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{item.name}</div>
              <div><span className={`badge ${DIET_BADGE[item.diet] ?? "badge-grey"}`}>{item.diet}</span></div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", flex: 1 }}>{DESCRIPTIONS[item.name]}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                <span style={{ fontWeight: 700, fontSize: "1rem" }}>€{item.price.toFixed(2)}</span>
                <button className="add-btn" onClick={() => addToOrder(item.id)}
                  aria-label={`Add ${item.name} to order`}>
                  {count > 0 ? `Add to Order (${count})` : "Add to Order"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {cart.length > 0 && (
        <div className="cart-bar" role="status" aria-live="polite">
          🛒 {cart.length} item{cart.length !== 1 ? "s" : ""} — <strong>€{total.toFixed(2)}</strong>
          <button onClick={() => setCart([])} style={{ marginLeft: "1rem", background: "none", border: "none", color: "#fff", cursor: "pointer", textDecoration: "underline" }}>
            Clear
          </button>
        </div>
      )}

      <style>{`
        .menu-grid { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .menu-card { display: flex; flex-direction: column; gap: 0.5rem; padding: 1.25rem; }
        .add-btn {
          background: var(--primary); color: #fff; border: none; border-radius: 6px;
          padding: 0.45rem 0.85rem; font-family: var(--font); font-size: 0.82rem;
          font-weight: 600; cursor: pointer; white-space: nowrap; transition: background 0.15s;
        }
        .add-btn:hover { background: var(--primary-dark); }
        .add-btn:focus-visible { outline: 3px solid var(--primary); outline-offset: 2px; }
        .cart-bar {
          position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
          background: var(--primary); color: #fff; padding: 0.75rem 1.5rem;
          border-radius: 999px; font-size: 0.9rem; box-shadow: 0 4px 20px rgba(0,0,0,0.2); white-space: nowrap;
        }
        @media (max-width: 520px) { .menu-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}

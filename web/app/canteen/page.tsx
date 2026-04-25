"use client";

import { useState } from "react";
import menuData from "@/data/menu.json";
import { translations } from "@/app/lib/translations";
import { useLang } from "@/app/lib/useLang";

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  diet: string;
}

const menu = menuData as MenuItem[];

const ICONS: Record<string, string> = {
  "Grilled Salmon": "🐟",
  "Margherita Pizza": "🍕",
  "Coffee": "☕",
  "Chicken Caesar Salad": "🥗",
};

const DESCRIPTIONS: Record<string, string> = {
  "Grilled Salmon": "Delicious grilled salmon prepared with fresh herbs and lemon butter",
  "Margherita Pizza": "Traditional Margherita pizza prepared with fresh mozzarella and basil",
  "Coffee": "Freshly brewed coffee prepared with premium Arabica beans",
  "Chicken Caesar Salad": "Classic Caesar salad prepared with grilled chicken, romaine lettuce and parmesan",
};

const DIET_BADGE: Record<string, string> = {
  "Gluten-Free": "badge-blue",
  "Vegetarian": "badge-green",
  "Vegan": "badge-green",
  "Contains Meat": "badge-amber",
};

export default function CanteenPage() {
  const lang = useLang();
  const t = translations[lang];

  const [cart, setCart] = useState<number[]>([]);

  const addToOrder = (id: number) => {
    setCart((prev) => [...prev, id]);
  };

  const total = menu.reduce((sum, item) => {
    const count = cart.filter((id) => id === item.id).length;
    return sum + item.price * count;
  }, 0);

  return (
    <main className="events-page">
      <h1 className="page-title">{t.canteen}</h1>
      <div className="page-line"></div>

      <h2 className="section-title">{t.menu}</h2>
      <p className="section-subtitle">{t.chooseMenu}</p>

      <ul className="menu-grid">
        {menu.map((item) => {
          const count = cart.filter((id) => id === item.id).length;

          return (
            <li key={item.id} className="menu-card card">
              <div style={{ fontSize: "2rem", textAlign: "center" }}>
                {ICONS[item.name] || "🍽️"}
              </div>

              <div style={{ fontWeight: 700 }}>{item.name}</div>

              <div>
                <span className={`badge ${DIET_BADGE[item.diet] || "badge-grey"}`}>
                  {item.diet}
                </span>
              </div>

              <p style={{ color: "var(--text-muted)" }}>
                {DESCRIPTIONS[item.name]}
              </p>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>€{item.price.toFixed(2)}</span>

                <button
                  className="add-btn"
                  onClick={() => addToOrder(item.id)}
                >
                  {count > 0
                    ? `${t.addToOrder} (${count})`
                    : t.addToOrder}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {cart.length > 0 && (
        <div className="cart-bar">
          🛒 {cart.length} item{cart.length !== 1 ? "s" : ""} — €{total.toFixed(2)}
          <button onClick={() => setCart([])}>Clear</button>
        </div>
      )}

      <style>{`
        .menu-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          list-style: none;
        }

        .menu-card {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1.25rem;
        }

        .add-btn {
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.5rem;
          border-radius: 6px;
          cursor: pointer;
        }

        .cart-bar {
          position: fixed;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          background: var(--primary);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 999px;
        }

        @media (max-width: 520px) {
          .menu-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}

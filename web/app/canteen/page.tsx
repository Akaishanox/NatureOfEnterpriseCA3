"use client";

import { useState } from "react";
import menuData from "@/data/menu.json";
import { translations } from "@/app/lib/translations";
import { useLang } from "@/app/lib/useLang";

interface MenuItem {
  id: number;
  name: any;
  category: string;
  price: number;
  diet: any;
  description: any;
}

const menu = menuData as MenuItem[];

const ICONS: Record<string, string> = {
  "Grilled Salmon": "🐟",
  "Margherita Pizza": "🍕",
  Coffee: "☕",
  "Chicken Caesar Salad": "🥗",
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
    <main className="canteen-page-fixed">
      <h1 className="canteen-title">{t.canteen}</h1>
      <div className="canteen-line"></div>

      <h2 className="canteen-subtitle">{t.menu}</h2>
      <p className="canteen-description">{t.chooseMenu}</p>

      <div className="canteen-grid-fixed">
        {menu.map((item) => {
          const count = cart.filter((id) => id === item.id).length;

          return (
            <div className="canteen-card-fixed" key={item.id}>
              <div className="canteen-icon-fixed">
                {ICONS[item.name.en] || "🍽️"}
              </div>

              <h3>{item.name[lang]}</h3>

              <div className="canteen-info">
                <p>{item.diet[lang]}</p>
              </div>

              <p className="canteen-description-text">
                {item.description[lang]}
              </p>

              <button
                className="canteen-add-btn"
                onClick={() => addToOrder(item.id)}
              >
                €{item.price.toFixed(2)} ·{" "}
                {count > 0 ? `${t.addToOrder} (${count})` : t.addToOrder}
              </button>
            </div>
          );
        })}
      </div>

      {cart.length > 0 && (
        <div className="cart-bar">
          🛒 {cart.length} item{cart.length !== 1 ? "s" : ""} — €
          {total.toFixed(2)}
          <button onClick={() => setCart([])}>Clear</button>
        </div>
      )}

      <style>{`
        .canteen-page-fixed {
          padding: 6rem 4rem 3rem;
          background: var(--bg);
          min-height: 100vh;
        }

        .canteen-page-fixed > * {
        max-width: 1050px;
        margin-left: auto;
        margin-right: auto;
        }

        .canteen-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 0.8rem;
        }

        .canteen-line {
          width: 70px;
          height: 8px;
          background: var(--primary);
          border-radius: 999px;
          margin-bottom: 2.8rem;
        }

        .canteen-subtitle {
          font-size: 1.55rem;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 0.6rem;
        }

        .canteen-description {
          font-size: 1rem;
          color: var(--text-muted);
          margin-bottom: 2.6rem;
        }

        .canteen-grid-fixed {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2.4rem 4rem;
        max-width: 1050px;
        margin: 0 auto;
        }

        .canteen-card-fixed {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 2rem 1.7rem 1.7rem;
          min-height: 300px;
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
        }

        .canteen-icon-fixed {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 1rem;
        }

        .canteen-card-fixed h3 {
          text-align: center;
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 1.6rem;
        }

        .canteen-info {
          margin-bottom: 1rem;
        }

        .canteen-info p {
          font-size: 0.95rem;
          color: var(--text);
          margin-bottom: 0.7rem;
        }

        .canteen-description-text {
          font-size: 0.95rem;
          color: var(--text);
          line-height: 1.5;
          margin-bottom: 1.4rem;
          flex: 1;
        }

        .canteen-add-btn {
          width: 100%;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.8rem 1rem;
          font-size: 1rem;
          cursor: pointer;
          margin-top: auto;
        }

        .canteen-add-btn:hover {
          background: var(--primary-dark);
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
          z-index: 999;
        }

        .cart-bar button {
          margin-left: 1rem;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          text-decoration: underline;
        }

        @media (max-width: 900px) {
          .canteen-page-fixed {
            padding: 5rem 1.5rem 2rem;
          }

          .canteen-grid-fixed {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </main>
  );
}

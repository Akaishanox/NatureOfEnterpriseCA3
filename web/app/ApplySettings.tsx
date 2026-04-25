"use client";

import { useEffect } from "react";

export default function ApplySettings() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedFont = localStorage.getItem("fontSize");
    const savedLang = localStorage.getItem("language") || "en";

    document.documentElement.classList.toggle("dark-mode", savedTheme === "dark");

    if (savedFont) {
      document.documentElement.style.fontSize = savedFont + "px";
    }

    document.documentElement.setAttribute("lang", savedLang);
  }, []);

  return null;
}

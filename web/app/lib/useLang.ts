"use client";

import { useEffect, useState } from "react";

export function useLang() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const loadLang = () => {
      const savedLang = localStorage.getItem("language") || "en";
      setLang(savedLang);
    };

    loadLang();

    window.addEventListener("languageChanged", loadLang);
    window.addEventListener("storage", loadLang);

    return () => {
      window.removeEventListener("languageChanged", loadLang);
      window.removeEventListener("storage", loadLang);
    };
  }, []);

  return lang;
}

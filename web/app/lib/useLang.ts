"use client";

import { useEffect, useState } from "react";

export function useLang() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const loadLang = () => {
      const previewLang = localStorage.getItem("previewLanguage");
      const savedLang = localStorage.getItem("language");

      setLang(previewLang || savedLang || "en");
    };

    loadLang();

    window.addEventListener("languageChanged", loadLang);

    return () => {
      window.removeEventListener("languageChanged", loadLang);
    };
  }, []);

  return lang;
}

"use client";

import { useEffect, useState } from "react";

export function useLang() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved) setLang(saved);
  }, []);

  return lang;
}

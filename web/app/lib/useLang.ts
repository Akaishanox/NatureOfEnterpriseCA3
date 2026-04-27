"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { translations } from "./translations";

export function useLang(): keyof typeof translations {
  const pathname = usePathname();
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const loadLang = () => {
      const savedLang = localStorage.getItem("language") || "en";
      const previewLang = localStorage.getItem("previewLanguage");

      if (pathname === "/settings") {
        setLang(previewLang || savedLang);
      } else {
        setLang(savedLang);
      }
    };

    loadLang();

    window.addEventListener("languageChanged", loadLang);

    return () => {
      window.removeEventListener("languageChanged", loadLang);
    };
  }, [pathname]);

  return lang as keyof typeof translations;
}

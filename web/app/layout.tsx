import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import ApplySettings from "./ApplySettings";

export const metadata: Metadata = {
  title: "Campus Companion",
  description: "Your all-in-one student companion app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApplySettings />
        <a href="#main-content" style={{ position: "absolute", left: "-9999px" }}>
          Skip to main content
        </a>
        <NavBar />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}

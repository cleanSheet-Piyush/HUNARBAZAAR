import React from "react";
import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{
          padding: "6px 12px",
          borderRadius: "8px",
          border: "1px solid #d9cbaf",
          background: "#ffffff",
          fontFamily: "'Outfit', sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          color: "#2b251e",
          cursor: "pointer",
          outline: "none",
        }}
      >
        <option value="en">🇬🇧 English</option>
        <option value="hi">🇮🇳 Hindi (हिंदी)</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
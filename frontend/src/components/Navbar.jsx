import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import AddProductModal from "./AddProductModal";
import SupportModal from "./SupportModal";
import "./Navbar.css";

const Navbar = ({ activeTab }) => {
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const isHi = language === "hi";

  const handleOpenChatbot = () => {
    window.dispatchEvent(new CustomEvent("open-support-widget"));
  };

  return (
    <header className="regalia-header">
      {/* Upper Line Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-content">
          <span>✦ SMART INDIA HACKATHON 2026 EDITION — DIRECT FROM INDIAN ARTISAN CLUSTERS ✦</span>
          <button
            type="button"
            className="topbar-support-btn"
            onClick={() => setIsSupportModalOpen(true)}
            title="Click to open Support & Feedback"
          >
            💬 24/7 Support Helpline: <strong>+91 6207443800</strong>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="regalia-navbar">
        <div className="nav-left">
          <Link to="/" className="brand-link" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              lineHeight: 1,
              padding: "6px 12px",
              background: "linear-gradient(135deg, #1c1208 0%, #2b1d0e 100%)",
              borderRadius: 10,
              border: "1px solid #8b6914",
              boxShadow: "0 2px 10px rgba(180,83,9,0.25)",
            }}>
              <span style={{
                fontSize: 20,
                fontWeight: 900,
                letterSpacing: "0.12em",
                background: "linear-gradient(90deg, #f59e0b 0%, #fcd34d 40%, #f59e0b 80%, #d97706 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "'Georgia', serif",
                textTransform: "uppercase",
              }}>
                HUNARBAZAAR
              </span>
              <span style={{
                fontSize: 8,
                letterSpacing: "0.22em",
                color: "#d4a85a",
                textTransform: "uppercase",
                fontFamily: "sans-serif",
                fontWeight: 500,
                marginTop: 2,
              }}>
                ✦ Artisan Marketplace ✦
              </span>
            </div>
          </Link>

          <div className="nav-links">
            <Link to="/" className={`nav-item ${activeTab === "home" ? "active" : ""}`}>
              {isHi ? "होम" : "Home"}
            </Link>
            <Link to="/gallery" className={`nav-item ${activeTab === "gallery" ? "active" : ""}`}>
              {isHi ? "शिल्प गैलरी" : "Craft Gallery"}
            </Link>
          </div>
        </div>

        <div className="nav-right" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Green Square Add Product Button (Show ONLY for Artisans or Guest visitors, hide for Buyers) */}
          {(!user || user.role === "artisan") && (
            <button
              type="button"
              className="green-add-product-btn"
              onClick={() => setIsModalOpen(true)}
              title="Click to list a new product"
            >
              ➕ {isHi ? "उत्पाद जोड़ें" : "Add Product"}
            </button>
          )}

          {/* Clean Navbar Support Button */}
          <button
            type="button"
            className="nav-chatbot-btn"
            onClick={() => setIsSupportModalOpen(true)}
            title="Open Customer Support & 5-Star Feedback"
          >
            🎧 {isHi ? "सहायता" : "Support"}
          </button>

          <LanguageSwitcher />

          {user ? (
            <div className="user-profile-menu">
              <span className="user-role-badge">
                {user.role === "artisan"
                  ? (isHi ? "🎨 कारीगर" : "🎨 Artisan")
                  : (isHi ? "📦 खरीदार" : "📦 Buyer")}
              </span>
              <span className="username-tag">{user.username}</span>
              <button type="button" className="nav-logout-btn" onClick={logout}>
                {isHi ? "लॉग आउट" : "Logout"}
              </button>
            </div>
          ) : (
            <div className="auth-nav-btns">
              <button type="button" className="nav-login-btn" onClick={() => navigate("/login")}>
                {isHi ? "साइन इन" : "Sign In"}
              </button>
              <button type="button" className="nav-reg-btn" onClick={() => navigate("/register")}>
                {isHi ? "रजिस्टर" : "Register"}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Add Product Form Modal */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {}}
      />

      {/* Support & Feedback Small Modal */}
      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
        onOpenChatbot={handleOpenChatbot}
      />
    </header>
  );
};

export default Navbar;

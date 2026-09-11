import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../context/LanguageContext";
import CategoryBrowseModal from "./CategoryBrowseModal";

const ALL_SUGGESTIONS = [
  "Oil painting", "Acrylic painting", "Watercolor painting", "Pastel art",
  "Finger painting", "Graphite sketching", "Charcoal drawing", "Zentangle art",
  "Hand-carved sculpture", "Clay pottery", "Hand embroidery", "Handloom weaving",
  "Madhubani painting", "Warli art", "Gond art",
  "Handcrafted", "Natural Dye", "Eco Friendly", "Traditional",
  "GI Tagged", "Silk", "Terracotta", "Woodwork",
  "Sambalpuri Handloom", "Pattachitra", "Dokra craft", "Block printing",
  "Bamboo craft", "Leather craft", "Tribal jewelry",
];

const CATEGORY_INFO = {
  "Oil painting": {
    emoji: "🎨",
    origin: "Pan-India — Rajasthan, Kerala, Bengal",
    description: "Oil paintings by Indian artisans blend traditional motifs with European techniques introduced during the Mughal and colonial eras. Rich, layered pigments on canvas or board capture mythological scenes, village life, and landscapes with striking depth and texture.",
    products: ["Framed canvas paintings", "Portrait commissions", "Miniature oils", "Village scene panels"],
    priceRange: "₹800 – ₹12,000",
    giTag: false,
    highlight: "Unique among Indian crafts for its luminous, slow-drying medium that allows intricate blending.",
  },
  "Acrylic painting": {
    emoji: "🖌️",
    origin: "Contemporary — all states",
    description: "Modern acrylic paintings by Indian artisans fuse traditional folk iconography with contemporary styles. Fast-drying and vibrant, acrylics are used to create bold wall art, deity portraits, abstract tribal patterns, and experimental mixed-media works.",
    products: ["Wall art panels", "Deity portraits", "Abstract tribal art", "Decorative tiles"],
    priceRange: "₹400 – ₹8,000",
    giTag: false,
    highlight: "Popular with younger artisans experimenting with traditional subjects in a modern medium.",
  },
  "Watercolor painting": {
    emoji: "💧",
    origin: "Rajasthan, Odisha, West Bengal",
    description: "Watercolour painting is one of India's oldest traditions, used in Rajput miniatures and Pahari paintings. Contemporary artisans create delicate botanical prints, architectural studies of heritage buildings, and nature studies using hand-made pigments on handmade paper.",
    products: ["Botanical prints", "Heritage architecture studies", "Bird & wildlife art", "Greeting cards"],
    priceRange: "₹300 – ₹6,000",
    giTag: false,
    highlight: "Often painted on handmade rag paper, adding to the organic, archival quality of each piece.",
  },
  "Pastel art": {
    emoji: "🌈",
    origin: "Bengal, Maharashtra",
    description: "Soft pastel drawings by Indian artisans capture intimate portraits, rural landscapes, and devotional subjects with a dreamlike, velvety finish. Artisans use both dry pastels and oil pastels on toned paper to achieve rich chromatic depth.",
    products: ["Portrait studies", "Landscape art", "Floral compositions", "Spiritual figures"],
    priceRange: "₹500 – ₹5,000",
    giTag: false,
    highlight: "Each piece is unique — pastels cannot be exactly replicated, making every artwork one-of-a-kind.",
  },
  "Finger painting": {
    emoji: "✋",
    origin: "Odisha, Tamil Nadu — tribal communities",
    description: "Finger painting is an ancient technique practiced by tribal and folk artists across India. Fingers are used directly to apply natural pigments, creating textured patterns of birds, animals, and nature motifs found in Warli, Saura, and Bhil traditions.",
    products: ["Tribal wall hangings", "Decorative boards", "Children's art sets", "Folk storyboards"],
    priceRange: "₹200 – ₹3,000",
    giTag: false,
    highlight: "Each stroke carries the personal touch of the artist's hand — no brush can replicate this quality.",
  },
  "Graphite sketching": {
    emoji: "✏️",
    origin: "Pan-India — urban artisan clusters",
    description: "Graphite sketching by HUNARBAZAAR artisans ranges from hyper-realistic portraits and architectural studies of heritage monuments to delicate botanical illustrations. Many artisans specialise in sketching traditional occupations and village life scenes.",
    products: ["Portrait sketches", "Heritage monument studies", "Botanical illustrations", "Occupation series"],
    priceRange: "₹250 – ₹4,000",
    giTag: false,
    highlight: "Artisans use hand-ground graphite sticks alongside pencils to achieve tonal richness.",
  },
  "Charcoal drawing": {
    emoji: "🖤",
    origin: "Bengal, UP, Rajasthan",
    description: "Charcoal drawings capture dramatic contrasts of light and shadow. Indian artisans use compressed charcoal and vine charcoal to create powerful deity portraits, figures from mythology, and bold wildlife studies that carry deep visual impact.",
    products: ["Deity portraits", "Mythology scenes", "Wildlife art", "Abstract smoke-effect art"],
    priceRange: "₹300 – ₹5,500",
    giTag: false,
    highlight: "Artisans sometimes use traditional charcoal made from neem or bamboo, not commercial brands.",
  },
  "Zentangle art": {
    emoji: "🌀",
    origin: "Contemporary — Maharashtra, Bangalore",
    description: "Zentangle is a meditative pattern-drawing art form increasingly practiced by Indian artisans who fuse it with traditional rangoli motifs, mandala structures, and Kolam geometries. Each piece is made with fine-tipped pens on archival paper without preliminary sketching.",
    products: ["Framed zentangle panels", "Mandala art", "Greeting cards", "Bookmark sets"],
    priceRange: "₹150 – ₹3,500",
    giTag: false,
    highlight: "Therapeutic to create and beautiful to display — no two pieces ever look alike.",
  },
  "Hand-carved sculpture": {
    emoji: "🗿",
    origin: "Odisha (Puri), Rajasthan (Jaipur), Tamil Nadu",
    description: "India has a 5,000-year-old tradition of stone and wood carving. Artisans in Odisha carve soft chlorite schist and khondalite stone into deity figurines, temple panels, and decorative items. Rajasthani artisans work in sandstone and marble with fine jali lattice patterns.",
    products: ["Deity figurines", "Temple-style panels", "Jali lattice screens", "Stone animal figurines"],
    priceRange: "₹600 – ₹25,000",
    giTag: true,
    highlight: "Odisha stone carvings and Rajasthani marble jali work both hold GI tags for authenticity.",
  },
  "Clay pottery": {
    emoji: "🏺",
    origin: "Odisha (Molela), Rajasthan, West Bengal (Bishnupur)",
    description: "Indian clay pottery spans utilitarian terracotta and ritual vessels to intricately painted decorative pieces. Molela in Rajasthan is famed for its votive terracotta plaques, while Bankura horses from Bengal and blue pottery from Jaipur are globally celebrated.",
    products: ["Terracotta pots & diyas", "Bankura horses", "Jaipur blue pottery", "Ritual votive plaques"],
    priceRange: "₹80 – ₹6,000",
    giTag: true,
    highlight: "Bankura horse and Jaipur blue pottery are GI-tagged and listed in UNESCO intangible cultural heritage discussions.",
  },
  "Hand embroidery": {
    emoji: "🪡",
    origin: "Gujarat (Kutch), Odisha, Lucknow, Kashmir",
    description: "India's embroidery traditions are among the world's richest. Kutch artisans create mirror-work shisha embroidery; Lucknow artisans do delicate chikankari on muslin; Kashmir artisans embroider pashmina shawls with intricate sozni needlework. Each stitch is hand-placed by skilled women artisans.",
    products: ["Embroidered cushion covers", "Chikankari kurtas", "Shisha mirror wall hangings", "Sozni shawls"],
    priceRange: "₹350 – ₹18,000",
    giTag: true,
    highlight: "Kutch Shisha embroidery and Lucknow Chikankari are both GI-protected art forms.",
  },
  "Handloom weaving": {
    emoji: "🧶",
    origin: "Odisha (Sambalpuri), Varanasi, Assam (Muga), Tamil Nadu",
    description: "India's handloom sector is the world's largest, employing over 4 million weavers. Sambalpuri ikat from Odisha, Banarasi brocade from Varanasi, Muga silk from Assam, and Kanjivaram silk from Tamil Nadu represent India's finest textile traditions — each with distinct techniques and motifs.",
    products: ["Sambalpuri sarees", "Banarasi dupattas", "Muga silk stoles", "Kanjivaram table runners"],
    priceRange: "₹800 – ₹45,000",
    giTag: true,
    highlight: "Sambalpuri handloom holds a GI tag. Weavers use a bandha (tie-dye) resist technique before weaving.",
  },
  "Madhubani painting": {
    emoji: "🪷",
    origin: "Mithila region, Bihar",
    description: "Madhubani (Mithila) painting is a centuries-old art form from Bihar's Mithila region. Women paint auspicious scenes from Hindu mythology — Radha-Krishna, Durga, wedding rituals — using natural pigments and fine bamboo twigs or fingers. The style is characterised by geometric borders, no empty spaces, and vivid mineral colours.",
    products: ["Framed Madhubani art", "Painted sarees & fabric", "Greeting cards", "Decorative panels"],
    priceRange: "₹250 – ₹15,000",
    giTag: true,
    highlight: "Madhubani painting holds a GI tag and is practised exclusively in Bihar's Mithila district by women artisans.",
  },
  "Warli art": {
    emoji: "🌿",
    origin: "Maharashtra — Warli tribal community",
    description: "Warli art is a tribal painting tradition from Maharashtra's Sahyadri hills, practiced by the Warli tribe for over 2,500 years. Simple geometric shapes — circles, triangles, squares — form humans, animals, and village life scenes. Traditionally painted with rice paste on mud walls, now on paper and cloth.",
    products: ["Framed Warli art", "Painted tote bags", "Warli-print cushions", "Wall murals"],
    priceRange: "₹150 – ₹8,000",
    giTag: false,
    highlight: "Warli art uses only three geometric shapes: circle (sun/moon), triangle (mountain/trees), square (sacred enclosure).",
  },
  "Gond art": {
    emoji: "🦚",
    origin: "Madhya Pradesh — Gond tribal community",
    description: "Gond art comes from the Gondi people of Madhya Pradesh and is one of India's most vibrant tribal traditions. Artisans fill every inch of their paintings with intricate dots and dashes (jangarh shaili), creating luminous depictions of animals, nature spirits, and community life. Celebrated globally for its bold colours and rhythmic patterns.",
    products: ["Gond animal paintings", "Forest spirit panels", "Painted diaries & books", "Textile prints"],
    priceRange: "₹300 – ₹12,000",
    giTag: false,
    highlight: "The late Jangarh Singh Shyam brought Gond art to international museums. His legacy continues through artisans on HUNARBAZAAR.",
  },
};


const Sidebar = ({ onSearchChange, onCategorySelect, selectedCategory, onSuggestionSelect }) => {
  const { t, language } = useLanguage();
  const isHi = language === "hi";
  const [searchTerm, setSearchTerm] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeCatModal, setActiveCatModal] = useState(null);
  const [browseCatModal, setBrowseCatModal] = useState(null);
  const searchBoxRef = useRef(null);


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (onSearchChange) onSearchChange(val);
    if (val.trim().length >= 1) {
      const filtered = ALL_SUGGESTIONS.filter((s) =>
        s.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 8));
      setShowDropdown(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSelectSuggestion = (item) => {
    setSearchTerm(item);
    setSuggestions([]);
    setShowDropdown(false);
    // If parent provides a direct product-open handler, use it
    if (onSuggestionSelect) {
      onSuggestionSelect(item);
    } else {
      if (onSearchChange) onSearchChange(item);
      setTimeout(() => {
        const el = document.getElementById("marketplace-products");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleSearchSubmit = (e) => {
    e && e.preventDefault();
    if (onSearchChange) onSearchChange(searchTerm);
    setTimeout(() => {
      const el = document.getElementById("marketplace-products");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };






  const categories = [
    { name: "Oil painting", count: 8 },
    { name: "Acrylic painting", count: 7 },
    { name: "Watercolor painting", count: 5 },
    { name: "Pastel art", count: 4 },
    { name: "Finger painting", count: 3 },
    { name: "Graphite sketching", count: 9 },
    { name: "Charcoal drawing", count: 6 },
    { name: "Zentangle art", count: 5 },
    { name: "Hand-carved sculpture", count: 7 },
    { name: "Clay pottery", count: 10 },
    { name: "Hand embroidery", count: 8 },
    { name: "Handloom weaving", count: 6 },
    { name: "Madhubani painting", count: 9 },
    { name: "Warli art", count: 5 },
    { name: "Gond art", count: 7 },
  ];

  const tags = [
    "Handcrafted", "Natural Dye", "Eco Friendly", "Traditional",
    "GI Tagged", "Silk", "Terracotta", "Woodwork",
  ];

  const recentCrafts = [
    {
      title: "Handcarved Wooden Elephant",
      date: "28 AUG 2026",
      img: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=200&auto=format&fit=crop",
    },
    {
      title: "Terracotta Ritual Clay Pot",
      date: "27 AUG 2026",
      img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=200&auto=format&fit=crop",
    },
    {
      title: "Sambalpuri Handloom Saree",
      date: "25 AUG 2026",
      img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=200&auto=format&fit=crop",
    },
  ];

  return (
    <>
    <aside className="regalia-sidebar">
      {/* Search Widget */}
      <div className="sidebar-widget">
        <h3 className="widget-title">{isHi ? "खोज" : "Search"}</h3>
        <form onSubmit={handleSearchSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div className="sidebar-search-box" ref={searchBoxRef} style={{ position: "relative" }}>
            <span className="search-icon-inside">🔍</span>
            <input
              type="text"
              placeholder={isHi ? "खोजें..." : "Search crafts..."}
              value={searchTerm}
              onChange={handleSearch}
              onFocus={() => {
                if (suggestions.length > 0) setShowDropdown(true);
              }}
              className="sidebar-search-input"
            />

            {/* Dropdown suggestions */}
            {showDropdown && suggestions.length > 0 && (
              <div style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: 0,
                right: 0,
                background: "#ffffff",
                border: "1px solid #e3d7cb",
                borderRadius: 10,
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                zIndex: 999,
                overflow: "hidden",
              }}>
                {suggestions.map((item, i) => (
                  <div
                    key={i}
                    onMouseDown={() => handleSelectSuggestion(item)}
                    style={{
                      padding: "9px 14px",
                      fontSize: 13,
                      color: "#2b251e",
                      cursor: "pointer",
                      borderBottom: i < suggestions.length - 1 ? "1px solid #f0ebe3" : "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#faf6f0"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "#ffffff"}
                  >
                    <span style={{ color: "#b45309", fontSize: 12 }}>🔍</span>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "9px 0",
              background: "linear-gradient(135deg, #b45309 0%, #92400e 100%)",
              color: "#ffffff",
              border: "none",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: "0.05em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
          >
            🔍 {isHi ? "खोजें" : "Search"}
          </button>
        </form>
      </div>

      {/* Recent Posts / Featured Crafts */}
      <div className="sidebar-widget">
        <h3 className="widget-title">{isHi ? "हालिया कार्य" : "Recent Works"}</h3>
        <div className="recent-craft-list">
          {recentCrafts.map((craft, idx) => (
            <div
              key={idx}
              className="recent-craft-item"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSearchTerm(craft.title);
                if (onSearchChange) onSearchChange(craft.title);
              }}
            >
              <img src={craft.img} alt={craft.title} className="recent-craft-thumb" />
              <div className="recent-craft-info">
                <span className="recent-craft-date">{craft.date}</span>
                <span className="recent-craft-title">{craft.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Widget Grouped in 3 Parts (5, 5, 5) */}
      <div className="sidebar-widget">
        <h3 className="widget-title">{isHi ? "श्रेणियाँ" : "Categories"}</h3>

        {/* Part 1: Fine Paintings */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#b45309", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 6, display: "flex", justifyContent: "space-between" }}>
            <span>{isHi ? "🎨 भाग 1: सूक्ष्म चित्रकला (1-5)" : "🎨 Part 1: Fine Paintings (1-5)"}</span>
          </div>
          <ul className="category-list">
            {categories.slice(0, 5).map((cat, idx) => (
              <li
                key={idx}
                className={`category-item ${selectedCategory === cat.name ? "active" : ""}`}
                onClick={() => {
                  if (onCategorySelect) onCategorySelect(cat.name);
                  setActiveCatModal(cat.name);
                }}
                style={{ cursor: "pointer" }}
              >
                <span className="category-name">
                  <span className="check-mark">✓</span>
                  {t(cat.name)}
                </span>
                <span className="category-count">{cat.count} listings</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Part 2: Sketches & Sculptures */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#b45309", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 6, display: "flex", justifyContent: "space-between" }}>
            <span>{isHi ? "✏️ भाग 2: स्केच और मिट्टी कला (6-10)" : "✏️ Part 2: Sketches & Pottery (6-10)"}</span>
          </div>
          <ul className="category-list">
            {categories.slice(5, 10).map((cat, idx) => (
              <li
                key={idx + 5}
                className={`category-item ${selectedCategory === cat.name ? "active" : ""}`}
                onClick={() => {
                  if (onCategorySelect) onCategorySelect(cat.name);
                  setActiveCatModal(cat.name);
                }}
                style={{ cursor: "pointer" }}
              >
                <span className="category-name">
                  <span className="check-mark">✓</span>
                  {t(cat.name)}
                </span>
                <span className="category-count">({cat.count})</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Part 3: Heritage Textiles & Folk Art */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#b45309", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 6, display: "flex", justifyContent: "space-between" }}>
            <span>{isHi ? "🎙️ भाग 3: वस्त्र और लोक कला (11-15)" : "🧵 Part 3: Textiles & Folk Art (11-15)"}</span>
          </div>
          <ul className="category-list">
            {categories.slice(10, 15).map((cat, idx) => (
              <li
                key={idx + 10}
                className={`category-item ${selectedCategory === cat.name ? "active" : ""}`}
                onClick={() => {
                  if (onCategorySelect) onCategorySelect(cat.name);
                  setActiveCatModal(cat.name);
                }}
                style={{ cursor: "pointer" }}
              >
                <span className="category-name">
                  <span className="check-mark">✓</span>
                  {t(cat.name)}
                </span>
                <span className="category-count">({cat.count})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tag Cloud */}
      <div className="sidebar-widget">
        <h3 className="widget-title">{isHi ? "टैग" : "Tags"}</h3>
        <div className="tag-cloud">
          {tags.map((tag, idx) => {
            const isActive = searchTerm.toLowerCase() === tag.toLowerCase();
            return (
              <span
                key={idx}
                className={`sidebar-tag ${isActive ? "active" : ""}`}
                style={{
                  cursor: "pointer",
                  fontWeight: isActive ? 700 : 500,
                  background: isActive ? "#b45309" : "",
                  color: isActive ? "#ffffff" : "",
                  borderColor: isActive ? "#92400e" : "",
                  transition: "all 0.2s",
                }}
                onClick={() => {
                  if (isActive) {
                    // Deselect: clear search
                    setSearchTerm("");
                    if (onSearchChange) onSearchChange("");
                  } else {
                    // Select: filter by this tag keyword
                    setSearchTerm(tag);
                    if (onSearchChange) onSearchChange(tag);
                    setTimeout(() => {
                      const el = document.getElementById("marketplace-products");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
        {searchTerm && tags.some(t => t.toLowerCase() === searchTerm.toLowerCase()) && (
          <p style={{ fontSize: 11, color: "#b45309", marginTop: 8, fontWeight: 600 }}>
            🔍 Filtering by: "{searchTerm}" — <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => { setSearchTerm(""); if (onSearchChange) onSearchChange(""); }}>Clear</span>
          </p>
        )}
      </div>


    </aside>

    {/* ======= CATEGORY INFO MODAL ======= */}
    {activeCatModal && CATEGORY_INFO[activeCatModal] && createPortal(
      <div
        onClick={() => setActiveCatModal(null)}
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(28,24,21,0.55)",
          backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "16px",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#faf7f2",
            borderRadius: 18,
            maxWidth: 520,
            width: "100%",
            maxHeight: "88vh",
            overflowY: "auto",
            boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
            position: "relative",
          }}
        >
          {/* Close */}
          <button
            onClick={() => setActiveCatModal(null)}
            style={{
              position: "absolute", top: 14, right: 16,
              background: "none", border: "none", fontSize: 22,
              cursor: "pointer", color: "#8b8279", lineHeight: 1,
            }}
          >×</button>

          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #2b251e 0%, #4a3728 100%)",
            borderRadius: "18px 18px 0 0",
            padding: "28px 28px 22px",
            color: "#fff",
          }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>
              {CATEGORY_INFO[activeCatModal].emoji}
            </div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: 0.3 }}>
              {activeCatModal}
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: "#d8c48c" }}>
                📍 {CATEGORY_INFO[activeCatModal].origin}
              </span>
              {CATEGORY_INFO[activeCatModal].giTag && (
                <span style={{
                  background: "#2f6f4f", color: "#fff",
                  fontSize: 11, fontWeight: 700, padding: "2px 10px",
                  borderRadius: 20, letterSpacing: 0.5,
                }}>
                  ✓ GI Tagged
                </span>
              )}
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "24px 28px 28px" }}>

            {/* Description */}
            <p style={{ fontSize: 14, color: "#3d3530", lineHeight: 1.7, margin: "0 0 20px" }}>
              {CATEGORY_INFO[activeCatModal].description}
            </p>

            {/* Highlight */}
            <div style={{
              background: "#fff8e8",
              border: "1px solid #e8d5a0",
              borderRadius: 10,
              padding: "12px 16px",
              marginBottom: 20,
              display: "flex", gap: 10, alignItems: "flex-start",
            }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>✨</span>
              <p style={{ margin: 0, fontSize: 13, color: "#7a5c00", lineHeight: 1.6 }}>
                {CATEGORY_INFO[activeCatModal].highlight}
              </p>
            </div>

            {/* Products */}
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: "#b45309", letterSpacing: 1, textTransform: "uppercase", margin: "0 0 10px" }}>
                {isHi ? "📦 उत्पाद" : "📦 Products"}
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {CATEGORY_INFO[activeCatModal].products.map((p, i) => (
                  <div key={i} style={{
                    background: "#f0ebe3", borderRadius: 8,
                    padding: "8px 12px", fontSize: 13, color: "#2b251e",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <span style={{ color: "#b45309" }}>•</span> {p}
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "#e3f0e6", borderRadius: 10,
              padding: "12px 16px",
            }}>
              <span style={{ fontSize: 13, color: "#2f6f4f", fontWeight: 600 }}>
                {isHi ? "💰 मूल्य सीमा" : "💰 Price Range"}
              </span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#1c5c38" }}>
                {CATEGORY_INFO[activeCatModal].priceRange}
              </span>
            </div>

            {/* CTA */}
            <button
              onClick={() => {
                if (onCategorySelect) onCategorySelect(activeCatModal);
                setBrowseCatModal(activeCatModal);
                setActiveCatModal(null);
              }}
              style={{
                marginTop: 20, width: "100%",
                background: "linear-gradient(135deg, #2b251e, #4a3728)",
                color: "#d8c48c", border: "none", borderRadius: 12,
                padding: "13px 0", fontSize: 14, fontWeight: 700,
                cursor: "pointer", letterSpacing: 0.5,
              }}
            >
              {isHi ? `🛍️ ${activeCatModal} की लिस्टिंग देखें` : `🛍️ Browse ${activeCatModal} Listings`}
            </button>
          </div>
        </div>
      </div>,
      document.body
    )}
    {browseCatModal && (
      <CategoryBrowseModal
        category={browseCatModal}
        isHi={isHi}
        onClose={() => setBrowseCatModal(null)}
      />
    )}
    </>
  );
};

export default Sidebar;

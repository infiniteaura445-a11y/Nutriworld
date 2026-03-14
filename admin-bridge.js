// ═══════════════════════════════════════════════
// admin-bridge.js  –  AyurLife Naturals
// Reads admin panel settings from localStorage
// and applies them live to the main website.
// Include this BEFORE app.js in index.html
// ═══════════════════════════════════════════════

const PRODUCTS_KEY = "ayurlife_products";
const SETTINGS_KEY = "ayurlife_settings";

// ── Load site settings and apply to DOM ──
export function getAdminSettings() {
  const raw = localStorage.getItem(SETTINGS_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function getAdminProducts() {
  const raw = localStorage.getItem(PRODUCTS_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function applyAdminSettings() {
  const s = getAdminSettings();
  if (!s) return;

  // ── Site Name ──
  if (s.siteName) {
    document.querySelectorAll(".brand-name, .nav-logo-text, [data-brand-name]").forEach(el => {
      el.textContent = s.siteName;
    });
    document.title = s.siteName + " – Pure Ayurvedic Wellness";
  }

  // ── Tagline ──
  if (s.tagline) {
    document.querySelectorAll(".nav-logo-sub, [data-brand-tagline]").forEach(el => {
      el.textContent = s.tagline;
    });
  }

  // ── Hero Title ──
  if (s.heroTitle) {
    const heroTitleEl = document.querySelector("[data-hero-title]");
    if (heroTitleEl) heroTitleEl.textContent = s.heroTitle;
  }

  // ── Hero Sub ──
  if (s.heroSub) {
    const heroSubEl = document.querySelector("[data-hero-sub]");
    if (heroSubEl) heroSubEl.textContent = s.heroSub;
  }

  // ── WhatsApp links ──
  if (s.whatsapp) {
    document.querySelectorAll("a[href*='wa.me']").forEach(el => {
      const href = el.getAttribute("href") || "";
      // Replace the number part only
      const newHref = href.replace(/wa\.me\/\d+/, `wa.me/${s.whatsapp}`);
      el.setAttribute("href", newHref);
    });
    // Update floating WA button
    const floatWA = document.getElementById("floating-wa");
    if (floatWA) {
      floatWA.href = `https://wa.me/${s.whatsapp}?text=Hello%2C%20I%20need%20help`;
    }
  }

  // ── Email ──
  if (s.email) {
    document.querySelectorAll("a[href^='mailto:']").forEach(el => {
      el.href = `mailto:${s.email}`;
      if (el.textContent.includes("@")) el.textContent = s.email;
    });
    document.querySelectorAll("[data-email]").forEach(el => el.textContent = s.email);
  }

  // ── Phone display ──
  if (s.phoneDisplay) {
    document.querySelectorAll("[data-phone]").forEach(el => el.textContent = s.phoneDisplay);
  }

  // ── Address ──
  if (s.address) {
    document.querySelectorAll("[data-address]").forEach(el => el.textContent = s.address);
  }

  // ── Hours ──
  if (s.hours) {
    document.querySelectorAll("[data-hours]").forEach(el => el.textContent = s.hours);
  }

  // ── Social links ──
  const socialMap = {
    instagram: "a[data-social='instagram']",
    facebook:  "a[data-social='facebook']",
    youtube:   "a[data-social='youtube']",
    twitter:   "a[data-social='twitter']",
  };
  Object.entries(socialMap).forEach(([key, sel]) => {
    if (s[key]) {
      document.querySelectorAll(sel).forEach(el => {
        if (s[key] !== "#") el.href = s[key];
        el.target = "_blank";
      });
    }
  });

  // ── Colors ──
  if (s.colorPrimary) document.documentElement.style.setProperty("--forest",    s.colorPrimary);
  if (s.colorAccent)  document.documentElement.style.setProperty("--saffron",   s.colorAccent);
  if (s.colorBg)      document.documentElement.style.setProperty("--cream",     s.colorBg);

  // ── Footer ──
  if (s.copyright) {
    const el = document.querySelector("[data-copyright]");
    if (el) el.textContent = s.copyright;
  }
  if (s.footerTag) {
    const el = document.querySelector("[data-footer-tag]");
    if (el) el.textContent = s.footerTag;
  }

  // ── Sidebar footer brand name ──
  const sbName = document.getElementById("sb-site-name");
  if (sbName && s.siteName) sbName.textContent = s.siteName;
}

// ═══════════════════════════════════════════════
// app.js  –  AyurLife Naturals
// Main application logic
// ═══════════════════════════════════════════════

import { fetchProducts } from "./firebase.js";
import { applyAdminSettings, getAdminProducts, getAdminSettings } from "./admin-bridge.js";

// ─────────────────────────────────────────────
// CONFIG — reads from admin panel if set
// ─────────────────────────────────────────────
function getWhatsapp() {
  const s = getAdminSettings();
  return (s && s.whatsapp) ? s.whatsapp : "919999999999";
}
// Keep backward compat
const WHATSAPP_NUMBER = "919999999999";

// ─────────────────────────────────────────────
// CATEGORIES DATA
// ─────────────────────────────────────────────
const CATEGORIES = [
  { key: "all",       label: "All Products",     emoji: "🌿", color: "#2d6a4f" },
  { key: "immunity",  label: "Immunity Boosters", emoji: "🛡️", color: "#4a7c59" },
  { key: "tea",       label: "Herbal Teas",       emoji: "🍵", color: "#6b4f2e" },
  { key: "skin",      label: "Skin Care",         emoji: "🌸", color: "#c9956a" },
  { key: "hair",      label: "Hair Care",         emoji: "💆", color: "#8b5e3c" },
  { key: "digestive", label: "Digestive Health",  emoji: "🫙", color: "#3a7f6c" },
  { key: "oils",      label: "Ayurvedic Oils",    emoji: "🫗", color: "#b5690a" },
];

// ─────────────────────────────────────────────
// WHY CHOOSE AYURVEDA DATA
// ─────────────────────────────────────────────
const WHY_ITEMS = [
  { icon: "🌱", title: "100% Natural",         desc: "Every ingredient is sourced from certified organic farms." },
  { icon: "🚫", title: "Chemical Free",        desc: "No synthetic additives, preservatives or artificial colours." },
  { icon: "👨‍⚕️", title: "Doctor Formulated",    desc: "Designed by certified Ayurvedic physicians & vaidyas." },
  { icon: "📜", title: "Traditional Formulas", desc: "Rooted in classical texts like Charaka Samhita." },
  { icon: "✅", title: "Lab Tested",           desc: "Every batch is tested for purity, potency & safety." },
];

// ─────────────────────────────────────────────
// TESTIMONIALS DATA
// ─────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    initial: "P",
    rating: 5,
    text: "I've been using the Ashwagandha capsules for 3 months and the transformation is incredible! My energy levels are through the roof and I sleep so much better. Highly recommend AyurLife!"
  },
  {
    name: "Rahul Verma",
    location: "Delhi",
    initial: "R",
    rating: 5,
    text: "The Bhringraj hair oil is absolutely magical. I was losing 200+ hairs a day. After 6 weeks, my hair fall has reduced by 80%. This is genuine Ayurveda, not some chemical mixture!"
  },
  {
    name: "Ananya Patel",
    location: "Bangalore",
    initial: "A",
    rating: 5,
    text: "Ordered the Kumkumadi serum on a friend's recommendation. Within 2 weeks, my skin tone has visibly brightened and the dark spots are fading. The quality is just phenomenal!"
  },
  {
    name: "Vikram Singh",
    location: "Jaipur",
    initial: "V",
    rating: 4,
    text: "The WhatsApp ordering is so convenient. Got my order in 2 days! The Triphala churna has fixed my years-old digestion problem. Will definitely order again.",
    skipped: true // hidden on mobile for cleaner layout
  },
];

// ─────────────────────────────────────────────
// APP STATE
// ─────────────────────────────────────────────
let allProducts      = [];
let currentCategory  = "all";
let searchQuery      = "";
let deferredPrompt   = null;

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", async () => {
  // ── Apply admin settings FIRST (colors, name, contact) ──
  applyAdminSettings();

  initNavbar();
  initMobileMenu();
  initSearch();
  renderCategories();
  renderWhySection();
  renderTestimonials();
  initConsultForm();
  initContactForm();
  initModal();
  initScrollReveal();
  initPWA();

  // ── Load products: admin localStorage first, then Firebase, then demo ──
  showSkeletons();
  const adminProducts = getAdminProducts();
  if (adminProducts && adminProducts.length > 0) {
    allProducts = adminProducts;
    renderProducts(adminProducts);
  } else {
    const products = await fetchProducts();
    allProducts = products;
    renderProducts(products);
  }
});

// ═══════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════
function initNavbar() {
  const navbar = document.getElementById("navbar");

  const updateNavbar = () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });
}

// ═══════════════════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════════════════
function initMobileMenu() {
  const hamburger   = document.getElementById("hamburger");
  const mobileMenu  = document.getElementById("mobile-menu");

  hamburger.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    if (isOpen) {
      closeMobileMenu();
    } else {
      mobileMenu.classList.remove("hidden");
      hamburger.classList.add("open");
    }
  });

  // Close on outside click
  document.addEventListener("click", e => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });
}

function closeMobileMenu() {
  const hamburger  = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenu.classList.add("hidden");
  hamburger.classList.remove("open");
}

// ═══════════════════════════════════════════════
// SEARCH
// ═══════════════════════════════════════════════
function initSearch() {
  const inputs = [
    document.getElementById("search-input"),
    document.getElementById("mobile-search")
  ];

  let debounceTimer;
  inputs.forEach(input => {
    if (!input) return;
    input.addEventListener("input", e => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = e.target.value.trim().toLowerCase();
        // Sync both inputs
        inputs.forEach(i => { if (i && i !== e.target) i.value = e.target.value; });
        filterAndRender();
      }, 250);
    });
  });
}

// ═══════════════════════════════════════════════
// CATEGORIES
// ═══════════════════════════════════════════════
function renderCategories() {
  const grid = document.getElementById("category-grid");
  grid.innerHTML = CATEGORIES.map(cat => `
    <div class="category-card reveal ${cat.key === 'all' ? 'active' : ''}"
         data-category="${cat.key}"
         onclick="selectCategory('${cat.key}')">
      <span class="cat-icon">${cat.emoji}</span>
      <div class="cat-name text-xs">${cat.label}</div>
    </div>
  `).join("");
}

window.selectCategory = function(key) {
  currentCategory = key;

  // Update active state
  document.querySelectorAll(".category-card").forEach(card => {
    card.classList.toggle("active", card.dataset.category === key);
  });

  // Update filter bar
  const filterBar   = document.getElementById("active-filter-bar");
  const filterLabel = document.getElementById("active-filter-label").querySelector("span");

  if (key !== "all") {
    const cat = CATEGORIES.find(c => c.key === key);
    filterLabel.textContent = `${cat.emoji} ${cat.label}`;
    filterBar.classList.remove("hidden");
    filterBar.classList.add("flex");
  } else {
    filterBar.classList.add("hidden");
    filterBar.classList.remove("flex");
  }

  filterAndRender();

  // Scroll to products
  const productsSection = document.getElementById("products");
  const offset = 80;
  const top = productsSection.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
};

window.resetFilters = function() {
  currentCategory = "all";
  searchQuery = "";
  document.querySelectorAll(".category-card").forEach(card => {
    card.classList.toggle("active", card.dataset.category === "all");
  });
  document.getElementById("active-filter-bar").classList.add("hidden");
  document.getElementById("search-input").value = "";
  if (document.getElementById("mobile-search")) {
    document.getElementById("mobile-search").value = "";
  }
  filterAndRender();
};

document.getElementById("clear-filter")?.addEventListener("click", resetFilters);

// ═══════════════════════════════════════════════
// PRODUCTS
// ═══════════════════════════════════════════════
function filterAndRender() {
  let filtered = [...allProducts];

  if (currentCategory !== "all") {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  if (searchQuery) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery)
    );
  }

  renderProducts(filtered);
}

function showSkeletons(count = 8) {
  const grid = document.getElementById("products-grid");
  grid.innerHTML = Array(count).fill(`
    <div class="skeleton-card">
      <div class="skeleton" style="padding-top:75%;"></div>
      <div class="p-4 space-y-3">
        <div class="skeleton h-3 w-1/3 rounded"></div>
        <div class="skeleton h-5 w-2/3 rounded"></div>
        <div class="skeleton h-3 w-full rounded"></div>
        <div class="skeleton h-3 w-4/5 rounded"></div>
        <div class="skeleton h-8 w-1/2 rounded-full mt-2"></div>
        <div class="flex gap-2 mt-2">
          <div class="skeleton h-8 flex-1 rounded-full"></div>
          <div class="skeleton h-8 w-20 rounded-full"></div>
        </div>
      </div>
    </div>
  `).join("");
}

function renderProducts(products) {
  const grid       = document.getElementById("products-grid");
  const emptyState = document.getElementById("empty-state");

  if (!products || products.length === 0) {
    grid.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  grid.innerHTML = products.map(product => buildProductCard(product)).join("");

  // Trigger reveal animation
  setTimeout(() => {
    grid.querySelectorAll(".product-card").forEach((card, i) => {
      setTimeout(() => card.classList.add("visible"), i * 80);
    });
  }, 50);
}

function buildProductCard(p) {
  const discount = p.mrp ? Math.round((1 - p.price / p.mrp) * 100) : 0;
  const stars    = buildStars(p.rating);
  const waNum    = getWhatsapp();
  const waText   = encodeURIComponent(`Hello! I want to order *${p.name}* (₹${p.price}). Please confirm availability and delivery details.`);

  return `
    <div class="product-card reveal" data-id="${p.id}">
      <div class="product-img-wrap">
        ${p.image
          ? `<img src="${p.image}" alt="${p.name}" loading="lazy" />`
          : `<div class="emoji-bg">${p.emoji || "🌿"}</div>`
        }
        ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ""}
      </div>
      <div class="product-body">
        <div class="product-category">${getCategoryLabel(p.category)}</div>
        <div class="product-name line-clamp-2">${p.name}</div>
        <div class="product-desc line-clamp-2">${p.description}</div>
        <div class="star-rating">
          ${stars}
          <span class="rating-count">(${p.reviews || 0})</span>
        </div>
        <div class="product-price">
          ₹${p.price.toLocaleString('en-IN')}
          ${p.mrp ? `<span class="mrp">₹${p.mrp.toLocaleString('en-IN')}</span>` : ""}
          ${discount > 0 ? `<span class="discount-tag">${discount}% off</span>` : ""}
        </div>
        <div class="product-actions">
          <a href="https://wa.me/${waNum}?text=${waText}"
             target="_blank"
             class="btn-whatsapp flex items-center gap-1.5">
            <i class="fa-brands fa-whatsapp"></i> Order
          </a>
          <button class="btn-outline flex items-center gap-1.5" onclick="openModal('${p.id}')">
            <i class="fa-solid fa-eye text-xs"></i> Details
          </button>
        </div>
      </div>
    </div>
  `;
}

function buildStars(rating) {
  const full    = Math.floor(rating);
  const half    = rating % 1 >= 0.5 ? 1 : 0;
  const empty   = 5 - full - half;
  return (
    '<i class="fa-solid fa-star star"></i>'.repeat(full) +
    (half ? '<i class="fa-solid fa-star-half-stroke star"></i>' : '') +
    '<i class="fa-regular fa-star star" style="color:#d1d5db"></i>'.repeat(empty) +
    `<span style="font-size:.75rem;color:#666;font-weight:600;margin-left:2px">${rating}</span>`
  );
}

function getCategoryLabel(key) {
  const cat = CATEGORIES.find(c => c.key === key);
  return cat ? `${cat.emoji} ${cat.label}` : key;
}

// ═══════════════════════════════════════════════
// PRODUCT MODAL
// ═══════════════════════════════════════════════
function initModal() {
  const modal = document.getElementById("product-modal");
  const closeBtn = document.getElementById("modal-close");

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });
}

window.openModal = function(productId) {
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;

  const modal   = document.getElementById("product-modal");
  const body    = document.getElementById("modal-body");
  const discount = product.mrp ? Math.round((1 - product.price / product.mrp) * 100) : 0;
  const waNum    = getWhatsapp();
  const waText   = encodeURIComponent(`Hello! I want to order *${product.name}* (₹${product.price}). Please confirm availability and delivery.`);

  body.innerHTML = `
    <div class="modal-product-img">
      ${product.image
        ? `<img src="${product.image}" alt="${product.name}" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />`
        : `<div class="emoji-xl">${product.emoji || "🌿"}</div>`
      }
      ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ""}
    </div>
    <div class="p-6">
      <div class="text-xs font-semibold text-forest uppercase tracking-widest mb-1">${getCategoryLabel(product.category)}</div>
      <h2 class="font-serif text-2xl font-bold text-forest-dark mb-2">${product.name}</h2>
      <div class="flex items-center gap-3 mb-4">
        <div class="flex items-center gap-1">${buildStars(product.rating)}</div>
        <span class="text-sm text-gray-400">${product.reviews} reviews</span>
      </div>
      <div class="flex items-baseline gap-3 mb-4">
        <span class="font-serif text-3xl font-bold text-forest-dark">₹${product.price.toLocaleString('en-IN')}</span>
        ${product.mrp ? `<span class="text-lg text-gray-400 line-through">₹${product.mrp.toLocaleString('en-IN')}</span>` : ""}
        ${discount > 0 ? `<span class="text-sm font-semibold text-saffron bg-orange-50 px-2 py-0.5 rounded-full">${discount}% OFF</span>` : ""}
      </div>
      <p class="text-gray-600 text-sm leading-relaxed mb-5">${product.fullDesc || product.description}</p>

      ${product.ingredients ? `
        <div class="mb-5">
          <h4 class="font-semibold text-forest-dark text-sm mb-2">🌿 Key Ingredients</h4>
          <div class="flex flex-wrap">
            ${product.ingredients.map(i => `<span class="ingredient-tag">${i}</span>`).join("")}
          </div>
        </div>
      ` : ""}

      ${product.benefits ? `
        <div class="mb-5">
          <h4 class="font-semibold text-forest-dark text-sm mb-2">✅ Benefits</h4>
          <ul class="space-y-1.5">
            ${product.benefits.map(b => `
              <li class="flex items-start gap-2 text-sm text-gray-600">
                <i class="fa-solid fa-check-circle text-forest mt-0.5 flex-shrink-0 text-xs"></i> ${b}
              </li>
            `).join("")}
          </ul>
        </div>
      ` : ""}

      ${product.usage ? `
        <div class="mb-6 p-3 bg-cream rounded-xl">
          <h4 class="font-semibold text-forest-dark text-sm mb-1">📋 How to Use</h4>
          <p class="text-sm text-gray-600 leading-relaxed">${product.usage}</p>
        </div>
      ` : ""}

      <a href="https://wa.me/${waNum}?text=${waText}"
         target="_blank"
         class="btn-whatsapp w-full flex items-center justify-center gap-2 text-base">
        <i class="fa-brands fa-whatsapp text-xl"></i>
        Order on WhatsApp — ₹${product.price.toLocaleString('en-IN')}
      </a>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("open");
  document.getElementById("modal-content").classList.add("modal-enter");
  document.body.style.overflow = "hidden";
};

function closeModal() {
  const modal = document.getElementById("product-modal");
  modal.classList.remove("open");
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

// ═══════════════════════════════════════════════
// WHY CHOOSE SECTION
// ═══════════════════════════════════════════════
function renderWhySection() {
  const grid = document.getElementById("why-grid");
  grid.innerHTML = WHY_ITEMS.map(item => `
    <div class="why-card reveal">
      <span class="why-icon">${item.icon}</span>
      <div class="why-title">${item.title}</div>
      <div class="why-desc">${item.desc}</div>
    </div>
  `).join("");
}

// ═══════════════════════════════════════════════
// TESTIMONIALS
// ═══════════════════════════════════════════════
function renderTestimonials() {
  const grid = document.getElementById("testimonials-grid");
  grid.innerHTML = TESTIMONIALS.filter(t => !t.skipped).map(t => `
    <div class="testimonial-card reveal">
      <div class="testimonial-quote">"</div>
      <p class="testimonial-text">${t.text}</p>
      <div class="flex items-center gap-3">
        <div class="testimonial-avatar">${t.initial}</div>
        <div>
          <div class="font-semibold text-sm text-gray-800">${t.name}</div>
          <div class="text-xs text-gray-500">${t.location}</div>
          <div class="flex mt-0.5">${buildStars(t.rating)}</div>
        </div>
      </div>
    </div>
  `).join("");
}

// ═══════════════════════════════════════════════
// CONSULT FORM
// ═══════════════════════════════════════════════
function initConsultForm() {
  const form = document.getElementById("consult-form");
  if (!form) return;

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const name    = document.getElementById("cf-name").value.trim();
    const age     = document.getElementById("cf-age").value.trim();
    const phone   = document.getElementById("cf-phone").value.trim();
    const concern = document.getElementById("cf-concern").value;
    const message = document.getElementById("cf-message").value.trim();

    // Basic validation
    let valid = true;
    [
      ["cf-name", name],
      ["cf-age", age],
      ["cf-phone", phone],
      ["cf-concern", concern],
      ["cf-message", message],
    ].forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (!val) {
        el.classList.add("error");
        valid = false;
      } else {
        el.classList.remove("error");
      }
    });

    if (!valid) return;

    // Send via WhatsApp
    const waText = encodeURIComponent(
      `🩺 *Ayurvedic Consultation Request*\n\n` +
      `*Name:* ${name}\n` +
      `*Age:* ${age}\n` +
      `*Phone:* ${phone}\n` +
      `*Concern:* ${concern}\n\n` +
      `*Details:* ${message}`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`, "_blank");

    // Show success
    document.getElementById("consult-success").classList.remove("hidden");
    form.reset();
    setTimeout(() => {
      document.getElementById("consult-success").classList.add("hidden");
    }, 5000);
  });

  // Remove error on input
  form.querySelectorAll(".form-input").forEach(input => {
    input.addEventListener("input", () => input.classList.remove("error"));
  });
}

// ═══════════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════════
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name    = document.getElementById("cnt-name").value.trim();
    const contact = document.getElementById("cnt-contact").value.trim();
    const msg     = document.getElementById("cnt-msg").value.trim();

    if (!name || !contact || !msg) return;

    const waText = encodeURIComponent(
      `📩 *New Message from Website*\n\n*From:* ${name}\n*Contact:* ${contact}\n\n*Message:* ${msg}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`, "_blank");

    document.getElementById("contact-success").classList.remove("hidden");
    form.reset();
    setTimeout(() => {
      document.getElementById("contact-success").classList.add("hidden");
    }, 4000);
  });
}

// ═══════════════════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════════════════
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  const observe = () => {
    document.querySelectorAll(".reveal").forEach(el => {
      if (!el.classList.contains("visible")) observer.observe(el);
    });
  };

  observe();

  // Re-observe when products are rendered
  const productsGrid = document.getElementById("products-grid");
  if (productsGrid) {
    new MutationObserver(observe).observe(productsGrid, { childList: true });
  }
}

// ═══════════════════════════════════════════════
// PWA – Install prompt
// ═══════════════════════════════════════════════
function initPWA() {
  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    deferredPrompt = e;
    const banner = document.getElementById("pwa-banner");
    if (banner) {
      setTimeout(() => banner.classList.remove("hidden"), 3000);
    }
  });

  document.getElementById("pwa-install-btn")?.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("PWA install:", outcome);
    deferredPrompt = null;
    document.getElementById("pwa-banner").classList.add("hidden");
  });

  document.getElementById("pwa-dismiss-btn")?.addEventListener("click", () => {
    document.getElementById("pwa-banner").classList.add("hidden");
  });

  // Register service worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js").then(reg => {
        console.log("✅ Service Worker registered:", reg.scope);
      }).catch(err => {
        console.warn("Service Worker registration failed:", err);
      });
    });
  }
}

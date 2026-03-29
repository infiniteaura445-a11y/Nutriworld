// ============================================================
// config.js  —  AyurLife Naturals
// ============================================================
// YEH FILE EDIT KARO apna data set karne ke liye.
// Iske baad GitHub pe push karo — sabhi devices pe same data aayega.
// Admin Panel sirf preview ke liye hai, yahi file final hai.
// ============================================================

var SITE_CONFIG = {

  // ── BRAND ──────────────────────────────────────────────
  siteName:    "AyurLife Naturals",
  brandShort:  "AyurLife",        // Navbar mein dikhega
  tagline:     "NATURALS",        // Navbar subtitle

  // ── HERO TEXT ──────────────────────────────────────────
  heroTitle:   "Wellness",        // "Pure Ayurvedic [YAHA]"
  heroSub:     "Ancient wisdom. Modern science. Explore our hand-crafted collection of Ayurvedic formulas — harvested from nature, trusted for generations.",

  // ── CONTACT INFO ───────────────────────────────────────
  // WhatsApp: country code + number, no + or spaces
  // India example: 919876543210  (91 = India code)
  whatsapp:    "919999999999",    // ← APNA NUMBER YAHAN LAGAO

  email:       "hello@ayurlifenaturals.com",
  phoneDisplay:"+91 99999 99999", // Contact section mein dikhega
  hours:       "Mon–Sat: 9AM – 8PM IST",
  address:     "Mumbai, Maharashtra, India",

  // ── SOCIAL LINKS ───────────────────────────────────────
  // "#" rakho agar link nahi hai
  instagram:   "#",
  facebook:    "#",
  youtube:     "#",
  twitter:     "#",

  // ── COLORS ─────────────────────────────────────────────
  colorPrimary: "#2d6a4f",  // Main green
  colorAccent:  "#e76f00",  // Saffron/orange
  colorBg:      "#fdf6ec",  // Cream background

  // ── FOOTER TEXT ────────────────────────────────────────
  copyright: "© 2024 AyurLife Naturals. All rights reserved.",
  footerTag:  "Made with 🌿 for your wellness",

};

// ── PRODUCTS ─────────────────────────────────────────────
// Yahan apne products add/edit/remove karo
// badge options: "Bestseller" / "New" / "Premium" / "Top Rated" / null
var SITE_PRODUCTS = [
  {
    id:"p1", name:"Ashwagandha Gold Capsules",
    price:599, mrp:799, cat:"immunity",
    desc:"Premium KSM-66 Ashwagandha for stress relief, vitality and immune support.",
    full:"Certified organic KSM-66 Ashwagandha root extract — clinically proven to reduce cortisol, enhance energy, and strengthen immunity.",
    ingr:["KSM-66 Ashwagandha 600mg","Shilajit extract","Black pepper (BioPerine)","Organic ghee"],
    ben:["Reduces stress & anxiety by 44%","Boosts testosterone & vitality","Strengthens immune system","Improves sleep quality","Enhances mental clarity"],
    use:"Take 1–2 capsules daily with warm milk after meals.",
    rating:4.8, reviews:342, e:"🌿", badge:"Bestseller"
  },
  {
    id:"p2", name:"Tulsi Giloy Immunity Kadha",
    price:349, mrp:449, cat:"immunity",
    desc:"Traditional immunity-building kadha with 15 powerful Ayurvedic herbs.",
    full:"Slow-simmered for maximum potency using the traditional kadha method. A daily ritual for generations.",
    ingr:["Tulsi (Holy Basil)","Giloy stem","Mulethi","Ginger","Black pepper","Cinnamon"],
    ben:["Strengthens natural immunity","Anti-viral & anti-bacterial","Relieves cold & cough","Detoxifies blood"],
    use:"Mix 20ml in warm water and drink twice daily.",
    rating:4.7, reviews:218, e:"🍵", badge:"New"
  },
  {
    id:"p3", name:"Brahmi Mind Clarity Tablets",
    price:449, mrp:599, cat:"immunity",
    desc:"Ancient brain tonic for sharp memory, focus and mental calmness.",
    full:"Brahmi (Bacopa monnieri) — the ultimate brain herb revered for 3,000 years.",
    ingr:["Brahmi extract 400mg","Shankhpushpi","Jatamansi","Vacha"],
    ben:["Improves memory & learning","Reduces brain fog","Calms anxiety naturally","Enhances concentration"],
    use:"Take 1 tablet twice daily with lukewarm water.",
    rating:4.6, reviews:187, e:"🧠", badge:null
  },
  {
    id:"p4", name:"Rose Chandan Glow Face Pack",
    price:299, mrp:399, cat:"skin",
    desc:"Brightening Ayurvedic face pack with rose, sandalwood & turmeric.",
    full:"A luxurious blend of rose petals, pure sandalwood, Kashmiri saffron and turmeric.",
    ingr:["Rose petal powder","Chandan (Sandalwood)","Turmeric","Kashmiri saffron","Multani mitti","Neem"],
    ben:["Brightens skin tone","Reduces dark spots","Deep cleanses pores","Natural glow"],
    use:"Mix with rose water, apply 15 mins, wash. Use 2–3x weekly.",
    rating:4.9, reviews:412, e:"🌸", badge:"Top Rated"
  },
  {
    id:"p5", name:"Kumkumadi Night Serum",
    price:799, mrp:1099, cat:"skin",
    desc:"Luxurious saffron-infused overnight facial oil for radiant skin.",
    full:"Kumkumadi Tailam — one of Ayurveda's most prized formulations — infused with 26 herbs and precious saffron.",
    ingr:["Kashmiri saffron","Lotus extract","Sandalwood oil","Vetiver","Licorice root","Sesame oil base"],
    ben:["Fades dark spots overnight","Intense skin brightening","Anti-ageing care","Deep nourishment"],
    use:"Apply 4–5 drops on clean face at night. Massage in upward circles.",
    rating:4.8, reviews:293, e:"✨", badge:"Premium"
  },
  {
    id:"p6", name:"Bhringraj Hair Growth Oil",
    price:399, mrp:549, cat:"hair",
    desc:"Potent herbal oil to stop hair fall and promote thick growth.",
    full:"Bhringraj, the King of Herbs for hair, combined with Amla, Brahmi in traditional cold-press formula.",
    ingr:["Bhringraj extract","Amla (Indian Gooseberry)","Brahmi","Methi seeds","Hibiscus flowers","Coconut oil"],
    ben:["Stops hair fall drastically","Promotes new hair growth","Strengthens hair roots","Prevents premature greying"],
    use:"Apply to scalp, massage 10 mins, leave 1 hour, wash. 2–3x weekly.",
    rating:4.7, reviews:531, e:"💆", badge:"Bestseller"
  },
  {
    id:"p7", name:"Amla Shikakai Hair Wash",
    price:249, mrp:349, cat:"hair",
    desc:"Natural hair cleanser with Amla, Shikakai & Reetha — zero chemicals.",
    full:"Traditional Indian hair wash formula. Free from SLS, parabens, silicones.",
    ingr:["Amla powder","Shikakai","Reetha","Hibiscus","Neem","Bhringraj"],
    ben:["Cleanses without stripping oils","Reduces dandruff","Adds natural shine","100% chemical-free"],
    use:"Mix 2–3 tbsp with water, apply to wet hair, massage, rinse.",
    rating:4.5, reviews:167, e:"🌺", badge:null
  },
  {
    id:"p8", name:"Triphala Digestive Churna",
    price:199, mrp:279, cat:"digestive",
    desc:"Classic three-fruit formula for complete digestive health & gut reset.",
    full:"Triphala combines Amalaki, Bibhitaki, and Haritaki for a gentle daily detox.",
    ingr:["Amalaki (Amla)","Bibhitaki (Bahera)","Haritaki (Harad)"],
    ben:["Gentle daily cleanse & detox","Relieves constipation naturally","Improves gut microbiome","Anti-oxidant rich"],
    use:"Mix 1 tsp in warm water at bedtime.",
    rating:4.8, reviews:624, e:"🫙", badge:"Classic"
  },
  {
    id:"p9", name:"Moringa Green Tea",
    price:279, mrp:369, cat:"tea",
    desc:"Superfood moringa blended with green tea for energy & detox.",
    full:"Moringa, the Miracle Tree, blended with first-flush Darjeeling green tea.",
    ingr:["Organic Moringa leaf","Darjeeling green tea","Lemongrass","Spearmint"],
    ben:["Rich in vitamins A,C,E,K","Natural energy boost","Anti-inflammatory","Supports blood sugar"],
    use:"Steep 1 tsp in 200ml water (80°C) for 2–3 mins. 2 cups daily.",
    rating:4.6, reviews:283, e:"🍵", badge:"New"
  },
  {
    id:"p10", name:"Tulsi Ginger Masala Chai",
    price:249, mrp:329, cat:"tea",
    desc:"Aromatic herbal chai with immunity-boosting Tulsi, ginger & spices.",
    full:"The classic Indian masala chai reimagined with Ayurvedic wisdom.",
    ingr:["Holy Basil (Tulsi)","Ginger","Cardamom","Cinnamon","Black pepper","Clove","Assam tea"],
    ben:["Boosts immunity naturally","Anti-viral & anti-bacterial","Soothes sore throat","Improves digestion"],
    use:"Boil 1 tsp in 200ml milk for 3–5 minutes. Add honey and enjoy.",
    rating:4.9, reviews:445, e:"☕", badge:"Bestseller"
  },
  {
    id:"p11", name:"Mahanarayan Therapeutic Oil",
    price:499, mrp:699, cat:"oils",
    desc:"Classical Ayurvedic oil for joint pain, muscle recovery & back care.",
    full:"Mahanarayan Tail contains 34 herbs in sesame oil base for deep therapeutic relief.",
    ingr:["Ashwagandha","Shatavari","Dashamoola","Sesame oil base","34 classical herbs"],
    ben:["Relieves chronic joint pain","Reduces muscle inflammation","Excellent for sciatica & backache","Post-workout recovery"],
    use:"Apply warm oil, massage 10–15 mins, leave 30 mins, bathe with warm water.",
    rating:4.7, reviews:198, e:"🫗", badge:"Therapeutic"
  },
  {
    id:"p12", name:"Kesar Chandan Body Lotion",
    price:449, mrp:599, cat:"skin",
    desc:"Deep moisturizing lotion with saffron, sandalwood & aloe vera.",
    full:"Indulge your skin with the royal combination of Kashmiri saffron and pure sandalwood.",
    ingr:["Kashmiri saffron extract","Sandalwood powder","Aloe vera","Shea butter","Vitamin E","Rose water"],
    ben:["24-hour deep moisturization","Brightens body skin tone","Gentle & non-greasy","Fights dry skin"],
    use:"Apply on clean skin after bath. Massage until absorbed. Use daily.",
    rating:4.6, reviews:221, e:"🧴", badge:null
  },
];

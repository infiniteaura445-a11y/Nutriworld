// ═══════════════════════════════════════════════
// firebase.js  –  AyurLife Naturals
// Firebase Firestore + Analytics integration
// Project: ayur-b415e
// ═══════════════════════════════════════════════

import { initializeApp }  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics }   from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ─────────────────────────────────────────────
// ✅ YOUR FIREBASE CONFIG (Connected)
// ─────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyCLn0bOgV1K_lR9_8HsYeIxFI2LaaaSbYU",
  authDomain:        "ayur-b415e.firebaseapp.com",
  projectId:         "ayur-b415e",
  storageBucket:     "ayur-b415e.firebasestorage.app",
  messagingSenderId: "1035373238380",
  appId:             "1:1035373238380:web:6059ea9de902eee417a049",
  measurementId:     "G-X3TJQ5VZVE"
};

// Initialize Firebase
let db        = null;
let analytics = null;
let firebaseEnabled = false;

try {
  const app = initializeApp(firebaseConfig);
  db        = getFirestore(app);

  // Initialize Analytics (only in browser, not during SW)
  if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
    console.log("✅ Firebase Analytics initialized");
  }

  firebaseEnabled = true;
  console.log("✅ Firebase connected — Project: ayur-b415e");
} catch (err) {
  console.warn("Firebase init failed – using demo data:", err.message);
}

// ─────────────────────────────────────────────
// Firestore helpers
// ─────────────────────────────────────────────

/**
 * Fetch all products from Firestore
 * Falls back to demo data if Firebase not configured
 */
export async function fetchProducts(categoryFilter = null) {
  if (!firebaseEnabled || !db) {
    return getDemoProducts(categoryFilter);
  }

  try {
    let q;
    const productsRef = collection(db, "products");

    if (categoryFilter && categoryFilter !== "all") {
      q = query(productsRef, where("category", "==", categoryFilter), orderBy("name"));
    } else {
      q = query(productsRef, orderBy("name"));
    }

    const snapshot = await getDocs(q);
    const products = [];
    snapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() });
    });

    return products.length > 0 ? products : getDemoProducts(categoryFilter);
  } catch (err) {
    console.warn("Firestore fetch error – falling back to demo data:", err.message);
    return getDemoProducts(categoryFilter);
  }
}

// ─────────────────────────────────────────────
// DEMO PRODUCT DATA (used when Firebase is not configured)
// This is also the exact structure to use in Firestore
//
// Firestore document structure:
// Collection: "products"
// Document fields:
//   name        : string   — "Ashwagandha Gold Capsules"
//   price       : number   — 599
//   mrp         : number   — 799     (original price)
//   category    : string   — "immunity" (must match category keys below)
//   description : string   — Short description
//   fullDesc    : string   — Detailed description for modal
//   ingredients : array    — ["Ashwagandha", "Brahmi", ...]
//   benefits    : array    — ["Reduces stress", ...]
//   usage       : string   — "Take 1 capsule twice daily..."
//   rating      : number   — 4.8
//   reviews     : number   — 342
//   emoji       : string   — "🌿"
//   badge       : string   — "Bestseller" (optional)
// ─────────────────────────────────────────────
function getDemoProducts(categoryFilter = null) {
  const products = [
    {
      id: "p1",
      name: "Ashwagandha Gold Capsules",
      price: 599,
      mrp: 799,
      category: "immunity",
      description: "Premium KSM-66 Ashwagandha for stress relief, vitality and immune support.",
      fullDesc: "AyurLife Ashwagandha Gold contains certified organic KSM-66 Ashwagandha root extract — the world's most researched form of ashwagandha. Clinically proven to reduce cortisol levels, enhance energy, and strengthen immunity.",
      ingredients: ["KSM-66 Ashwagandha (600mg)", "Shilajit extract", "Black pepper (BioPerine)", "Organic ghee"],
      benefits: ["Reduces stress & anxiety by 44%", "Boosts testosterone & vitality", "Strengthens immune system", "Improves sleep quality", "Enhances mental clarity"],
      usage: "Take 1–2 capsules daily with warm milk or water after meals. Best taken at night for sleep benefits.",
      rating: 4.8,
      reviews: 342,
      emoji: "🌿",
      badge: "Bestseller"
    },
    {
      id: "p2",
      name: "Tulsi Giloy Immunity Kadha",
      price: 349,
      mrp: 449,
      category: "immunity",
      description: "Traditional immunity-building kadha with 15 powerful Ayurvedic herbs.",
      fullDesc: "Our Tulsi Giloy Kadha is prepared using the traditional kadha method — slow-simmered for maximum potency. A daily ritual for generations, now available in convenient ready-to-use form.",
      ingredients: ["Tulsi (Holy Basil)", "Giloy stem", "Mulethi", "Ginger", "Black pepper", "Cinnamon", "Cardamom"],
      benefits: ["Strengthens natural immunity", "Anti-viral & anti-bacterial", "Relieves cold & cough", "Detoxifies blood", "Improves respiratory health"],
      usage: "Mix 20ml in warm water and drink twice daily. Add honey for taste.",
      rating: 4.7,
      reviews: 218,
      emoji: "🍵",
      badge: "New"
    },
    {
      id: "p3",
      name: "Brahmi Mind Clarity Tablets",
      price: 449,
      mrp: 599,
      category: "immunity",
      description: "Ancient brain tonic for sharp memory, focus and mental calmness.",
      fullDesc: "Brahmi (Bacopa monnieri) has been revered for 3,000 years as the ultimate brain herb. Our standardized extract supports neurological function and cognitive performance.",
      ingredients: ["Brahmi extract (400mg)", "Shankhpushpi", "Jatamansi", "Vacha"],
      benefits: ["Improves memory & learning", "Reduces brain fog", "Calms anxiety naturally", "Supports ADHD symptoms", "Enhances concentration"],
      usage: "Take 1 tablet twice daily with lukewarm water.",
      rating: 4.6,
      reviews: 187,
      emoji: "🧠",
      badge: null
    },
    {
      id: "p4",
      name: "Rose Chandan Glow Face Pack",
      price: 299,
      mrp: 399,
      category: "skin",
      description: "Brightening Ayurvedic face pack with rose, sandalwood & turmeric.",
      fullDesc: "A luxurious blend of rose petals, pure sandalwood, Kashmiri saffron and turmeric. This traditional ubtan formula has been used by royalty for generations to achieve a natural, radiant glow.",
      ingredients: ["Rose petal powder", "Chandan (Sandalwood)", "Turmeric", "Kashmiri saffron", "Multani mitti", "Neem"],
      benefits: ["Brightens skin tone", "Reduces dark spots & blemishes", "Deep cleanses pores", "Anti-ageing properties", "Natural glow"],
      usage: "Mix with rose water to form a paste. Apply on face, leave for 15 mins, wash with cool water. Use 2–3 times weekly.",
      rating: 4.9,
      reviews: 412,
      emoji: "🌸",
      badge: "Top Rated"
    },
    {
      id: "p5",
      name: "Kumkumadi Night Serum",
      price: 799,
      mrp: 1099,
      category: "skin",
      description: "Luxurious saffron-infused overnight facial oil for radiant skin.",
      fullDesc: "Kumkumadi Tailam is one of Ayurveda's most prized formulations — a traditional skin brightening oil mentioned in Ashtanga Hridayam. Infused with 26 herbs and precious saffron.",
      ingredients: ["Kashmiri saffron", "Lotus extract", "Sandalwood oil", "Vetiver", "Licorice root", "Sesame oil base"],
      benefits: ["Fades dark spots overnight", "Intense skin brightening", "Anti-ageing & wrinkle care", "Deep nourishment", "Even skin tone"],
      usage: "Apply 4–5 drops on clean face at night. Gently massage in upward circular motions.",
      rating: 4.8,
      reviews: 293,
      emoji: "✨",
      badge: "Premium"
    },
    {
      id: "p6",
      name: "Bhringraj Hair Growth Oil",
      price: 399,
      mrp: 549,
      category: "hair",
      description: "Potent herbal hair oil to stop hair fall and promote thick growth.",
      fullDesc: "Bhringraj, the 'King of Herbs' for hair, combined with Amla, Brahmi and Coconut oil in our traditional cold-press formula. Clinically shown to reduce hair fall in 4 weeks.",
      ingredients: ["Bhringraj extract", "Amla (Indian Gooseberry)", "Brahmi", "Methi seeds", "Hibiscus flowers", "Cold-pressed coconut oil"],
      benefits: ["Stops hair fall drastically", "Promotes new hair growth", "Strengthens hair roots", "Prevents premature greying", "Deep scalp nourishment"],
      usage: "Warm slightly and apply to scalp. Massage for 10 minutes. Leave for minimum 1 hour. Wash with herbal shampoo. Use 2–3 times weekly.",
      rating: 4.7,
      reviews: 531,
      emoji: "💆",
      badge: "Bestseller"
    },
    {
      id: "p7",
      name: "Amla Shikakai Hair Wash",
      price: 249,
      mrp: 349,
      category: "hair",
      description: "Natural hair cleanser with Amla, Shikakai & Reetha — zero chemicals.",
      fullDesc: "A traditional Indian hair wash formula using nature's own cleansers. Free from SLS, parabens, and silicones. This powder cleanser leaves hair naturally soft, shiny and strong.",
      ingredients: ["Amla powder", "Shikakai", "Reetha", "Hibiscus", "Neem", "Bhringraj"],
      benefits: ["Cleanses without stripping oils", "Reduces dandruff", "Adds natural shine", "100% chemical-free", "pH balanced for scalp"],
      usage: "Mix 2–3 tbsp with water to form a paste. Apply to wet hair, massage, leave for 3 mins and rinse well.",
      rating: 4.5,
      reviews: 167,
      emoji: "🌺",
      badge: null
    },
    {
      id: "p8",
      name: "Triphala Digestive Churna",
      price: 199,
      mrp: 279,
      category: "digestive",
      description: "Classic three-fruit formula for complete digestive health & gut reset.",
      fullDesc: "Triphala — the most versatile Ayurvedic formula — combines three sacred fruits: Amalaki, Bibhitaki, and Haritaki. A gentle daily detox that supports digestion, absorption and elimination.",
      ingredients: ["Amalaki (Amla)", "Bibhitaki (Bahera)", "Haritaki (Harad)"],
      benefits: ["Gentle daily cleanse & detox", "Relieves constipation naturally", "Improves gut microbiome", "Anti-oxidant rich", "Supports weight management"],
      usage: "Mix 1 tsp in warm water. Drink at bedtime. Can also be taken in morning on empty stomach for maximum benefit.",
      rating: 4.8,
      reviews: 624,
      emoji: "🫙",
      badge: "Classic"
    },
    {
      id: "p9",
      name: "Moringa Green Tea",
      price: 279,
      mrp: 369,
      category: "tea",
      description: "Superfood moringa blended with green tea for energy & detox.",
      fullDesc: "Moringa, the 'Miracle Tree', is one of the most nutrient-dense plants on earth. Blended with first-flush green tea leaves from Darjeeling for a refreshing, health-packed daily brew.",
      ingredients: ["Organic Moringa leaf", "Darjeeling green tea", "Lemongrass", "Spearmint"],
      benefits: ["Rich in vitamins A, C, E, K", "Natural energy boost", "Anti-inflammatory", "Supports blood sugar levels", "Detoxifies & alkalizes body"],
      usage: "Steep 1 teabag or 1 tsp in 200ml hot water (80°C) for 2–3 minutes. Do not boil. Have 2 cups daily.",
      rating: 4.6,
      reviews: 283,
      emoji: "🍵",
      badge: "New"
    },
    {
      id: "p10",
      name: "Tulsi Ginger Masala Chai",
      price: 249,
      mrp: 329,
      category: "tea",
      description: "Aromatic herbal chai with immunity-boosting Tulsi, ginger & spices.",
      fullDesc: "The classic Indian masala chai, reimagined with Ayurvedic wisdom. Each cup delivers the power of Tulsi, fresh ginger, cardamom and warming spices — a comforting immunity ritual.",
      ingredients: ["Holy Basil (Tulsi)", "Ginger", "Cardamom", "Cinnamon", "Black pepper", "Clove", "Assam tea"],
      benefits: ["Boosts immunity naturally", "Anti-viral & anti-bacterial", "Soothes sore throat", "Improves digestion", "Warming & stress-relieving"],
      usage: "Boil 1 tsp in 200ml water or milk for 3–5 minutes. Strain, add honey and enjoy. Best taken morning & evening.",
      rating: 4.9,
      reviews: 445,
      emoji: "☕",
      badge: "Bestseller"
    },
    {
      id: "p11",
      name: "Mahanarayan Therapeutic Oil",
      price: 499,
      mrp: 699,
      category: "oils",
      description: "Classical Ayurvedic oil for joint pain, muscle recovery & back care.",
      fullDesc: "Mahanarayan Tail — one of Ayurveda's most powerful classical formulations — contains 34 herbs in a sesame oil base. Traditionally used for Vata disorders, it provides deep therapeutic relief.",
      ingredients: ["Ashwagandha", "Shatavari", "Dashamoola", "Sesame oil base", "34 classical herbs"],
      benefits: ["Relieves chronic joint pain", "Reduces muscle inflammation", "Excellent for sciatica & backache", "Post-workout muscle recovery", "Improves mobility & flexibility"],
      usage: "Warm the oil. Apply to affected area and massage in circular motions for 10–15 minutes. Leave for 30 minutes then bathe with warm water. Use daily for best results.",
      rating: 4.7,
      reviews: 198,
      emoji: "🫗",
      badge: "Therapeutic"
    },
    {
      id: "p12",
      name: "Kesar Chandan Body Lotion",
      price: 449,
      mrp: 599,
      category: "skin",
      description: "Deep moisturizing lotion with saffron, sandalwood & aloe vera.",
      fullDesc: "Indulge your skin with the royal combination of Kashmiri saffron and pure sandalwood. This rich body lotion absorbs quickly, leaving skin soft, fragrant and naturally brightened.",
      ingredients: ["Kashmiri saffron extract", "Sandalwood powder", "Aloe vera", "Shea butter", "Vitamin E", "Rose water"],
      benefits: ["24-hour deep moisturization", "Brightens body skin tone", "Gentle & non-greasy", "Fights dry skin & roughness", "Divine fragrance"],
      usage: "Apply generously on clean skin after bath. Massage until absorbed. Use daily for best results.",
      rating: 4.6,
      reviews: 221,
      emoji: "🧴",
      badge: null
    }
  ];

  if (categoryFilter && categoryFilter !== "all") {
    return products.filter(p => p.category === categoryFilter);
  }
  return products;
}

export { firebaseEnabled };

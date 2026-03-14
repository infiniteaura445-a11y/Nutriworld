# 🌿 AyurLife Naturals

> Pure Ayurvedic Wellness — A full-featured Ayurvedic product selling web application

![AyurLife Naturals](https://img.shields.io/badge/AyurLife-Naturals-2d6a4f?style=for-the-badge)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-orange?style=for-the-badge)
![Firebase](https://img.shields.io/badge/Firebase-Integrated-FFCA28?style=for-the-badge&logo=firebase)

---

## 📋 Features

- ✅ Modern responsive design (mobile-first)
- ✅ 6 product categories with live filtering
- ✅ Product detail modal with ingredients & benefits
- ✅ WhatsApp ordering integration
- ✅ Consult a Physician form (WhatsApp-powered)
- ✅ Firebase Firestore dynamic products
- ✅ PWA — installable as native app
- ✅ Offline support via Service Worker
- ✅ Product search with debounce
- ✅ Skeleton loading animations
- ✅ Scroll-reveal animations
- ✅ SEO & OpenGraph meta tags
- ✅ Lazy image loading

---

## 📁 Project Structure

```
/ayurlife
├── index.html          ← Main HTML (all sections)
├── styles.css          ← Custom CSS (Tailwind + custom)
├── app.js              ← Main JavaScript (all functionality)
├── firebase.js         ← Firebase config + product data
├── manifest.json       ← PWA manifest
├── service-worker.js   ← PWA offline support
├── offline.html        ← Offline fallback page
├── /icons              ← PWA icons (create these)
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-192.png    ← Most important
│   └── icon-512.png    ← Most important
└── README.md
```

---

## ⚡ Quick Start (No Firebase)

1. Download/clone the project
2. Open `index.html` in a browser (or use Live Server in VS Code)
3. The app runs with **built-in demo data** — no Firebase needed!

> ⚠️ Service Worker requires HTTPS or localhost. Use VS Code Live Server or `python3 -m http.server 8080`

---

## 🔥 Firebase Setup (to load products from database)

### Step 1: Create Firebase Project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add Project** → Name it `ayurlife-naturals`
3. Disable Google Analytics (optional)
4. Click **Create Project**

### Step 2: Enable Firestore

1. In your project sidebar → **Firestore Database**
2. Click **Create Database**
3. Choose **Production mode**
4. Select a region close to your users (e.g., `asia-south1` for India)
5. Click **Enable**

### Step 3: Set Firestore Rules (for public read)

In Firestore → Rules, paste:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Step 4: Get Your Config

1. Project Settings (⚙️) → General → Your Apps → **Add Web App**
2. Register app as `ayurlife-web`
3. Copy the `firebaseConfig` object

### Step 5: Update firebase.js

Open `firebase.js` and replace the config:
```javascript
const firebaseConfig = {
  apiKey:            "AIzaSy...",           // ← Your real values
  authDomain:        "ayurlife-naturals.firebaseapp.com",
  projectId:         "ayurlife-naturals",
  storageBucket:     "ayurlife-naturals.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abc123"
};
```

### Step 6: Add Products to Firestore

In Firestore → **products** collection, create documents with these fields:

| Field         | Type    | Example                              |
|---------------|---------|--------------------------------------|
| `name`        | string  | `Ashwagandha Gold Capsules`         |
| `price`       | number  | `599`                                |
| `mrp`         | number  | `799`                                |
| `category`    | string  | `immunity`                           |
| `description` | string  | `Short product description`          |
| `fullDesc`    | string  | `Detailed description for modal`     |
| `ingredients` | array   | `["Ashwagandha", "Black Pepper"]`    |
| `benefits`    | array   | `["Reduces stress", "Boosts energy"]`|
| `usage`       | string  | `Take 1 capsule daily with milk`     |
| `rating`      | number  | `4.8`                                |
| `reviews`     | number  | `342`                                |
| `emoji`       | string  | `🌿`                                 |
| `badge`       | string  | `Bestseller` (optional)              |
| `image`       | string  | `https://...` URL (optional)         |

**Category values:** `immunity` · `tea` · `skin` · `hair` · `digestive` · `oils`

---

## 📱 WhatsApp Configuration

In `app.js`, line 8, replace with your WhatsApp number:
```javascript
const WHATSAPP_NUMBER = "919999999999";  // Format: country code + number (no + or spaces)
// India example: 919876543210 (for +91 98765 43210)
```

---

## 🚀 Deployment

### Option A: GitHub Pages (Free)

```bash
# 1. Initialize git
cd ayurlife
git init
git add .
git commit -m "Initial commit – AyurLife Naturals"

# 2. Create GitHub repo at github.com/new
# 3. Push
git remote add origin https://github.com/YOUR_USERNAME/ayurlife-naturals.git
git branch -M main
git push -u origin main

# 4. GitHub Settings → Pages → Source: main branch → /root
# Site will be live at: https://YOUR_USERNAME.github.io/ayurlife-naturals
```

### Option B: Firebase Hosting (Recommended — same project)

```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Initialize hosting (from project folder)
firebase init hosting
# ↑ Select your ayurlife-naturals project
# Public directory: . (dot — current folder)
# Single-page app: No
# Auto-build: No

# 4. Deploy
firebase deploy

# Site live at: https://ayurlife-naturals.web.app
```

### Option C: Netlify (Easiest)

1. Go to [netlify.com](https://netlify.com)
2. Drag & drop the `/ayurlife` folder onto their dashboard
3. Done — live in 30 seconds!

---

## 🎨 PWA Icons

You need to create icons in `/icons/` folder. Easiest way:

1. Go to [https://realfavicongenerator.net](https://realfavicongenerator.net)
2. Upload a square image of your logo (use the 🌿 leaf as base)
3. Download the generated icons
4. Rename and place them in `/icons/`

Or use any green leaf/herb image and resize to required sizes.

---

## 🔧 Customization

### Change Brand Name
Search & replace `AyurLife Naturals` in `index.html` and `manifest.json`

### Change Colors
In `styles.css` → `:root` variables:
```css
--forest:    #2d6a4f;   /* Primary green */
--earth:     #8b5e3c;   /* Brown accent */
--saffron:   #e76f00;   /* Orange accent */
--cream:     #fdf6ec;   /* Background */
```

### Add More Products
Edit the `getDemoProducts()` array in `firebase.js` (or add to Firestore)

### Change Phone Number
`app.js` line 8: `const WHATSAPP_NUMBER = "91XXXXXXXXXX";`

---

## 📊 Performance Tips

- Use WebP images instead of PNG/JPG for product images
- Host images on Firebase Storage or Cloudinary
- Enable Firebase caching rules for better CDN performance
- Consider adding Razorpay/Cashfree for direct payment (future enhancement)

---

## 📄 License

MIT License — Free to use for personal and commercial projects.

---

**Made with 🌿 for Ayurvedic wellness entrepreneurs**

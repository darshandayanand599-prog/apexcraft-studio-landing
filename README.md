# oneloom — Landing Page

A high-conversion landing page for **oneloom**, a custom web design & strategy service based in Bangalore, serving coaches, consultants, experts, and service businesses across India.

## 🚀 Live Features

- **Responsive Design** — Fully optimised for mobile, tablet, and desktop
- **Interactive Process Section** — 5-step orbital stage navigator
- **Portfolio Showcase** — 1-row horizontal scrollable carousel with audience filters
- **3-Tier Pricing** — Starter ₹9,900 / Professional ₹19,900 / Premium ₹29,900
- **FAQ Discount Pop-up** — Auto-applies promo code `POP5` (5% off) with lead tracking
- **WhatsApp Floating Chat** — Direct link to +91 9108080872
- **Lead Form** — FormSubmit integration sending all leads to `darshandayanand599@gmail.com`
- **Smart Modal** — Shows package selector only when coming from Pricing section
- **Discount Code Tracking** — Email subject/body changes for pop-up leads vs. direct leads

## 📁 File Structure

```
├── index.html       # Main landing page markup
├── styles.css       # All styles (CSS custom properties, components, responsive)
├── script.js        # Interactions, carousel, orbital process, modals, form handler
└── images/          # All project images and hero background video
    ├── hero_showcase.jpg
    ├── responsive_showcase.jpg
    ├── namier_capital.jpg
    ├── aquila_films.jpg
    ├── blakeney_finance.jpg
    ├── health_axon.jpg
    ├── kingbridge_luxury.jpg
    ├── kreos_mountain.jpg
    ├── pythia_sports.jpg
    ├── swski_brand.jpg
    └── hero_bg_video.mp4
```

## 🛠️ Running Locally

No build tools needed — just open `index.html` in your browser, or serve via any static server:

```bash
# Using Node.js http-server
npx http-server . -p 3000

# Or using Python
python -m http.server 3000
```

Then visit `http://localhost:3000`

## 📧 Lead Routing

All form submissions are sent via [FormSubmit](https://formsubmit.co) to the configured email. The email subject and metadata fields change automatically based on whether the lead came through:
- Direct CTA → Subject: `🚀 New Website Consultation Request - oneloom`
- FAQ Discount Pop-up → Subject: `🚀 New Website Lead [POP5 5% Discount Claimed] - oneloom`

## 🎨 Design System

- **Fonts**: DM Serif Display (headings) + Inter (body) via Google Fonts
- **Accent**: Coral Red `#ff3823`
- **Dark BG**: `#0a0a0c`
- **Light BG**: `#f8f8f6`

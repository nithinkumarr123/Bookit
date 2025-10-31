# 🌍 Bookit – Adventure Experience Booking Platform

A modern, responsive web application for booking adventure experiences and outdoor activities. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Dynamic Experiences** — List of curated adventure activities with live availability
- **Real-time Firestore Sync** — Slot capacities and experience details update instantly
- **Search & Filtering** — Easily find experiences by name or location
- **Responsive Design** — Fully functional on mobile, tablet, and desktop
- **Promotional Codes** — Apply flat or percentage discounts
- **Deployed on Vercel** — Seamless CI/CD from GitHub

## 📦 Folder Structure

```bash
bookit-frontend/
│
├── public/                # Static assets (images, icons)
├── src/
│   ├── assets/            # Image assets
│   ├── components/        # Reusable UI components
│   ├── lib/               # Firebase config
│   ├── pages/             # Main app pages (Home, Details)
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🧑‍💻 Setup & Local Development

### 1️⃣ Clone the repository
```bash
git clone https://github.com/nithinkumarr123/Bookit.git
cd bookit
```

###2️⃣ Install dependencies
```bash
npm install
```
###3️⃣ Run the development server
```bash
npm run dev
```
###4️⃣ Build for production
```bash
npm run build
```

###🪙 Promo Codes for Testing
The following promo codes can be applied during booking to verify discount logic:
- 
SAVE10
FLAT100

###🌐 Deployment
This project is hosted on Vercel with automatic deployments from the main branch.

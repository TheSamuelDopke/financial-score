# 📊 Credit Risk Scoring App

A modern web front-end application that generates **credit risk scores** for companies and individuals based on their financial behavior, such as late payments, defaults, and transaction history.

The system classifies risk levels into:

- **Unknown**
- **Low**
- **Medium**
- **High**
- **Very High**

Built with performance and validation.

---

## 🚀 Tech Stack

- **TypeScript**
- **Next.js (App Router)**
- **Chakra UI**
- **Dexie.js** (IndexedDB)
- **Zod** – Schema validation
- **React Hook Form** – Form handling & validation

---

## ✨ Features

- Risk scoring engine based on:
  - Payment delays
  - Default history
  - Frequency of late payments
- Automatic classification
- Local persistence using IndexedDB (Dexie)
- Strong validation (Zod + RHF)
- Responsive UI with Chakra UI
- Fully typed with TypeScript

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

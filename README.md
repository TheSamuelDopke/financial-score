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
- Automatic classification:
  - Low / Medium / High / Very High risk
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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

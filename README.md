<p align="center">
  <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
</p>

<h1 align="center">🌿 LeafLens Web Client</h1>

<p align="center">
  <strong>Modern Web Interface for AI-Powered Plant Disease Detection</strong>
</p>

<p align="center">
  <a href="https://leaf-lens-client.vercel.app">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-green?style=for-the-badge" alt="Live Demo"/>
  </a>
</p>

---

## 🌐 Overview

LeafLens Web Client is a modern, responsive web application that provides an intuitive interface for plant disease diagnosis. Built with the latest Next.js 15 and React 19, it offers a premium user experience with glassmorphism design and smooth animations.

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🔬 **AI Scanner** | Upload or drag-drop images for instant diagnosis |
| 📰 **Plant News** | Curated agricultural news feed |
| 📜 **Scan History** | View past diagnoses with grid/list views |
| 🎨 **Theme System** | Light/Dark mode with accent color customization |
| 📱 **Responsive** | Optimized for desktop, tablet, and mobile |
| ⚡ **Fast** | Built on Next.js 15 with Turbopack |

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Components** | [ShadCN UI](https://ui.shadcn.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Forms** | React Hook Form + Zod |
| **State** | React Context + localStorage |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/rafiferdos/LeafLens.git
cd LeafLens/leaf-lens-client

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# News API Key (NewsData.io)
NEWSDATA_API_KEY=your_api_key_here
```

### Centralized Config

All configuration is managed in `lib/config.ts`:

```typescript
export const config = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
    newsApiKey: process.env.NEWSDATA_API_KEY || "",
    newsApiUrl: "https://newsdata.io/api/1/latest",
    appName: "LeafLens",
};
```

---

## 📁 Project Structure

```
leaf-lens-client/
├── app/
│   ├── page.tsx           # Home - Plant Scanner
│   ├── history/           # Scan History page
│   ├── news/              # Plant News page
│   ├── about/             # About page
│   ├── api/               # API routes
│   │   └── news/          # News API proxy
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # ShadCN UI components
│   ├── leaf-scan/         # Scanner components
│   ├── news/              # News components
│   └── history/           # History components
├── lib/
│   ├── config.ts          # App configuration
│   ├── history.ts         # Local storage history
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

---

## 🎨 Design System

### Theme Colors

The app supports dynamic accent colors:
- **Green** (Default) - Nature-inspired
- **Blue** - Trust & reliability
- **Purple** - Premium feel
- **Orange** - Energy & warmth

### UI Patterns

- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Micro-animations**: Smooth transitions and hover states
- **Responsive Grid**: Adaptive layouts for all screen sizes

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables on Vercel

Add these in your Vercel project settings:
- `NEXT_PUBLIC_API_URL` - Your backend URL
- `NEWSDATA_API_KEY` - Your NewsData.io API key

---

## 📊 Performance

- **Lighthouse Score**: 95+ on all metrics
- **First Contentful Paint**: < 1s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - see the [LICENSE](../LICENSE) file for details.

---

## 👨‍💻 Author

**Rafi Ferdos**  
Daffodil International University

---

<p align="center">
  <a href="https://leaf-lens-client.vercel.app">🌐 Live Demo</a> •
  <a href="https://github.com/rafiferdos/LeafLens">📦 Repository</a>
</p>

# 🚀 Personal Site

Welcome to my personal website, built with **React**, **TypeScript**, **Vite**, and styled with **Tailwind CSS**. The background features a fully custom **HTML Canvas animated starfield**, complete with shooting stars.

## 🔧 Tech Stack

- ⚛️ React 19 (with Fast Refresh via Vite)
- 💻 TypeScript
- ⚡ Vite for developing
- 🎨 Tailwind CSS for styling
- 🧠 Custom HTML Canvas animations
- 🧪 ESLint rules

## 🪐 Planets Page

- Built using Three.js and @react-three/fiber
- Real-time orbiting planets with realistic textures
- Clickable planets reveal detailed facts (hardcoded for now)
- Dynamic lighting to simulate solar illumination
- Smooth camera transitions (planned)

## 📁 Project Structure

```
src/
├── pages/
│   └── Planets.tsx         # 3D solar system page
├── components/
│   └── PlanetScene.tsx     # Three.js scene with orbiting planets
├── components/
│   └── Starfield.tsx       # Custom canvas starfield animation
├── App.tsx                 # Main component with layout
├── main.tsx                # App entry point
└── index.css               # Tailwind and global styles
```

## 🧰 Setup & Development

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The site should be live at local host

## ✨ Features

- Animated canvas-based starfield background
- Fully responsive layout
- Shooting stars with trails
- Custom fonts and dark sky gradient
- Interactive 3D solar system with orbiting planets
- Planet info cards with real-world data (density, temperature, etc.)

---
_Designed and built by [James Bateman](https://github.com/James-Bateman)_ ✨
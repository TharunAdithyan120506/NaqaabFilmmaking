# 🎭 Naqaab Filmmaking Club — MIT Manipal

> *The Official Website of Naqaab — The Filmmaking Club of Manipal Institute of Technology, EST. 2023*

A cinematic, Hollywood-grade React website with a strict black-and-white brand identity, advanced motion design, and immersive scroll experiences.

---

## ✨ Features

### 🎬 Cinematic Experience
- **LIGHTS. CAMERA. ACTION.** intro slate sequence with white flash
- Dynamic Island **dock-style navbar** — collapses to a pill on scroll, expands on hover
- Smooth **Lenis scroll** integration for buttery page navigation
- **Framer Motion** scroll-triggered fade-up animations on every section

### 🖼️ Sections
| Section | Description |
|---------|-------------|
| **Hero** | Parallax title with SplitText character animation, film ticker marquee |
| **Productions** | CardSwap stack of film cards with grayscale-to-color reveal |
| **Stats** | Animated counters for Films, Members, Departments, Views |
| **About** | Spotlight mouse-glow effect with BlurText word-reveal animation |
| **Events** | Past events timeline with scroll-reveal cards |
| **The Critics' Table** | Horizontal ticker of movie review cards with real poster images |
| **Team** | ProfileCard grid with 3D tilt effect for Board, Creative & Management |
| **Member Portal** | Login/signup for members with localStorage persistence |
| **Social Footer** | Instagram, YouTube, and contact links |

### 🎨 Design System
- **Palette**: `#080808` (deep black), `#e8e4d9` (warm ivory), `#c8b89a` (muted gold)
- **Typography**: Display (Mondwest), Body (Switzer), Meta (PPNeueMontreal), Script (Boska), Wordmark (Vanguard)
- **Animations**: Scroll-reveal, parallax, card-swap, tilt-on-hover, animated counters

### ⚡ Custom React Bits Components
- `SplitText` — staggered character-by-character animation
- `ScrollVelocity` — velocity-sensitive horizontal marquee
- `CardSwap` — interactive stacked card carousel
- `ProfileCard` — 3D tilt card with grayscale-to-color image
- `Spotlight` — cursor-tracking radial glow effect
- `BlurText` — word-by-word blur-to-focus reveal
- `AnimatedCounter` — spring-physics number counter

---

## 🚀 How to Run

### Prerequisites
- **Node.js** ≥ 16
- **npm** ≥ 8

### Frontend (React)

```bash
# 1. Clone the repo
git clone https://github.com/TharunAdithyan120506/NaqaabFilmmaking.git
cd NaqaabFilmmaking

# 2. Install frontend dependencies
cd frontend
npm install

# 3. Start the development server
npm start
```

The site will launch at **http://localhost:3000**

### Backend (Optional — FastAPI)

The backend is optional and only needed for database features (member management).

```bash
# 1. Navigate to backend
cd backend

# 2. Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# 5. Run the server
uvicorn main:app --reload --port 8000
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017` |
| `JWT_SECRET` | JWT signing secret | (required) |
| `PORT` | Backend port | `8000` |

---

## 📁 Project Structure

```
NaqaabFilmmaking/
├── frontend/
│   ├── public/
│   │   └── assets/images/      # Logo, header images
│   ├── src/
│   │   ├── components/
│   │   │   ├── react-bits/     # Custom animation components
│   │   │   ├── Navbar.jsx      # Dynamic Island dock navbar
│   │   │   ├── CinematicIntro.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── FilmsRail.jsx   # PRODUCTIONS section
│   │   │   ├── StatsSection.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   ├── NaqaabPicks.jsx # Critics' Table
│   │   │   ├── TeamSection.jsx
│   │   │   └── ...
│   │   ├── data.js             # Films, team, events data
│   │   ├── App.js              # Root with Lenis + Framer Motion
│   │   └── index.css           # Global design system
│   └── package.json
├── backend/
│   ├── main.py                 # FastAPI entry
│   ├── requirements.txt
│   └── ...
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (CRA + CRACO) |
| Styling | Tailwind CSS + Vanilla CSS |
| Animation | Framer Motion |
| Smooth Scroll | Lenis (`@studio-freight/lenis`) |
| Icons | Lucide React |
| Backend | FastAPI + Motor (MongoDB) |
| Auth | JWT + bcrypt |

---

## 📝 Demo Login

Use these credentials to test the member portal:

| Field | Value |
|-------|-------|
| Email | `demo@naqaab.in` |
| Password | `naqaab2024` |

---

## 📜 License

This project is maintained by the **Naqaab Filmmaking Club** at Manipal Institute of Technology.

---

<p align="center">
  <strong>🎭 naqaab</strong><br/>
  <em>"Every face tells a story. Every mask hides one."</em>
</p>

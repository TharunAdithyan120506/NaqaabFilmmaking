# naqaab FILMMAKING

> Official portal for the Naqaab Filmmaking Club — Manipal Institute of Technology.

A full-stack web application featuring a cinematic black-and-white UI with parallax scrolling, film-grain overlays, and a member portal.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Tailwind CSS, Framer Motion, Swiper |
| Backend | FastAPI (Python 3), MongoDB (Motor async driver) |
| Auth | JWT / bcrypt |
| Build | CRACO (Create React App + custom Webpack) |

---

## Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **Python** ≥ 3.10
- **MongoDB** instance (local or MongoDB Atlas)

---

## Project Structure

```
NaqaabFilmmaking/
├── frontend/          # React app
│   ├── public/
│   └── src/
│       ├── components/
│       ├── data/
│       └── index.css
└── backend/           # FastAPI app
    ├── server.py
    └── requirements.txt
```

---

## 1. Backend Setup

### 1a. Create a virtual environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
```

### 1b. Install dependencies

```bash
pip install -r requirements.txt
```

### 1c. Configure environment variables

Create a `.env` file inside the `backend/` directory:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=naqaab
```

> **MongoDB Atlas:** Replace `MONGO_URL` with your Atlas connection string, e.g.
> `mongodb+srv://<user>:<password>@cluster0.mongodb.net/`

### 1d. Run the backend server

```bash
uvicorn server:app --reload --port 8001
```

The API will be available at `http://localhost:8001`.

---

## 2. Frontend Setup

### 2a. Install dependencies

```bash
cd frontend
npm install --legacy-peer-deps
```

> `--legacy-peer-deps` is required due to peer dependency conflicts between `react-day-picker` and `date-fns`.

### 2b. Configure environment variables (optional)

If you need to point the frontend at a custom backend URL, create `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:8001
```

### 2c. Start the development server

```bash
npm start
```

The site will open at **`http://localhost:3000`**.

---

## 3. Running Both Together

Open two terminal tabs:

```bash
# Terminal 1 — Backend
cd backend && source venv/bin/activate && uvicorn server:app --reload --port 8001

# Terminal 2 — Frontend
cd frontend && npm start
```

---

## 4. Production Build

```bash
cd frontend
npm run build
```

Outputs optimized static files to `frontend/build/`.

---

## Member Portal (Demo Credentials)

| Role | ID | Password |
|------|----|----------|
| Member | `member` | `naqaab2025` |
| Board | `board` | `naqaab#board` |

---

## Key Features

- 🎬 Cinematic intro sequence with film-counter and typewriter effect
- ⬛ Hollywood-grade black-and-white brand theme with parallax scrolling
- 🎞️ Films rail with Swiper horizontal scroll
- 🎭 Team cards with 3D tilt perspective effect
- 🔐 Member portal with RSVP, workshop registration, and board admin panel
- 📡 Moving ticker (Naqaab Picks) and scroll-reveal animations

---

## Links

- Instagram: [@naqaabfilms](https://www.instagram.com/naqaabfilms/)
- Picks: [@naqaabpicks](https://www.instagram.com/naqaabpicks/)
- Email: naqaabfilms.mit@manipal.edu

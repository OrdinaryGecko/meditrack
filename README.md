# MediTrack

A modern, browser-based patient management system built with Vite, React, Tailwind CSS, and PGlite (PostgreSQL in the browser).

Supports admins, patients, doctors, appointments, authentication, and real-time multi-tab sync.

---

## 🔗 Live Preview

[meditrack.geckodev.xyz](https://meditrack.geckodev.xyz)

---

## 🚀 Features
- Admin, patient, doctor, and appointment management (CRUD)
- Persistent storage in the browser (PGlite)
- Real-time UI updates and multi-tab sync
- Authentication with session persistence
- Responsive, modern UI with Tailwind CSS
- Dockerized for easy deployment
- CI/CD ready (Woodpecker pipeline example included)

## 🛠️ Setup (Development)

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd meditrack
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## 🐳 Docker (Production)

1. **Build the Docker image**
   ```bash
   docker build -t meditrack .
   ```
2. **Run the Docker container**
   ```bash
   docker run -d -p 8080:80 meditrack
   ```
   The app will be available at [http://localhost:8080](http://localhost:8080)

## ⚙️ Configuration

- **Environment variables:**
  - No special environment variables are required for local development.
  - For CI/CD or deployment, see `.woodpecker.yml` and `Dockerfile`.
- **Database:**
  - Uses PGlite (PostgreSQL in the browser) for persistent storage. No external DB setup required.

## 🧑‍💻 Usage

- Open the app in your browser.
- Register a new admin or log in with an existing admin account.
- Manage patients, doctors, and appointments from the dashboard.
- All changes are persisted in the browser and synced across tabs.

## 📝 Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Lint the codebase

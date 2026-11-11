# AI Civic Companion — Governance & Issue Reporting Platform
**SRS v1.2 Implementation (Team 8, Central University of Karnataka)**

AI Civic Companion is a voice-first, AI-powered civic issue reporting and governance application designed to bridge citizen complaints with automatic municipal department routing, SLA escalation, public transparency, emergency safety, blood donor matching, and resource analytics.

---

## Architecture & Project Structure

```
ai-civic-companion/
├── backend/                  # Node.js + Express + TypeScript API Server (Port 5000)
│   ├── src/
│   │   ├── config/           # Extended 15+ Category Taxonomy, Department SLAs & Mappings
│   │   ├── controllers/      # Auth, Complaints, Routing, Admin, Safety, Blood, Camps
│   │   ├── services/         # STT Transcription, LLM Generator, CV Classifier, Routing Engine
│   │   ├── models/           # Data store (Users, Complaints, Departments, Blood, Camps)
│   │   └── server.ts         # Express API entry point
│   ├── dist/                 # Compiled JavaScript
│   └── package.json
└── frontend/                 # Multi-Portal React + Vite SPA (Port 3000)
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx            # Portal Switcher, Language (EN/KN/HI/TE), Accessibility (A+/High Contrast), SOS Button
    │   │   ├── CitizenView.jsx       # Voice recorder, Photo AI detector, Interactive Map, Offline Draft Queue, Leaderboard
    │   │   ├── AdminView.jsx         # Municipal Queue, SLA Escalation trigger, Routing Editor, Ward Planning, CSV Export
    │   │   └── TransparencyView.jsx  # Open Data Portal, Department Stats, Anonymized Heatmap summary
    │   ├── services/
    │   │   └── api.js                # Frontend API client wrapper
    │   ├── App.jsx
    │   └── index.css                 # Glassmorphic design system & high contrast modes
    └── package.json
```

---

## Quick Start Guide

### 1. Start the Backend API Server
```bash
cd backend
npm run dev
# Server running at: http://localhost:5000/api/health
```

### 2. Start the Frontend Multi-Portal Web App
```bash
cd frontend
npm run dev
# Web App running at: http://localhost:3000
```

---

## SRS v1.2 Feature Matrix Implemented

| Feature / Requirement | SRS Ref | Implementation Detail |
|---|---|---|
| Multilingual Voice Reporting | FR-3.2 | Web Speech API + Speech-to-Text adapter (Kannada, Hindi, Telugu, English) |
| AI Smart Complaint Generator | FR-3.3 | Refines vague spoken/typed text into audit-ready structured descriptions |
| Photo Evidence AI Classifier | FR-3.4 | Automated CV image model suggestion chip (92% confidence score) |
| Duplicate Issue Detection | FR-3.6 | 100m geohash proximity + 48h window duplicate detection |
| Automatic Department Routing | FR-3.28 | Taxonomy-to-Department mapping engine + SLA countdown timers |
| Automated SLA Escalation Job | FR-3.28-04 | Background worker escalating overdue complaints to Dept Head |
| Anonymous Emergency Safety Mode | FR-3.12 | SOS voice trigger, live GPS payload dispatch, trusted contact alert |
| Urgent Blood Donor Board | FR-3.26 | Donor group opt-in, urgent requirement posting & matching broadcast |
| Community Medical Camp Locator | FR-3.25 | Verified NGO camp listings & reminder notifications |
| Municipal Planning & OGD Export | FR-3.29 | Ward-level hotspot summaries + Open Government Data (OGD) CSV exporter |
| Public Transparency Portal | FR-3.14 | No-login open dashboard with department resolution stats & heatmap |
| Accessibility Compliance | FR-3.16 | WCAG 2.1 AA compliant High Contrast mode, Font size adjustment, TTS audio readback |

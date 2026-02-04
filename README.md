
# Louder – Sydney Events Aggregation Platform

## Project Overview
**Louder** is a full‑stack MERN application that automatically scrapes public event websites to collect **Sydney (Australia) event data**, stores it in MongoDB, and displays it through a clean, user‑friendly web interface.

The project demonstrates a complete real‑world pipeline:
**Scrape → Store → Update → Display → Review → Import → Track Leads**,  
along with **Google OAuth authentication** and a **protected admin dashboard**.

This project was built using **only open‑source tools**, as required in the assignment.

---

## Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Context API (Authentication state)
- Bootstrap + custom CSS

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Passport.js (Google OAuth)
- Express Session
- Puppeteer (Web scraping)
- Cron job for automated scraping

---

## Features Implemented

### A) Event Scraping & Auto Updates
- Automatically scrapes Sydney events from public event websites using Puppeteer
- Stores events with:
  - Title
  - Date & time
  - Venue & address
  - City
  - Description
  - Image URL
  - Source website
  - Original event URL
  - Status & timestamps
- Automatically detects:
  - **New events**
  - **Updated events**
  - **Inactive / expired events**
- Periodic scraping handled via a background cron job

### B) Event Listing Website
- Minimal, clean UI with responsive layout
- Event cards display:
  - Event name
  - Date & time
  - Venue
  - Short description
  - Source website
  - **GET TICKETS** CTA
- GET TICKETS flow:
  1. Opens email capture modal
  2. Requires user consent checkbox
  3. Saves email + consent + event reference in DB
  4. Redirects user to original event website

### C) Google OAuth & Admin Dashboard
- Google OAuth login using Passport.js
- Session‑based authentication
- Protected admin dashboard route
- Dashboard features:
  - City filter (default: Sydney)
  - Keyword search (title / venue / description)
  - Date range filter
  - Table view of events
- Admin actions:
  - Import event into platform
  - Store importedAt, importedBy, and notes
- Event status tags:
  - new
  - updated
  - inactive
  - imported

---

## Authentication Flow
1. Admin clicks **Login with Google**
2. Google OAuth authentication
3. Express session created
4. Frontend fetches `/api/auth/me`
5. Protected routes unlocked after successful login

---

## Backend Folder Structure

```
backend/src/
 ├─ app.js
 ├─ server.js
 ├─ config/
 │   ├─ db.js
 │   └─ passport.js
 ├─ controllers/
 │   ├─ auth.controller.js
 │   ├─ event.controller.js
 │   └─ lead.controller.js
 ├─ middleware/
 │   └─ auth.middleware.js
 ├─ models/
 │   ├─ Event.js
 │   ├─ Lead.js
 │   └─ User.js
 ├─ routes/
 │   ├─ auth.routes.js
 │   ├─ event.routes.js
 │   └─ lead.routes.js
 └─ jobs/
     └─ scrape.job.js
```

---

## How to Run the Project

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

---

## Assignment Requirements Coverage

- ✔ Automated event scraping
- ✔ Database storage & update detection
- ✔ Minimal event listing UI
- ✔ Email + consent capture
- ✔ Google OAuth authentication
- ✔ Protected admin dashboard
- ✔ Import workflow with status tracking

---

## Notes
This project focuses on **functionality, scalability, and clean architecture** rather than heavy UI design.  
It demonstrates practical MERN stack development with real‑world concerns such as scraping reliability, authentication, and data consistency.

---

## Author
**Tushar**

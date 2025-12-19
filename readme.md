# 🏥 Healthcare Wellness & Appointment Management System

A full-stack healthcare web application that enables **patients** to manage wellness goals and appointments, and **doctors** to monitor patient compliance, manage appointments, and set personalized health goals — with strong emphasis on **security, privacy, and scalability**.

---

## 🚀 Project Overview

This project is an MVP healthcare platform designed with a **patient–doctor workflow** in mind.  
It supports authentication, appointment booking, wellness goal tracking, and role-based dashboards while following **basic HIPAA-aligned security practices**.

---

## 🧩 Key Features

### 🔐 Authentication & Authorization
- Secure **JWT-based authentication**
- Separate roles: **Patient** and **Doctor**
- Password hashing using **bcrypt**
- Role-based access control (RBAC)
- Consent checkbox for data usage during registration

### 👤 Patient Features
- Register & login securely
- Patient dashboard:
  - Health performance overview
  - Booked appointments
  - Appointment history
- Book doctor appointments based on availability
- Track wellness goals (steps, sleep, water intake)
- Manage personal profile (allergies, medications)
- Submit feedback after appointments

### 🩺 Doctor Features
- Secure doctor login
- View assigned patients
- Monitor patient compliance (Goal Met / Missed)
- Set wellness goals for patients
- Manage profile and availability

### 📄 Public Health Information
- Static public page with general health information and privacy policy

---

## 🏗️ Architecture

```
Frontend (React + Vite + Tailwind)
        |
REST API (Node.js + Express + JWT)
        |
Database (MongoDB)
```

---

## 🛠️ Tech Stack

### Frontend
- React.js + Vite
- Tailwind CSS
- HTML5

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication & Security
- JWT
- bcrypt
- Environment variables

### DevOps
- Docker (optional)
- GitHub Actions (CI/CD)

---

## 🗂️ Database Design (ER Summary)

### Patient
- name
- email (Primary Key)
- password
- age
- allergies []
- sleepTime
- exerciseTime

### Doctor
- name
- email (Primary Key)
- password
- specialization
- experience
- rating
- availability

### Appointment
- appointmentId
- patientId (Ref)
- doctorId (Ref)
- date
- time
- summary
- feedback

---

## 📁 Project Structure

```
healthcare-app/
├── client/      # React + Vite frontend
├── server/      # Node + Express backend
├── .env
├── README.md
└── package.json
```

---

## 🔌 API Overview

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Patient
- GET /api/patient/profile
- PUT /api/patient/profile
- POST /api/patient/appointment

### Doctor
- GET /api/doctor/patients
- POST /api/doctor/set-goal

---

## 🔒 Security & Privacy
- Password encryption
- JWT expiration
- Secure role-based APIs
- Logging for sensitive operations

---

## ⚙️ Installation & Setup

### Clone Repository
```bash
git clone https://github.com/arunmishra136/hcltech_phoenix.git
cd hcltech_phoenix
```

### Backend Setup
```bash
cd backend
npm install
node server.js
```

Create `.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📌 Future Enhancements
- Notifications & reminders
- Admin dashboard
- Payment integration

---

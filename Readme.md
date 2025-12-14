# 🍬 Sweet Shop Management System

A **full-stack Sweet Shop Management System** built with a clean architecture, role-based access control, and a modern UI. The application supports **Customer** and **Admin** roles, secure authentication, inventory management, and real-time data visibility across users.

This project was developed as an **internship-level production demo**, following best practices in backend security, frontend UX, and test-driven development.

---

## 🚀 Live Overview

* **Customers** can browse, search, filter, and purchase sweets.
* **Admins** can manage inventory (add, update, restock, delete).
* All admin changes are **instantly visible to customers**.

---

## ✨ Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* Role-based access control (RBAC)
* Secure password hashing using bcrypt
* Role validated on backend (no frontend trust)

### 👤 Customer Features

* View all available sweets
* Search sweets by name
* Filter sweets by category
* Purchase sweets (quantity updates in real time)
* Out-of-stock handling

### 🛠️ Admin Features

* Add new sweets
* Update sweet price
* Restock inventory
* Delete sweets
* All changes reflected instantly for customers

### 🧪 Demo & Usability

* Seeded demo data (~100 sweets) for immediate UI exploration
* Clean empty-state handling when no results match filters

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* Axios
* Plain CSS (custom styling)

### Backend

* Node.js
* Express.js
* MongoDB (Atlas)
* Mongoose
* JWT (jsonwebtoken)
* bcrypt

### Testing

* Jest
* Supertest
* Test-Driven Development (TDD)

---

## 📁 Project Structure

```
root
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── services
│   │   ├── models
│   │   ├── routes
│   │   ├── middleware
│   │   ├── tests
│   │   └── seed
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── api.js
│   │   ├── utils.js
│   │   └── styles.css
│   └── main.jsx
│
└── README.md
```

---

## 🔑 Role Management Design

* Users **select their role (Customer/Admin) during registration**.
* Role is **stored securely in the database**.
* During login, the backend validates that the requested role matches the stored role.
* JWT embeds the validated role.
* Frontend renders UI conditionally based on JWT role.
* Backend enforces authorization on all protected routes.

> ⚠️ Frontend never decides roles. Backend is the single source of truth.

---

## 🧪 Demo Seed Data

For demonstration and UI testing purposes, the project includes a **seed script** that inserts ~100 sweets with varying categories, prices, and quantities.

* Seed data is **clearly marked as demo-only**.
* Helps reviewers test search, filters, and inventory flows instantly.

---

## ▶️ Running the Project Locally

### Prerequisites

* Node.js (v18+ recommended)
* MongoDB Atlas connection

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in `backend/`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies API requests to the backend.

---

## 🔍 API Highlights

* `POST /api/auth/register` – Register user with role
* `POST /api/auth/login` – Login with role validation
* `GET /api/sweets` – Get all sweets
* `GET /api/sweets/search` – Search & filter sweets
* `POST /api/sweets/:id/purchase` – Purchase sweet
* `POST /api/sweets` – Add sweet (Admin only)
* `PUT /api/sweets/:id` – Update sweet (Admin only)
* `POST /api/sweets/:id/restock` – Restock (Admin only)
* `DELETE /api/sweets/:id` – Delete sweet (Admin only)

---

## 🧠 Design Decisions

* **Service–Controller separation** for clean backend architecture
* **JWT-based RBAC** for scalable authorization
* **Axios interceptors** for automatic token injection
* **Explicit search action** (button-based) for predictable UX
* **TDD approach** to ensure correctness and edge-case handling

---

## 📌 Notes for Reviewers

* Demo seed data is used to enhance usability and showcase features.
* Admin creation is allowed via UI registration for demo purposes.
* Backend validation prevents privilege escalation.

---

## ✅ Project Status

✔ Feature complete
✔ Fully tested backend
✔ Clean, professional UI
✔ Internship-ready

---


---

**Author:** Abhishek Yadav

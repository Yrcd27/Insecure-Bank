# InsecureBank - Modern Banking Application

A full-stack web application demonstrating a modern banking interface with comprehensive user management, transaction processing, and administrative features.

## 🎯 Overview

InsecureBank is a comprehensive banking application built with modern web technologies. It provides a realistic banking experience with user authentication, account management, money transfers, transaction history, and administrative controls.

## ✨ Features

- **User Authentication** - Registration, login, and session management
- **Account Management** - View balance, update profile, transaction history
- **Money Transfer** - Transfer funds between accounts with real-time updates
- **Admin Panel** - User management, statistics, and system controls
- **System Tools** - Network connectivity testing

## 🛠️ Tech Stack

**Frontend:** React 19, Vite, Lucide React, CSS3  
**Backend:** Node.js, Express.js, MySQL2, CORS  
**Database:** MySQL via XAMPP  

## � Quick Start

### Prerequisites
- Node.js (v16+)
- XAMPP (MySQL)

### Installation
```bash
# Clone repository
git clone https://github.com/Yrcd27/Insecure-Bank.git
cd Insecure-Bank

# Setup database
# 1. Start XAMPP (Apache + MySQL)
# 2. Create 'insecure_bank' database in phpMyAdmin
# 3. Import demo-files/manual-db-setup.sql

# Install dependencies
cd backend && npm install
cd ../vul-bank-app && npm install

# Start application
cd ../backend && npm start
cd ../vul-bank-app && npm run dev
```

### Access
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

## � User Accounts

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | Administrator |
| john_doe | password | User |
| jane_smith | 123456 | User |
| bob_wilson | Bobbbb | User |
| ycp27 | ycp123 | User |

## 📁 Project Structure

```
InsecureBank/
├── backend/           # Node.js server
├── vul-bank-app/      # React frontend
├── demo-files/        # Database setup
└── README.md
```

## � Key API Endpoints

- `POST /api/login` - Authentication
- `POST /api/transfer` - Money transfer
- `GET /api/admin/users` - User management
- `POST /api/ping` - Network tools

## 🔗 Links

- **Repository**: [https://github.com/Yrcd27/Insecure-Bank](https://github.com/Yrcd27/Insecure-Bank)

---

**Built with modern web technologies**
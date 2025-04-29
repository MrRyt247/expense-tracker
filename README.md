# Expense Tracker API

A backend web application to monitor expenses built with Node.js, Express, and MongoDB.

## 📌 Overview

This expense tracker provides robust backend functionality for tracking and managing financial transactions. Built with a modular architecture, the application handles user authentication, transaction management, and proper error handling.

## ✨ Features

- RESTful API endpoints for transaction management
- User authentication with JWT
- Error handling and validation
- CORS support for cross-origin requests
- Modular project structure for scalability

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **JSON Web Tokens (JWT)** - Secure authentication
- **JavaScript** - Programming language (100%)

## 📂 Project Structure

```
expense-tracker/
├── handlers/
│   └── errorHandler.js
├── managers/
│   └── jwtManager.js
├── middleware/
│   └── auth.js
├── models/
│   ├── transactionsModel.js
│   └── usersModel.js
├── modules/
│   ├── transactions/
│   │   ├── controllers/
│   │   │   ├── addExpense.js
│   │   │   ├── addIncome.js
│   │   │   ├── deleteTransaction.js
│   │   │   └── editTransactions.js
│   │   └── transactions.routes.js
│   └── users/
│       ├── controllers/
│       │   ├── login.js
│       │   ├── register.js
│       │   └── userDashboard.js
│       └── routes.routes.js
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB instance (local or Atlas)

### Installation

1. Clone the repository

   ```
   git clone https://github.com/MrRyt247/expense-tracker.git
   ```

2. Navigate to the project directory

   ```
   cd expense-tracker
   ```

3. Install dependencies

   ```
   npm install

   ```

4. Start the server
   ```
   nodemon app.js
   ```

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

- [MrRyt247](https://github.com/MrRyt247)

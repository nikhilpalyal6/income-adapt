# 🚀 Freelancer Finance Stack

A modern financial management platform designed specifically for **Gen-Z freelancers in India** to manage irregular income, track expenses, and maintain financial stability.

---

## 📌 Problem

Freelancers face major financial challenges:

* Irregular and unpredictable income
* Poor tax planning
* No structured savings system
* Difficulty managing expenses

Traditional finance apps are built for **fixed salary users**, not freelancers.

---

## 💡 Solution

**Freelancer Finance Stack** solves this by introducing:

* 📊 Income Smoothing System
* 💸 Automated Tax Savings
* 📈 Smart Financial Insights
* 🧾 Invoice & Payment Tracking

---

## ✨ Features

### 🔹 Dashboard

* Total Balance Overview
* Stable Monthly Budget
* Financial Health Score

### 🔹 Income Tracking

* Add and track income sources
* Monthly income trends
* Income prediction (based on last 3 months)

### 🔹 Expense Management

* Categorized expenses
* Pie charts and graphs
* Overspending alerts

### 🔹 Income Smoothing Engine

* Calculates safe monthly spending:

  ```
  Stable Budget = Average of last 3 months income
  ```

### 🔹 Tax Wallet

* Automatically saves 20% of income
* Tracks total tax savings

### 🔹 Invoice System

* Create invoices
* Track pending/payments
* Payment reminders

### 🔹 Financial Health Score

* Based on:

  * Savings ratio
  * Spending behavior
  * Income consistency

---

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Styling:** CSS / Tailwind (optional)
* **State Management:** Context API / Zustand
* **Charts:** Chart.js / Recharts
* **Backend:** Mock API / JSON Server

---

## 📂 Project Structure

```
freelancer-finance-stack/
│── public/
│── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── utils/
│   ├── App.js
│   └── index.js
│── package.json
│── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/freelancer-finance-stack.git
cd freelancer-finance-stack
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Start the development server

```bash
npm start
```

App will run on:

```
http://localhost:3000
```

---

### 4️⃣ (Optional) Run JSON Server for Mock API

Install JSON Server:

```bash
npm install -g json-server
```

Run server:

```bash
json-server --watch db.json --port 5000
```

---

## 📊 Sample Logic

### Income Prediction

```javascript
const avgIncome = (month1 + month2 + month3) / 3;
```

### Tax Saving

```javascript
const tax = income * 0.2;
```

---

## 🎯 Future Improvements

* AI-based income prediction
* Bank API integration
* Real tax filing support
* Mobile app version

---

## 👨‍💻 Author

Developed by **Nikhil Palyal**

---

## 🏆 Project Goal

> Build a real-world fintech solution that helps freelancers achieve **financial stability**, not just track money.

---

## 📜 License

This project is for educational and hackathon purposes.

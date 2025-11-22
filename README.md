# 🏨 Hotel Management System

A simple Hotel Management System built using **HTML, CSS, JavaScript,
Node.js, Express, and MySQL**.

## 📌 Features

### Frontend

-   Modern dashboard layout
-   Room list UI
-   Booking form
-   Customer management

### Backend

-   REST API endpoints
-   Room & booking CRUD
-   MySQL integration
-   `.env` configuration

## ⚙️ Installation
## Installation

1. Clone the repository:

```bash
git clone https://github.com/gatwirival/hotel-service-system.git
```

2. Navigate to the project directory:

```bash
cd hotel-service-system
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

``` bash
npm start
```
Open browser: http://localhost:3000/

## 🗄️ Database Setup

``` sql
CREATE DATABASE IF NOT EXISTS hotel_db;
USE hotel_db;
CREATE TABLE rooms (id INT AUTO_INCREMENT PRIMARY KEY, room_number VARCHAR(20), room_type VARCHAR(50), price DECIMAL(10,2), status VARCHAR(20));
CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, full_name VARCHAR(100), phone VARCHAR(20), email VARCHAR(100));
CREATE TABLE bookings (id INT AUTO_INCREMENT PRIMARY KEY, room_id INT, customer_id INT, check_in DATE, check_out DATE);
```
## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make changes and commit: `git commit -m "Add feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a pull request

## 📜 License

Open-source for learning and improvement.

# Consultancy Website - Backend

## 📌 Overview

The Consultancy Website Backend is a robust and scalable API designed to manage user authentication, content management, services, training, inquiries, and analytics for a professional consultancy platform. Built with Node.js, Express.js, and PostgreSQL, it provides a secure and efficient backend solution for both website users and admin panel management.


## 🚀 Features

✅ User Authentication & Role Management (JWT-based authentication, RBAC: Admin, Editor, Contributor)
✅ Content Management System (CMS) (Blogs, News, Publications, Multimedia Management)
✅ Service & Training Management (CRUD operations, service requests, training registrations, attendance tracking)
✅ Inquiry & Contact Management (Admin dashboard for filtering, responding, and exporting inquiries)
✅ Analytics & Reporting (User engagement tracking, Google Analytics integration)
✅ Security & Performance (Rate limiting, CORS, CSRF protection, secure password hashing)


## 🛠️ Tech Stack

1. Backend: Node.js, Express.js
2. Database: PostgreSQL
3. ORM: Sequelize
4. Authentication: JWT, bcrypt
5. File Uploads: Multer (for images, videos, and documents)
6. API Documentation: Postman
7. Deployment: AWS/GCP/Azure, Docker (optional), vercel


## 📂 Project Structure

consultancy-backend/
│── config/           # Environment variables and configurations
│── controllers/      # Business logic and API handlers
│── models/           # Database models (PostgreSQL with Sequelize/Prisma)
│── routes/           # API endpoints
│── middleware/       # Authentication, authorization, validation
│── seeders/          # To initialize db tables
│── services/         # Application services
│── utils/            # Helper functions
│── .env              # Environment variables
│── package.json      # Project dependencies and scripts
│── README.md         # Project documentation
│── server.js         # Main server file


## 🔧 Installation & Setup

### 1️⃣ Prerequisites:

#### Ensure you have installed:
1. Node.js (v16+)
2. PostgreSQL (v13+)
3. npm or yarn


### 2️⃣ Clone the Repository
git clone https://github.com/ketsebaot-ertumo/consultancy-backend.git

cd consultancy-backend


### 3️⃣ Install Dependencies
npm install  # or yarn install

### 4️⃣ Configure Environment Variables

**Create a .env file in the root directory:**

```sh
PORT=4000
DATABASE_URL=postgresql://postgres:yes123@localhost:5432/consultancy

JWT_SECRET=asdfghjkQWERTYUUI1234567890zxcvbnmasdfghjklqwertyuio

USER_1=ketsebaotertumo@gmail.com
PASS_1=vhyaunypmaksffdr

CLIENT_URL=http://localhost:4000
NODE_ENV=development
```

### 5️⃣ Database Setup
Run to initialize the database schema:
```sh
node seeders/tables.js
```

### 6️⃣ Start the Server
```sh
npm start  # Runs the server in development mode
```

### 7️⃣ API Documentation
Access API documentation at: 
1. http://localhost:5000/api-docs
2. https://docs.google.com/document/d/1VHiEPrmadt-klIODXOGMY7UXoxk-4wl0tuODdhqQu-w/edit?tab=t.egf64re71n55


## 📡 Deployment
#### 🚀 Deploying on Cloud (AWS/GCP/Azure)
#### 🚀 Deploying on Cloud (AWS/GCP/Azure)

1. **Containerization (Optional)**  
    ```sh
    docker build -t consultancy-backend .
    docker run -p 5000:5000 consultancy-backend
2. **Configure CI/CD Pipeline** 
    (GitHub Actions, Jenkins, etc.)

2. **Deploy using PM2 for process management**
3. **pm2 start server.js --name consultancy-backend**


## ✅ Testing
```sh
Run unit and integration tests:
npm test
```

## 📖 API Endpoints
### 🔹 Authentication
| Method | Endpoint                  | Description               |
|--------|---------------------------|---------------------------|
| POST   | /api/auth/signup          | User Registration        |
| POST   | /api/auth/login           | User Login               |
| POST   | /api/auth/forgot-password | Password Reset Request   |


### 🔹 User Management
| Method  | Endpoint        | Description           |
|---------|---------------|-----------------------|
| GET     | /api/users     | Get all users        |
| GET     | /api/users/:id | Get user details     |
| PUT     | /api/users/:id | Update user profile  |
| DELETE  | /api/users/:id | Delete user          |


### 🔹 Content Management
| Method  | Endpoint       | Description              |
|---------|--------------|--------------------------|
| GET     | /api/blogs   | Fetch all blog posts     |
| POST    | /api/blogs   | Create a new blog post   |
| PUT     | /api/blogs/:id | Edit an existing blog post |
| DELETE  | /api/blogs/:id | Delete a blog post     |


### 🔹 Services & Training
| Method  | Endpoint         | Description                   |
|---------|----------------|-------------------------------|
| GET     | /api/services  | List consultancy services     |
| POST    | /api/services  | Add a new service            |
| GET     | /api/training  | Fetch training sessions      |
| POST    | /api/training  | Create a new training session |


### 🔹 Inquiries
| Method  | Endpoint       | Description            |
|---------|--------------|------------------------|
| GET     | /api/inquiries | List all inquiries   |
| POST    | /api/inquiries | Submit a new inquiry |


### For a full list, check the API Docs. 🚀
#### 🔒 Security Best Practices
1. Enforce HTTPS in production.
2. Implement rate limiting to prevent abuse.
3. Use JWT to secure HTTP headers.
4. Validate user inputs to prevent SQL injection.

#### 👥 Contributors
Your Name - Ketsebaot Ertumo


#### 📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

#### 📬 Contact
For inquiries, reach out to ertumoketsebaot@gmail.com or visit ketsebaot@vercel.app.
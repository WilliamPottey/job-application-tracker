# Job Application Tracker API

A backend API for tracking job applications throughout the hiring process.  
The system supports user authentication, secure ownership-based access, and full CRUD operations for job applications.

This project was built to practice real-world backend patterns such as JWT authentication, middleware-based authorization, and relational data modeling.

---

## 🚀 Features

### Authentication
- User registration with hashed passwords
- User login with JSON Web Tokens (JWT)
- Stateless authentication using Bearer tokens

### Job Applications
- Create a job application
- List all applications for the logged-in user
- Fetch a single application (ownership enforced)
- Update application details (PATCH)
- Delete an application

### Security & Design
- JWT-based route protection via custom middleware
- Ownership enforced at the database query level
- No data leakage between users
- RESTful API design with proper HTTP status codes

---

## 🛠 Tech Stack

- **Node.js**
- **TypeScript**
- **Express**
- **Prisma ORM**
- **SQLite** (local development)
- **JWT (jsonwebtoken)**
- **bcrypt**

---

## 📁 Project Structure

```
job-application-tracker/
├── src/
│ └── server.ts # Express app, routes, and middleware
├── prisma/
│ ├── schema.prisma # Database schema
│ ├── migrations/ # Prisma migrations
│ └── migration_lock.toml
├── .env # Environment variables (not committed)
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── prisma.config.ts
└── tsconfig.json
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
git clone https://github.com/your-username/job-application-tracker.git
cd job-application-tracker
npm install
```

---

## 🔐 Environment Configuration

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secure-secret"
```

---

## 🗄 Database Setup

This project uses Prisma ORM with SQLite for local development.

Run the following command to create the database and apply migrations:
```bash
npx prisma migrate dev
```
This will:
- Create the local SQLite database
- Apply all existing migrations
- Generate the Prisma client

---

## ▶️ Running the Server

Start the development server:
```bash
npm run dev
```
The API will be available at:
```arduino
http://localhost:3000
```

---

## 🔑 Authentication

Authentication is handled using JSON Web Tokens (JWT).

### Authentication Flow

1. Register a user using /auth/register
2. Log in using /auth/login to receive a JWT
3. Include the token in the Authorization header for protected routes

Example header:
```makefile
Authorization: Bearer <your-jwt-token>
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|-------|----------|-------------|
| POST  | `/auth/register` | Register a new user |
| POST  | `/auth/login`    | Log in and receive a JWT |

### Job Applications (Protected)

| Method | Endpoint | Description |
|-------|----------|-------------|
| POST  | `/applications` | Create a job application |
| GET   | `/applications` | List all applications |
| GET   | `/applications/:id` | Get a single application |
| PATCH | `/applications/:id` | Update an application |
| DELETE | `/applications/:id` | Delete an application |

---

## 🧠 Key Implementation Details

- Passwords are securely hashed using bcrypt
- Stateless authentication via JWT
- Custom Express middleware for route protection
- Authorization enforced at the database query layer
- Partial updates supported using HTTP PATCH
- Secure CRUD operations scoped to the authenticated user

---

## 📈 Future Improvements

- Pagination and filtering for applications
- Input validation with Zod
- PostgreSQL support
- Frontend UI
- Automated tests

---

## 📄 License

MIT

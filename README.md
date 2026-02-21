# 📚 Course Selling Backend API

A RESTful backend API for a course selling platform built with **Bun**, **Express.js**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**. Supports user authentication (JWT), role-based access control (Instructor / Student), course management, lesson management, and course purchases.

---

## 🚀 Tech Stack

| Technology                                                                | Purpose                              |
| ------------------------------------------------------------------------- | ------------------------------------ |
| [Bun](https://bun.sh/)                                                    | JavaScript runtime & package manager |
| [Express.js v5](https://expressjs.com/)                                   | HTTP server framework                |
| [TypeScript](https://www.typescriptlang.org/)                             | Type-safe JavaScript                 |
| [Prisma ORM v7](https://www.prisma.io/)                                   | Database ORM & migrations            |
| [PostgreSQL](https://www.postgresql.org/)                                 | Relational database                  |
| [JWT](https://jwt.io/)                                                    | Authentication tokens                |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js)                      | Password hashing                     |
| [Zod](https://zod.dev/)                                                   | Request validation                   |
| [http-status-codes](https://github.com/prettymuchbryce/http-status-codes) | Standardized HTTP status codes       |

---

## 📁 Project Structure

```
course-selling-backend/
├── prisma/
│   ├── schema.prisma          # Database schema (User, Course, Lesson, Purchase)
│   └── migrations/            # Prisma migration files
├── src/
│   ├── app.ts                 # Express app setup
│   ├── index.ts               # Server entry point (port 3000)
│   ├── config/                # DB config (Prisma client)
│   ├── controllers/           # Route handlers
│   │   ├── auth.controller.ts
│   │   ├── course.controller.ts
│   │   ├── lesson.controller.ts
│   │   └── purchase.controller.ts
│   ├── middlewares/           # Auth & validation middlewares
│   │   ├── auth.validate.ts   # JWT verification, role checks
│   │   ├── course.validate.ts
│   │   ├── lesson.validate.ts
│   │   └── purchase.validate.ts
│   ├── repository/            # Database query layer
│   ├── routes/
│   │   └── v1/                # API v1 routes
│   │       ├── auth.route.ts
│   │       ├── course.route.ts
│   │       ├── lesson.route.ts
│   │       └── purchase.route.ts
│   ├── service/               # Business logic layer
│   ├── types/                 # TypeScript custom types
│   ├── utils/                 # Shared utilities (response formatters)
│   └── validators/            # Zod schemas for request validation
├── .env                       # Environment variables (not committed)
├── .env.example               # Example environment file
├── package.json
├── tsconfig.json
└── prisma.config.ts
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- **[Bun](https://bun.sh/)** (v1.0+) — `curl -fsSL https://bun.sh/install | bash`
- **[PostgreSQL](https://www.postgresql.org/download/)** (v14+)
- **Git**

---

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/pratice-course-selling-backend.git
cd pratice-course-selling-backend
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory based on the example below:

```bash
cp .env.example .env
```

Update `.env` with your values:

```env
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/course_selling_db"
JWT_SECRET="your-super-secret-jwt-key"
```

> ⚠️ **Never commit your `.env` file.** It is already in `.gitignore`.

### 4. Setup the Database

Make sure PostgreSQL is running, then run Prisma migrations:

```bash
# Generate Prisma client
bunx prisma generate

# Apply migrations to your database
bunx prisma migrate deploy
```

> If you're setting up from scratch in development:
>
> ```bash
> bunx prisma migrate dev --name init
> ```

### 5. Start the Development Server

```bash
bun run dev
```

The server will start at: **`http://localhost:3000`**

You should see:

```
Server is running on port 3000
```

---

## 🗄️ Database Schema

```
User          → has many Courses (as Instructor) and Purchases (as Student)
Course        → has many Lessons and Purchases; belongs to an Instructor (User)
Lesson        → belongs to a Course
Purchase      → joins User ↔ Course (many-to-many)
```

### Roles

| Role         | Permissions                                                        |
| ------------ | ------------------------------------------------------------------ |
| `INSTRUCTOR` | Create, update, delete courses; create lessons; view revenue stats |
| `STUDENT`    | Browse courses, purchase courses, view lessons                     |

---

## 🔐 Authentication

All protected routes require a **Bearer token** in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens are returned on **signup** and **login**.

---

## 📌 API Reference

**Base URL:** `http://localhost:3000/api/v1`

---

### 🔑 Auth Routes — `/auth`

---

#### `POST /auth/signup` — Register a new user

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "STUDENT"
}
```

> `role` can be `"STUDENT"` or `"INSTRUCTOR"`.

**Response `201 Created`:**

```json
{
  "message": "User created successfully",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "STUDENT",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "meta": {}
}
```

---

#### `POST /auth/login` — Login an existing user

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response `200 OK`:**

```json
{
  "message": "User logged in successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "email": "john@example.com",
      "name": "John Doe",
      "role": "STUDENT"
    }
  },
  "meta": {}
}
```

---

### 📖 Course Routes — `/courses`

---

#### `POST /courses` — Create a new course

> 🔒 **Requires:** `INSTRUCTOR` role token

**Headers:**

```
Authorization: Bearer <instructor_token>
```

**Request Body:**

```json
{
  "title": "Complete Node.js Course",
  "description": "Learn Node.js from scratch to advanced concepts.",
  "price": 1999,
  "instructorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

**Response `201 Created`:**

```json
{
  "message": "Course created successfully",
  "data": {
    "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "title": "Complete Node.js Course",
    "description": "Learn Node.js from scratch to advanced concepts.",
    "price": 1999,
    "instructorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "createdAt": "2026-02-21T08:48:37.000Z",
    "updatedAt": "2026-02-21T08:48:37.000Z"
  },
  "meta": {}
}
```

---

#### `GET /courses` — Get all courses (paginated)

> 🌐 **Public route** — No authentication required.

**Query Parameters:**

| Param   | Type   | Default | Description    |
| ------- | ------ | ------- | -------------- |
| `page`  | number | `1`     | Page number    |
| `limit` | number | `10`    | Items per page |

**Example:** `GET /api/v1/courses?page=1&limit=5`

**Response `200 OK`:**

```json
{
  "message": "Courses fetched successfully",
  "data": {
    "courses": [
      {
        "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
        "title": "Complete Node.js Course",
        "description": "Learn Node.js from scratch to advanced concepts.",
        "price": 1999,
        "instructorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "createdAt": "2026-02-21T08:48:37.000Z",
        "updatedAt": "2026-02-21T08:48:37.000Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10
  },
  "meta": {}
}
```

---

#### `PATCH /courses/:id` — Update a course

> 🔒 **Requires:** `INSTRUCTOR` role token (must be the course owner)

**Headers:**

```
Authorization: Bearer <instructor_token>
```

**URL Params:** `id` — Course UUID

**Request Body** (all fields optional):

```json
{
  "title": "Updated Node.js Course Title",
  "price": 2499
}
```

**Response `200 OK`:**

```json
{
  "message": "Course updated successfully",
  "data": {
    "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "title": "Updated Node.js Course Title",
    "description": "Learn Node.js from scratch to advanced concepts.",
    "price": 2499,
    "instructorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "updatedAt": "2026-02-21T09:00:00.000Z"
  },
  "meta": {}
}
```

---

#### `DELETE /courses/:id` — Delete a course

> 🔒 **Requires:** `INSTRUCTOR` role token (must be the course owner)

**Headers:**

```
Authorization: Bearer <instructor_token>
```

**URL Params:** `id` — Course UUID

**Response `200 OK`:**

```json
{
  "message": "Course deleted successfully",
  "data": {
    "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901"
  },
  "meta": {}
}
```

---

#### `GET /courses/:courseId/stats` — Get course revenue stats

> 🔒 **Requires:** `INSTRUCTOR` role token (must be the course owner)

**Headers:**

```
Authorization: Bearer <instructor_token>
```

**URL Params:** `courseId` — Course UUID

**Response `200 OK`:**

```json
{
  "message": "Revenue fetch successfully",
  "data": {
    "courseId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "title": "Complete Node.js Course",
    "totalPurchases": 42,
    "pricePerUnit": 1999,
    "totalRevenue": 83958
  },
  "meta": {}
}
```

---

### 📝 Lesson Routes — `/courses/:courseId/lessons`

---

#### `POST /courses/:courseId/lessons` — Create a lesson for a course

> 🔒 **Requires:** `INSTRUCTOR` role token

**Headers:**

```
Authorization: Bearer <instructor_token>
```

**URL Params:** `courseId` — Course UUID

**Request Body:**

```json
{
  "title": "Introduction to Node.js",
  "content": "In this lesson, we will cover the basics of Node.js, including the event loop, modules, and npm.",
  "courseId": "b2c3d4e5-f6a7-8901-bcde-f12345678901"
}
```

**Response `201 Created`:**

```json
{
  "message": "Lesson created successfully",
  "data": {
    "id": "c3d4e5f6-a7b8-9012-cdef-123456789012",
    "title": "Introduction to Node.js",
    "content": "In this lesson, we will cover the basics of Node.js...",
    "courseId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "createdAt": "2026-02-21T09:10:00.000Z",
    "updatedAt": "2026-02-21T09:10:00.000Z"
  },
  "meta": {}
}
```

---

#### `GET /courses/:courseId/lessons` — Get all lessons of a course

> 🌐 **Public route** — No authentication required.

**URL Params:** `courseId` — Course UUID

**Response `200 OK`:**

```json
{
  "message": "Lessons fetched successfully",
  "data": {
    "course": {
      "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "title": "Complete Node.js Course"
    },
    "lessons": [
      {
        "id": "c3d4e5f6-a7b8-9012-cdef-123456789012",
        "title": "Introduction to Node.js",
        "content": "In this lesson, we will cover the basics of Node.js...",
        "courseId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
        "createdAt": "2026-02-21T09:10:00.000Z"
      }
    ]
  },
  "meta": {}
}
```

---

### 🛒 Purchase Routes — `/purchase`

---

#### `POST /purchase` — Purchase a course

> 🔒 **Requires:** `STUDENT` role token

**Headers:**

```
Authorization: Bearer <student_token>
```

**Request Body:**

```json
{
  "courseId": "b2c3d4e5-f6a7-8901-bcde-f12345678901"
}
```

**Response `200 OK`:**

```json
{
  "message": "Purchase created successfully",
  "data": {
    "id": "d4e5f6a7-b8c9-0123-defa-234567890123",
    "userId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "courseId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "createdAt": "2026-02-21T09:20:00.000Z"
  },
  "meta": {}
}
```

---

#### `GET /purchase/:userId` — Get all purchased courses of a student

> 🔒 **Requires:** `STUDENT` role token

**Headers:**

```
Authorization: Bearer <student_token>
```

**URL Params:** `userId` — User UUID

**Response `200 OK`:**

```json
{
  "message": "Purchase course fetched successfully",
  "data": [
    {
      "id": "d4e5f6a7-b8c9-0123-defa-234567890123",
      "userId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "courseId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "course": {
        "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
        "title": "Complete Node.js Course",
        "price": 1999
      },
      "createdAt": "2026-02-21T09:20:00.000Z"
    }
  ],
  "meta": {}
}
```

---

## ❌ Error Response Format

All error responses follow this unified structure:

```json
{
  "message": "Something went wrong",
  "data": {},
  "error": {
    "details": "..."
  }
}
```

### Common HTTP Status Codes

| Code  | Meaning                              |
| ----- | ------------------------------------ |
| `200` | OK                                   |
| `201` | Created                              |
| `400` | Bad Request (validation failed)      |
| `401` | Unauthorized (missing/invalid token) |
| `403` | Forbidden (wrong role)               |
| `500` | Internal Server Error                |

---

## 🧪 Testing the API

You can test the API using:

- **[Postman](https://www.postman.com/)** — Import the routes manually
- **[Thunder Client](https://www.thunderclient.com/)** — VS Code extension
- **cURL** — examples below

### cURL Examples

**Signup:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","password":"pass1234","role":"INSTRUCTOR"}'
```

**Login:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"pass1234"}'
```

**Create Course (with token):**

```bash
curl -X POST http://localhost:3000/api/v1/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"My Course","description":"Description here","price":999,"instructorId":"YOUR_USER_ID"}'
```

---

## 📄 Environment Variables Reference

Create a `.env` file in the root with the following variables:

| Variable       | Description                  | Example                                           |
| -------------- | ---------------------------- | ------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/course_db` |
| `JWT_SECRET`   | Secret key for signing JWTs  | `your-very-secret-key`                            |

---

## 📜 Scripts

| Command                      | Description                                   |
| ---------------------------- | --------------------------------------------- |
| `bun run dev`                | Start the server with hot-reload (watch mode) |
| `bunx prisma generate`       | Generate Prisma client from schema            |
| `bunx prisma migrate dev`    | Run migrations in development                 |
| `bunx prisma migrate deploy` | Deploy migrations in production               |
| `bunx prisma studio`         | Open Prisma Studio (DB GUI)                   |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📝 License

This project is for educational purposes as part of a Web Development Bootcamp.

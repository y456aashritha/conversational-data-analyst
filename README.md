# Conversational Data Analyst – Banking Analytics

## 1. Project Overview

Conversational Data Analyst is a full-stack web application that allows users to interact with banking data using natural language questions.

Users can ask questions about monthly applications, branch rejection rates, customer segments, and transaction values. The backend identifies the user's intent, executes predefined SQL queries against a MySQL database, and returns results as tables and interactive charts.

## 2. Key Features

- Natural language question input.
- Intent detection using a rule-based mock AI implementation.
- Predefined and validated SQL query execution.
- Banking analytics using MySQL.
- Interactive data tables.
- Dynamic charts using Recharts.
- Suggested questions for quick analysis.
- Input validation using Zod.
- Error handling and API response validation.
- Copy results functionality.

## 3. Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend | Node.js, Express.js, TypeScript |
| Database | MySQL 8 |
| Validation | Zod |
| Data Visualization | Recharts |
| Icons | Lucide React |
| API Communication | REST API |

## 4. System Architecture

React Frontend → Express.js REST API → Intent Detection → Predefined SQL Query → MySQL Database → JSON Response → React Table and Charts.

## 5. Project Structure

```text
conversational-data-analyst/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── routes/
│   │   │   └── chat.routes.ts
│   │   ├── services/
│   │   │   ├── intent.service.ts
│   │   │   └── query.service.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## 6. Database Setup

The application uses MySQL 8.

Create the database:

```sql
CREATE DATABASE banking_analytics;
USE banking_analytics;
```

Create the following tables:

- branches
- customers
- applications
- transactions

The application uses relationships between customers, branches, applications, and transactions to generate analytics.

Insert sample records into these tables before running the application.

## 7. Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the backend folder using `.env.example` as a reference.

Configure your local MySQL connection:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=banking_analytics
FRONTEND_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

## 8. Frontend Setup

Open another terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Open the application:

```text
http://localhost:5173
```

## 9. API Endpoint

### POST /api/chat

Accepts a natural language question and returns the corresponding analytics results.

Example request:

```json
{
  "question": "Show monthly applications"
}
```

Example response:

```json
{
  "success": true,
  "intent": "MONTHLY_APPLICATIONS",
  "answer": "Here are the results for: Show monthly applications",
  "data": [
    {
      "month": "2026-01",
      "total_applications": 2
    }
  ]
}
```

## 10. Supported Analytics Questions

Try the following questions:

1. Show monthly applications.
2. Which branch has the highest rejection rate?
3. Compare Retail and SME applications.
4. Show top customers by transaction value.

## 11. Intent Detection and Query Execution

The backend uses a mock, rule-based intent detection service to identify the purpose of a user's question.

Based on the detected intent, the query service selects one of the predefined SQL queries.

This approach avoids executing arbitrary user-generated SQL and keeps database access restricted to approved analytics operations.

## 12. Error Handling and Validation

- Validates incoming questions using Zod.
- Restricts question length.
- Handles unsupported questions.
- Returns appropriate HTTP error responses.
- Configures CORS for frontend-backend communication.
- Uses environment variables for database configuration.




Developed as a full-stack Conversational Data Analyst technical assignment.

**Note:** This project currently uses mock AI intent detection rather than a live LLM integration.

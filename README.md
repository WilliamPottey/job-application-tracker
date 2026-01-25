# Job Application Tracker API

An API-first backend service for tracking job applications throughout the hiring process. The system allows users to securely manage applications, track status changes, and attach notes, with support for filtering and pagination.

This project is intentionally designed using production-style backend patterns, with an emphasis on clean architecture, relational data modeling, and extensibility. A minimal frontend dashboard is planned for a later phase.

## Features (MVP)
- User authentication with JWT
- Create, update, and delete job applications
- Track application status (Applied, Interview, Offer, etc.)
- Attach notes to applications
- Filter and paginate application lists
- Proper error handling and validation

## Tech Stack
- **Language:** TypeScript
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT
- **Testing:** Jest (planned)
- **Infrastructure:** Docker (planned)

## Data Model (Initial)
- **User**
  - id
  - email
  - passwordHash
  - createdAt

- **JobApplication**
  - id
  - userId
  - companyName
  - roleTitle
  - status
  - appliedDate
  - createdAt
  - updatedAt

- **ApplicationNote**
  - id
  - applicationId
  - content
  - createdAt

## API Endpoints (Planned)
- POST /auth/register
- POST /auth/login
- POST /applications
- GET /applications
- GET /applications/:id
- PATCH /applications/:id
- DELETE /applications/:id
- POST /applications/:id/notes

## Architecture
The application follows a modular, feature-based structure to separate concerns and improve maintainability. Business logic, data access, and routing are kept distinct to support future scalability and testing.

## Future Improvements
- Follow-up reminders with background jobs
- Status history and analytics
- Redis caching and rate limiting
- Minimal frontend dashboard
- Cloud deployment

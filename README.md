# Auto-stats-service

---

## Technologies

- **Node.js + Koa** — backend API
- **PostgreSQL** — database (through Docker)
- **TypeORM + Zod** — ORM and validation

---

## Quick start

---

## What you need to get started

### Cloning a repository

```bash
git clone https://github.com/Evgeny-Rutkovskyi/auto-stats-service.git
cd auto-stats-service
```

### Install:

- [Node.js](https://nodejs.org/) (LTS version)
- [Docker](https://www.docker.com/products/docker-desktop/) — for database and api

---

## Running in development mode

---

### 1. Create .env. It must contain the following variables(shown in .env.example):

```bash
PORT=3000

POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=stats
POSTGRES_USER=stats
POSTGRES_PASSWORD=stats
```

### 2. Run the project

Launch Docker Desktop, then run the command in the project terminal:

```bash
docker-compose up --build -d
```

### 3. Send request through Postman

Stats contain two options - create or update. For any of them send POST request on this URL
```bash
http://localhost:3000/metrics
```
Body should contain two fields - autoId and events. Events contain the array which can have two elements ("phone_view" and "listing_view")
```bash
{
    autoId: 1,
    events: ["listing_view", "phone_view"]
}
```
Also field events can contain one of all permissible values.

To get stats by autoId send the GET request on URL:
```
http://localhost:3000/stats/1
```

---

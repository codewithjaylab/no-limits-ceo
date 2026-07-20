# No Limits Company - CEO Dashboard Backend

Spring Boot 3.2 / Java 17 REST API for the CEO Dashboard. Serves KPI metrics, agenda events, priority tasks, project tracking, urgent notifications, team activity, and daily summaries - all driven by PostgreSQL via JPA + Flyway.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start (Local)](#quick-start-local)
- [Quick Start (Docker)](#quick-start-docker)
- [Configuration](#configuration)
- [Database](#database)
- [Running the Application](#running-the-application)
- [API Reference](#api-reference)
- [Build and Test](#build-and-test)
- [Project Structure](#project-structure)
- [Docker Setup](#docker-setup)
- [Next Steps](#next-steps)

---

## Prerequisites

| Tool | Version | Notes |
|---|---|---|
| Java JDK | 17+ | Tested with Temurin 17.0.14 |
| Maven | 3.9+ | mvnw wrapper included |
| PostgreSQL | 15+ | For local dev; Docker provides its own |
| Docker | 24+ | Required for Docker workflow |
| Docker Compose | v2+ | Built into modern Docker Desktop |

---

## Quick Start (Local)

```
cd c:\workspace\no-limits-ceo\admin-panel\backend

psql -U postgres -c "CREATE DATABASE nolimits_ceo;"

./mvnw spring-boot:run
```

Server at **http://localhost:8080**. Flyway creates tables and seeds data on first boot.

---

## Quick Start (Docker)

```
cd c:\workspace\no-limits-ceo\admin-panel\backend

docker compose up --build
```

Starts PostgreSQL (5432) + API (8080). No local Java/Maven/PostgreSQL required.

Verify:

```
curl http://localhost:8080/api/v1/dashboard/kpis | jq .
```

Stop:

```
docker compose down       # stop containers
docker compose down -v    # stop + delete database volume
```

---

## Configuration

File: `src/main/resources/application.yml`

### Key settings

| Property | Default | Description |
|---|---|---|
| server.port | 8080 | API server port |
| spring.datasource.url | ${DB_URL:jdbc:postgresql://localhost:5432/nolimits_ceo} | PostgreSQL JDBC URL |
| spring.datasource.username | ${DB_USERNAME:postgres} | DB user (env var or fallback) |
| spring.datasource.password | ${DB_PASSWORD:postgres} | DB password (env var or fallback) |

### Environment variables

```
export DB_USERNAME=myuser
export DB_PASSWORD=mypassword
./mvnw spring-boot:run
```

### CORS

CorsConfig opens /api/** to all origins. Restrict for production.

---

## Database

### Schema

Flyway migrations in `src/main/resources/db/migration/`. V1 creates 8 tables:

| Table | Purpose |
|---|---|
| users | CEO user profile and auth scope |
| daily_summaries | Daily focus, key actions, events |
| agenda_events | Scheduled events with category |
| priority_tasks | Prioritized tasks with progress |
| key_projects | Active project tracking |
| kpi_metrics | Current KPI values and deltas |
| kpi_historical_data | Time-series data for sparklines |
| urgent_messages | Unread notifications |
| team_activities | Recent team events |

### Seed data

- 1 CEO user (Alex R.)
- 4 key projects (E-commerce, EU expansion, mobile app, supply chain)
- 5 KPIs with 5 months of revenue history
- 4 team activities
- 4 priority tasks

### Flyway commands

```
./mvnw flyway:migrate    # apply pending migrations
./mvnw flyway:clean      # drop all tables
./mvnw flyway:info       # check migration status
```

---

## Running the Application

### Development mode

```
./mvnw spring-boot:run
```

Recompile on changes:

```
./mvnw compile
```

### Production JAR

```
./mvnw clean package
java -jar target/ceo-dashboard-backend-1.0.0.jar
```

---

## API Reference

Base URL: `http://localhost:8080/api/v1/dashboard`


    Endpoints verificados:
    - /api/v1/dashboard/kpis - 5 KPIs con sparklines
    - /api/v1/dashboard/projects/key - 4 proyectos
    - /api/v1/dashboard/tasks/priority?userId=1 - 4 tareas priorizadas
    - /api/v1/dashboard/activity - 4 actividades de equipo

### GET /summary

Returns today's daily summary.

Query: `userId` (long, required)

Response:
```json
{
  "summaryId": 1,
  "summaryDate": "2025-07-19",
  "keyActions": ["Revisar reporte financiero", "Aprobar presupuesto marketing"],
  "events": ["Reunion ventas 10:00 AM", "Presentacion resultados 2:00 PM"],
  "focusText": "Maximizar eficiencia operativa en produccion."
}
```

### GET /agenda

Today's events ordered by start time.

Query: `userId` (long, required)

Response:
```json
[
  {
    "eventId": 1,
    "title": "Reunion estrategica",
    "description": "Analisis de metricas del trimestre",
    "startTime": "2025-07-19T10:00:00.000Z",
    "endTime": "2025-07-19T11:00:00.000Z",
    "category": "STRATEGIC"
  }
]
```

### GET /tasks/priority

Priority tasks ordered by priority.

Query: `userId` (long, required)

Response:
```json
[
  {
    "taskId": 1,
    "title": "Revision informe financiero Q2",
    "progressPercentage": 80,
    "status": "IN_PROGRESS",
    "dueDate": "2025-07-25",
    "priorityOrder": 1
  }
]
```

### GET /projects/key

All key projects ordered by last update.

Response:
```json
[
  {
    "projectId": 1,
    "name": "Plataforma E-commerce",
    "progressPercentage": 75,
    "status": "IN_PROGRESS"
  }
]
```

### GET /kpis

All KPI metrics with formatted values and sparklines.

Response:
```json
[
  {
    "metricCode": "MONTHLY_REVENUE",
    "metricName": "Ingresos Mensuales",
    "displayValue": "$2,845,000.00",
    "deltaPercentage": 8.00,
    "sparklineData": [2450000.00, 2580000.00, 2620000.00, 2710000.00, 2845000.00]
  }
]
```

### GET /notifications/urgent

Unread urgent messages.

Query: `userId` (long, required)

Response:
```json
[
  {
    "messageId": 1,
    "sourceChannel": "ALARM",
    "title": "Alerta de servidor",
    "body": "Uso de CPU al 90% en nodo principal",
    "isRead": false,
    "receivedAt": "2025-07-19T08:30:00.000Z"
  }
]
```

### GET /activity

Recent team activities (latest 10).

Response:
```json
[
  {
    "activityId": 1,
    "teamName": "Ingenieria",
    "description": "Nuevo despliegue de API Gateway completado",
    "activityType": "DEPLOYMENT",
    "loggedAt": "2025-07-19T09:15:00.000Z"
  }
]
```

### Error handling

| Status | Meaning |
|---|---|
| 200 | Success |
| 400 | Bad request |
| 500 | Internal server error |

---

## Build and Test

```
./mvnw compile              # compile only
./mvnw test                 # run tests
./mvnw clean verify         # full build + tests + package
./mvnw package -DskipTests  # package without tests
```

Tests use H2 in-memory database.

---

## Project Structure

```
backend/
  mvnw                          # Maven wrapper
  pom.xml                       # Build config
  Dockerfile                    # Multi-stage Docker build
  .dockerignore                 # Docker context exclusions
  compose.yaml                  # App + PostgreSQL orchestration
  src/
    main/
      java/com/nolimits/dashboard/
        DashboardApplication.java    # Entry point
        config/
          CorsConfig.java            # CORS config
        controller/
          DashboardController.java   # REST endpoints
        dto/                         # JSON response contracts
          AgendaEventDTO.java
          DailySummaryDTO.java
          KeyProjectDTO.java
          KpiDashboardDTO.java
          PriorityTaskDTO.java
          TeamActivityDTO.java
          UrgentMessageDTO.java
        entity/                      # JPA entities
          AgendaEvent.java
          DailySummary.java
          KeyProject.java
          KpiHistoricalData.java
          KpiMetric.java
          PriorityTask.java
          TeamActivity.java
          UrgentMessage.java
          User.java
        repository/                  # Spring Data JPA repos
        service/
          DashboardService.java      # Business logic
          KpiService.java            # KPI formatting
      resources/
        application.yml              # Main config
        db/migration/
          V1__initialize_schema.sql  # Schema + seed data
    test/                            # H2-backed tests
```

---

## Docker Setup

Three files at the project root orchestrate the full stack.

### Dockerfile

Multi-stage build: Maven compiles the JAR, JRE runs it.

```
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /build
COPY pom.xml ./
RUN mvn dependency:go-offline -B          # layer caching
COPY src ./src
RUN mvn package -DskipTests -B

FROM eclipse-temurin:17-jre
RUN groupadd -r spring && useradd -r -g spring spring
USER spring
WORKDIR /app
COPY --from=builder /build/target/ceo-dashboard-backend-*.jar app.jar
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/v1/dashboard/kpis || exit 1
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### compose.yaml

Two services: PostgreSQL 15 Alpine + the Spring Boot app.

```
services:
  db:
    image: postgres:15-alpine
    container_name: nolimits-ceo-db
    environment:
      POSTGRES_DB: nolimits_ceo
      POSTGRES_USER: nolimits
      POSTGRES_PASSWORD: changeme
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U nolimits -d nolimits_ceo"]
      interval: 5s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  app:
    build: .
    container_name: nolimits-ceo-api
    environment:
      DB_USERNAME: nolimits
      DB_PASSWORD: changeme
      DB_URL: jdbc:postgresql://db:5432/nolimits_ceo
    ports:
      - "8080:8080"
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

volumes:
  pgdata:
```

### .dockerignore

```
target/
.git/
.gitignore
.idea/
*.iml
.DS_Store
Thumbs.db
mvnw
mvnw.cmd
*.md
*.log
```

### Key design decisions

- **Layer caching**: pom.xml copied and dependencies resolved before source code, so rebuilds are fast
- **Non-root user**: spring user in runtime stage, no root
- **Health check**: wget hits /kpis endpoint (works without Actuator)
- **depends_on + health check**: App waits until PostgreSQL accepts connections
- **Named volume pgdata**: Data persists across restarts, no host path dependency
- **DB_URL override**: application.yml uses `${DB_URL:jdbc:postgresql://localhost:5432/nolimits_ceo}` so Docker can inject the correct hostname

### Future improvements

| Improvement | Why |
|---|---|
| Pin exact image SHAs | Supply-chain security - use `maven:3.9-eclipse-temurin-17@sha256:...` |
| Add `SPRING_PROFILES_ACTIVE=docker` | Profile-specific config |
| Add `DOCKER_DEFAULT_PLATFORM=linux/amd64` | Avoid ARM host issues |
| Add init container for DB migrations | Flyway CLI as one-shot before app starts |
| Tag and push image to registry | `docker tag` + `docker push` for deployment |

---

## Next Steps

- [ ] Authentication: Spring Security with JWT-based RBAC
- [ ] SSE / WebSocket: Real-time push for KPI updates and notifications
- [ ] CRUD endpoints: POST/PUT/DELETE for tasks, events, messages
- [ ] Mark-as-read: PUT /api/v1/dashboard/notifications/urgent/{id}/read
- [ ] Date-range queries: Extend agenda/KPI endpoints with date params
- [ ] Audit logging: @CreatedDate / @LastModifiedDate via Spring JPA
- [ ] Integration tests: @SpringBootTest per controller
- [ ] API docs: SpringDoc / Swagger UI
- [ ] Spring Actuator: Health endpoint for Docker HEALTHCHECK
- [ ] Pin Docker SHAs: Replace tags with @sha256: for supply-chain security
- [ ] Multi-platform build: DOCKER_DEFAULT_PLATFORM=linux/amd64

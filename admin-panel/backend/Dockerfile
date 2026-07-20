# =============================================================================
# Dockerfile - CEO Dashboard Backend
# Multi-stage build: Maven compile -> JRE runtime
# =============================================================================

# ---- Stage 1: Build the fat JAR ----
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /build

# Step 1: Copy only pom.xml and download dependencies (layer caching)
COPY pom.xml ./
RUN mvn dependency:go-offline -B

# Step 2: Copy source and compile
COPY src ./src
RUN mvn package -DskipTests -B

# ---- Stage 2: Runtime ----
FROM eclipse-temurin:17-jre
RUN groupadd -r spring && useradd -r -g spring spring
USER spring
WORKDIR /app

# Copy the built JAR from the builder stage
COPY --from=builder /build/target/ceo-dashboard-backend-*.jar app.jar

EXPOSE 8080

# Simple TCP health check (works without curl or Actuator)
# Replace with Actuator health endpoint after adding spring-boot-starter-actuator
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/v1/dashboard/kpis || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]

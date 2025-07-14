# --- BUILD STAGE ---
FROM maven:3.8.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# --- RUNTIME STAGE ---
FROM eclipse-temurin:17-jre-focal
WORKDIR /app
COPY --from=build /app/target/website-eye-v2.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]

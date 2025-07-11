# Use OpenJDK as the base image
FROM openjdk:17-jdk-slim

# Set working directory inside container
WORKDIR /app

# Copy Maven files first to cache dependencies
COPY pom.xml ./
COPY src ./src

# Build the application (this will create target/*.jar)
RUN apt-get update && apt-get install -y maven && mvn clean package -DskipTests

# Run the jar file (adjust if your jar name is different)
CMD ["java", "-jar", "target/*.jar"]

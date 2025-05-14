# Start from a JDK base image (compatible with Fargate)
FROM --platform=linux/amd64 eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy the JAR file into the image (rename if needed)
COPY target/*.jar app.jar

# Expose the port your app runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

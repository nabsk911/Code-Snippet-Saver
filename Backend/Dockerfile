# Stage 1: Build the application
FROM maven:3.9.9-eclipse-temurin-21 AS build  
WORKDIR /app
COPY pom.xml ./
COPY src ./src
RUN mvn clean package -DskipTests  # Skip tests to help debug the issue

# Stage 2: Run the application
FROM eclipse-temurin:21
WORKDIR /app
COPY --from=build /app/target/*.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

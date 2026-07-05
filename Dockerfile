# Build stage
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
RUN mvn -f /usr/src/app/pom.xml clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre-alpine
COPY --from=build /usr/src/app/target/demo-0.0.1-SNAPSHOT.jar /usr/app/demo.jar
COPY --from=build /usr/src/app/target/classes/data /usr/app/target/classes/data
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/app/demo.jar"]

FROM adoptopenjdk:16-jre-openj9

WORKDIR /app

COPY build/libs/*.jar app.jar

CMD ["java", "-Dspring.profiles.active=producer", "-jar", "app.jar"]

FROM openjdk:21

WORKDIR /app
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

ENV AWS_EC2_METADATA_DISABLED=TRUE
ENV TZ=Europe/Oslo

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

# https://spring.io/guides/gs/spring-boot-docker
# https://hub.docker.com/_/openjdk
# ressurser fra Europris 
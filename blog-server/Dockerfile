FROM openjdk:8-jdk-alpine
VOLUME /tmp
VOLUME /data
ARG JAR_FILE
ADD ${JAR_FILE} app.jar
EXPOSE 9090
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
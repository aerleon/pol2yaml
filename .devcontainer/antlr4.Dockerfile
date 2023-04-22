FROM mcr.microsoft.com/vscode/devcontainers/java:11-bullseye as builder

WORKDIR /opt/antlr4

ARG ANTLR_VERSION="4.12.0"
ARG MAVEN_OPTS="-Xmx1G"


RUN apt-get update && apt-get -y install --no-install-recommends maven git \
    && git clone https://github.com/antlr/antlr4.git \
    && cd antlr4 \
    && git checkout $ANTLR_VERSION \
    && mvn clean --projects tool --also-make \
    && mvn -DskipTests install --projects tool --also-make \
    && mv ./tool/target/antlr4-*-complete.jar antlr4-tool.jar

FROM mcr.microsoft.com/vscode/devcontainers/java:11-bullseye

COPY --from=builder /opt/antlr4/antlr4/antlr4-tool.jar /usr/local/lib/
WORKDIR /work
CMD ["java", "-Xmx500M", "-cp", "/usr/local/lib/antlr4-tool.jar", "org.antlr.v4.Tool"]



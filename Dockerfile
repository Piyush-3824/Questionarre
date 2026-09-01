# Lightweight container with Node.js and OpenJDK for cloud deployment
FROM alpine:3.19

# Install OpenJDK 17 and Node.js
RUN apk add --no-cache openjdk17 nodejs

WORKDIR /app

# Copy server code
COPY server.js ./

# Default port
ENV PORT=7654
EXPOSE 7654

# Run compiler server
CMD ["node", "server.js"]

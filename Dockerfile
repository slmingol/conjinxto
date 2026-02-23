# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy package.json to extract version
COPY --from=builder /app/package.json /tmp/package.json

# Extract version and set as environment variable
RUN apk add --no-cache jq && \
    APP_VERSION=$(jq -r .version /tmp/package.json) && \
    echo "$APP_VERSION" > /etc/app-version && \
    rm /tmp/package.json && \
    apk del jq

# Copy and set up entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx via entrypoint script
CMD ["/docker-entrypoint.sh"]

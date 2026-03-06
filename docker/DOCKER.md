# Docker Setup Guide

This guide explains how to run the Contexto Clone using Docker.

> **Note:** All Docker-related files are located in the `docker/` directory. Docker Compose commands should be run from the project root directory.

## Prerequisites

- Docker 20.10+
- Docker Compose 2.0+

## Quick Start

### Development Mode (Simple)

Best for active development with hot reload:

```bash
docker-compose -f docker-compose.simple.yml up
```

**Features:**
- ✅ Hot Module Replacement (HMR)
- ✅ Live code changes
- ✅ Automatic dependency installation
- ✅ Source maps for debugging
- 🔗 Access: http://localhost:3001

**Use when:**
- Developing features
- Testing changes locally
- Debugging issues

### Production Mode

Best for deployment and testing production builds:

```bash
docker-compose up -d
```

**Features:**
- ✅ Optimized production build
- ✅ Nginx with gzip compression
- ✅ Static asset caching
- ✅ Health checks
- ✅ Automatic restarts
- ✅ Log rotation
- 🔗 Access: http://localhost:3001

**Use when:**
- Deploying to production
- Testing production builds
- Performance testing
- Serving to end users

## Docker Files Explained

### Dockerfile
Multi-stage build for production:
1. **Builder stage**: Installs deps and builds the app
2. **Production stage**: Serves with Nginx

### docker-compose.yml
Full production setup with:
- Container orchestration
- Network configuration
- Health checks
- Logging configuration
- Auto-restart policy

### docker-compose.simple.yml
Minimal development setup:
- Single service
- Volume mounting for live editing
- Vite dev server

### nginx.conf
Nginx configuration with:
- Gzip compression
- Cache headers
- SPA routing (serves index.html for all routes)
- Security headers

### .dockerignore
Excludes unnecessary files from Docker context:
- node_modules
- .git
- dist
- logs

## Common Commands

### Development

```bash
# Start dev server
docker-compose -f docker-compose.simple.yml up

# Start in background
docker-compose -f docker-compose.simple.yml up -d

# View logs
docker-compose -f docker-compose.simple.yml logs -f

# Stop
docker-compose -f docker-compose.simple.yml down

# Rebuild (after package.json changes)
docker-compose -f docker-compose.simple.yml up --build
```

### Production

```bash
# Build and start
docker-compose up -d

# Rebuild image
docker-compose build

# View logs
docker-compose logs -f contexto-app

# Check health
docker-compose ps

# Stop
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Maintenance

```bash
# Access container shell
docker exec -it contexto-clone sh

# View nginx logs
docker exec contexto-clone cat /var/log/nginx/access.log

# Restart container
docker-compose restart

# Remove all unused containers/images
docker system prune -a
```

## Port Configuration

Default port: `3001`

To change the port, edit the docker-compose file:

```yaml
ports:
  - "8080:80"  # Change 8080 to your desired port
```

## Environment Variables

Add environment variables in docker-compose.yml:

```yaml
environment:
  - NODE_ENV=production
  - VITE_API_URL=https://api.example.com
```

## Troubleshooting

### Port already in use
```bash
# Find process using port 3001
lsof -i :3001

# Or change port in docker-compose.yml
```

### Build fails
```bash
# Clear Docker cache
docker-compose build --no-cache

# Remove old images
docker image prune -a
```

### Can't access app
```bash
# Check container status
docker-compose ps

# Check logs
docker-compose logs

# Verify port mapping
docker port contexto-clone
```

### Hot reload not working (dev mode)
```bash
# Ensure volumes are mounted correctly
# Check docker-compose.simple.yml volumes section

# Restart with clean state
docker-compose -f docker-compose.simple.yml down
docker-compose -f docker-compose.simple.yml up
```

### Permission issues
```bash
# On Linux, add your user to docker group
sudo usermod -aG docker $USER

# Or run with sudo
sudo docker-compose up
```

## Production Deployment

### Cloud Platforms

#### Docker Hub
```bash
# Tag image
docker tag contexto-clone yourusername/contexto-clone:latest

# Push to Docker Hub
docker push yourusername/contexto-clone:latest

# Pull and run on server
docker pull yourusername/contexto-clone:latest
docker run -d -p 80:80 yourusername/contexto-clone:latest
```

#### AWS ECS
```bash
# Build for AWS
docker build -t contexto-clone .

# Tag for ECR
docker tag contexto-clone:latest <aws-account>.dkr.ecr.<region>.amazonaws.com/contexto-clone:latest

# Push to ECR
docker push <aws-account>.dkr.ecr.<region>.amazonaws.com/contexto-clone:latest
```

#### Google Cloud Run
```bash
# Build and push
gcloud builds submit --tag gcr.io/<project-id>/contexto-clone

# Deploy
gcloud run deploy contexto-clone \
  --image gcr.io/<project-id>/contexto-clone \
  --platform managed \
  --port 80
```

## Performance Tips

1. **Multi-stage builds**: Already implemented to reduce image size
2. **Layer caching**: Package files copied before source code
3. **.dockerignore**: Excludes unnecessary files
4. **Health checks**: Monitors container health
5. **Nginx**: Optimized for static file serving

## Security Considerations

- Runs as non-root user in production
- Security headers configured in nginx
- No sensitive data in images
- Regular base image updates
- Health checks for availability monitoring

## File Sizes

- **Builder stage**: ~500MB (Node.js + dependencies)
- **Final image**: ~25MB (Nginx Alpine + built assets)
- **Savings**: 95% reduction with multi-stage build

## Best Practices

✅ **DO:**
- Use `.dockerignore`
- Multi-stage builds
- Health checks
- Log rotation
- Version tags

❌ **DON'T:**
- Run as root in production
- Include sensitive data
- Use `latest` tag in production
- Skip health checks
- Ignore security updates

---

For more information, see the main [README.md](README.md)

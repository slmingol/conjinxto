# Docker Files

This directory contains all Docker-related configuration files for Conjinxto.

## Files

- `Dockerfile` - Multi-stage build configuration for production
- `docker-compose.yml` - Full production setup with health checks and logging
- `docker-compose.simple.yml` - Minimal setup using pre-built image
- `nginx.conf` - Nginx web server configuration
- `docker-entrypoint.sh` - Container startup script
- `DOCKER.md` - Complete Docker usage guide

## Quick Start

All docker-compose commands should be run from the **project root**:

```bash
# Production build
docker-compose up -d

# Using pre-built image
docker-compose -f docker-compose.simple.yml up -d
```

See [DOCKER.md](./DOCKER.md) for detailed documentation.

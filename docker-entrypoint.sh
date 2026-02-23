#!/bin/sh
set -e

# Read version from version file
VERSION=$(cat /etc/app-version 2>/dev/null || echo "unknown")

# Print banner
echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║                      CONJINXTO                            ║"
echo "║                                                           ║"
echo "║                   Version: $VERSION                            ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Execute nginx
exec nginx -g "daemon off;"

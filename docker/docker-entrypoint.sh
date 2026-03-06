#!/bin/sh
set -e

# Read version from version file
VERSION=$(cat /etc/app-version 2>/dev/null || echo "unknown")

# Print banner
echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║                        CONJINXTO                          ║"
echo "║                                                           ║"
# Center the version text
VERSION_TEXT="Version: $VERSION"
TEXT_LEN=${#VERSION_TEXT}
TOTAL_WIDTH=59
PADDING=$(( (TOTAL_WIDTH - TEXT_LEN) / 2 ))
printf "║%*s%s%*s║\n" $PADDING "" "$VERSION_TEXT" $((TOTAL_WIDTH - TEXT_LEN - PADDING)) ""
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Execute nginx
exec nginx -g "daemon off;"

#!/bin/bash
# Generate sitemap.xml by scanning for index.html files
set -euo pipefail

DOMAIN="https://ship.yumi.to"
OUT="sitemap.xml"

cat > "$OUT" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${DOMAIN}/</loc></url>
EOF

for dir in */; do
  if [ -f "${dir}index.html" ]; then
    echo "  <url><loc>${DOMAIN}/${dir}</loc></url>" >> "$OUT"
  fi
done

echo "</urlset>" >> "$OUT"
echo "Generated $OUT with $(grep -c '<url>' "$OUT") URLs"

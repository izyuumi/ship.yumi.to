#!/usr/bin/env bash
# Regenerate sitemap.xml from subdirectories containing index.html
set -euo pipefail
DOMAIN="https://ship.yumi.to"
OUT="sitemap.xml"

cat > "$OUT" <<'HEADER'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://ship.yumi.to/</loc></url>
HEADER

for dir in */; do
  [ -f "${dir}index.html" ] || continue
  name="${dir%/}"
  echo "  <url><loc>${DOMAIN}/${name}/</loc></url>" >> "$OUT"
done

echo '</urlset>' >> "$OUT"
echo "Generated $OUT with $(grep -c '<url>' "$OUT") URLs"

#!/usr/bin/env python3
"""Inject OG and Twitter Card meta tags into all landing pages."""
import os, re, glob

DOMAIN = "https://ship.yumi.to"

for index_file in sorted(glob.glob("*/index.html")):
    name = os.path.dirname(index_file)
    
    with open(index_file, "r") as f:
        html = f.read()
    
    if "og:title" in html:
        print(f"  skip {name} (already has OG)")
        continue
    
    # Extract title
    m = re.search(r"<title>(.*?)</title>", html)
    title = m.group(1) if m else f"{name} — ship.yumi.to"
    
    # Extract first h1 subtitle or use title for description
    m = re.search(r'<meta\s+name="description"\s+content="([^"]+)"', html)
    if m:
        desc = m.group(1)
    else:
        # Try to get the hero subtitle (first <p> after <h1>)
        m = re.search(r"</h1>.*?<p[^>]*>(.*?)</p>", html, re.DOTALL)
        desc = re.sub(r"<[^>]+>", "", m.group(1)).strip() if m else title
    
    og = f'''    <meta property="og:type" content="website">
    <meta property="og:url" content="{DOMAIN}/{name}/">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{desc}">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{desc}">'''
    
    if 'meta name="description"' not in html:
        og = f'    <meta name="description" content="{desc}">\n' + og
    
    # Insert after viewport meta tag
    html = re.sub(
        r'(<meta name="viewport"[^>]*>)',
        r'\1\n' + og,
        html,
        count=1
    )
    
    with open(index_file, "w") as f:
        f.write(html)
    
    print(f"  ✓ {name}")

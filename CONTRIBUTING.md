# Contributing

## Adding a New Landing Page

1. Create a directory: `mkdir my-product`
2. Create `my-product/index.html` using an existing page as a template
3. Include these in `<head>`:
   - `<meta charset="UTF-8">`
   - `<meta name="viewport" ...>`
   - `<link rel="icon" href="/favicon.svg" ...>`
   - `<meta name="theme-color" content="#030712">`
   - `<link rel="canonical" href="https://ship.yumi.to/my-product/">`
   - Open Graph + Twitter Card meta tags
   - `<script src="https://cdn.tailwindcss.com"></script>`
4. Run `./generate-sitemap.sh` to regenerate `sitemap.xml`
5. Push to `main` — GitHub Pages deploys automatically

## Style Guidelines

- Dark theme: `bg-gray-950` (#030712) background
- Tailwind CSS via CDN (no build step)
- Inter font from Google Fonts (where applicable)
- Responsive design (mobile-first)
- Gradient accents for headings and CTAs

## File Checklist

For each new page, make sure you have:

- [ ] `<title>` tag
- [ ] `<meta name="description">`
- [ ] `<link rel="canonical">`
- [ ] Open Graph meta tags
- [ ] Twitter Card meta tags
- [ ] `<meta name="theme-color">`
- [ ] Favicon link
- [ ] `<noscript>` fallback
- [ ] "← All Projects" back link

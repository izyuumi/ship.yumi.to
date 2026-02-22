# ship-api

Backend for ship.yumi.to landing pages. Handles waitlist signups via Convex.

## Stack

- **Next.js** (App Router, API routes only)
- **Convex** (database + mutations)
- **Vercel** (hosting at `api.ship.yumi.to`)

## Waitlist Table

| Field       | Type                       | Notes                              |
|-------------|----------------------------|------------------------------------|
| email       | string                     | Normalized to lowercase            |
| project     | string                     | e.g. `curetrack`, `shiftlog`       |
| createdAt   | number                     | Unix ms timestamp                  |
| status      | `active` \| `unsubscribed` | Default: `active`                  |
| ip          | string (optional)          | For dedup / abuse detection        |
| userAgent   | string (optional)          | For analytics                      |

Indexes: `(email, project)` for dedup, `(project)` for filtering, `(createdAt)` for sorting.

## Setup

### 1. Clone and install

```bash
git clone git@github.com:izyuumi/ship-api.git
cd ship.yumi.to/api
npm install
```

### 2. Init Convex

```bash
npx convex dev
```

This will prompt you to log in and create a Convex project. It generates `convex/_generated/` and prints your deployment URL.

### 3. Set env vars

```bash
cp .env.local.example .env.local
# Fill in NEXT_PUBLIC_CONVEX_URL from the convex dev output
```

### 4. Run locally

```bash
npm run dev
```

Test:
```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@example.com","project":"curetrack"}'
```

## Deploy to Vercel

1. Push to GitHub as `izyuumi/ship-api`
2. Import into Vercel
3. Add env var: `NEXT_PUBLIC_CONVEX_URL`
4. Set `buildCommand` in `vercel.json` runs `convex deploy` before build (already configured)
5. Add `CONVEX_DEPLOY_KEY` to Vercel env vars (from Convex dashboard)
6. Set custom domain: `api.ship.yumi.to`

## Using in a landing page

```html
<!-- Update CSP to allow the API -->
<meta http-equiv="Content-Security-Policy" content="... connect-src 'self' https://api.ship.yumi.to;">

<script>
  document.getElementById('signup-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email-input').value.trim();
    const btn = this.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Joining...';

    try {
      const res = await fetch('https://api.ship.yumi.to/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, project: 'YOUR_PROJECT_SLUG' }),
      });
      if (!res.ok) throw new Error('failed');
      // show success UI
    } catch {
      btn.disabled = false;
      btn.textContent = 'Join Waitlist';
      // show error UI
    }
  });
</script>
```

Replace `YOUR_PROJECT_SLUG` with the project name (e.g. `curetrack`, `shiftlog`).

## API Reference

### POST /api/waitlist

**Body:**
```json
{ "email": "user@example.com", "project": "curetrack" }
```

**Response:**
```json
{ "success": true, "alreadyJoined": false }
```

**Errors:** `400` (missing/invalid fields), `500` (server error)

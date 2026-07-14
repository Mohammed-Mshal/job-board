# Security Audit — Jobify

Last reviewed: July 2026

This document summarizes the security posture of the Jobify job board application, fixes applied, and recommended follow-ups.

---

## Architecture overview

| Layer | Mechanism |
|-------|-----------|
| Session | HTTP-only `session` cookie, JWT signed with `JWT_SECRET` (HS256) |
| Page auth | Middleware / proxy checks session for protected routes |
| API auth | Service-layer checks via `verifySession()`, `getCompanyUser()`, `getAdminUser()` |
| Input validation | Zod schemas on all write endpoints |
| Database | MongoDB via Mongoose |
| File uploads | ImageKit + MIME/size validation |

---

## Fixes applied

| Area | Issue | Fix |
|------|-------|-----|
| Auth | Invalid JWT could crash `verifySession()` | Null-safe parsing; returns `null` on bad tokens |
| Signup | Client could register as `admin` | `role` restricted to `user` \| `company` in Zod schema |
| Jobs | PATCH allowed mass assignment | Dedicated `updateJobSchema` (partial of validated fields only) |
| Applications | Missing input validation on apply | Zod schema for `jobId`, cover letter, resume file |
| Applications | Suspended users could apply | 403 when `status !== active` |
| Contact API | Missing `connectDB()` | Added database connection before write |
| Server pages | Axios to localhost on Vercel | Job/company detail + home featured jobs use direct DB |
| API errors | Hardcoded English strings | Localized via `x-locale` header + error codes |
| Rate limiting | Brute-force on auth/contact | MongoDB-backed per-IP limits on login, signup, contact |
| CSRF | State-changing API requests | Double-submit cookie (`GET /csrf` + `x-csrf-token` header) |
| Sessions | Long-lived admin sessions | Admin JWT/cookie default 2h; `POST /auth/refresh` extends valid sessions |
| Profile API | Duplicate `GET /auth/me` | Removed; canonical endpoint is `GET /profile` |

---

## Authentication & authorization

### Strengths

- Passwords hashed with bcrypt (cost factor 10)
- Session cookie: `httpOnly`, `secure` in production, `sameSite: lax`
- Role checks enforced in services (not only UI)
- Job updates/deletes scoped to owning company
- Application access scoped to applicant or job owner (IDOR protected)
- Admin actions: cannot demote/suspend self or last admin
- Signup cannot elevate to admin role

### Gaps (addressed)

| Item | Status | Implementation |
|------|--------|----------------|
| Rate limiting | Done | MongoDB-backed limits on login, signup, contact (`lib/rateLimit.ts`) |
| JWT session refresh | Done | `POST /auth/refresh`; admin sessions default to 2h |
| CSRF protection | Done | Double-submit cookie via `GET /csrf` + `x-csrf-token` header |
| Duplicate profile endpoints | Done | Removed `GET /auth/me`; use `GET /profile` only |

---

## Input validation & data integrity

- All API routes use Zod validation before business logic
- Regex search terms escaped via `escapeRegex()` (ReDoS mitigation)
- Job list `limit` capped at 100
- Resume uploads: PDF/DOC/DOCX, max 5 MB
- Profile images validated by media service

---

## Pages & access control

| Page | Auth | SEO index |
|------|------|-----------|
| `/` Home | Public | Indexed |
| `/jobs`, `/jobs/[id]` | Public | Indexed |
| `/companies`, `/companies/[id]` | Public | Indexed |
| `/about-us`, `/contact-us` | Public | Indexed |
| `/login`, `/signup` | Public | Noindex |
| `/profile` | User | Noindex |
| `/admin` | Admin | Noindex + robots disallow |

---

## Environment variables

Never commit or expose to the client:

| Variable | Required | Purpose |
|----------|----------|---------|
| `MONGODB_URI` | Yes | Database |
| `JWT_SECRET` | Yes | Session signing — use a long random string |
| `JWT_EXPIRES_IN` | Yes | e.g. `24h` |
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | Canonical URLs, sitemap, OG tags |
| ImageKit keys | Yes | Media storage |

---

## Manual test checklist

Use this after deploy to verify security-sensitive flows:

### Auth
- [ ] Login with wrong password → 400 localized error
- [ ] Login suspended account → 403
- [ ] Signup with `role: "admin"` in body → 400 validation error
- [ ] Access `/profile` without session → redirect to login
- [ ] Access `/admin` as non-admin → blocked

### Jobs & applications
- [ ] Company A cannot PATCH/DELETE Company B's job → 401
- [ ] User cannot apply twice to same job
- [ ] Suspended user cannot apply → 403
- [ ] Resume over 5 MB or wrong type → 400

### Admin
- [ ] Non-admin cannot call `/admin/*` → 403
- [ ] Admin cannot suspend themselves
- [ ] Admin cannot remove last admin

### API locale
- [ ] Request with `x-locale: ar` returns Arabic error messages
- [ ] Request with `x-locale: en` returns English error messages

### SEO
- [ ] `/robots.txt` disallows `/api/`, admin, profile, login, signup
- [ ] `/sitemap.xml` includes jobs and companies
- [ ] Job detail page has JSON-LD `JobPosting` schema
- [ ] Company detail page has JSON-LD `Organization` schema

---

## Reporting vulnerabilities

If you discover a security issue, contact the project maintainer privately. Do not open public issues for undisclosed vulnerabilities.

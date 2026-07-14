# Jobify API Reference

Base URL: `{SITE_URL}/api/v1`

All authenticated routes use an HTTP-only `session` cookie (JWT). Send requests with credentials included (`withCredentials: true`).

Locale-aware error messages: send header `x-locale: en` or `x-locale: ar`.

---

## Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/login` | Public | Log in with email and password |
| POST | `/auth/signup` | Public | Register as job seeker or company |
| DELETE | `/auth/logout` | Public | Clear session cookie |
| POST | `/auth/refresh` | User | Extend session cookie and JWT |
| GET | `/profile` | User | Get current user profile |

### POST `/auth/login`

**Body (JSON)**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success (200)**
```json
{
  "message": "Account logged in successfully",
  "user": { "userId": "...", "name": "...", "email": "...", "role": "user", "status": "active" }
}
```

**Errors:** `400` validation, `404` account not found, `403` account suspended

---

### POST `/auth/signup`

**Body (JSON)**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "user",
  "location": "Riyadh",
  "description": "Software engineer with 5 years experience",
  "teamSize": { "min": 1, "max": 10 }
}
```

- `role`: `"user"` (job seeker) or `"company"` only
- Optional multipart profile image via form if using extended client

**Success (201)** — session created automatically

---

## Jobs

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/jobs` | Public* | List/search jobs |
| POST | `/jobs` | Company | Create a job |
| GET | `/jobs/:id` | Public | Job details by `jobId` |
| PATCH | `/jobs/:id` | Company (owner) | Update job |
| DELETE | `/jobs/:id` | Company (owner) | Delete job |
| GET | `/jobs/:id/save` | Optional | Save status for current user |
| POST | `/jobs/:id/save` | User | Toggle saved job |
| GET | `/jobs/:id/application` | Optional | Application status |
| GET | `/jobs/:id/applications` | Company (owner) | List applicants |

\* `?mine=true` requires company auth and returns only that company's jobs.

### GET `/jobs` query params

| Param | Type | Description |
|-------|------|-------------|
| search | string | Search title, description, company name |
| page | number | Page number (default 1) |
| limit | number | Items per page (max 100) |
| sortBy | string | `createdAt`, `title`, `salary`, etc. |
| sortOrder | `asc` \| `desc` | Sort direction |
| status | `open` \| `closed` | Filter by status |
| location | string | Location filter |
| mine | `true` | Company's own jobs |

---

## Applications

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/applications` | User | List my applications |
| POST | `/applications` | User (seeker) | Apply for a job |
| GET | `/applications/:id` | User or company | Application details |
| PUT | `/applications/:id` | User (applicant) | Update cover letter / resume |
| PATCH | `/applications/:id` | Company (job owner) | Update status |
| DELETE | `/applications/:id` | User or company | Delete application |

### POST `/applications` (multipart/form-data)

| Field | Type | Required |
|-------|------|----------|
| jobId | string | Yes |
| coverLetter | string | Yes (min 20 chars) |
| resume | file | Yes (PDF/DOC/DOCX, max 5MB) |

**Application statuses:** `pending`, `accepted`, `rejected`

---

## Companies

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/companies` | Public | List companies |
| GET | `/companies/:id` | Public | Company profile + open jobs (`userId`) |

---

## Profile

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/profile` | User | Current user profile |
| PATCH | `/profile/edit-profile` | User | Update profile (requires current password) |
| PATCH | `/profile/change-password` | User | Change password |
| PATCH | `/profile/update-image` | User | Upload profile image |
| GET | `/profile/saved-jobs` | User (seeker) | Saved jobs list |
| GET | `/profile/applications` | User | My applications |
| GET | `/profile/messages` | User | Admin messages inbox |
| PATCH | `/profile/messages/:id` | User | Mark message as read |

---

## Testimonials

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/testimonials` | Public | Approved testimonials |
| POST | `/testimonials` | User | Submit review (pending approval) |

---

## Contact & CMS

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/contact` | Public | Submit contact form |
| GET | `/cms?locale=en` | Public | Public CMS content |

---

## Admin (`role: admin` required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/users` | List users (search, filter, paginate) |
| PATCH | `/admin/users/:userId` | Update role or status |
| GET | `/admin/users/stats` | User statistics |
| GET | `/admin/cms` | Full CMS (en + ar) |
| PUT | `/admin/cms` | Update CMS section |
| GET | `/admin/contact-submissions` | Contact inbox |
| PATCH | `/admin/contact-submissions/:id` | Update submission status |
| GET | `/admin/testimonials` | List reviews |
| PATCH | `/admin/testimonials/:id` | Approve/reject (+ optional user message) |
| DELETE | `/admin/testimonials/:id` | Delete review |
| POST | `/admin/user-messages` | Send message to user |

### POST `/admin/user-messages`

```json
{
  "userId": "123",
  "subject": "Welcome",
  "message": "Your account has been verified."
}
```

---

## Error format

**Single error**
```json
{
  "code": "accountSuspended",
  "error": "Your account is suspended"
}
```

**Validation errors**
```json
{
  "errors": {
    "email": ["Invalid email address"],
    "password": ["Password must be at least 8 characters long"]
  }
}
```

**HTTP status codes**

| Code | Meaning |
|------|---------|
| 400 | Validation error |
| 401 | Not authenticated |
| 403 | Forbidden (wrong role or suspended) |
| 404 | Resource not found |
| 500 | Server error |

---

## Roles

| Role | Description |
|------|-------------|
| `user` | Job seeker — apply, save jobs |
| `company` | Recruiter — post/manage jobs, review applications |
| `admin` | Full CMS, user management, moderation |

---

## Environment variables (API-related)

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | Database connection |
| `JWT_SECRET` | Session signing |
| `JWT_EXPIRES_IN` | JWT expiry for users (e.g. `24h`) |
| `ADMIN_JWT_EXPIRES_IN` | JWT expiry for admins (default `2h`) |
| `ADMIN_SESSION_HOURS` | Admin cookie max age in hours (default `2`) |
| `SESSION_MAX_AGE_HOURS` | User cookie max age in hours (default `24`) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for SEO/sitemap |
| ImageKit vars | Media uploads |

---

## Security notes

- All write endpoints validate input with Zod
- Job updates restricted to validated fields (no mass assignment)
- Applications scoped to applicant or job owner (IDOR protected)
- Admin cannot demote/suspend self or last admin
- Suspended users cannot apply for jobs
- File uploads: type + size validated
- **Rate limiting:** login (10 / 15 min), signup (5 / hour), contact (5 / hour) per IP
- **CSRF:** double-submit cookie on all mutating `/api/v1` routes (fetch `GET /csrf` first)
- **Sessions:** admin sessions expire after 2h by default; use `POST /auth/refresh` to extend

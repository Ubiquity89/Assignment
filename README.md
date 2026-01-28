# Startup Deals Platform

A clean, full-stack platform that helps early-stage startups discover and claim exclusive SaaS deals. Built with modern tech and a focus on user experience over feature bloat.

## What This Is

Think of it as a curated marketplace where startups can access deals they'd normally miss. We keep it simple - browse deals, claim what you need, track everything in your dashboard.

**Who it's for:**
- Startup founders watching their burn rate
- Early-stage teams trying to save on tools
- Indie hackers who need every advantage they can get

---

## How It Works

1. **Sign up** - Quick registration with email/password
2. **Browse deals** - See what's available, some are locked, some are open
3. **Claim deals** - Click to claim (locked deals need verification)
4. **Track everything** - Your dashboard shows all your claimed deals

That's it. No complex workflows, no endless features. Just what you need.

---

## Tech Stack

**Frontend:**
- Next.js 16 with App Router (latest stuff)
- TypeScript for type safety
- Tailwind CSS v4 (modern utility-first styling)
- Framer Motion for smooth animations

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT for auth (no magic, just solid security)
- REST APIs only (keep it simple)

---

## Authentication Flow

We use JWT tokens because they're reliable and stateless:

1. **Register** - Password gets hashed (never store plain text)
2. **Login** - Get a JWT token back
3. **Store token** - Lives in localStorage
4. **API calls** - Token goes in Authorization header
5. **Protected routes** - Backend checks the token

**Authorization rules:**
- Need token for most actions
- Locked deals = verified users only
- Backend enforces everything (frontend is just UI)

---

## Data Models

**User Model:**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  isVerified: Boolean (defaults to false),
  createdAt: Date
}
```

**Deal Model:**
```javascript
{
  title: String,
  description: String,
  category: String,
  partnerName: String,
  isLocked: Boolean,
  eligibilityText: String,
  createdAt: Date
}
```

**Claim Model:**
```javascript
{
  user: ObjectId (ref: User),
  deal: ObjectId (ref: Deal),
  status: String (pending/approved),
  claimedAt: Date
}
```

We use separate Claim documents because it keeps the data clean and makes reporting easier.

---

## Deal Claiming Flow

Here's what happens when you click "Claim Deal":

1. **Frontend check** - Are you logged in?
2. **API call** - POST `/api/claims/:dealId` with JWT
3. **Backend validation:**
   - Is the token valid?
   - Does the deal exist?
   - Is it locked and are you verified?
   - Did you already claim this?
4. **Create claim** - New document with "pending" status
5. **Update UI** - Deal shows as claimed, dashboard updates

Every step is logged and validated. No shortcuts.

---

## API Endpoints

**Auth:**
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Get JWT token

**Deals:**
- `GET /api/deals` - All available deals
- `GET /api/deals/:id` - Single deal details

**Claims:**
- `POST /api/claims/:dealId` - Claim a deal
- `GET /api/claims/my` - Your claimed deals

Frontend uses an Axios instance with token interceptors to keep API calls clean.

---

## UI & Animations

We focused on making it feel premium:

- **Page transitions** - Smooth route changes with Framer Motion
- **Micro-interactions** - Hover states, button feedback, card effects
- **Loading states** - Skeleton screens while data loads
- **Responsive design** - Works on mobile and desktop

Animations serve a purpose - they provide feedback and guide attention, not just decoration.

---

## Current Limitations

What we didn't build (intentionally):

- **User verification** - Currently manual (admin would approve)
- **Admin dashboard** - No backend management interface
- **Email notifications** - Claims don't trigger emails
- **Pagination** - Not needed for our demo dataset
- **Rate limiting** - Would add for production

These are trade-offs to keep the project focused on demonstrating core concepts.

---

## Production Improvements

If this were going to production:

1. **Add admin panel** - For managing deals and approving claims
2. **Implement email** - Welcome emails, claim confirmations
3. **Add caching** - Redis for deal listings
4. **Rate limiting** - Prevent abuse
5. **Monitoring** - Error tracking and performance metrics
6. **Testing** - Unit tests, integration tests, E2E tests
7. **CI/CD** - Automated deployment pipeline

---

## What We Learned

This project demonstrates:
- **Full-stack architecture** - Frontend to database
- **Security best practices** - JWT, password hashing, input validation
- **Modern React patterns** - Next.js App Router, TypeScript
- **UI/UX fundamentals** - User feedback, loading states, animations
- **API design** - RESTful endpoints, proper error handling
- **Database design** - Relationships, indexing, data integrity

---

## Getting Started

**Backend:**
```bash
cd backend
npm install
npm run dev  # Runs on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev  # Runs on http://localhost:3000
```

**Seed deals:**
```bash
cd backend
node seed-deals.js  # Adds sample deals to database
```

---

## Final Thoughts

This isn't a feature-complete SaaS platform - it's a demonstration of solid engineering practices. Every line of code has a purpose, every decision was made thoughtfully.

The focus is on **correctness over complexity**, **clarity over cleverness**, and **user experience over feature count**.

Sometimes the best products are the simplest ones.

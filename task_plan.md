# Task Plan - B.L.A.S.T. Blueprint

## North Star Goal
Deploy a full-stack, professional mobile app landing page (Apple HIG aesthetic) hosted on Vercel, integrating Firebase for the waitlist payload storage.

## Phase 1: B - Blueprint (Vision & Logic)
- [x] **Discovery Complete:** User confirmed Firebase as Source of Truth, Vercel for payload deployment, and professional Apple HIG UX.
- [x] **Data Schema:** Defined Waitlist Payload in `gemini.md`.
- [x] **Research:** Validated Firebase SDK integration path.

## Phase 2: L - Link (Connectivity)
- [ ] Ensure Firebase Project Configuration (`apiKey`, `projectId`, etc.) is available to place into `.env.local`.
- [ ] Connect Firebase SDK in the existing Vite application (`src/lib/firebase.ts`).
- [ ] Write connection verification script in `tools/verify_firebase.py` to ensure the project logic can talk to the cloud.

## Phase 3: A - Architect (The 3-Layer Build)
- [ ] **Architecture Layer:** Define `architecture/firebase_sop.md` detailing the Firestore insert function.
- [ ] **Tools Layer:** Re-write the Waitlist Form submit flow to use the Firebase SDK instead of the local Express mockup.

## Phase 4: S - Stylize (Refinement & UI)
- [ ] Wire the deterministic success/error state feedback directly to the Firebase response.
- [ ] Verify image and CSS loading performance.

## Phase 5: T - Trigger (Deployment)
- [ ] Initialize git repository if not done.
- [ ] Commit code.
- [ ] Push to GitHub.
- [ ] Connect to Vercel (User action required for Vercel linking).

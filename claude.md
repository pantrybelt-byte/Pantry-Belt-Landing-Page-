# Project Constitution

## Overview
- **North Star:** Build a deterministic, professional mobile app landing page with a waitlist.
- **Source of Truth:** Firebase (Firestore/Auth).
- **Delivery Payload:** Github repo linked and hosted on Vercel.

## Data Schemas
*See `gemini.md` for strict payload constraints.*

## Behavioral Rules
1. **Professional Grade:** The operation must look professional—not a toy. No room for error.
2. **Apple HIG UI/UX:** The UI must adhere to Apple Human Interface Guidelines (sleek, precise radii, responsive, refined spacing and haptics).
3. **Deterministic Logic:** Avoid guesswork in business logic and state management.

## Architectural Invariants
- 3-Layer Architecture applies contextually to the frontend mapping and integrations (`architecture/` SOPs dictate logic, `tools/` execute deployment checks).
- Web Client SDK manages Firebase connections natively.
- No dummy data pushed to the cloud payload.

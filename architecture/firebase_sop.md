# Architecture SOP: Firebase Waitlist

## Objective
Persist frontend waitlist signups deterministically to Firestore while maintaining absolute state synchronization with the UI success triggers.

## Inputs
JSON mapping: `name`, `email`, `phone`, `consent`.

## Process
1. Frontend captures form values and validates locally (Regex rules in `WaitlistForm.tsx`).
2. If passes, invoke `addDoc` to the `waitlist` Firestore collection.
3. Use `serverTimestamp()` to guarantee accurate temporal sequencing.
4. **Error Handling**: Bubble Firestore errors up to the UI. Do not fallback to success.
5. **Success**: Only trigger local success UI (`status = 'success'`) AFTER `addDoc` promise resolves.

## Invariants
- Never push dummy data to prod Firebase.
- Validate E.164 locally before making the network request.

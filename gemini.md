# Data Schema

## Waitlist Payload (Frontend to Firebase)
The primary payload handled by the frontend submission and stored in Firestore must strictly adhere to this schema:

```json
{
  "user_id": "string (Optional, if using Firebase Auth anonymity)",
  "name": "string (non-empty)",
  "email": "string (valid email format)",
  "phone_sms": "string (E.164 format, e.g., +14155552671)",
  "created_at": "timestamp (ISO 8601 or Firestore ServerTimestamp)"
}
```

## Firebase Architecture Requirements
- **Database:** Firestore Collection (`waitlist`)
- **Web Client SDK:** Required for writing directly to Firestore or handling anonymous auth.
- **Rules:** The database must only allow writes that contain valid data matching the schema structure.

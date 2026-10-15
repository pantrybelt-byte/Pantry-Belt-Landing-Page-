# Data Schema

## Waitlist Payload (Frontend to Firebase)
The primary payload handled by the frontend submission and stored in Firestore must strictly adhere to this schema:

```json
{
  "name": "string (non-empty, max 120 chars)",
  "email": "string (valid email format)",
  "sms_consent": "boolean (true only if the visitor checked 'Also text me launch updates')",
  "phone_sms": "string (E.164 format, e.g., +13345550123). Present ONLY when sms_consent is true",
  "created_at": "timestamp (Firestore ServerTimestamp)"
}
```

## Firebase Architecture Requirements
- **Database:** Firestore Collection (`waitlist`)
- **Web Client SDK:** Required for writing directly to Firestore or handling anonymous auth.
- **Rules:** The database must only allow writes that contain valid data matching the schema structure.

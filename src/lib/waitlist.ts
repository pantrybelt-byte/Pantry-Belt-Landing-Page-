import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/** Saves a launch-notification signup. A phone number is only included together with an SMS opt-in. */
export async function addWaitlistEntry(entry: { name: string; email: string; smsConsent: boolean; phoneSms: string | null }) {
  await addDoc(collection(db, "waitlist"), {
    name: entry.name,
    email: entry.email,
    sms_consent: entry.smsConsent,
    ...(entry.smsConsent && entry.phoneSms ? { phone_sms: entry.phoneSms } : {}),
    created_at: serverTimestamp(),
  });
}

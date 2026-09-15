import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const creds = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      admin.initializeApp({
        credential: admin.credential.cert(creds),
      });
    } else if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID || 'pantrybelt-1e7eb',
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
    } else {
      admin.initializeApp({
        projectId: process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID || 'pantrybelt-1e7eb',
      });
    }
  } catch (e) {
    console.error('[Waitlist API] Firebase admin initialization error:', e);
  }
}

export default async function handler(req: any, res: any) {
  // CORS support
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, phone_sms, consent, source, error_code } = req.body || {};

  if (!name || !email || (!phone && !phone_sms)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const waitlistEntry = {
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    phone_sms: String(phone_sms || phone).trim(),
    consent: consent !== undefined ? !!consent : true,
    source: source || 'fallback_api',
    client_error: error_code || null,
    created_at: new Date().toISOString(),
  };

  console.log('[Waitlist Backup API] Received waitlist entry:', waitlistEntry);

  let savedToFirestore = false;
  try {
    const db = admin.firestore();
    await db.collection('waitlist').add({
      ...waitlistEntry,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
    });
    savedToFirestore = true;
    console.log('[Waitlist Backup API] Successfully saved to Firestore via Admin SDK');
  } catch (adminErr) {
    console.error('[Waitlist Backup API] Admin SDK write failed:', adminErr);
  }

  return res.status(200).json({
    success: true,
    savedToFirestore,
    message: 'Waitlist signup successfully recorded',
  });
}

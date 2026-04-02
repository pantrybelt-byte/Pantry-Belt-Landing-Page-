import express from 'express';
import dotenv from 'dotenv';

// Load environment variables (e.g. Supabase, Twilio, SendGrid keys)
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Mock Supabase Client setup
const supabaseMock = {
  from: (table) => ({
    insert: async (data) => {
      console.log(`[Supabase Mock] Inserting into ${table}:`, data);
      return { data, error: null };
    }
  })
};

// Mock Twilio Setup
const twilioMock = {
  messages: {
    create: async ({ body, from, to }) => {
      console.log(`[Twilio Mock] Sending SMS to ${to}: "${body}"`);
      return { sid: 'mock_sid_12345' };
    }
  }
};

// Mock SendGrid Setup
const sendgridMock = {
  send: async (msg) => {
    console.log(`[SendGrid Mock] Sending Email to ${msg.to}: "${msg.subject}"`);
    return [{ statusCode: 202 }];
  }
};


// Waitlist Submission Endpoint
app.post('/api/waitlist', async (req, res) => {
  const { name, email, phone, consent } = req.body;

  // 1. Basic Backend Validation
  if (!name || !email || !phone || consent === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // 2. Format validation (E.164 sanity check on backend)
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone format, must be E.164' });
  }

  try {
    // 3. Database Insertion (Supabase)
    const { error: dbError } = await supabaseMock.from('waitlist').insert({
      name,
      email,
      phone,
      sms_consent: consent,
      created_at: new Date().toISOString()
    });

    if (dbError) throw new Error('Database insertion failed');

    // 4. Send Confirmation Email via Sendgrid
    await sendgridMock.send({
      to: email,
      from: 'hello@pantrybelt.com',
      subject: 'Welcome to the Pantry Belt Waitlist!',
      text: `Hi ${name},\n\nThank you for reserving your spot. We will notify you when Pantry Belt is available in your area.\n\nBest,\nThe Pantry Belt Team`
    });

    // 5. Send A2P Compliant SMS Confirmation via Twilio
    // Note: Ensuring the first message complies with opt-out requirements
    if (consent) {
      await twilioMock.messages.create({
        body: `Pantry Belt: Hi ${name}, you're on the waitlist! We'll text you updates. Reply STOP to opt out.`,
        from: process.env.TWILIO_PHONE_NUMBER || '+15550000000',
        to: phone
      });
    }

    return res.status(200).json({ success: true, message: 'Successfully joined waitlist' });
  } catch (error) {
    console.error('Waitlist Error:', error);
    return res.status(500).json({ error: 'Internal server error processing waitlist' });
  }
});

// For demonstration purposes
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Backend mock running at http://localhost:${port}`);
  });
}

export default app;

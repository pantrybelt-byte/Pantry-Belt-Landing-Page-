import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

admin.initializeApp();

export const onWaitlistSignup = onDocumentCreated("waitlist/{docId}", async (event) => {
    const snap = event.data;
    if (!snap) return;
    const data = snap.data();
    
    if (!data.email) {
      console.log("No email found for waitlist entry:", snap.id);
      return null;
    }

    try {
      // Write to the 'mail' collection to trigger the extension
      await admin.firestore().collection("mail").add({
        to: data.email,
        message: {
          subject: "Welcome to the Pantry Belt Waitlist!",
          html: `
            <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #1d1d1f; font-weight: 600;">Hi ${data.name || 'there'},</h2>
              <p style="color: #424245; line-height: 1.6; font-size: 16px;">
                Thank you for reserving your spot on the waitlist! We are thrilled to have you as a pioneer.
              </p>
              <p style="color: #424245; line-height: 1.6; font-size: 16px;">
                We will update you via email and SMS the moment Pantry Belt launches in your area.
              </p>
              <br/>
              <p style="color: #424245; line-height: 1.6; font-size: 16px;">
                Best regards,<br/>
                <strong>The Pantry Belt Team</strong>
              </p>
            </div>
          `,
        },
      });
      console.log("Successfully queued welcome email for:", data.email);
    } catch (error) {
      console.error("Error creating mail document:", error);
    }
    
    return null;
  });

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
          subject: "Welcome to the AccessBelt Waitlist!",
          html: `
            <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #1d1d1f; font-weight: 600;">Hi ${data.name || 'there'},</h2>
              <p style="color: #424245; line-height: 1.6; font-size: 16px;">
                Thank you for reserving your spot on the waitlist! We are thrilled to have you as a pioneer.
              </p>
              <p style="color: #424245; line-height: 1.6; font-size: 16px;">
                We will update you via email and SMS the moment AccessBelt launches in your area.
              </p>
              <br/>
              <p style="color: #424245; line-height: 1.6; font-size: 16px;">
                Best regards,<br/>
                <strong>The AccessBelt Team</strong>
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

export const onAndroidTesterSignup = onDocumentCreated("android_testers/{docId}", async (event) => {
    const snap = event.data;
    if (!snap) return;
    const data = snap.data();

    if (!data.email) {
      console.log("No email found for android tester entry:", snap.id);
      return null;
    }

    try {
      await admin.firestore().collection("mail").add({
        to: data.email,
        bcc: "getaccessbelt@gmail.com",
        message: {
          subject: "AccessBelt Android Beta — Testing Link & Next Steps",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1d1d1f; line-height: 1.6;">
              <div style="margin-bottom: 24px;">
                <h2 style="color: #1d1d1f; font-size: 22px; font-weight: 600; margin-bottom: 6px;">AccessBelt Android Beta — Next Steps</h2>
                <p style="color: #6e6e73; font-size: 14px; margin-top: 0;">Rural Food Pantry Access Across Alabama's Black Belt</p>
              </div>
              
              <p style="font-size: 15px; color: #1d1d1f;">Hi there,</p>
              
              <p style="font-size: 15px; color: #333336;">
                Thank you for requesting clearance to test the AccessBelt Android Beta! We have received your email (<strong>${data.email}</strong>) and are adding your account to our Google Play Console tester roster.
              </p>
              
              <div style="background-color: #f5f5f7; border-left: 4px solid #34a853; border-radius: 4px; padding: 14px 18px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px; color: #1d1d1f; font-weight: 600;">
                  🕒 Authorization Window: 1–2 Hours
                </p>
                <p style="margin: 6px 0 0 0; font-size: 13px; color: #555558;">
                  Google Play Console processes closed tester roster additions in batches. Once your account is authorized (typically within 1 to 2 hours), follow the link below to opt in and install.
                </p>
              </div>
              
              <div style="margin: 28px 0; text-align: center;">
                <a href="https://play.google.com/apps/testing/com.accessbelt.app" style="background-color: #34a853; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; padding: 12px 24px; border-radius: 8px; display: inline-block;">
                  Open Closed Beta (Opt In & Install)
                </a>
              </div>

              <p style="font-size: 13px; color: #6e6e73;">
                <strong>Direct Link:</strong> <a href="https://play.google.com/apps/testing/com.accessbelt.app" style="color: #0071e3;">https://play.google.com/apps/testing/com.accessbelt.app</a>
              </p>
              
              <p style="font-size: 13px; color: #6e6e73;">
                <em>Note: If Google Play displays "App unavailable", roster clearance is still syncing—please check the link again once the 1–2 hour window has elapsed.</em>
              </p>
              
              <hr style="border: none; border-top: 1px solid #e5e5ea; margin: 24px 0;" />
              
              <p style="font-size: 13px; color: #86868b; margin-bottom: 4px;">
                Questions or feedback? Reply directly to this email or reach us at <a href="mailto:getaccessbelt@gmail.com" style="color: #0071e3;">getaccessbelt@gmail.com</a>.
              </p>
              <p style="font-size: 13px; color: #86868b; margin-top: 0;">
                — The AccessBelt Team
              </p>
            </div>
          `,
        },
      });
      console.log("Successfully queued android beta clearance email for:", data.email);
    } catch (error) {
      console.error("Error creating mail document for android tester:", error);
    }

    return null;
});


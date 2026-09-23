import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_rmzpmy8";
const TEMPLATE_ID = "template_aame1fj";
const PUBLIC_KEY = "JYLUvfZXNx45FJmBs";

/**
 * Sends automated Android Beta Clearance instructions to tester with direct Google Play link.
 */
export async function sendBetaClearanceEmail(recipientEmail: string): Promise<void> {
  const htmlMessage = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1d1d1f; line-height: 1.6;">
      <div style="margin-bottom: 24px;">
        <h2 style="color: #1d1d1f; font-size: 22px; font-weight: 600; margin-bottom: 6px;">AccessBelt Android Beta — Next Steps</h2>
        <p style="color: #6e6e73; font-size: 14px; margin-top: 0;">Rural Food Pantry Access Across Alabama's Black Belt</p>
      </div>
      
      <p style="font-size: 15px; color: #1d1d1f;">Hi there,</p>
      
      <p style="font-size: 15px; color: #333336;">
        Thank you for requesting clearance to test the AccessBelt Android Beta! We have received your email (<strong>${recipientEmail}</strong>) and are adding your account to our Google Play Console tester roster.
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
  `;

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      to_email: recipientEmail,
      email: recipientEmail,
      user_email: recipientEmail,
      recipient_email: recipientEmail,
      to_name: recipientEmail.split("@")[0],
      name: recipientEmail.split("@")[0],
      subject: "AccessBelt Android Beta — Testing Link & Next Steps",
      message: htmlMessage,
    },
    PUBLIC_KEY
  );
}

/**
 * Sends welcome confirmation email to new waitlist signups.
 */
export async function sendWaitlistWelcomeEmail(name: string, recipientEmail: string): Promise<void> {
  const htmlMessage = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1d1d1f; line-height: 1.6;">
      <div style="margin-bottom: 24px;">
        <h2 style="color: #1d1d1f; font-size: 22px; font-weight: 600; margin-bottom: 6px;">Welcome to AccessBelt!</h2>
        <p style="color: #6e6e73; font-size: 14px; margin-top: 0;">Connecting Rural Communities with Essential Food Resources</p>
      </div>
      
      <p style="font-size: 15px; color: #1d1d1f;">Hi ${name || "there"},</p>
      
      <p style="font-size: 15px; color: #333336;">
        Thank you for reserving your spot on the AccessBelt waitlist! We are thrilled to have you as a pantry pioneer.
      </p>
      
      <p style="font-size: 15px; color: #333336;">
        We will notify you via email and SMS the moment AccessBelt expands and launches in your area.
      </p>
      
      <div style="background-color: #f5f5f7; border-left: 4px solid #0071e3; border-radius: 4px; padding: 14px 18px; margin: 20px 0;">
        <p style="margin: 0; font-size: 14px; color: #1d1d1f; font-weight: 600;">
          Want to test the app early?
        </p>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #555558;">
          Our public beta is live on iOS (Apple TestFlight) and Android (Google Play Closed Testing). You can install the preview build at any time:
        </p>
        <p style="margin: 10px 0 0 0;">
          <a href="https://accessbelt.org/beta" style="color: #0071e3; font-weight: 600; font-size: 13px; text-decoration: underline;">
            Explore the Beta Testing Portal →
          </a>
        </p>
      </div>

      <hr style="border: none; border-top: 1px solid #e5e5ea; margin: 24px 0;" />
      
      <p style="font-size: 13px; color: #86868b; margin-bottom: 4px;">
        Best regards,
      </p>
      <p style="font-size: 14px; color: #1d1d1f; font-weight: 600; margin-top: 0;">
        The AccessBelt Team
      </p>
    </div>
  `;

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      to_email: recipientEmail,
      email: recipientEmail,
      user_email: recipientEmail,
      recipient_email: recipientEmail,
      to_name: name,
      name: name,
      subject: "Welcome to the AccessBelt Waitlist!",
      message: htmlMessage,
    },
    PUBLIC_KEY
  );
}

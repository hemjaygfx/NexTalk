import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";


export const sendWelcomeEmail = async (email, name, clientURL) => {
  console.log(`Sending welcome email to: ${email}`);
  console.log(`Using sender: ${sender.name} <${sender.email}>`);

  const payload = {
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to NexTalk Community!",
    html: createWelcomeEmailTemplate(name, clientURL),
  };

  const { data, error } = await resendClient.emails.send(payload);

  if (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }

  console.log("Welcome Email sent successfully", data);
};

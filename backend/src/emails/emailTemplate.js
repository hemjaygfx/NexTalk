
function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function sanitizeClientUrl(clientURL) {
    if (typeof clientURL !== 'string') {
        return '#';
    }

    const trimmedValue = clientURL.trim();
    if (!trimmedValue) {
        return '#';
    }

    try {
        const parsedUrl = new URL(trimmedValue);
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
            return '#';
        }
        return escapeHtml(parsedUrl.toString());
    } catch {
        return '#';
    }
}

export function createWelcomeEmailTemplate(name, clientURL) {
    const safeName = escapeHtml(name);
    const safeClientURL = sanitizeClientUrl(clientURL);

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to NexTalk</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #d4d4d4; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0f;">
  <div style="background: linear-gradient(135deg, #1a1a24 0%, #0d0d12 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0; border: 1px solid #2a2a35; border-bottom: none;">
    <div style="display: inline-block; margin-bottom: 20px;">
    <span style="font-family: 'Playfair Display', Georgia, serif; font-size: 36px; font-weight: 700; color: #d4af37; letter-spacing: 1px;">NexTalk</span>
    </div>
    <h1 style="font-family: 'Playfair Display', Georgia, serif; color: #f5f5f0; margin: 0; font-size: 26px; font-weight: 500;">Welcome, ${safeName}</h1>
    </div>
    <div style="background-color: #12121a; padding: 35px; border-radius: 0 0 12px 12px; border: 1px solid #2a2a35; border-top: none; box-shadow: 0 4px 20px rgba(0,0,0,0.4);">
    <p style="font-size: 16px; color: #d4d4d4; margin-top: 0;">We're glad to have you on NexTalk — a space for real-time conversations with the people who matter to you, wherever they are.</p>
    
    <div style="background-color: #1a1a24; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 3px solid #d4af37;">
      <p style="font-size: 16px; margin: 0 0 15px 0; color: #f5f5f0;"><strong>Get started in a few steps:</strong></p>
      <ul style="padding-left: 20px; margin: 0; color: #b8b8b8;">
      <li style="margin-bottom: 10px;">Set up your profile picture</li>
      <li style="margin-bottom: 10px;">Find and add your contacts</li>
      <li style="margin-bottom: 10px;">Start a conversation</li>
      <li style="margin-bottom: 0;">Share photos, videos, and more</li>
      </ul>
      </div>
      
    <div style="text-align: center; margin: 30px 0;">
      <a href="${safeClientURL}" style="background: linear-gradient(135deg, #d4af37 0%, #b8932e 100%); color: #0a0a0f; text-decoration: none; padding: 13px 34px; border-radius: 50px; font-weight: 600; display: inline-block; letter-spacing: 0.3px;">Open NexTalk</a>
    </div>

    <p style="margin-bottom: 5px; color: #b8b8b8;">If you need any help or have questions, we're always here to assist you.</p>
    <p style="margin-top: 0; color: #b8b8b8;">Happy messaging!</p>
    
    <p style="margin-top: 25px; margin-bottom: 0; color: #d4d4d4;">Best regards,<br><span style="color: #d4af37;">The NexTalk Team</span></p>
    </div>
    
    <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
    <p>© 2026 NexTalk. All rights reserved.</p>
    <p>
    <a href="#" style="color: #d4af37; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
    <a href="#" style="color: #d4af37; text-decoration: none; margin: 0 10px;">Terms of Service</a>
    <a href="#" style="color: #d4af37; text-decoration: none; margin: 0 10px;">Contact Us</a>
    </p>
  </div>
</body>
</html>

  `;
}
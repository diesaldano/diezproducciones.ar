/**
 * Email configuration
 * Flexible para usar diferentes proveedores (NodeMailer, Resend, SendGrid, etc.)
 */

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  otherSubject?: string;
  message: string;
}

/**
 * Envía un email de contacto
 * Puede ser reemplazado por Resend, SendGrid, NodeMailer, etc.
 */
export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  const { name, email, subject, otherSubject, message } = data;

  // Determinar asunto final
  const finalSubject = subject === 'otro' ? otherSubject : subject;

  try {
    // Opción 1: Resend (si está configurado)
    if (process.env.RESEND_API_KEY) {
      return await sendViaResend({ name, email, subject: finalSubject, message });
    }

    // Opción 2: NodeMailer (si está configurado)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      return await sendViaNodeMailer({ name, email, subject: finalSubject, message });
    }

    // Opción 3: Webhook (para servicios como Make, Zapier, etc.)
    if (process.env.WEBHOOK_URL) {
      return await sendViaWebhook({ name, email, subject: finalSubject, message });
    }

    // Si no hay proveedor configurado, usar consola en dev
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Contact form message (dev mode):', { name, email, subject: finalSubject, message });
      return { success: true };
    }

    return { success: false, error: 'Email service not configured' };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return { success: false, error: 'Failed to send message' };
  }
}

/**
 * Envía email vía Resend
 */
async function sendViaResend({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: process.env.CONTACT_EMAIL || 'diez.producciones.arg@gmail.com',
        reply_to: email,
        ...(process.env.CONTACT_BCC_EMAIL && { bcc: process.env.CONTACT_BCC_EMAIL }),
        subject: `[CONTACTO] ${subject || 'Nuevo mensaje'} - ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Asunto:</strong> ${escapeHtml(subject || 'Sin especificar')}</p>
            <hr />
            <p><strong>Mensaje:</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`Resend API error: ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Resend error:', error);
    return { success: false, error: 'Failed to send via Resend' };
  }
}

/**
 * Envía email vía NodeMailer
 */
async function sendViaNodeMailer({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    // Import nodemailer safely - optional dependency
    let nodemailer;
    try {
      nodemailer = await import('nodemailer');
    } catch {
      console.error('NodeMailer not installed. Install with: npm install nodemailer');
      return { success: false, error: 'Email service not configured (nodemailer not installed)' };
    }

    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || 'diez.producciones.arg@gmail.com',
      ...(process.env.CONTACT_BCC_EMAIL && { bcc: process.env.CONTACT_BCC_EMAIL }),
      replyTo: email,
      subject: `[CONTACTO] ${subject || 'Nuevo mensaje'} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Asunto:</strong> ${escapeHtml(subject || 'Sin especificar')}</p>
          <hr />
          <p><strong>Mensaje:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('NodeMailer error:', error);
    return { success: false, error: 'Failed to send via NodeMailer' };
  }
}

/**
 * Envía email vía Webhook (Make, Zapier, etc.)
 */
async function sendViaWebhook({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(process.env.WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Webhook error: ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Webhook error:', error);
    return { success: false, error: 'Failed to send via webhook' };
  }
}

/**
 * Sanitiza HTML para prevenir XSS
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

/**
 * Rate limiting simple en memoria
 * En producción usar Redis o similar
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(ip: string): string {
  return `contact-form:${ip}`;
}

function checkRateLimit(ip: string, maxRequests: number = 5, windowMs: number = 3600000): boolean {
  const key = getRateLimitKey(ip);
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * Valida los datos del formulario
 */
function validateContactData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Name validation
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Name is required');
  } else if (data.name.length > 100) {
    errors.push('Name is too long');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Invalid email address');
  } else if (data.email.length > 255) {
    errors.push('Email is too long');
  }

  // Subject validation (custom asunto)
  if (!data.subject || typeof data.subject !== 'string' || data.subject.trim().length === 0) {
    errors.push('Subject is required');
  } else if (data.subject.length > 200) {
    errors.push('Subject is too long');
  }

  // Message validation
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  } else if (data.message.length > 5000) {
    errors.push('Message is too long');
  }

  return { valid: errors.length === 0, errors };
}

/**
 * POST /api/contact
 * Handles contact form submissions securely
 */
export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Rate limiting check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Validate data
    const validation = validateContactData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors[0] },
        { status: 400 }
      );
    }

    // Send email
    const emailResult = await sendContactEmail({
      name: body.name.trim(),
      email: body.email.trim(),
      subject: body.subject.trim(),
      message: body.message.trim(),
    });

    if (!emailResult.success) {
      console.error('Failed to send contact email:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Contact message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/contact
 * CORS preflight for contact form
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

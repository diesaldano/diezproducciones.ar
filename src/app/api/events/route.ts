import { NextResponse } from 'next/server';
import { getEventsSummary } from '@/lib/mock-data';

/**
 * GET /api/events
 * Returns list of published events (summary)
 */
export async function GET() {
  const events = getEventsSummary();
  return NextResponse.json(events);
}

'use client';

import { GoogleAnalytics } from '@next/third-parties/google';

interface GTMProps {
  gtmId: string;
}

export function GTM({ gtmId }: GTMProps) {
  return <GoogleAnalytics gaId={gtmId} />;
}

/**
 * Track custom events
 * Usage: trackEvent('event_name', { param: 'value' })
 */
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
}

/**
 * Track page views (conversión a preventa)
 */
export function trackPageView(pageName: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_title: pageName,
      page_path: window.location.pathname,
    });
  }
}

/**
 * Track CTA clicks (button presses, links)
 */
export function trackCtaClick(ctaName: string, label?: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'cta_click', {
      cta_name: ctaName,
      cta_label: label || 'unnamed',
    });
  }
}

/**
 * Track conversions (like going to preventa)
 */
export function trackConversion(conversionType: string, value?: number) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      conversion_type: conversionType,
      value: value || 1,
    });
  }
}

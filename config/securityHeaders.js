// Static-host candidate policy: promote to enforcement on the selected HTTPS host
// only after its Report-Only checks. See docs/security-deployment.md.
export const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' https://googleapis.com https://*.googleapis.com https://*.gstatic.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://*.googleapis.com https://*.gstatic.com https://*.googleusercontent.com https://*.google.com https://*.ggpht.com",
  "connect-src 'self' https://googleapis.com https://*.googleapis.com https://*.gstatic.com https://*.google.com",
  "font-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
].join('; ');

export const securityHeaders = (enforce = false) => ({
  [enforce ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only']: contentSecurityPolicy,
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(self), camera=(), microphone=(), payment=()',
});

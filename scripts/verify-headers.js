import assert from 'node:assert/strict';

// Read-only validation: never contacts Google or submits location data.
const args = process.argv.slice(2);
const reportOnly = args.includes('--report-only');
const local = args.includes('--local');
const target = args.find((arg) => !arg.startsWith('--'));
if (!target || args.some((arg) => arg.startsWith('--') && !['--report-only', '--local'].includes(arg))) {
  console.error('Usage: npm run verify:headers -- https://YOUR-HOST [--report-only] [--local]');
  process.exit(1);
}

try {
  const base = new URL(target);
  assert(!base.username && !base.password, 'Use a URL without embedded credentials.');
  const isLoopback = ['localhost', '127.0.0.1', '[::1]'].includes(base.hostname);
  assert(base.protocol === 'https:' || (local && isLoopback && base.protocol === 'http:'), 'HTTPS is required; --local permits HTTP only on loopback.');
  const expected = {
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY',
    'referrer-policy': 'strict-origin-when-cross-origin',
  };
  for (const path of ['/', '/terms.html', '/privacy.html']) {
    const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(15000) });
    assert.equal(response.status, 200, `${path}: expected HTTP 200`);
    assert.equal(new URL(response.url).origin, base.origin, `${path}: unexpected cross-origin redirect`);
    assert.match(response.headers.get('content-type') || '', /text\/html/i, `${path}: expected HTML`);
    for (const [name, value] of Object.entries(expected)) {
      assert.equal(response.headers.get(name), value, `${path}: missing or incorrect ${name}`);
    }
    const permissions = response.headers.get('permissions-policy') || '';
    for (const directive of ['geolocation=(self)', 'camera=()', 'microphone=()', 'payment=()']) {
      assert(permissions.split(',').map((entry) => entry.trim()).includes(directive), `${path}: missing permission restriction ${directive}`);
    }
    const name = reportOnly ? 'content-security-policy-report-only' : 'content-security-policy';
    const policy = response.headers.get(name) || '';
    const directives = new Map(policy.split(';').map((entry) => {
      const [directive, ...values] = entry.trim().split(/\s+/);
      return [directive, values];
    }));
    assert.deepEqual(directives.get('default-src'), ["'self'"], `${path}: restrict default-src to self`);
    for (const directive of ['object-src', 'frame-ancestors']) {
      assert.deepEqual(directives.get(directive), ["'none'"], `${path}: expected ${directive} none`);
    }
    assert.deepEqual(directives.get('base-uri'), ["'self'"], `${path}: restrict base-uri to self`);
    const scripts = directives.get('script-src') || [];
    assert(scripts.includes("'self'") && scripts.includes('https://*.googleapis.com'), `${path}: missing app/Google script sources`);
    assert(!scripts.some((source) => ["'unsafe-inline'", "'unsafe-eval'", '*', 'https:'].includes(source)), `${path}: unexpected script relaxation`);
    if (base.protocol === 'https:') {
      const hsts = response.headers.get('strict-transport-security') || '';
      assert(/(?:^|;)\s*max-age=([1-9]\d*)(?:;|$)/i.test(hsts), `${path}: missing active HSTS`);
    }
    const html = await response.text();
    if (path !== '/') {
      assert(html.includes(path === '/privacy.html' ? 'Privacy notice' : 'Terms of use'), `${path}: incorrect legal page`);
      assert(!/maps\.googleapis\.com|<script\b/i.test(html), `${path}: legal page must work independently of JavaScript/Google`);
    } else {
      assert(!/<script\b[^>]*>(?!\s*<\/script>)[\s\S]*?<\/script>/i.test(html), `${path}: unexpected inline script`);
    }
    console.log(`${path}: headers and page pass (${reportOnly ? 'Report-Only' : 'enforced'} CSP)`);
  }
  console.log('Passed. Still verify browser behaviour, framing, HTTPS redirects and host settings before launch.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}

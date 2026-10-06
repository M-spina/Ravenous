# Dependency security baseline

Validated on 5 October 2026 using Node 24 and npm 11.

- Before: 20 affected packages (13 high, 7 moderate).
- After compatible updates and shadcn CLI removal: npm audit reports 0 vulnerabilities, including development dependencies.
- Vitest and its companion packages now use the patched 4.1.11 release.
- No audit exceptions, forced major upgrades, or vulnerable-version overrides were introduced.

The removed shadcn stylesheet defines accordion, scroll-fade, shimmer, no-scrollbar and custom data-state variants. None is used by the current source. The existing UI primitives remain in the repository. A baseline production build was captured before removal; browser checks after removal exercised the search form, autocomplete, restaurant photos and sorting on localhost. The 127.0.0.1 origin did not support Google requests; key configuration was left unchanged.

Validation: clean npm ci, lint, all 46 tests, production build, and full npm audit. CI now rejects high/critical findings across the whole installed dependency tree. Use Node 24 (`nvm use`) to match CI.

A package being installed does not establish browser exposure: assess future findings by dependency path, affected functionality, input trust and deployment context. Build dependencies still matter to developer and CI security. Any future exception requires a specific advisory, rationale, mitigation, owner and review date; this release has none.

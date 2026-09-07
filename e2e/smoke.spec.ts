import { expect, test } from '@playwright/test';

test('the landing page states the promise and is reachable by keyboard', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Know where your experiment can actually happen',
  );

  // The skip link is visually hidden until focused, so assert it exists and that
  // the first Tab reaches it - that is the whole point of a skip link.
  const skipLink = page.getByRole('link', { name: 'Skip to main content' });
  await expect(skipLink).toBeAttached();
  await page.keyboard.press('Tab');
  await expect(skipLink).toBeFocused();

  // aria-disabled rather than disabled: a `disabled` button leaves the tab order,
  // so a screen-reader user would never reach the explanation of why search is
  // unavailable. This asserts the control is still reachable AND still announced
  // as unavailable.
  const cta = page.getByRole('button', { name: 'Find a facility' });
  await expect(cta).toHaveAttribute('aria-disabled', 'true');
  await expect(page.locator('#search-availability')).toBeVisible();
});

test('the health endpoint degrades honestly when no database is configured', async ({
  request,
}) => {
  // This suite runs deliberately WITHOUT a database - webServer overrides
  // DATABASE_URL to '' - so it tests the misconfiguration path, which needs no
  // infrastructure and is therefore the same everywhere.
  //
  // From Phase 1 a missing database is a misconfiguration rather than a
  // documented state, so a platform health check must fail loudly. Before
  // Phase 1 this same request returned 200/ok; the change is deliberate.
  //
  // A database-backed run covering /techniques and the REACHABLE path arrives
  // with the facilities slice, when the infrastructure cost buys something.
  const response = await request.get('/api/health');
  expect(response.status()).toBe(503);

  const body = await response.json();
  expect(body.service).toBe('facilitypass');
  expect(body.status).toBe('degraded');

  expect(body.checks.database.configured).toBe(false);
  expect(body.checks.database.connectivity).toBe('NOT_CHECKED');
  // Never claim reachability we did not establish.
  expect(body.checks.database.connectivity).not.toBe('REACHABLE');

  // The detail is for operators and must never carry a connection string.
  expect(body.checks.database.detail).not.toContain('://');
});

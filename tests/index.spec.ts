import { test, expect } from '@playwright/test';

const SELECTORS = {
	CUSTOM_QUERY_FORM: '[data-testid="custom-query-form"]',
	CUSTOM_QUERY_FIELD: '[data-testid="custom-query-field"]',
	CUSTOM_QUERY_SUBMIT: '[data-testid="custom-query-form"] [type="submit"]',
	CUSTOM_QUERY_RESET: '[data-testid="custom-query-reset"]',
};

test.describe('Custom Query Form Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('it renders', ({ page }) => {
		page.getByTestId('custom-query-form').waitFor({
			timeout: 1000,
		});

		expect(page.getByTestId('custom-query-form')).toBeVisible();
		expect(page.getByTestId('custom-query-field')).toBeVisible();
		expect(page.locator(SELECTORS.CUSTOM_QUERY_SUBMIT)).toBeVisible();
		expect(page.locator(SELECTORS.CUSTOM_QUERY_RESET)).toBeVisible();

		expect(page.locator('table-no-query')).toBeVisible();
	});

	test('it shows error message on invalid query', async ({ page }) => {
		await page.fill(SELECTORS.CUSTOM_QUERY_FIELD, 'invalid query');
		await page.click(SELECTORS.CUSTOM_QUERY_SUBMIT);

		expect(page.locator('custom-query-error')).toBeVisible();
	});

	test('it resets the form on reset button click', async ({ page }) => {
		await page.fill(SELECTORS.CUSTOM_QUERY_FIELD, 'invalid query');
		await page.click(SELECTORS.CUSTOM_QUERY_RESET);

		expect(page.locator('custom-query-error')).not.toBeVisible();
	});

	test('it shows table on valid query', async ({ page }) => {
		await page.fill(SELECTORS.CUSTOM_QUERY_FIELD, 'SELECT * FROM users');
		await page.click(SELECTORS.CUSTOM_QUERY_SUBMIT);

		expect(page.locator('table-rows-count')).toBeVisible();
	});
});

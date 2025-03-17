import { test, expect } from '@playwright/test';

test.describe('Root Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('it renders', ({ page }) => {
		expect(page.getByTestId('header')).toBeVisible();
		expect(page.getByTestId('main')).toBeVisible();

		expect(page.getByTestId('logo-link')).toHaveAttribute('href', '/');
		expect(page.getByTestId('logo-img')).toBeVisible();

		expect(page.getByTestId('header-nav')).toBeVisible();

		const homeLink = page.getByTestId('nav-link-/');
		expect(homeLink).toHaveText('Home');
		expect(homeLink).toHaveAttribute('href', '/');

		const queryBuilderLink = page.getByTestId('nav-link-/query-builder');
		expect(queryBuilderLink).toHaveText('Query Builder');
		expect(queryBuilderLink).toHaveAttribute('href', '/query-builder');
	});
});

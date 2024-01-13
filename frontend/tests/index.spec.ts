import { test, expect } from "@playwright/test";

const url = "http://localhost:3000";

test("deleted rows updates count", async ({ page }) => {
    await page.goto(url);

    // Expect count to be 4
    const count = page.locator('[data-test-handle="contact-count"]');
    const countText = await count.textContent();
    const initialCount = parseInt(countText ?? "");

    // Delete one row and expect count to decrease to 3
    const row2DeleteButton = page.locator('[data-test-handle="delete-row-2"]');
    await row2DeleteButton.click();
    await expect(count).toContainText(`${initialCount - 1}`);

    // Delete all and expect count to become 0 and empty table to show
    const deleteAllButton = page.locator('[data-test-handle="delete-all"]');
    await deleteAllButton.click();
    await expect(count).toContainText("0");
    const isEmpty = await page.isVisible('[data-test-handle="empty-table"]');
    await expect(isEmpty).toBe(true);
});
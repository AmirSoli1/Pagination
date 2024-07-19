import { Page } from "@playwright/test";

const { test, describe, expect, beforeEach } = require("@playwright/test");

describe("Note app", () => {
  beforeEach(async ({ page }: { page: Page }) => {
    await page.goto("http://localhost:3000");
  });

  test("fill name", async ({ page }: { page: Page }) => {
    await page.fill('input[name="create_user_form_name"]', "testUser");
    await expect(
      page.locator('input[name="create_user_form_name"]')
    ).toHaveValue("testUser");
  });

  test("fill email", async ({ page }: { page: Page }) => {
    await page.fill('input[name="create_user_form_email"]', "test@email.com");
    await expect(
      page.locator('input[name="create_user_form_email"]')
    ).toHaveValue("test@email.com");
  });

  test("fill username", async ({ page }: { page: Page }) => {
    await page.fill('input[name="create_user_form_name"]', "testUserName");
    await expect(
      page.locator('input[name="create_user_form_name"]')
    ).toHaveValue("testUserName");
  });

  test("fill password", async ({ page }: { page: Page }) => {
    await page.fill('input[name="create_user_form_password"]', "testPassword");
    await expect(
      page.locator('input[name="create_user_form_password"]')
    ).toHaveValue("testPassword");
  });

  test("fill login username", async ({ page }: { page: Page }) => {
    await page.fill('input[name="login_form_username"]', "testUserName");
    await expect(page.locator('input[name="login_form_username"]')).toHaveValue(
      "testUserName"
    );
  });
});

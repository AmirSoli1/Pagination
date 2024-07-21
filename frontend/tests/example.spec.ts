import { Page } from "@playwright/test";

const { test, describe, expect, beforeEach } = require("@playwright/test");

describe("Note app", () => {
  beforeEach(async ({ page }: { page: Page }) => {
    await page.goto("http://localhost:3000");
  });

  test("check if name input exists", async ({ page }: { page: Page }) => {
    await page.fill('input[name="create_user_form_name"]', "testUser");
    await expect(
      page.locator('input[name="create_user_form_name"]')
    ).toHaveValue("testUser");
  });

  test("check if email input exists", async ({ page }: { page: Page }) => {
    await page.fill('input[name="create_user_form_email"]', "test@email.com");
    await expect(
      page.locator('input[name="create_user_form_email"]')
    ).toHaveValue("test@email.com");
  });

  test("check if username input exists", async ({ page }: { page: Page }) => {
    await page.fill('input[name="create_user_form_name"]', "testUserName");
    await expect(
      page.locator('input[name="create_user_form_name"]')
    ).toHaveValue("testUserName");
  });

  test("check if password input exists", async ({ page }: { page: Page }) => {
    await page.fill('input[name="create_user_form_password"]', "testPassword");
    await expect(
      page.locator('input[name="create_user_form_password"]')
    ).toHaveValue("testPassword");
  });

  test("register and login", async ({ page }: { page: Page }) => {
    await page.locator('input[name="create_user_form_name"]').click();
    await page.locator('input[name="create_user_form_name"]').fill("testName");
    await page.locator('input[name="create_user_form_email"]').click();
    await page
      .locator('input[name="create_user_form_email"]')
      .fill("test@mail.com");
    await page.locator('input[name="create_user_form_username"]').click();
    await page
      .locator('input[name="create_user_form_username"]')
      .fill("testUsername");
    await page.locator('input[name="create_user_form_password"]').click();
    await page
      .locator('input[name="create_user_form_password"]')
      .fill("testPassword");
    await page.getByRole("button", { name: "Create User" }).click();
    await page.getByTestId("username").click();
    await page.getByTestId("username").fill("testUsername");
    await page.getByTestId("password").click();
    await page.getByTestId("password").fill("testPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByRole("button", { name: "Add Note" })).toBeVisible();
  });
});

import { test as setup, expect } from "@playwright/test";

setup("Create customer 01 authentication", async ({ page, context }) => {
  const email = "customer@practicesoftwaretesting.com";
  const password = "welcome01";
  const customer01AuthFile = ".auth/customer01.json";

  await page.goto("https://practicesoftwaretesting.com/auth/login");

  // Fill email
  await page.getByTestId("email").fill(email);

  // Fill password
  await page.getByTestId("password").fill(password);

  // Click submit
  await page.getByTestId("login-submit").click();

  // Save storage state into the file.
  await
  expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
  await context.storageState({ path: customer01AuthFile });
});
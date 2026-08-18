import {test, expect} from "@playwright/test";

test.describe("Checkout flow", () => {
  test.use({ storageState: ".auth/customer01.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("checkout flow", async ({ page, headless }) => {
    const productGrid = page.locator(".col-md-9");
    // await page.locator('[data-test="product-01M0B7BRVE75JGJ167JEV7895D"]').click();
    await productGrid.getByRole("link").first().click();
    await page.getByTestId("add-to-cart").click();
    await
    expect(page.getByTestId("nav-cart")).toHaveText("1");

    await page.getByTestId("nav-cart").click();
    await page.getByTestId("proceed-1").click();
    await page.getByTestId("proceed-2").click();
    await page.getByTestId("country").selectOption('ES');
    await page.getByTestId("postal_code").click();
    await page.getByTestId("postal_code").fill('08928');
    await page.getByTestId("house_number").click();
    await page.getByTestId("house_number").fill('42');
    await page.getByTestId("proceed-3").click();
    await page
      .getByTestId("payment-method")
      .selectOption('buy-now-pay-later');
    await page
      .getByTestId("monthly_installments")
      .selectOption('3');
    await page.getByTestId("finish").click();
    headless
      ? await test.step("Visual test authorized checkout", async () => {
          await expect(page).toHaveScreenshot("checkout-customer01.png", {
            mask: [page.getByTitle("Checkout - Practice Software Testing - Toolshop - v5.0")]
          });
        })
      : console.log("Running in headed mode, skipping visual test for checkout flow");
    await page.getByTestId("finish").click();
});

  test("Visual test authorized checkout", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("checkout-customer01.png", {
      mask: [
        page.getByTitle(
          "Checkout - Practice Software Testing - Toolshop - v5.0",
        ),
      ],
    });
  });

});

test.describe("API challenge", () => {
  test.use({ storageState: ".auth/customer01.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("GET /products/{id}", async ({ request }) => {
    const apiUrl = "https://api.practicesoftwaretesting.com";
    const getProductResponse = await request.get(
      apiUrl + "/products/search?q=thor%hammer"
    );
    expect(getProductResponse.status()).toBe(200);
    const productBody = await getProductResponse.json();
    const productId = productBody.data[0].id;

    const response = await request.get(apiUrl + "/products/" + productId);

    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body.in_stock).toBe(true);
    expect(body.is_location_offer).toBe(false);
    expect(body.is_rental).toBe(false);
  });
});
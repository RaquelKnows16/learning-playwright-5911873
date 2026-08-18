import { test, expect } from "@playwright/test";

test("GET /products", async ({ request }) => {
  const apiUrl = "https://api.practicesoftwaretesting.com";
  const response = await request.get(apiUrl + "/products");

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.data.length).toBe(9);
  expect(body.totall).toBe(50);
});

test("POST /users/login", async ({ request }) => {
  const apiUrl = "https://api.practicesoftwaretesting.com";
  const response = await request.post(apiUrl + "/users/login", {
    data: {
      email: "customer01@example.com",
      password: "Password1!"
    }
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.access_token).toBeTruthy();
});
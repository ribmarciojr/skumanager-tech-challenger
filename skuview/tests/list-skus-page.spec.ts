import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3001/list/skus";

test("Register button should redirect user to sku register page.", async ({
  page,
}) => {
  page.goto(BASE_URL);

  page.getByRole("button", { name: "CADASTRAR" }).click();

  //   expect(page.url()).toBe("http://localhost:3001/sku/register");
});

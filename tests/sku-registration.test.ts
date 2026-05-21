import { test, expect } from "@playwright/test";

test.describe("SKU Registration", () => {
  test("should navigate to register page", async ({ page }) => {
    await page.goto("/sku/list");
    await page.waitForLoadState("networkidle", { timeout: 30000 });

    await page.getByRole("button", { name: "Cadastrar" }).click();

    await page.waitForURL(/.*\/sku\/register/);
    await page.waitForLoadState("networkidle", { timeout: 30000 });

    await expect(
      page.getByRole("heading", { name: "Pré-cadastro" }),
    ).toBeVisible({ timeout: 30000 });
  });

  test("should create a new SKU with valid data", async ({ page }) => {
    await page.goto("/sku/register");
    await page.waitForLoadState("networkidle", { timeout: 30000 });

    const uniqueSku = `${Date.now().toString().slice(-8)}`;
    const descriptionComercial = `Test SKU description - ${Date.now()}`;

    await page.fill('input[name="sku"]', uniqueSku, { timeout: 30000 });
    await page.fill('input[name="descricaoComercial"]', descriptionComercial, {
      timeout: 30000,
    });
    await page.fill('textarea[name="descricao"]', "Descrição completa do SKU", {
      timeout: 30000,
    });

    await page.getByRole("button", { name: "Salvar" }).click();
    await page.waitForLoadState("networkidle", { timeout: 30000 });
    await page.waitForTimeout(2000);

    await expect(page.url()).toContain("/sku/list");
    await expect(page.getByText(uniqueSku).first()).toBeVisible({
      timeout: 30000,
    });
  });

  test("should show validation errors for required fields", async ({
    page,
  }) => {
    await page.goto("/sku/register");
    await page.waitForLoadState("networkidle", { timeout: 30000 });

    await page.getByRole("button", { name: "Salvar" }).click();
    await page.waitForTimeout(1000);

    await expect(page.getByText("SKU é obrigatório")).toBeVisible({
      timeout: 30000,
    });
    await expect(
      page.getByText("Descrição comercial é obrigatória"),
    ).toBeVisible({ timeout: 30000 });
  });
});

import { Page, expect } from "@playwright/test";
// хелперс на создание обращения
export async function createAppeal(page: Page) {
  await page.goto("https://cerebro.dev.contact-center.itlabs.io/auth");
  await page.locator('input[name="login"]').fill("mmalyutina");
  await page.locator('input[name="password"]').fill("123456789");
  await page.getByRole("button", { name: "Войти" }).click();
  await page.getByText("Клиенты").click();
  await page.getByRole("link", { name: "Новое обращение" }).click();
  await page
    .getByRole("textbox", { name: "Телефон" })
    .fill("+7(900)-000-00-55");

  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Создать новое обращение" }).click();
  const page1 = await page1Promise;

  await page1
    .getByRole("listitem")
    .filter({ hasText: "IvanЮридическое лицоВыбрать" })
    .locator('[data-test="select-client"]')
    .click();

  await expect(page1).toHaveURL(/\/appeal/);
}

import { test } from "@playwright/test";
import { createAppeal } from "../helpers/createAppeal";

test("создание стандартного заказа", async ({ page }) => {
  // вызываем созданный хэлперс
  await createAppeal(page);
  await page.locator(".ant-select-selection-overflow").click();
  await page.getByText("РЦ Тмн, 50 лет Октября, 109 ко").click();
  await page.locator('[data-test="search-input"]').click();
  await page.locator('[data-test="search-input"]').fill("цемент");
  await page.locator("._button_1iss9_17 > .anticon > svg").click();
  await page.locator('[data-test="remain-switch"]').click();
  await page.locator('[data-test="shopping-card-button"]').first().click();
  await page.getByRole("button", { name: "Добавить" }).click();
  await page.getByRole("img", { name: "cart" }).click();
  await page.locator('[data-test="make-order"]').click();
  await page.getByText("Заказ №").click();
});

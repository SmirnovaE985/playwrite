import { Page, expect } from "@playwright/test";
// хелперс на создание обращения и открытие страницы в цереб
export async function createAppeal(page: Page): Promise<Page> {
  await page.goto('https://cerebro.dev.contact-center.itlabs.io/auth');
  await page.locator('input[name="login"]').fill("mmalyutina");
  await page.locator('input[name="password"]').fill("123456789");
  await page.getByRole("button", { name: "Войти" }).click();
  await page.getByText("Клиенты").click();
  await page.getByRole("link", { name: "Новое обращение" }).click();
  await page
    .getByRole("textbox", { name: "Телефон" })
    .fill("(900)-000-00-55");

  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Создать новое обращение" }).click();
  const page1 = await page1Promise;

  await page1
    .getByRole("listitem")
      .first()
    .locator('[data-test="select-client"]')
    .click();

  await expect(page1).toHaveURL(/\/appeal/);
  return page1;   
}

//выбор даты и времени внутри доставки

export async function pickFirstAvailableDate(page: Page) {
  await page.getByText('Выберите дату').click();

  const datepicker = page.locator('div[class^="_container"] > div[class^="_datepicker"]');
  await datepicker.locator('div[class^="_month-changer"]').last().click();
  await datepicker.locator('div[data-test="available-day"]').first().click();

  await page
    .locator('[class^="_valuepicker-body"]')
    .locator('[class^="_value_"]')
    .first()
    .click();
}
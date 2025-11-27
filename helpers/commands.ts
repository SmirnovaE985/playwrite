import { Page, expect } from "@playwright/test";
// хелперс на создание обращения и открытие страницы в церебро
export async function createAppeal(page: Page): Promise<Page> {
  await page.goto('https://cerebro.dev.contact-center.itlabs.io/auth');
  await page.locator('input[name="login"]').fill("mmalyutina");
  await page.locator('input[name="password"]').fill("123456789");
  await page.getByRole("button", { name: "Войти" }).click();
  const clientsLink = page.getByText("Клиенты").first();
  await clientsLink.waitFor({ state: 'visible' });
  await clientsLink.click();

  const newAppealLink = page.getByRole("link", { name: "Новое обращение" });
  await expect(newAppealLink).toBeVisible({ timeout: 5000 });
  await newAppealLink.click();

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
//создание простого заказа
export async function createOrder(page:Page) {
await page.goto('https://cerebro.dev.contact-center.itlabs.io/auth');
  await page.locator('input[name="login"]').fill("mmalyutina");
  await page.locator('input[name="password"]').fill("123456789");
  await page.getByRole("button", { name: "Войти" }).click();
  const clientsLink = page.getByText("Клиенты").first();
  await clientsLink.waitFor({ state: 'visible' });
  await clientsLink.click();
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
await page1.locator('[data-test="select-appeal"]').click();
  await page1
  .locator('[data-test="select-appeal"] li')
  .filter({ hasText: 'Новый заказ' })
  .click();
  await page1.locator('.ant-select-selection-overflow').click();
  await page1.getByText('РЦ Тмн, 50 лет Октября, 109 ко').click();
  await page1.locator('[data-test="search-input"]').click();
  await page1.locator('[data-test="search-input"]').fill('цемент');
  await page1.locator('[data-test="search-button"]').click();
  await page1.getByRole('link', { name: 'Цемент ЦЕМ I 42,5Б (ПЦ-500 Д0), Топки, 50 кг' }).click();
  await page1.locator('[data-test="add-position"]').click();
  await page1.locator('[data-test="to-cart-button"] path').click();
  await page1.locator('[data-test="make-order"]').click();
  await expect(page1.getByText('Заказ успешно создан')).toBeVisible();
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
//удаление всех позиций в заказе
export async function deleteAllPositions(page: Page) {
  await page.locator('[data-test="delete-all-position"]').click();
  await page.locator('[data-test="delete-all-position-ok-button"]').click();
  await page.locator('[data-test="save-order"], [data-test="save-offer"]').click();
  await expect(page.getByText('Успешно сохранено')).toBeVisible();
}
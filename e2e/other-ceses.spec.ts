// #4587 Привязка клиента к менеджеру через вкладку "мои клиенты" [ok]
// #4592 Создание претензии [ok]
// #4964 Регистрация Ошибки/ОС [ok]
// #4594 Регистрация соискателя 
// #3350 Шаблоны СМС из хэдра/корзины   //https://allure.itlabs.io/project/28/test-cases/3350?treeId=58

import { test, expect } from '@playwright/test';
import { createAppeal } from '../helpers/commands';
import { deleteAllPositions } from '../helpers/commands';
import { createOrder } from '../helpers/commands';
import { createOrderCheckPromo } from '../helpers/commands';
import { randomInt } from 'crypto';

// https://allure.itlabs.io/project/28/test-cases/4587?treeId=58
test('#4587 Привязка клиента к менеджеру через вкладку "мои клиенты"', async ({
  page,
  browser,
}) => {
  await page.goto("http://localhost:3000/home");
  await page.locator('input[name="login"]').fill("mmalyutina");
  await page.locator('input[name="password"]').fill("123456789");
  await page.getByRole("button", { name: "Войти" }).click();
  await page.getByText("Клиенты").hover({ force: true });
  await page.getByText("Мои клиенты").click();
  // Добавить нового клиента
  await page.getByText('Добавить нового клиента').click();
  const rnd = () => Math.floor(Math.random() * 10);
  const name = `Иван${rnd()}${rnd()}${rnd()}`;
  const phone = `9123321${rnd()}${rnd()}${rnd()}`;
  await page.getByPlaceholder("Укажите имя").fill(name);
  // 
  const ssNumber = `СС${randomInt(9_000_000_000, 10_000_000_000)}`;
  await page.locator('input[name="phone"]').fill(ssNumber);
  await page.getByText("Создать нового клиента").click({ force: true });
await page.getByText('Клиент создан успешно').waitFor({ state: 'visible' });
  
  const clientsLink = page.getByText("Клиенты").first();
  await clientsLink.waitFor({ state: 'visible' });
  await clientsLink.click({ force: true });
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
await page.getByText('Новое обращение').click();
await page.locator('input[placeholder="Телефон"]').fill(ssNumber);
// ловим новую вкладку, "Создать новое обращение"
const [appealPage] = await Promise.all([
  page.waitForEvent('popup'),
  page.getByRole('button', { name: 'Создать новое обращение' }).click(),
]);

await appealPage.bringToFront();
await appealPage.waitForLoadState();
// выбрать "Физическое лицо"
await appealPage.locator('#create-client_typeId').click();
await appealPage
  .locator('.ant-select-dropdown .ant-select-item-option-content', { hasText: 'Физическое лицо' })
  .click();
await appealPage.locator('#create-client_clientName').fill('Василий Петрович');
await Promise.all([
  appealPage.waitForNavigation({ waitUntil: 'domcontentloaded' }),
  appealPage.locator('button[type="submit"]').click(),
]);

await expect(appealPage.getByText('Мой клиент')).toBeVisible();
});


// https://allure.itlabs.io/project/28/test-cases/4592?treeId=58
test('#4592 Создание претензии', async ({ page }) => {
const page1 = await createOrder(page);
await page.waitForTimeout(9000); 
// дать доступ к буферу
await page1.context().grantPermissions(['clipboard-read', 'clipboard-write']);
await page1.locator('[data-icon="copy"]').click();
// блок с претензией 
await page1.locator('[data-test="select-appeal"]').click();
  await page1
  .locator('[data-test="select-appeal"] li')
  .filter({ hasText: 'Претензия' })
  .click();
// забираем номер заказа из буфера и запоминаем
const orderNumber = (await page1.evaluate(() => navigator.clipboard.readText())).trim();
// вставляем в поле
const orderInput = page1.locator('input[name="orderNumber"]');
await orderInput.click();
await orderInput.press('Control+A');
await page1.keyboard.type(orderNumber);
await expect(page1.locator('input[placeholder="Номер телефона"]')).toHaveValue('+79000000066');
// 
const placeholder = page1.locator(
  'span.ant-select-selection-placeholder',
  { hasText: 'Выбрать источник претензии' }
);
// поднимаемся к контейнеру селекта и кликаем по кликабельной части
const select = placeholder.locator('xpath=ancestor::div[contains(@class,"ant-select")]').first();
await select.locator('.ant-select-selector').click();
// дождаться открытия
await expect(select.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
await page1.locator('.ant-select-dropdown:visible').click();
//  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const type = page1.locator(
  'span.ant-select-selection-placeholder',
  { hasText: 'Выбрать инцидент' }
);
const selectType = type.locator('xpath=ancestor::div[contains(@class,"ant-select")]').first();
await selectType.locator('.ant-select-selector').click();
await page1.getByText('Доставка клиенту').click();
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const place = page1.locator(
  'span.ant-select-selection-placeholder',
  { hasText: 'Выбрать город' }
);
const selectPlace = place.locator('xpath=ancestor::div[contains(@class,"ant-select")]').first();
await selectPlace.locator('.ant-select-selection-search').click();
await page1.getByText('СД Тюмень').last().click();
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const chanel = page1.locator(
  'span.ant-select-selection-placeholder',
  { hasText: 'Выбрать канал сбыта' }
);
const selectChanel = chanel.locator('xpath=ancestor::div[contains(@class,"ant-select")]').first();
await selectChanel.locator('.ant-select-selection-search').click();
await page1.getByText('Розница').click();
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const shop = page1.locator(
  'span.ant-select-selection-placeholder',
  { hasText: 'Выбрать подразделение' }
);
const selectShop = shop.locator('xpath=ancestor::div[contains(@class,"ant-select")]').first();
await selectShop.locator('.ant-select-selection-search').click();
await page1.getByText('БМ Тмн Панфиловцев').click();
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const incident = page1.locator(
  'span.ant-select-selection-placeholder',
  { hasText: 'Выбрать что произошло' }
);
const selectIncident = incident.locator('xpath=ancestor::div[contains(@class,"ant-select")]').first();
await selectIncident.locator('.ant-select-selection-search').click();
await page1.getByText('Опоздание').click();
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
await page1.getByPlaceholder('Опишите претензию').fill('jhgbv94jh bhnjhbv');
await page1.locator('button[type="submit"]').click(); 
await expect(page1.getByText('Претензия успешно создана')).toBeVisible();

});


// https://allure.itlabs.io/project/28/test-cases/4964?treeId=58
test('#4964 Регистрация Ошибки/ОС ', async ({ page }) => {
const page1 = await createOrder(page);
// await page.waitForTimeout(9000); 
// дать доступ к буферу
await page1.context().grantPermissions(['clipboard-read', 'clipboard-write']);
await page1.locator('[data-icon="copy"]').click();
// меняем причину обращения
await page1.locator('[data-test="select-appeal"]').click();
await page1
  .locator('[data-test="select-appeal"] li')
  .filter({ hasText: 'Ошибки/ОС ' })
  .click();
  // забираем номер заказа из буфера и запоминаем
const orderNumber = (await page1.evaluate(() => navigator.clipboard.readText())).trim();
// вставляем в поле
const orderInput = page1.locator('input[name="orderNumber"]');
await orderInput.click();
await orderInput.press('Control+A');
await page1.keyboard.type(orderNumber);
// 
const shop = page1.locator(
  'span.ant-select-selection-placeholder',
  { hasText: 'Выберите место инцидента' }
);
const selectShop = shop.locator('xpath=ancestor::div[contains(@class,"ant-select")]').first();
await selectShop.locator('.ant-select-item-option-content').click();
await page1.getByText('РЦ Тимберленд 50летОктября 122').click();
// 
const type = page1.locator(
  'span.ant-select-selection-placeholder',
  { hasText: 'Укажите тип ошибки' }
);
const selectType = type.locator('xpath=ancestor::div[contains(@class,"ant-select")]').first();
await selectType.locator('.ant-select-item-option-content').click();
await page1.getByText('Брак/Пересорт').click();

await page1.getByPlaceholder('Укажите комментарий').fill('jhgbv94jh bhnjhbv');
await page1.locator('button[type="submit"]').click(); 
await expect(page1.getByText('Инцидент создан успешно')).toBeVisible();

});


// https://allure.itlabs.io/project/28/test-cases/4594?treeId=58
test('#4594 Регистрация соискатели', async ({ page }) => {
const page1 = await createAppeal(page);
await page1.locator('[data-test="select-appeal"]').click();
await page1
  .locator('[data-test="select-appeal"] li')
  .filter({ hasText: ' Соискатели ' })
  .click();
await page.waitForTimeout(5000);

//||||||||||||||||||||||||||||   
 
const shop = page1.locator(
  'span.ant-select-selection-placeholder',
  { hasText: 'Укажите населенный пункт' }
);
const selectShop = shop.locator('xpath=ancestor::div[contains(@class,"ant-select")]').first();
await selectShop.locator('.ant-select-selection-search').click();
await page1.getByText('Боровский').first().click();



});


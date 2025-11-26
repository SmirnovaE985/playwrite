import { test, expect } from '@playwright/test';
import { createAppeal } from '../helpers/commands';
import { pickFirstAvailableDate } from '../helpers/commands';

test('создание стандартного заказа-пример', async ({ page }) => {
  const page1 = await createAppeal(page);
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
  await page1.locator('[data-test="delete-all-position"]').click();
  await page1.locator('[data-test="delete-all-position-ok-button"]').click();
  await page1.locator('[data-test="save-order"], [data-test="save-offer"]').click();
await expect(page1.getByText('Успешно сохранено')).toBeVisible();
});

//https://allure.itlabs.io/project/28/test-cases/4423?treeId=58
test('#4423 Создание предложения с доставкой', async ({ page }) => {
const page1 = await createAppeal(page);
await page1.locator('[data-test="select-appeal"]').click();
await page1
  .locator('[data-test="select-appeal"] li')
  .filter({ hasText: 'Новый заказ' })
  .click();
await page1.locator('.ant-select-selection-overflow').click();
await page1.getByText('РЦ Тмн, 50 лет Октября, 109 ко').click();
await page1.locator('[data-test="search-input"]').click();
await page1.locator('[data-test="search-input"]').fill('молоток');
await page1.locator('[data-test="search-button"]').click();
await page1.locator('[data-test="shopping-card-button"]').first().click();
await page1.getByRole('button', { name: 'Добавить' }).click();
await page1.locator('[data-test="to-cart-button"]').click();
await page1.locator('[data-test="make-offer"]').click();
await page1.locator('[data-test="cart-to-delivery-link"]').click();
await page1.locator('[data-test="delivery-address"]').fill('широтная');
await page1.getByText('улица Широтная').first().click();
await page1.getByRole('switch').click();
await page1.getByText('0,5 тент').click();
await pickFirstAvailableDate(page1);
await page1.locator('[data-test="delivery-ttn-save"]').click();
await page1.waitForTimeout(4000);
await page1.locator('[data-test="link-back"]').click();
await page1.locator('[data-test="offer-to-order"]').click();
await page1.locator('[data-test="delete-all-position"]').click();
await page1.locator('[data-test="delete-all-position-ok-button"]').click();
await page1.locator('[data-test="save-order"], [data-test="save-offer"]').click();
await expect(page1.getByText('Успешно сохранено')).toBeVisible();
});

// https://allure.itlabs.io/project/28/test-cases/4609?treeId=58
test('#4609 Перевод предложения в заказ', async ({ page }) => {
const page1 = await createAppeal(page);
await page1.locator('[data-test="select-appeal"]').click();
  await page1
  .locator('[data-test="select-appeal"] li')
  .filter({ hasText: 'Новый заказ' })
  .click();
await page1.locator('.ant-select-selection-overflow').click();
await page1.getByText('РЦ Тмн, 50 лет Октября, 109 ко').click();
await page1.locator('[data-test="search-input"]').click();
await page1.locator('[data-test="search-input"]').fill('молоток');
await page1.locator('[data-test="search-button"]').click();
await page1.locator('[data-test="shopping-card-button"]').first().click();
await page1.getByRole('button', { name: 'Добавить' }).click();
await page1.locator('[data-test="to-cart-button"]').click();
await page1.locator('[data-test="make-offer"]').click();
await page1.locator('[data-test="offer-to-order"]').click();
await expect(page1.getByText('Предложение переведено в заказ успешно!')).toBeVisible();
await page1.locator('[data-test="delete-all-position"]').click();
await page1.locator('[data-test="delete-all-position-ok-button"]').click();
await page1.locator('[data-test="save-order"], [data-test="save-offer"]').click();
await expect(page1.getByText('Успешно сохранено')).toBeVisible();
});

 // https://allure.itlabs.io/project/28/test-cases/5301?treeId=58
 test('#5301 Создание нового заказа, после закрытия старого заказа и возврата в поиск', async ({ page }) => {
const page1 = await createAppeal(page);
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
await page1.locator('[data-test="shopping-card-button"]').first().click();
await page1.getByRole('button', { name: 'Добавить' }).click();
await page1.locator('[data-test="to-cart-button"]').click();
await page1.locator('[data-test="make-order"]').click();
await expect(page1.getByText('Заказ успешно создан')).toBeVisible();
await page1.locator('[data-test="close-order-btn"]').click();
await page1.getByText('OK').click();

 });
//  

    // cy.contains('button', 'Перейти в поиск').click();
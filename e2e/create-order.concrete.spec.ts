import { test, expect } from '@playwright/test';
import { createAppeal } from '../helpers/commands';
import { deleteAllPositions } from '../helpers/commands';


  // https://allure.itlabs.io/project/28/test-cases/6240?treeId=58
test('#6240 создание стандартного заказа для товара, который имеет признак ГТР', async ({page}) => { 
const page1 = await createAppeal(page);
await page1.locator('[data-test="select-appeal"]').click();
await page1
  .locator('[data-test="select-appeal"] li')
  .filter({ hasText: 'Новый заказ' })
  .click();
  await page1.locator('.ant-select-selection-overflow').click();
await page1.getByText('РЦ Тмн, 50 лет Октября, 109 ко').click();
await page1.locator('[data-test="search-input"]').click();
await page1.locator('[data-test="search-input"]').fill('14904');
await page1.locator('[data-test="search-button"]').click();
await page1.locator('[data-test="shopping-card-button"]').first().click();
await page1.getByRole('button', { name: 'Добавить' }).click();
await page1.locator('[data-test="to-cart-button"]').click();
await page1.locator('[data-test="make-order"]').click();
await expect(page1.getByText('Заказ успешно создан')).toBeVisible();
await page1.locator('[data-test=send-sms]').click();
await page1.locator('[data-test=pattern-sms]').click();
await page1.getByText('Заказ. Номер сумма, адрес самовывоза').click();
await page1.locator('[data-test=send-sms-for]').click();
await deleteAllPositions(page1);
 });

 //https://allure.itlabs.io/project/28/test-cases/4141?treeId=58
test('#4141Создать заказ на бетон через быстрое добавление в корзину', async ({page}) => { 
const page1 = await createAppeal(page);
await page1.locator('[data-test="select-appeal"]').click();
await page1
  .locator('[data-test="select-appeal"] li')
  .filter({ hasText: 'Новый заказ' })
  .click();
await page1.locator('[data-test="search-input"]').click();
await page1.locator('[data-test="search-input"]').fill('бетон');
await page1.locator('[data-test="search-button"]').click();
await page1.locator('[data-test="shopping-card-button"]').first().click();
await page1.locator('[data-test=add-quantity-input]').click();
await page1.locator('[data-test=add-quantity-input]').fill('6');
await page1.locator('[data-test=delivery-address]').fill('Агеева');
await page1.getByText('Агеева').first().click();
await page1.locator('input[placeholder*="Выберите дату"]').click();
 //определяем текущую дату и добавляем к ней 1 день
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');

    const tomorrowFormatted = `${year}-${month}-${day}`;
    await page1.locator(`td[title="${tomorrowFormatted}"]`).click();
await page1.locator('[data-test=add-car-concrete]').click();
await page1.getByText('Выберите тип').click();
await page1.getByText('Бетоновоз 6м3').click();



// await page1.getByRole('button', { name: 'Добавить' }).click();
// await page1.locator('[data-test="to-cart-button"]').click();
// await page1.locator('[data-test="make-order"]').click();
// await expect(page1.getByText('Заказ успешно создан')).toBeVisible();
// await deleteAllPositions(page1);


 });



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
    // Нажимаем "Добавить машину"
await page.waitForTimeout(3000);
 await page1.getByText('Добавить машину').click();
await page1.locator('[data-test="cars-type"]').click();
await page1.getByText('Бетоновоз 6м3').click();
//выбрать время
 await page1.locator('[data-test="cars-time-0"]').click();
await page1.locator('[data-test="cars-time-0"] .ant-select-dropdown')
  .first()
  .click();
//ввести объём бетона
await page1.locator('input[placeholder*="Объём"]').fill('6');
await page1.locator('.ant-btn-primary', { hasText: 'Добавить' }).click();
// 
await page1.locator('[data-test="to-cart-button"]').click();
await page1.locator('[data-test="make-order"]').click();
await expect(page1.getByText('Заказ успешно создан')).toBeVisible();
 });

//https://allure.itlabs.io/project/28/test-cases/4251?treeId=58
test('#4251 Создать заказ бетона с несколькими машинами', async ({page}) => {     
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
await page1.locator('[data-test=add-quantity-input]').fill('20');
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
     //Нажать кнопку "нужен автобетононасос"
const label = page1.locator('div', { hasText: 'Нужен автобетононасос' });
const toggle = label.locator('button[role="switch"]');

if (await toggle.getAttribute('aria-checked') === 'false') {
  await toggle.click();
}
await page1.waitForTimeout(3000);
await page1.locator('[data-test=length-of-pump]').click();
await page1.getByText('АБН до 28м').click();
// 
await page1.waitForTimeout(3000);
await page1.locator('[data-test="interval-of-pump"]').click();
await page1.locator('[data-test="interval-of-pump"] .ant-select-item-option').first().click();

    // Нажимаем "Добавить машину"
 await page1.getByText('Добавить машину').click();
await page1.locator('[data-test="cars-type"]').click();
await page1.getByText('Бетоновоз 10м3').click();
//выбрать время
 await page1.locator('[data-test="cars-time-0"]').click();
await page1.locator('[data-test="cars-time-0"] .ant-select-dropdown')
  .first()
  .click();
//ввести объём бетона
await page1.locator('input[placeholder*="Объём"]').fill('10');
// 
   // Нажимаем "Добавить машину 2"
 await page1.getByText('Добавить машину').click();
await page1.locator('[data-test="cars-type"]', { hasText: 'Выберите тип' }).click();
await page1.getByText('Бетоновоз 12м3').first().click();
//выбрать время
 await page1.locator('[data-test="cars-time-0"]').click();
await page1.locator('[data-test="cars-time-0"] .ant-select-dropdown')
  .first()
  .click();
//ввести объём бетона
await page1.locator('input[placeholder*="Объём"]').first().fill('10');
await page1.locator('.ant-btn-primary', { hasText: 'Добавить' }).click();
await page1.locator('[data-test="to-cart-button"]').click();
await page1.locator('[data-test="make-order"]').click();
await expect(page1.getByText('Заказ успешно создан')).toBeVisible();
// ошибка с бека- цены на насос и доставку-0, нельзя добавить в корзину, вернуться  к тесту как поправят
 });

  //allure.itlabs.io/project/28/test-cases/4345?treeId=58
test('#4345 Создать заказ с дробным числом', async ({page}) => {     
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
await page1.locator('[data-test=add-quantity-input]').fill('10.5');
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
    // Нажимаем "Добавить машину"
await page.waitForTimeout(3000);
 await page1.getByText('Добавить машину').click();
await page1.locator('[data-test="cars-type"]').click();
await page1.getByText('Бетоновоз 12м3').click();
//выбрать время
 await page1.locator('[data-test="cars-time-0"]').click();
await page1.locator('[data-test="cars-time-0"] .ant-select-dropdown')
  .first()
  .click();
//ввести объём бетона
await page1.locator('input[placeholder*="Объём"]').fill('10.5');
await page1.locator('.ant-btn-primary', { hasText: 'Добавить' }).click();
// 
await page1.locator('[data-test="to-cart-button"]').click();
await page1.locator('[data-test="make-order"]').click();
await expect(page1.getByText('Заказ успешно создан')).toBeVisible();
 });


// allure.itlabs.io/project/28/test-cases/4346?treeId=58
test('#4346 Создать заказ с комментарием к ТТН', async ({page}) => {     
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
await page1.locator('[data-test=add-quantity-input]').fill('10');
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
    // Нажимаем "Добавить машину"
await page.waitForTimeout(3000);
 await page1.getByText('Добавить машину').click();
await page1.locator('[data-test="cars-type"]').click();
await page1.getByText('Бетоновоз 10м3').click();
//выбрать время
 await page1.locator('[data-test="cars-time-0"]').click();
await page1.locator('[data-test="cars-time-0"] .ant-select-dropdown')
  .first()
  .click();
//ввести объём бетона
await page1.locator('input[placeholder*="Объём"]').fill('10');
await page1.locator('[data-test=comment-car]').fill('тестовый комментарий');
await page1.waitForTimeout(3000);
await page1.locator('.ant-btn-primary', { hasText: 'Добавить' }).click();
await page1.locator('[data-test="to-cart-button"]').click();
await page1.locator('[data-test="make-order"]').click();
await expect(page1.getByText('Заказ успешно создан')).toBeVisible();
await page1.locator('[data-test="cart-position"]').click();

 });
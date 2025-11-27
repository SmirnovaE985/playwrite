import { test, expect } from '@playwright/test';
import { createAppeal } from '../helpers/commands';

// https://allure.itlabs.io/project/28/test-cases/3242?treeId=58
test('#3242 Создание обращения с причиной "Редактирование заказа', async ({ page }) => {
  const page1 = await createAppeal(page);
await page1.locator('[data-test="select-appeal"]').click();
  await page1
  .locator('[data-test="select-appeal"] li')
  .filter({ hasText: 'Редактирование заказа' })
  .click();
});

 // https://allure.itlabs.io/project/28/test-cases/3244?treeId=58
test('#3244 Создание обращения с причиной "Консультация Материалы / Услуги', async ({ page }) => {
  const page1 = await createAppeal(page);
await page1.locator('[data-test="select-appeal"]').click();
  await page1
  .locator('[data-test="select-appeal"] li')
  .filter({ hasText: 'Консультация Материалы / Услуги' })
  .click();
});

 // https://allure.itlabs.io/project/28/test-cases/3245?treeId=58
test('#3245 Создание обращения с причиной "Справка / Информация по заказу', async ({ page }) => {
  const page1 = await createAppeal(page);
await page1.locator('[data-test="select-appeal"]').click();
  await page1
  .locator('[data-test="select-appeal"] li')
  .filter({ hasText: 'Справка / Информация по заказу' })
  .click();
});

 // https://allure.itlabs.io/project/28/test-cases/3243?treeId=58
test('#3243 Создание обращения с причиной "Ошибки / ОС"', async ({ page }) => {
  const page1 = await createAppeal(page);
await page1.locator('[data-test="select-appeal"]').click();
  await page1
  .locator('[data-test="select-appeal"] li')
  .filter({ hasText: 'Регистрация ошибки/ос' })
  .click();
});

// https://allure.itlabs.io/project/28/test-cases/3243?treeId=58 ПРОВЕРИТЬ 
test('#3246 Создание обращения с причиной "Претензия"', async ({ page }) => {
const page1 = await createAppeal(page);
await page1.locator('[data-test="select-appeal"]').click();
  await page1
  .locator('[data-test="select-appeal"] li')
  .filter({ hasText: 'Претензия' })
  .click();
  await page1.waitForTimeout(3000);
  // Переход на страницу истории обращений
  await page1.locator('[data-test="go-appeal-history"]').click();
 const parentElement = page.locator('div._clientAppealsHistory_vbv0y_1');
 await page1.waitForTimeout(3000);
});

// https://allure.itlabs.io/project/28/test-cases/3247?treeId=58 ПРОВЕРИТЬ
test('#3247 Создание обращения с причиной "Соискатели"', async ({ page }) => {
  const page1 = await createAppeal(page);
  await page1.locator('[data-test="select-appeal"]').click();
  await page1.locator('[data-test="select-appeal"] li')
    .filter({ hasText: 'Соискатели' })
    .click();
 //   // Переход на страницу истории обращений
   await page1.locator('[data-test="go-appeal-history"]').click();
 const parentElement = page1.locator('div._clientAppealsHistory_vbv0y_1');
 await page1.waitForTimeout(3000);
});

 //https://allure.itlabs.io/project/28/test-cases/3248?treeId=58
test('#3248 Создание обращения с причиной "Прокат"', async ({ page }) => {
  const page1 = await createAppeal(page);
await page1.locator('[data-test="select-appeal"]').click();
  await page1
  .locator('[data-test="select-appeal"] li')
  .filter({ hasText: 'Прокат' })
  .click();
});

// https://allure.itlabs.io/project/28/test-cases/3249?treeId=58
test('#3249 Создание обращения с причиной "Водители/ЛТС/ЦТС"', async ({ page }) => {
  const page1 = await createAppeal(page);
await page1.locator('[data-test="select-appeal"]').click();
  await page1
  .locator('[data-test="select-appeal"] li')
  .filter({ hasText: 'Водители/ЛТС/ЦТС' })
  .click();
});

  
//   //https://allure.itlabs.io/project/28/test-cases/5264?treeId=58
//   it('#5264 Создание нового клиента, который уже обращался на линию с сегментом мастер"', () => {
//     cy.contains('Клиенты').trigger('mouseover');
//     cy.contains('Новое обращение').click({ force: true });
//     cy.get('input[name="phone"]').type('9000000055');
//     cy.get('button[type="submit"]').click();
//     cy.get('button[type="button"]').click();
//     cy.get('input[type="search"]').click();
//     cy.contains('div', 'Физическое лицо').click();
//     cy.get('input[type="text"]').type('Ivan');
//     cy.get('button[type="submit"]').click();
//     cy.get('[data-test="client-promo-status"]').each((status) =>
//       expect(status).have.text('Мастер'),
//     );
//   });
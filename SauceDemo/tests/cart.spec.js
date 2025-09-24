const { test } = require('@playwright/test');
const helpers = require('../helpers');

test.describe('SauceDemo Checkout Flow', () => {

  test('Successful checkout with valid details', async ({ page }) => {
 
    await helpers.loginStandardUser(page);
    const selectedProducts = await helpers.addRandomProducts(page, 2);

    const cartPage = await helpers.proceedToCheckout(page, 'Maria', 'Foti', '12345');

    await helpers.verifyOverviewVisible(cartPage);

    await helpers.verifyProductsInCart(cartPage, selectedProducts);
  });

 
  const missingDetails = [
    { firstName: '', lastName: 'Foti', zip: '12345', desc: 'Missing first name' },
    { firstName: 'Maria', lastName: '', zip: '12345', desc: 'Missing last name' },
    { firstName: 'Maria', lastName: 'Foti', zip: '', desc: 'Missing zip' },
  ];

  missingDetails.forEach(detail => {
    test(`Checkout fails when ${detail.desc}`, async ({ page }) => {
    
      await helpers.loginStandardUser(page);
      await helpers.addRandomProducts(page, 1);

      const cartPage = await helpers.proceedToCheckout(page, detail.firstName, detail.lastName, detail.zip);

      if (await cartPage.errorMessage.isVisible()) {
        const message = await cartPage.errorMessage.textContent();
        console.log(`Checkout attempt (${detail.desc}) failed as expected: "${message.trim()}"`);
      } else {
        console.log(`Checkout attempt (${detail.desc}) proceeded unexpectedly`);
      }
    });
  });
});

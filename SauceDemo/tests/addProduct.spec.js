const { test, expect } = require('@playwright/test');
const helpers = require('./SauceDemo/helpers');

test.describe('SauceDemo: Login → Add Random Products → Checkout', () => {
  test('Login, add 2 random products', async ({ page }) => {
  
    await helpers.loginStandardUser(page);

    const selectedProducts = await helpers.addRandomProducts(page, 2);
    console.log('Selected products:', selectedProducts.join(', '));

  });

});

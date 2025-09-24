const { expect } = require('@playwright/test');
const { LoginPage } = require('./Pages/LoginPage');
const { AddProductPage } = require('./Pages/AddProductPage');
const { CartPage } = require('./Pages/CartPage');

async function loginUser(page, username, password, shouldSucceed = true) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);

  if (shouldSucceed) {
    await expect(loginPage.productsTitle).toBeVisible();
  } else {
    await expect(loginPage.errorMessage).toBeVisible();
    const message = await loginPage.errorMessage.textContent();
    console.log(`Login failed for ${username} with message: ${message.trim()}`);
  }

  return loginPage;
}


async function loginStandardUser(page) {
  return loginUser(page, 'standard_user', 'secret_sauce', true);
}


async function addRandomProducts(page, count = 2) {
  const addProductPage = new AddProductPage(page);
  const selectedProducts = await addProductPage.addRandomProductsToCart(count);
  await addProductPage.goToCart();
  return selectedProducts;
}

async function proceedToCheckout(page, firstName, lastName, zip) {
  const cartPage = new CartPage(page);

  await cartPage.checkout();

  await cartPage.proceedToCheckout(firstName, lastName, zip);

  try {
    if (await cartPage.errorMessage.isVisible()) {
      const message = await cartPage.errorMessage.textContent();
      console.log(`Checkout blocked as expected due to missing details: "${message.trim()}"`);
      
 
      return cartPage;
    }
  } catch (e) {}

  return cartPage;
}

async function verifyProductsInCart(cartPage, expectedProducts) {
  const cartItems = await cartPage.getCartItems();
  expectedProducts.forEach(p => expect(cartItems).toContain(p));
}

async function verifyOverviewVisible(cartPage) {
  await expect(cartPage.overviewTitle).toBeVisible();
}

async function verifyErrorVisible(cartPage) {
  await expect(cartPage.errorMessage).toBeVisible();
}

module.exports = {
  loginUser,
  loginStandardUser,
  addRandomProducts,
  proceedToCheckout,
  verifyProductsInCart,
  verifyOverviewVisible,
  verifyErrorVisible
};

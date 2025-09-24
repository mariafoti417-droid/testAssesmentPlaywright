const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.zip = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.overviewTitle = page.locator('[data-test="title"]');
    this.cartItemsLocator = page.locator('.cart_item .inventory_item_name');
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async proceedToCheckout(firstName, lastName, zip) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.zip.fill(zip);
    await this.continueButton.click();
  }

  async getCartItems() {
    const count = await this.cartItemsLocator.count();
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push(await this.cartItemsLocator.nth(i).innerText());
    }
    return items;
  }
}

module.exports = { CartPage };

const { expect } = require('@playwright/test');

class AddProductPage {
  constructor(page) {
    this.page = page;
    this.inventory = page.locator('[data-test="inventory-item"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartTitle = page.locator('[data-test="title"]');
  }

  async addRandomProductsToCart(count) {
    await this.page.locator('[data-test="inventory-list"]').first().waitFor({ timeout: 5000 });

    const productCount = await this.inventory.count();
    if (productCount === 0) throw new Error('No products available');

    if (count > productCount) count = productCount;

    const indexes = Array.from({ length: productCount }, (_, i) => i)
      .sort(() => Math.random() - 0.5)
      .slice(0, count);

    const selectedProducts = [];

    for (const index of indexes) {
      const product = this.inventory.nth(index);
      const name = await product.locator('.inventory_item_name').innerText();
      selectedProducts.push(name);

      const productId = name.toLowerCase().replace(/\s+/g, '-');
      const addButton = product.locator(`[data-test="add-to-cart-${productId}"]`);
      await addButton.waitFor({ timeout: 3000 });
      await addButton.click();
    }

    return selectedProducts;
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async verifyCartTitle() {
    return this.cartTitle.isVisible();
  }

  async verifyProductsInCart(products) {
    for (const productName of products) {
      const cartItem = this.page.locator('.cart_item .inventory_item_name', { hasText: productName });
      await expect(cartItem).toBeVisible();
    }
  }
}

module.exports = { AddProductPage };

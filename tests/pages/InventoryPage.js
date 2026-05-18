class InventoryPage {
  constructor(page) {
    this.page = page;
 
    // Inventory
    this.inventoryList  = page.locator('[data-test="inventory-list"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.itemNames      = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices     = page.locator('[data-test="inventory-item-price"]');
    this.sortDropdown   = page.locator('[data-test="product-sort-container"]');
 
    // Header
    this.cartLink  = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge  = page.locator('[data-test="shopping-cart-badge"]');
 
    // Menu / Logout
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  }
 
  // Configure sort options
  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }
 
  // productName must match the slug used in data-test
  async addToCart(productSlug) {
    await this.page.locator(`[data-test="add-to-cart-${productSlug}"]`).click();
  }
 
  // productName must match the slug used in data-test
  async removeItemFromCart(productSlug) {
    await this.page.locator(`[data-test="remove-${productSlug}"]`).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
 
  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
 
  // Returns prices as sorted array of floats
  async getPricesAsNumbers() {
    const priceTexts = await this.itemPrices.allTextContents();
    return priceTexts.map((p) => parseFloat(p.replace('$', '')));
  }
 
  // Returns product names as array of strings
  async getNamesAsStrings() {
    return this.itemNames.allTextContents();
  }
}
 
module.exports = { InventoryPage };
 

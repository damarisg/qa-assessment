
class CheckoutPage {
  constructor(page) {
    this.page = page;
 
    // Checkout:Shipping info
    this.firstNameInput  = page.locator('[data-test="firstName"]');
    this.lastNameInput   = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton  = page.locator('[data-test="continue"]');
    this.errorMessage    = page.locator('[data-test="error"]');
    this.cancelButton    = page.locator('[data-test="cancel"]');
 
    // Checkout: Overview
    this.finishButton    = page.locator('[data-test="finish"]');
 
    // Checkout: Complete
    this.successHeader   = page.locator('[data-test="complete-header"]');
  }
 
  async fillShippingInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async continue() {
    await this.continueButton.click();
  }
 
  async finish() {
    await this.finishButton.click();
  }
}
 
module.exports = { CheckoutPage };
 

import { Page, Locator } from "@playwright/test";

export class HomePage {
  
  // Variables
  readonly page: Page;
  readonly homeButton: Locator;
  readonly registerButton: Locator;
  readonly signInButton: Locator;
  readonly googleSignInButton: Locator;

  readonly addonButton: Locator;

  readonly teacherStandardButton: Locator;
  readonly teacherProButton: Locator;
  readonly organizationButton: Locator;

  readonly endSignInButton: Locator;

  readonly nubricDropdown: Locator;



  // Constructor
  constructor(page: Page) {
    this.page = page;
    this.homeButton = page.locator(
      '[data-testid="appbar-learning-lemur-logo-router-link"]',
    );
    this.registerButton = page.locator('[data-testid="sign-in-button"]');
    this.signInButton = page.locator('[data-testid="hero-cta-button"]');
    this.googleSignInButton = page
      .frameLocator('iframe[src*="accounts.google.com"]')
      .getByRole("button");

    this.addonButton = page.locator('[data-testid="gc-addon-button"]');

    this.teacherStandardButton = page.locator(
      '[data-testid="get-started-button-standardTeacher"]',
    );
    this.teacherProButton = page.locator(
      '[data-testid="get-started-button-proTeacher"]',
    );
    this.organizationButton = page.locator(
      '[data-testid="get-started-button-organization"]',
    );

    this.endSignInButton = page.locator('[data-testid="cta-bottom-button"]');

    this.nubricDropdown = page.locator('[data-testid="footer-button"]');
  }



  // Methods
  async goToHomePage() {
    await this.page.goto("/");
  }

  async clickHomeButton() {
    await this.homeButton.click();
  }

  async clickRegisterButton() {
    await this.registerButton.click();
  }

  async clickSignInButton() {
    await this.signInButton.click();
  }

  async clickGoogleSignInButton() {
    await this.googleSignInButton.click();
  }

  async clickAddonButton() {
    await this.addonButton.click();
  }

  async clickTeacherStandardButton() {
    await this.teacherStandardButton.click();
  }

  async clickTeacherProButton() {
    await this.teacherProButton.click();
  }

  async clickOrganizationButton() {
    await this.organizationButton.click();
  }

  async clickEndSignInButton() {
    await this.endSignInButton.click();
  }

  async clickNubricDropdown() {
    await this.nubricDropdown.click();
  }
}

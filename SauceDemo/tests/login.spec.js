const { test, expect } = require('@playwright/test');
const { loginUser } = require('./SauceDemo/helpers');

const users = [
  { name: 'StandardUser', username: 'standard_user', password: 'secret_sauce', shouldSucceed: true },
  { name: 'LockedUser', username: 'locked_out_user', password: 'secret_sauce', shouldSucceed: false },
  { name: 'ProblemUser', username: 'problem_user', password: 'secret_sauce', shouldSucceed: true },
  { name: 'PerformanceUser', username: 'performance_glitch_user', password: 'secret_sauce', shouldSucceed: true }
];

test.describe('SauceDemo Login Tests', () => {
  users.forEach(user => {
    test(`Login as ${user.name}`, async ({ page }) => {
     
      const loginPage = await loginUser(page, user.username, user.password, user.shouldSucceed);

      if (user.shouldSucceed) {
        await expect(loginPage.productsTitle).toBeVisible();
      }
    });
  });
});

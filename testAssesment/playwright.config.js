// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir:'./',
  timeout: 30000,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
  },
});

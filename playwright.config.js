const { defineConfig, devices} = require('@playwright/test');

module.exports = defineConfig({
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure', // screenshot automático si falla
    video: 'retain-on-failure',    // video solo si falla
    actionTimeout: 15000,
  },

  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});

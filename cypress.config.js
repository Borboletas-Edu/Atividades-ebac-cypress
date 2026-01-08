const { defineConfig } = require('cypress');
const registerReportPortalPlugin = require('@reportportal/agent-js-cypress/lib/plugin');

module.exports = defineConfig({
  reporter: '@reportportal/agent-js-cypress',

  reporterOptions: {
    apiKey: 'TesteEdu_aW13_A1NQVqzO-LVIAAlDaVLJgL_APPKP0KnE7TsTPNbjPcrrYo-jcFjcC8UOlTp',
    endpoint: 'https://demo.reportportal.io/api/v1',
    project: 'borboletas-edu_personal', 
    launch: 'Cypress EBAC',
    description: 'Documentação dos testes da Loja EBAC',

    attributes: [
      { key: 'framework', value: 'cypress' },
      { value: 'ebac' }
    ],
  },

  e2e: {
    setupNodeEvents(on, config) {
      registerReportPortalPlugin(on, config);
      return config;
    },
  },
});

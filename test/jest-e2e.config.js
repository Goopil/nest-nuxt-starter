const cfg = require('./jest.config');

module.exports = {
  ...cfg,
  "testMatch": [
    '**/?(*.)+(e2e-spec|e2e-test).(js|ts|tsx)',
  ],
}
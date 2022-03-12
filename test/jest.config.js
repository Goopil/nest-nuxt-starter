module.exports = {
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "moduleNameMapper": {
    "^@server/(.*)$": "<rootDir>/server/$1",
    "^client/(.*)$": "<rootDir>/client/$1",
    "^common/(.*)$": "<rootDir>/common/$1"
  },
  "rootDir": "../",
  "testMatch": [
    '**/__tests__/**/*.(js|ts|tsx)',
    '**/?(*.)+(spec|test).(js|ts|tsx)',
  ],
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "coverageDirectory": "./coverage",
  "testEnvironment": "node"
}
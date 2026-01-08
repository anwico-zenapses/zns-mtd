/**
 * Jest Configuration
 * Testing framework para AWC ZNS-MTD
 */

module.exports = {
  // Directorio raíz de tests
  testEnvironment: 'node',

  // Paths de tests
  testMatch: ['**/test/unit/**/*.test.js', '**/test/integration/**/*.test.js'],

  // Coverage
  collectCoverageFrom: [
    'tools/**/*.js',
    'src/**/*.js',
    '!**/node_modules/**',
    '!**/test/**',
    '!**/coverage/**'
  ],

  coverageThreshold: {
    global: {
      branches: 5,
      functions: 10,
      lines: 5,
      statements: 5
    }
  },

  // Directorio de coverage
  coverageDirectory: 'coverage',

  // Reporters
  coverageReporters: ['text', 'lcov', 'html'],

  // Timeout para tests
  testTimeout: 10000,

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],

  // Verbose
  verbose: true,

  // Clear mocks entre tests
  clearMocks: true,
  restoreMocks: true
};

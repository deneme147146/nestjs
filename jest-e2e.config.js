const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

module.exports = {
  verbose: true,
  bail: 1,
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePathIgnorePatterns: ['./dist'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  testTimeout: 18000,
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.schema.(t|j)s',
    '!**/__mocks__/*.(t|j)s',
    '!**/movie-case/coverage-e2e/lcov-report/**', // Exclude the specific directory
    '!**/movie-case/coverage/lcov-report/**', // Exclude the specific directory
  ],
  coveragePathIgnorePatterns: [
    'node_modules',
    '.module.ts',
    './src/main.ts',
    './src/tracing.ts',
    'health',
    './.eslintrc.js',
    './.coverage',
    'movie-case/coverage-e2e/lcov-report', // Exclude the specific directory
    'movie-case/coverage/lcov-report', // Exclude the specific directory
  ],
  coverageDirectory: './coverage-e2e',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  }
};
